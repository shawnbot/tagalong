var code = require('./evaluate');
var interpolate = require('./interpolate');
var compose = require('./compose');
var h = require('./h');

var morphdom = require('morphdom');

var T = require('./constants').T;
var T_ID = 't-id';
var attr = require('./attrs');
var dom = require('./dom');
var util = require('./util');
var ns = require('./ns');
var scope = require('./scope');

// this is our symbol on which we stash registered event handlers, so that
// we can remove any registered handlers before adding new ones.
var EVENTS = '[[t-events]]';

// we stash unique event handler ids and handlers by id, each bound to the
// renered template data
var eventHandlerId = 0;
var eventHandlersById = {};

/**
 * Returns a function that generates an interpolated string for the
 * given text node (`node.nodeType === Node.TEXT_NODE`).
 *
 * @param {Node} node
 * @return {Function} function(data:Object):String
 */
var createTextRenderer = function(node) {
  return compose.stringify(interpolate.compile(node.nodeValue));
};

/**
 * "Pluck" event handlers from an attribute map, removing them from
 * the map. If no event handlers are found, the return value is
 * `undefined`.
 *
 * @param {Object} attrMap
 * @return {Object}
 */
var pluckEventHandlers = function(attrMap) {
  var handlers = undefined;
  for (var name in attrMap) {
    var value = attrMap[name];
    if (name.indexOf('on') === 0 && typeof value === 'function') {
      if (!handlers) {
        handlers = {};
      }
      handlers[name.substr(2)] = value;
      delete attrMap[name];
    }
  }
  return handlers;
};

/**
 * This function returns a node rendering wrapper that registers event handlers
 * for the rendered node by assigning it a unique `t-id` attribute and stashing
 * a reference to the data-bound handlers in a corresponding hash. After the
 * tree is morphed, each element with a `t-id` attribute is then matched up
 * with its event handlers.
 *
 * @param {Function} render
 * @param {Object} handlers each key is an event type, and the value is a
 * callback function.
 * @return {Function} a function that returns the rendered node
 */
var registerEventHandlers = function(render, handlers) {
  return function(data, index) {
    var node = render.apply(this, arguments);
    if (node) {
      var tid = ++eventHandlerId;
      node.setAttribute(T_ID, tid);
      var context = this;
      var callback = function(event) {
        // XXX in theory, this could fail if one
        // of the handlers gets removed (not
        // sure how that would happen, though)
        handlers[event.type].call(context, data, event);
      };
      var bound = {};
      for (var type in handlers) {
        bound[type] = callback;
      }
      eventHandlersById[tid] = bound;
    }
    return node;
  };
};

/**
 * Returns a function that generates an interpolated DOM element tree
 * for the given element node
 * (`node.nodeType === Node.ELEMENT_NODE`).
 *
 * @param {Element} node
 * @return {Function} function(data:Object):Element
 */
var createElementRenderer = function(node) {
  // this element will never be rendered if it has a truthy t-skip
  // attribute
  if (node.hasAttribute(T.SKIP)) {
    return undefined;
  }

  var name = ns.getPrefixedName(node);
  var attrMap = attr.getAttributeMap(node);
  var handlers = pluckEventHandlers(attrMap);

  var condition = node.hasAttribute(T.IF)
    ? code.evaluator(node.getAttribute(T.IF))
    : undefined;

  if (node.hasAttribute(T.ELSE)) {
    if (condition) {
      throw new Error('element has both t-if and t-else attributes');
    }
    // TODO: ELSEIF should just collect all of the previous IF and
    // ELSEIF nodes and negate them. Some checking should happen here to
    // ensure that they're specified in the correct order.
    var ifSibling = dom.getPreviousSibling(node, '[' + T.IF + ']');
    if (!ifSibling) {
      throw new Error('element with t-else has no matching t-if sibling');
    }
    condition = compose.not(code.evaluator(ifSibling.getAttribute(T.IF)));
  }

  var renderChildren;

  // <span t-text="some.value"></span>
  if (node.hasAttribute(T.TEXT)) {
    renderChildren = compose.stringify(
      util.compileExpression(node.getAttribute(T.TEXT))
    );
  } else {
    var childRenderers = [].map.call(node.childNodes, compile);
    renderChildren = function(data) {
      return childRenderers.map(function(renderChild, i) {
        return (typeof renderChild === 'function')
          ? renderChild.call(this, data)
          : renderChild;
      }, this);
    };
  }

  var renderNode = function(data) {
    if (condition && !condition.call(this, data)) {
      return undefined;
    }

    var attrs = attr.interpolateAttributes.call(this, attrMap, data);
    var children = renderChildren.call(this, data);
    return h(name, attrs, children);
  };

  // "attach" (as a single property) the event handler maps
  if (handlers) {
    renderNode = registerEventHandlers(renderNode, handlers);
  }

  var eachExpression = node.getAttribute(T.EACH);
  var forEachExpression = node.getAttribute(T.FOREACH);
  var withExpression = node.getAttribute(T.WITH);

  var symbol = node.getAttribute(T.AS);

  if (eachExpression) {
    renderNode = scope.renderEach(
      code.evaluator(eachExpression),
      renderNode,
      symbol
    );
  } else if (forEachExpression) {
    renderChildren = scope.renderEach(
      code.evaluator(forEachExpression),
      renderChildren,
      symbol
    );
  } else if (withExpression) {
    renderNode = scope.renderWith(
      code.evaluator(withExpression),
      renderNode,
      symbol
    );
  } else if (symbol) {
    renderNode = scope.symbolSetter(symbol, renderNode);
  }

  return renderNode;
};

/**
 * Returns a rendering function for a given source ("template") node
 * and optional variable context for expressions.
 *
 * The returned function has the signatures:
 *
 * function(data:*)
 * function(node:Node, data:*)
 *
 * Where `data` is expected to be an object and, in the second form,
 * `node` is a target node to which the diffed DOM should be applied.
 *
 * @param {Node}    src
 * @param {Object?} context
 * @return {Function}
 */
var createRenderer = function(src, context) {
  if (typeof src === 'string') {
    var selector = src;
    src = document.querySelector(src);
    if (!src) {
      throw new Error('no element found with selector: "' + selector + '"');
    }
  }

  var renderNode = compile(src);
  return function(node, data, options) {
    if (arguments.length < 2) {
      data = node;
    }
    if ((!node && data) || node === data) {
      node = src;
    }
    eventHandlerId = 0;
    eventHandlersById = {};
    var dest = renderNode.call(context, data);
    var result = morphdom(src, dest, options);
    updateEventHandlers(result);
    return result;
  };
};

/**
 * Update all of the event handlers in the given DOM tree. This looks for all
 * elements with the `t-id` attribute (including the root), removes any
 * existing handlers (stashed in the `[[t-events]]` symbol), then looks up the
 * registered handlers for the corresponding `t-id` value and adds those.
 *
 * @param {Element} root
 */
var updateEventHandlers = function(root) {
  var elements = [].slice.call(root.querySelectorAll('[' + T_ID + ']'));
  if (root.hasAttribute(T_ID)) {
    elements.unshift(root);
  }
  elements.forEach(function(el) {
    var events = el[EVENTS];
    var type;
    if (events) {
      for (type in events) {
        el.removeEventListener(type, events[type], true);
        delete events[type];
      }
      delete el[EVENTS];
    }
    var tid = el.getAttribute(T_ID);
    events = eventHandlersById[tid];
    if (events) {
      for (type in events) {
        el.addEventListener(type, events[type], true);
      }
      el[EVENTS] = events;
    }
    el.removeAttribute(T_ID);
  });
};

/**
 * Creates a renderer, renders once if data is provided, and returns
 * a bound rendering function for subsequent calling.
 *
 * @param {Node}    src
 * @param {Object?} context
 * @return {Function}
 */
var render = function(src, data, context) {
  var renderData = createRenderer(src, context);
  if (data) {
    renderData(src, data);
  }
  return renderData;
};

/**
 * Returns a DOM element rendering function for the given "template"
 * or source node. This may be publicly exposed if it becomes useful,
 * e.g. for composition of referenced templates.
 *
 * @param {Node} node
 * @return {Function} the returned function takes data and returns an
 * unattached Node instance: function(data:Object):Node
 */
var compile = function(node) {
  switch (node.nodeType) {
    case 1: // Node.ELEMENT_NODE
      return createElementRenderer(node);
    case 3: // Node.TEXT_NODE
      return createTextRenderer(node);

    // TODO: support document fragments?
    // this would need support in h()

    default:
      throw new Error('no renderer for node type: ' + node.nodeType);
  }
};


module.exports.render = render;
module.exports.createRenderer = createRenderer;
module.exports.compile = compile;

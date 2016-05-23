var code = require('./evaluate');
var functor = require('./functor');
var xp = require('./evaluate');
var interpolate = require('./interpolate');
var transform = require('./transform');
var h = require('./h');

var morphdom = require('morphdom');

// our attribute namespace
var T_NS = 't-';

var T_AS = T_NS + 'as';
var T_EACH = T_NS + 'each';
var T_ELSE = T_NS + 'else';
var T_FOREACH = T_NS + 'foreach';
var T_IF = T_NS + 'if';
var T_SKIP = T_NS + 'skip';
var T_TEXT = T_NS + 'text';
var T_WITH = T_NS + 'with';

var CONTROL_ATTRS = [
  'as',
  'each',
  'else',
  'foreach',
  'if',
  'skip',
  'text',
  'with'
];

var createRenderer = function(src, context) {
  if (typeof src === 'string') {
    var selector = src;
    src = document.querySelector(src);
    if (!src) {
      throw new Error('no element found with selector: "' + selector + '"');
    }
  }

  var render = compile(src);
  return function(node, data) {
    if (arguments.length < 2) {
      data = node;
    }
    if ((!node && data) || node === data) {
      node = src;
    }
    var dest = render.call(context || this, data);
    // console.log('morphing:', src.outerHTML, '->', dest.outerHTML);
    return morphdom(src, dest);
  }
};

var render = function(src, data, context) {
  var render = createRenderer(src, context);
  if (data) {
    render(src, data);
  }
  return render;
};

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

function compileExpression(expr) {
  return interpolate.isTemplate(expr)
    ? interpolate.compile(expr)
    : code.evaluator(expr);
}

function createTextRenderer(node) {
  return stringify(interpolate.compile(node.nodeValue));
}

function createElementRenderer(node) {
  // this element will never be rendered if it has a truthy t-skip attribute
  if (node.hasAttribute(T_SKIP)) {
    return noop;
  }

  var name = node.nodeName.toLowerCase();
  var attrMap = getAttributeMap(node);

  var condition = node.hasAttribute(T_IF)
    ? xp.evaluator(node.getAttribute(T_IF))
    : undefined;

  if (node.hasAttribute(T_ELSE)) {
    if (condition) {
      throw new Error('element has both t-if and t-else attributes');
    }
    var ifSibling = getPreviousSibling(node, '[' + T_IF + ']');
    if (!ifSibling) {
      throw new Error('element with t-else has no matching t-if sibling');
    }
    condition = not(xp.evaluator(ifSibling.getAttribute(T_IF)));
  }

  var renderChildren;

  // <span t-text="some.value"></span>
  if (node.hasAttribute(T_TEXT)) {
    renderChildren = stringify(
      compileExpression(node.getAttribute(T_TEXT))
    );
  } else {
    var childRenderers = [].map.call(node.childNodes, compile);
    renderChildren = function(data) {
      return childRenderers.map(function(renderChild) {
        return renderChild.call(this, data);
      }, this);
    };
  }

  var renderNode = function(data) {
    // console.log('rendering', node, 'with data:', data);
    if (condition && !condition.call(this, data)) {
      return undefined;
    }

    var attrs = interpolateAttributes.call(this, attrMap, data);
    var children = renderChildren.call(this, data);
    return h(name, attrs, children);
  };

  var eachExpression = node.getAttribute(T_EACH);
  var forEachExpression = node.getAttribute(T_FOREACH);
  var withExpression = node.getAttribute(T_WITH);

  var symbol = node.getAttribute(T_AS);

  if (eachExpression) {
    renderNode = renderEach(eachExpression, renderNode, symbol);
  } else if (forEachExpression) {
    renderChildren = renderEach(forEachExpression, renderChildren, symbol);
  } else if (withExpression) {
    renderNode = renderWith(withExpression, renderNode, symbol);
  } else if (symbol) {
    renderNode = symbolSetter(symbol, renderNode);
  }

  return renderNode;
}

function renderEach(expression, render, symbol) {
  var expr = xp.evaluator(expression);
  return function(data) {
    var values = expr.call(this, data);
    return forEach.call(this, values, render, symbol);
  };
}

function renderWith(expression, render, symbol) {
  var expr = xp.evaluator(expression);
  render = symbolSetter(symbol, render);
  return function(data) {
    data = expr.call(this, data);
    return render.call(this, data);
  };
}

function getAttributeMap(node) {
  var map = {};
  var attrs = node.attributes;
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    var name = String(attr.name);
    if (name.indexOf(T_NS) === 0) {
      name = name.substr(T_NS.length);
      if (CONTROL_ATTRS.indexOf(name) > -1) {
        continue;
      }
      var getter = compileExpression(attr.value);
      switch (name) {
        case 'class':
          getter = transform.className(getter);
          break;
        case 'style':
          getter = transform.style(getter);
          break;

        default:
          getter = stringify(getter);
          break;
      }
      map[name] = getter;
    } else {
      map[name] = attr.value;
    }
  }
  return map;
}

function interpolateAttributes(attrMap, data) {
  var attrs = {};
  for (var key in attrMap) {
    var value = attrMap[key];
    // only apply functions for attrs that aren't event handlers
    if (typeof value === 'function' && key.indexOf('on') !== 0) {
      value = value.call(this, data, key);
    }
    if (defined(value)) {
      attrs[key] = value;
    }
  }
  return attrs;
}

function getPreviousSibling(node, selector) {
  while (node = node.previousSibling) {
    if (!node) break;
    // FIXME this needs a vendor prefix in IE 9+
    // <http://caniuse.com/#search=matches>
    if (node.matches(selector)) return node;
  }
  throw new Error('no previous sibling found matching: ' + selector);
}

function isElementVoid(name) {
  return VOID_ELEMENTS.indexOf(name) > -1;
}

function forEach(data, fn, symbol) {
  var previous;
  var iterate = symbol
    ? symbolSetter(symbol, fn)
    : fn;

  var result = [];
  var INDEX = '$i';
  var each = function(d, i) {
    this[INDEX] = i;
    result.push(iterate.call(this, d));
    delete this[INDEX];
  };

  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      data.forEach(each, this);
    } else {
      var i = 0;
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          each.call(this, {key: key, value: data[key]}, i++);
        }
      }
    }
  } else if (typeof data === 'string') {
    data.split('').forEach(each, this);
  }

  return result;
}

function symbolSetter(symbol, fn) {
  return function(data) {
    var previous = set(this, symbol, data);
    var result = fn.call(this, data);
    set(this, symbol, previous);
    return result;
  };
}

function defined(value) {
  return value !== null && value !== undefined;
}

function not(fn) {
  return function() {
    return !fn.apply(this, arguments);
  };
}

function set(context, symbol, value) {
  var previous = context[symbol];
  if (value === undefined) {
    delete context[symbol];
  } else {
    context[symbol] = value;
  }
  return previous;
}

function stringify(fn) {
  return function() {
    var value = fn.apply(this, arguments);
    return defined(value) ? String(value) : '';
  };
}

function noop() {
}

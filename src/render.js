var code = require('./evaluate');
var incremental = require('incremental-dom');
var xp = require('./evaluate');
var transform = require('./transform');

// our attribute namespace
var T_NS = 't-';

var T_AS = T_NS + 'as';
var T_SKIP = T_NS + 'skip';
var T_IF = T_NS + 'if';
var T_ELSE = T_NS + 'else';
var T_EACH = T_NS + 'each';
var T_FOREACH = T_NS + 'foreach';
var T_SWITCH = T_NS + 'switch';
var T_CASE = T_NS + 'case';
var T_DEFAULT = T_NS + 'default';
var T_WITH = T_NS + 'with';
var T_TEXT = T_NS + 'text';

var CONTROL_ATTRS = [
  'as',
  'skip',
  'if', 'else',
  'each', 'foreach',
  'switch', 'case', 'default',
  'with',
  'text'
];

var VOID_ELEMENTS = [
  'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img',
  'input', 'keygen', 'link', 'meta', 'param', 'source', 'track',
  'wbr'
];

module.exports = {
  create: createRenderFunction,
  render: function(root, data, context) {
    var render = createRenderFunction(root, context);
    render(data);
    return render;
  }
};

function createRenderFunction(root, context) {
  if (typeof root === 'string') {
    var selector = root;
    root = document.querySelector(selector);
    if (!root) {
      throw new Error('no element found with selector: "' + selector + '"');
    }
  }
  var render = createRenderer(root);
  if (arguments.length < 2) context = {};
  return function _render(data) {
    // console.log('rendering with data:', data);
    return incremental.patch(root, render.bind(context, data));
  };
}

function createRenderer(root) {
  var calls = [];
  for (
    var child = root.firstChild; child;
    child = child.nextSibling
  ) {
    switch (child.nodeType) {
      case Node.TEXT_NODE:
        calls.push(createTextRenderer(child));
        break;
      case Node.ELEMENT_NODE:
        calls.push(createElementRenderer(child));
        break;
    }
  }
  return function patch(data) {
    // console.log('patching:', root, 'with', data);
    calls.forEach(function(fn) {
      fn.call(this, data);
    }, this);
  };
}

function createTextRenderer(node) {
  // TODO: expand {{ expressions }} ?
  return function(data) {
    incremental.text(node.nodeValue);
  };
}

function createElementRenderer(node) {
  var name = node.nodeName.toLowerCase();

  // this element will never be rendered if it has a truthy t-skip attribute
  if (node.hasAttribute(T_SKIP)) {
    return noop;
  }

  var isVoid = isElementVoid(name);
  var attrMap = getAttributeMap(node);

  var condition = node.hasAttribute(T_IF)
    ? xp.evaluator(node.getAttribute(T_IF))
    : null;

  if (node.hasAttribute(T_ELSE)) {
    if (condition) throw new Error('element has both t-if and t-else attributes');
    var ifSibling = getPreviousSibling(node, '[' + T_IF + ']');
    if (!ifSibling) throw new Error('element with t-else has no matching t-if sibling');
    condition = not(xp.evaluator(ifSibling.getAttribute(T_IF)));
  }

  var renderChildren;

  // <span t-text="some.value"></span>
  var textExpression = node.getAttribute(T_TEXT);
  if (textExpression) {
    var getText = xp.evaluator(textExpression);
    renderChildren = function(data) {
      var value = getText.call(this, data);
      if (defined(value)) {
        incremental.text(String(value));
      }
    };
  } else {
    renderChildren = createRenderer(node);
  }

  var render = function(data) {
    // console.log('rendering', node, 'with data:', data);
    if (condition && !condition.call(this, data)) {
      return false;
    }

    var attrs = interpolateAttributes.call(this, attrMap, data);
    if (isVoid) {
      incremental.elementVoid(name, '', attrs);
    } else {
      incremental.elementOpen(name, '', attrs);
      renderChildren.call(this, data);
      incremental.elementClose(name);
    }
  };

  var eachExpression = node.getAttribute(T_EACH);
  var forEachExpression = node.getAttribute(T_FOREACH);
  var switchExpression = node.getAttribute(T_SWITCH);
  var withExpression = node.getAttribute(T_WITH);

  var symbol = node.getAttribute(T_AS);

  if (eachExpression) {
    // console.info('render each:', node, eachExpression);
    render = renderEach(eachExpression, render, symbol);
  } else if (forEachExpression) {
    // console.info('render foreach:', node, forEachExpression);
    renderChildren = renderEach(forEachExpression, renderChildren, symbol);
  } else if (withExpression) {
    render = renderWith(withExpression, render, symbol);
  } else if (switchExpression) {
    // TODO
  }

  return render;
}

function renderEach(expression, render, symbol) {
  var expr = xp.evaluator(expression);
  return function(data) {
    var values = expr.call(this, data);
    forEach.call(this, values, render, symbol);
  };
}

function renderWith(expression, render, symbol) {
  var expr = xp.evaluator(expression);
  if (symbol) render = symbolSetter(symbol, render);
  return function(data) {
    data = expr.call(this, data);
    render.call(this, data);
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
        break;
      }
      var getter = xp.evaluator(attr.value);
      switch (name) {
        case 'class':
          getter = transform.className(getter);
          break;
        case 'style':
          getter = transform.style(getter);
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
  var attrs = [];
  for (var key in attrMap) {
    var value = attrMap[key];
    if (typeof value === 'function') {
      value = value.call(this, data, key);
    }
    if (defined(value)) {
      attrs.push(key, value);
    }
  }
  return attrs;
}

function getPreviousSibling(node, selector) {
  while (node = node.previousSibling) {
    if (!node) break;
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

  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      return data.forEach(iterate, this);
    }

    var i = 0;
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        iterate.call(this, {key: key, value: data[key]}, i++);
      }
    }
  } else if (typeof data === 'string') {
    return data.split('').forEach(iterate, this);
  }

  // throw new Error('unable to iterate over ' + (typeof data));
}

function symbolSetter(symbol, fn) {
  return function(data) {
    var previous = set(this, symbol, data);
    if (fn) fn.call(this, data);
    set(this, symbol, previous);
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

function noop() {
}

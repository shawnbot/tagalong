var code = require('./evaluate');
var incremental = require('incremental-dom');
var xp = require('./evaluate');
var transform = require('./transform');

var T_NAMESPACE = 't-';
var T_IF = T_NAMESPACE + 'if';
var T_EACH = T_NAMESPACE + 'each';
var T_TEXT = T_NAMESPACE + 'text';
var T_FOREACH = T_NAMESPACE + 'foreach';

var CONTROL_ATTRS = [T_IF, T_EACH, T_FOREACH, T_TEXT];

var VOID_ELEMENTS = [
  'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img',
  'input', 'keygen', 'link', 'meta', 'param', 'source', 'track',
  'wbr'
];

module.exports = {
  create: createRenderFunction,
  render: function(root, data) {
    var render = createRenderFunction(root);
    render(data);
    return render;
  }
};

function createRenderFunction(root) {
  if (typeof root === 'string') {
    var selector = root;
    root = document.querySelector(selector);
    if (!root) {
      throw new Error('no element found with selector: "' + selector + '"');
    }
  }
  var render = createRenderer(root);
  return function _render(data) {
    // console.log('rendering with data:', data);
    return incremental.patch(root, render.bind(this, data));
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
      fn(data);
    });
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

  var isVoid = isElementVoid(name);
  var attrMap = getAttributeMap(node);

  var condition = node.hasAttribute(T_IF)
    ? xp.evaluator(node.getAttribute(T_IF))
    : null;

  var renderChildren;

  // <span t-text="some.value"></span>
  var textExpression = node.getAttribute(T_TEXT);
  if (textExpression) {
    var getText = xp.evaluator(textExpression);
    renderChildren = function(data) {
      var value = getText(data);
      if (defined(value)) {
        incremental.text(String(value));
      }
    };
  } else {
    renderChildren = createRenderer(node);
  }

  var render = function(data) {
    // console.log('rendering', node, 'with data:', data);
    if (condition && !condition(data)) {
      return false;
    }

    var attrs = interpolateAttributes(attrMap, data);
    if (isVoid) {
      incremental.elementVoid(name, '', attrs);
    } else {
      incremental.elementOpen(name, '', attrs);
      renderChildren(data);
      incremental.elementClose(name);
    }
  };

  var eachExpression = node.getAttribute(T_EACH);
  var forEachExpression = node.getAttribute(T_FOREACH);

  // <ul><li t-each="items">{{ . }}</li></ul>
  if (eachExpression) {
    // console.info('render each:', node, eachExpression);
    render = renderEach(eachExpression, render);
  // <ul t-foreach="items"><li>{{ . }}</li></ul>
  } else if (forEachExpression) {
    // console.info('render foreach:', node, forEachExpression);
    renderChildren = renderEach(forEachExpression, renderChildren);
  } else {
    // console.info('render once:', node);
  }

  return render;
}

function renderEach(expression, render) {
  return function(data) {
    var values = xp.evaluate(expression, data);
    forEach(values, render);
  };
}

function getAttributeMap(node) {
  var map = {};
  var attrs = node.attributes;
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    var name = String(attr.name);
    if (CONTROL_ATTRS.indexOf(name) > -1) {
      // console.info('skipping control attribute', name, 'for', node);
      continue;
    } else if (name.indexOf(T_NAMESPACE) === 0) {
      var getter = xp.evaluator(attr.value);
      name = name.substr(T_NAMESPACE.length);
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

function isElementVoid(name) {
  return VOID_ELEMENTS.indexOf(name) > -1;
}

function forEach(data, fn) {
  return data.forEach(fn, this);
}

function defined(value) {
  return value !== null && value !== undefined;
}

import evaluate, {evaluator} from './evaluate';

import {
  elementOpen,
  elementClose,
  elementVoid,
  text,
  patch
} from 'incremental-dom';

const T_NAMESPACE = 't-';
const T_IF = T_NAMESPACE + 'if';
const T_EACH = T_NAMESPACE + 'each';
const T_TEXT = T_NAMESPACE + 'text';
const T_FOREACH = T_NAMESPACE + 'foreach';

const CONTROL_ATTRS = new Set([T_IF, T_EACH, T_FOREACH, T_TEXT]);

const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img',
  'input', 'keygen', 'link', 'meta', 'param', 'source', 'track',
  'wbr'
]);

export function createRenderFunction(root) {
  let render = createRenderer(root);
  return function _render(data) {
    // console.log('rendering with data:', data);
    return patch(root, render.bind(this, data));
  };
};

function createRenderer(root) {
  let calls = [];
  for (
    let child = root.firstChild; child;
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
    calls.forEach(fn => fn(data));
  };
}

function createTextRenderer(node) {
  // TODO: expand {{ expressions }} ?
  return (data) => text(node.nodeValue);
}

function createElementRenderer(node) {
  let name = node.nodeName.toLowerCase();

  let isVoid = isElementVoid(name);
  let attrMap = getAttributeMap(node);

  let condition = node.hasAttribute(T_IF)
    ? evaluator(node.getAttribute(T_IF))
    : null;

  let renderChildren;

  // <span t-text="some.value"></span>
  let textExpression = node.getAttribute(T_TEXT);
  if (textExpression) {
    let getText = evaluator(textExpression);
    renderChildren = function(data) {
      let value = getText(data);
      if (value !== null && value !== undefined) {
        text(String(value));
      }
    };
  } else {
    renderChildren = createRenderer(node);
  }

  let render = function(data) {
    // console.log('rendering', node, 'with data:', data);
    if (condition && !condition(data)) {
      return false;
    }

    let attrs = interpolateAttributes(attrMap, data);
    if (isVoid) {
      elementVoid(name, '', attrs);
    } else {
      elementOpen(name, '', attrs);
      renderChildren(data);
      elementClose(name);
    }
  };

  let eachExpression = node.getAttribute(T_EACH);
  let forEachExpression = node.getAttribute(T_FOREACH);

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
  return (data) => {
    let values = evaluate(expression, data);
    forEach(values, render);
  };
}

function getAttributeMap(node) {
  let map = new Map();
  let attrs = node.attributes;
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    let name = String(attr.name);
    if (CONTROL_ATTRS.has(name)) {
      // console.info('skipping control attribute', name, 'for', node);
      continue;
    } else if (name.indexOf(T_NAMESPACE) === 0) {
      let getter = evaluator(attr.value);
      map.set(name.substr(T_NAMESPACE.length), getter);
    } else {
      map.set(name, attr.value);
    }
  }
  return map;
}

function interpolateAttributes(attrMap, data) {
  let attrs = [];
  for (let [key, value] of attrMap) {
    attrs.push(key, (typeof value === 'function')
      ? value(data, key)
      : String(value));
  }
  return attrs;
}

function isElementVoid(name) {
  return VOID_ELEMENTS.has(name);
}

function forEach(data, fn) {
  return data.forEach(fn, this);
}

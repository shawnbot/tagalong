var ns = require('./ns');

module.exports = function(name, props, children) {
  var node;
  if (Array.isArray(name)) {
    node = document.createDocumentFragment();
  } else {
    name = ns.qualify(name);
    node = name.namespaceURI
      ? document.createElementNS(name.namespaceURI, name.localName)
      : document.createElement(name.localName);
  }

  if (Array.isArray(props) || typeof props === 'string') {
    children = props;
  } else if (typeof props === 'object') {
    setProps(node, props);
  }

  var append = function(child) {
    if (Array.isArray(child)) {
      child.forEach(append);
    } else if (typeof child === 'object') {
      node.appendChild(child);
    } else if (typeof child === 'string') {
      node.appendChild(document.createTextNode(child));
    }
  };

  if (typeof children === 'object' || typeof children === 'string') {
    append(children);
  }

  return node;
};

var setProps = function(el, props) {
  for (var prop in props) {
    var value = props[prop];
    if (value === null || value === undefined || typeof value === 'function') {
      // XXX: don't add null, undefined, or function values
      continue;
    } else if (typeof value === 'object') {
      switch (prop) {
        case 'class':
          value = formatClassName(value);
          break;

        case 'style':
          value = formatStyle(value);
          break;

        default:
          console.warn('unrecognized object prop:', prop, value);
          continue;
      }
    }

    var name = ns.qualify(prop);
    if (name.namespaceURI) {
      console.log('ns:', prop, name, value);
      el.setAttributeNS(name.namespaceURI, name.localName, value);
    } else {
      el.setAttribute(name.localName, value);
    }
  }
};

var formatStyle = function(obj) {
  if (Array.isArray(obj)) {
    return obj.join('; ');
  }
  return Object.keys(obj)
    .map(function(key) {
      return [
        reformatCamelCase(key),
        ': ',
        obj[key],
        ';'
      ].join('');
    })
    .join(' ');
};

var reformatCamelCase = function(str) {
  return str.replace(/[A-Z]/g, function(char) {
    return '-' + char.toLowerCase();
  });
};

var formatClassName = function(obj) {
  if (Array.isArray(obj)) {
    return obj.join(' ');
  }
  return Object.keys(obj).filter(function(key) {
    return !!obj[key];
  }).join(' ');
};

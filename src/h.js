module.exports = function(name, props, children) {
  var node;
  if (Array.isArray(name)) {
    node = document.createDocumentFragment();
  } else {
    name = qualify(name);
    node = name.prefix
      ? document.createElementNS(name.prefix, name.name)
      : document.createElement(name.name);
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

var namespaces = {
  svg: 'https://www.w3.org/2000/svg',
  xlink: 'https://www.w3.org/TR/xlink/',
  xmlns: 'https://www.w3.org/2000/xmlns/'
};

var qualify = function(name) {
  var prefix;
  if (typeof name === 'object') {
    prefix = name.prefix || name.namespaceURI;
    return {
      name: name.name || name.localName,
      prefix: namespaces[prefix] || prefix
    };
  }
  var colon = name.indexOf(':');
  if (colon > -1) {
    prefix = name.substr(0, colon);
    prefix = namespaces[prefix] || prefix;
    name = name.substr(colon + 1);
  }
  return {
    name: name,
    prefix: prefix
  };
};

var setProps = function(el, props) {
  for (var prop in props) {
    var value = props[prop];
    if (prop.indexOf('on') === 0 && typeof value === 'function') {
      el[prop] = value;
    } else {
      prop = qualify(prop);
      if (prop.prefix) {
        el.setAttributeNS(prop.prefix, prop.name, value);
      } else {
        el.setAttribute(prop.name, value);
      }
    }
  }
};

var dom = require('incremental-dom');
var dotmap = require('dotmap');
var resolve = dotmap.get;

const T_PREFIX = 'data-';
const T_IF = T_PREFIX + 'if';
const T_BIND = T_PREFIX + 'bind';
const T_EACH = T_PREFIX + 'each';
const DOT_PREFIX = '.';
const ATTR_PREFIX = '@';
const TEXT_DIRECTIVE = 'text';

const SKIP_ATTRIBUTES = boolMap([T_IF, T_BIND, T_EACH]);
const VOID_ELEMENTS = boolMap('area base br col command embed hr img input keygen link meta param source track wbr'.split(' '));

var has = Object.prototype.hasOwnProperty;

function patcher(node) {
  switch (node.nodeType) {
    case 1: // element node
      return elementPatcher(node);

    case 3: // text node
      return textPatcher(node);
  }

  return noop;
}

function textPatcher(node) {
  var value = node.nodeValue;
  return function(data) {
    if (isScalar(data)) {
      debug('text patch:', data);
      patchText(data);
    } else {
      debug('text node:', value);
      dom.text(value);
    }
  };
}

function patchText(text) {
  if (text === null || text === undefined) {
    text = '';
  }
  dom.text(text);
}

function childPatcher(node) {
  var ops = [].map.call(node.childNodes, patcher);
  var len = ops.length;
  return len
    ? function patchDeep(data) {
        for (var i = 0; i < len; i++) {
          ops[i].apply(this, arguments);
        }
      }
    : function patchShallow(data) {
        if (isScalar(data)) {
          patchText(data);
        }
      };
}

function elementPatcher(node, onlyChildren) {
  var condition = node.hasAttribute(T_IF)
    ? createCondition(node.getAttribute(T_IF))
    : null;

  var key;
  var each = false;
  if (node.hasAttribute(T_BIND)) {
    key = node.getAttribute(T_BIND);
  } else if (node.hasAttribute(T_EACH)) {
    key = node.getAttribute(T_EACH);
    each = true;
  }

  var name = node.nodeName.toLowerCase();
  var isVoid = VOID_ELEMENTS[name];

  var attributes = [].reduce.call(node.attributes, function(attrs, attr) {
    attrs[attr.name] = attr.value;
    return attrs;
  }, {});

  var hasChildren = node.childNodes.length > 0;

  var patchChildren = (isVoid || !hasChildren)
    ? noop
    : childPatcher(node);

  var patch = function(data, directives) {
    // TODO: void elements
    var attrs = getAttributes.call(node, attributes, data, directives);

    if (isVoid) {
      dom.elementVoid(name, '', attrs);
    } else {
      if (!onlyChildren) dom.elementOpen(name, '', attrs);
      debug('patch(', name, data, onlyChildren, ')');
      if (directives && has.call(directives, TEXT_DIRECTIVE)) {
        // if there's a text directive, just use that
        var resolved = resolveDirective
          .call(node, directives[TEXT_DIRECTIVE], data, directives);
        patchText(resolved.data);
      } else if (key && !isObject(data)) {
        // or, if there's scalar data, use that
        patchText(data);
      } else if (!onlyChildren && isScalar(data)) {
        // XXX wtf, this is dumb
        patchText(data);
      } else if (hasChildren) {
        debug('patching children!');
        // otherwise, patch the child nodes
        patchChildren(data, directives);
      }
      if (!onlyChildren) dom.elementClose(name);
    }
  };

  return function(data, directives) {
    if (condition) {
      var valid = condition.call(node, data, directives);
      if (!valid) return false;
    }

    if (key) {
      var result = resolveKey.call(node, key, data, directives);
      // console.log('resolve key:', data, key, '->', result);
      data = result.data;
      directives = result.directives;
      if (each) data = listify(data);
    }

    if (Array.isArray(data)) {
      return data.forEach(function(d) {
        patch(d, directives);
      });
    } else if (each) {
      // console.warn('not repeating each!', data, key);
    }

    return patch(data, directives);
  };
}

function compose(fn, next) {
  return function() {
    var args = fn.apply(this, arguments);
    if (args === false) return args;
    return next.apply(this, args);
  };
}

function listify(d) {
  if (Array.isArray(d)) {
    return d;
  } else if (d && typeof d === 'object') {
    return Object.keys(d)
      .map(function(key) {
        return {key: key, value: d[key]};
      });
  }
  return (d === null || d === undefined)
    ? []
    : [d];
}

function createCondition(expr) {
  var not = false;
  if (expr.charAt(0) === '!') {
    expr = expr.substr(1);
    not = true;
  }
  var access = resolver(expr);
  return not
    ? function() { return !access.apply(this, arguments); }
    : access;
}

function resolver(expr) {
  var map = dotmap(expr);
  return function(data, directives) {
    try {
      return map(data);
    } catch (err) {
      try {
        return map(directives);
      } catch (err) {
      }
    }
    return null;
  };
}

function resolveKey(key, data, directives) {
  if (directives && typeof directives === 'object') {
    var dotted = DOT_PREFIX + key;
    if (has.call(directives, dotted)) {
      return resolveDirective
        .call(this, directives[dotted], resolve(data, key), key);
    } else if (has.call(directives, key)) {
      var resolved = resolve(data, key);
      if (resolved !== undefined) data = resolved;
      return resolveDirective
        .call(this, directives[key], data, key, directives);
    }
  }

  if (data && typeof data === 'object') {
    return {
      data: resolve(data, key),
      directives: directives
    };
  }

  return {
    data: null,
    directives: null
  };
}

function getAttributes(attrs, data, directives) {
  var out = {};
  for (var key in attrs) {
    out[key] = attrs[key];
  }
  if (directives && typeof directives === 'object') {
    for (var key in directives) {
      if (key.charAt(0) === ATTR_PREFIX) {
        var name = key.substr(1);
        var directive = directives[key];
        // XXX special case: object directives attributes get
        // resolved differently than scalar and function directives
        // to support class and style attributes
        if (isObject(directive)) {
          directive = resolveKeys.call(this, directive, data);
        } else {
          directive = resolveDirective.call(this, directive, data, key, directives).data;
        }
        out[name] = getAttributeValue(directive, name, attrs[name]);
      }
    }
  }
  return Object.keys(out).reduce(function(list, key) {
    if (key in SKIP_ATTRIBUTES) return list;
    var value = out[key];
    if (value !== null && value !== undefined) {
      list.push(key, value);
    }
    return list;
  }, []);
}

function resolveDirective(directive, data, key, directives) {
  switch (typeof directive) {
    case 'function':
      return {
        data: directive.call(this, data, key),
        directives: extractNestedDirecties(directives, key)
      };

    case 'string':
    case 'number':
      return {
        data: resolve(data, directive),
        directives: extractNestedDirecties(directives, key)
      };
  }

  return {
    data: data,
    directives: directive
  };
}

function extractNestedDirecties(directives, key) {
  var extracted = {};
  var prefix = key + '.';
  for (var k in directives) {
    if (k.indexOf(prefix) === 0) {
      var suffix = k.substr(prefix.length);
      extracted[suffix] = directives[k];
    }
  }
  return extracted;
}

function resolveKeys(obj, data) {
  var resolved = {};
  for (var key in obj) {
    resolved[key] = (typeof obj[key] === 'function')
      ? obj[key].call(this, data, key)
      : obj[key];
  }
  return resolved;
}

function getAttributeValue(value, name, original) {
  switch (name) {

    case 'class':
      // console.log('@class:', value, name, original);
      var classes = original
        ? boolMap(original.trim().split(/\s+/))
        : {};
      if (Array.isArray(value)) {
        value.forEach(function(klass) {
          classes[klass] = true;
        });
      } else if (isObject(value)) {
        for (var klass in value) {
          classes[klass] = value[klass];
        }
      } else if (value) {
        classes[value] = true;
      }
      return Object.keys(classes)
        .filter(function(klass) { return !!classes[klass]; })
        .join(' ');

    case 'style':
      // FIXME
      if (isObject(value)) {
        return objectToStyle(value);
      }
      break;

  }

  return value;
}

function objectToStyle(value) {
  return Object.keys(value).reduce(function(list, key) {
    var v = value[key];
    if (v !== null && v !== undefined) {
      if (list.length) list.push(' ');
      list.push(key, ': ', v, ';');
    }
    return list;
  }, []).join('');
}

function isObject(data) {
  return data && typeof data === 'object';
}

function isScalar(data) {
  return data === null
      || typeof data === 'string'
      || typeof data === 'number'
      || typeof data === 'boolean';
}

function noop() { }

function boolMap(values) {
  return values.reduce(function(map, value) {
    return map[value] = true, map;
  }, {});
}

function debug() {
  if (module.exports.debug) {
    console.warn.apply(console, arguments);
  }
}

module.exports = function patchRoot(node, onlyChildren) {
  switch (node.nodeType) {
    case 1: // element node
      return elementPatcher(node, onlyChildren);

    case 3: // text node
      return textPatcher(node);
  }

  return noop;
};


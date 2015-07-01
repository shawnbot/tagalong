(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.tagalong = require('./');

},{"./":2}],2:[function(require,module,exports){
module.exports = (function() {

  const SELF_KEY = '.';
  const ARRAY_TEMPLATE = '__array_template__';
  const NODE_POSITION = '__node_position__';

  var tagalong = function(node, data, directives, key) {
    if (typeof node === 'string') {
      node = (tagalong.document || document).querySelector(node);
    }

    // use nodeType as a sentinel for element objects
    if (!node || 'object' !== typeof node || !node.nodeType) {
      throw new Error('Expected a node, got: "' + (typeof node) + '"');
    }

    // console.log('tagalong(', node.nodeName, data, directives, key, ')');
    switch (typeof data) {
      case 'object':
        if (Array.isArray(data)) {
          return tagalong.array(node, data, directives, key);
        } else if (data) {
          return tagalong.object(node, data, directives, key);
        } else { // null
          break;
        }

      case 'string':
      case 'number':
        return tagalong.scalar(node, data, directives, key);

      case 'boolean':
        return tagalong.bool(node, data, directives, key);

      case 'function':
        return tagalong.func(node, data, directives, key);
    }

    return tagalong.nil(node, data, directives, key);
  };

  tagalong.object = function(node, data, directives, key) {
    // console.log('object(', node.nodeName, data, directives, key, ')');

    data = tagalong.interpolate(node, data || {}, directives);
    if (data) applyAttributes(node, data);
    if (!directives) directives = {};

    var k;
    walk(node, function matchKey(el) {
      var stop = false;
      if (el.hasAttribute('data-bind')) {
        k = el.getAttribute('data-bind');
        stop = tagalong(el, data[k], directives[k], k);

      } else if (el.hasAttribute('class')) {
        for (k in data) {
          if (hasClass(el, k)) {
            stop = tagalong(el, data[k], directives[k], k);
            break; // XXX
          }
        }
        for (k in directives) {
          if (typeof directives[k] === 'object' && hasClass(el, k)) {
            // console.log('bind directive:', k, directives[k], data);
            stop = tagalong(el, data[k] || data, directives[k], k);
            break; // XXX
          }
        }
      }
      if (stop) {
        throw new tagalong.StopRecursion(el, 'bound to data');
      }
    });
    return node;
  };

  tagalong.array = function(node, data, directives, key) {
    // console.log('array(', node.nodeName, data, directives, key, ')');
    if (!directives) directives = {};

    var template = getArrayTemplate(node, key);
    if (template) {
      // console.log('template:', template.outerHTML);
      var position = getNodePosition(template);
      var nodes = getArrayNodes(template);
      // console.log('%d nodes:', data.length, nodes.map(function(d) { return d.outerHTML; }));
      var parent = position.parentNode;
      var next = position.nextSibling;
      var len = Math.max(data.length, nodes.length);
      for (var i = 0; i < len; i++) {
        var n = nodes[i];
        var d = data[i];
        if (n && empty(d)) {
          // console.log('- remove:', n.outerHTML);
          n.parentNode.removeChild(n);
          continue;
        } else if (d && !n) {
          n = template.cloneNode(true);
          // console.log('+ create:', n.outerHTML);
          parent.insertBefore(n, next);
        }
        // console.log('> %s => %s', n.outerHTML, JSON.stringify(d));
        tagalong(n, d, key ? directives[key] : directives);
      }
    }
    return node;
  };

  tagalong.scalar = function(node, data, directives, key) {
    // console.log('scalar(', node.nodeName, data, directives, key, ')');
    node.textContent = String(data);
    if (typeof directives === 'object') {
      tagalong.object(node, {}, directives);
    }
    return node;
  };

  tagalong.bool = function(node, data, directives) {
    // console.log('bool(', node.nodeName, data, directives, ')');
    // TODO
    return node;
  };

  tagalong.nil = function(node, data, directives) {
    // console.log('nil(', node.nodeName, data, directives, ')');
    // TODO
    return node;
  };

  tagalong.interpolate = function(node, data, directives) {
    if (!directives) {
      return data;
    }

    var result = extend({}, data);

    for (var key in directives) {
      var directive = directives[key];
      var attr = key.charAt(0) === '@' ? key.substr(1) : null;
      var value;

      switch (typeof directive) {
        case 'string':
        case 'number':
          // console.log('( string interpolation )', data);
          value = data[directive];
          break;

        case 'function':
          // console.log('( function interpolation )');
          value = directive.call(node, data, key);
          break;

        case 'boolean':
          // console.log('( boolean interpolation )');
          if (attr && directive) {
            value = data[attr];
          }
          break;

        // case 'object':
        // break;

        default:
          continue;
      }

      // console.log('interpolate: {"%s": %s} -> %s', key, typeof directive, JSON.stringify(value));
      result[key] = value;
    }

    // console.log('  interpolated:', result);
    return result;
  };

  tagalong.StopRecursion = function(node, message) {
    this.node = node;
    this.message = message;
  };

  return tagalong;

  function applyAttributes(node, data) {
    for (var key in data) {
      if (key === 'text') {
        node.textContent = String(data[key]);
      } else if (String(key).charAt(0) === '@') {
        var attr = key.substr(1);
        var value = data[key];
        if (false === value || empty(value)) {
          node.removeAttribute(attr);
        } else {
          node.setAttribute(attr, String(value));
        }
      }
    }
  }

  function getArrayTemplate(node, key) {
    if (node[ARRAY_TEMPLATE]) return node[ARRAY_TEMPLATE];
    if (!key) key = SELF_KEY;

    var template = walk(node, function matchArrayTemplate(el) {
      if (el.getAttribute('data-each') === key) {
        return el;
      } else if (el.getAttribute('data-bind') === key) {
        return el;
      } else {
        // console.log('skipping:', el.outerHTML);
      }
    }, true) || getFirstChild(node);

    if (template) {
      // console.log('template for %s : %s', node.nodeName, template.outerHTML);
      return node[ARRAY_TEMPLATE] = template;
    }
  }

  function storeNodePosition(node) {
    return node[NODE_POSITION] = {
      parentNode: node.parentNode,
      nextSibling: getNextSibling(node)
    };
  }

  function getNodePosition(node) {
    return node[NODE_POSITION] || storeNodePosition(node);
  }

  function getArrayNodes(template) {
    if (template.parentNode) {
      var nodes = [template];
      var each = template.getAttribute('data-each');
      var sibling;
      var test = function(n) {
        return n.getAttribute('data-each') === each;
      };
      while (sibling = getNextSibling(template, test)) {
        nodes.push(sibling);
      }
      return nodes;
    } else {
      return [];
    }
  }

  function getFirstChild(node, test) {
    for (var child = node.firstChild; child; child = child.nextSibling) {
      if (child.nodeType === 1) {
        if (!test || test(child)) return child;
      }
    }
  }

  function getNextSibling(node, test) {
    for (var sibling = node.nextSibling; sibling; sibling = sibling.nextSibling) {
      if (sibling.nodeType === 1) {
        if (!test || test(sibling)) return sibling;
        else if (test) break;
      }
    }
  }

  function empty(value) {
    return value === null
        || value === ''
        || typeof value === 'undefined';
  }

  function walk(node, func, self, depth) {
    var log = function() {
      var args = [repeat('+-', depth)].concat([].slice.call(arguments));
      return console.log.apply(console, args);
    };

    // log('walk(', self, '):', node.outerHTML);

    var result;
    if (self === true) {
      result = run(node);
    }
    if (!result) {
      for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType !== 1) continue;
        // log('  node:', child.nodeType, child.outerHTML || child.nodeValue);
        result = run(child);
        if (result) break;
      }
    }
    return result;

    function run(el) {
      // log('test():', el.nodeName, func.name);
      try {
        var result = func(el);
      } catch (error) {
        if (error instanceof tagalong.StopRecursion) {
          return;
        } else {
          throw error;
        }
      }
      if (typeof result !== 'undefined') {
        // log('==', typeof result);
        return result;
      } else {
        return walk(el, func, false, depth + 1);
      }
    }
  }

  function extend(obj) {
    for (var i = 1; i < arguments.length; i++) {
      var o = arguments[i];
      if (!o) continue;
      for (var k in o) obj[k] = o[k];
    }
    return obj;
  }

  function hasClass(node, klass) {
    return node.classList
      ? node.classList.contains(klass)
      : node.className.split(/\s+/).indexOf(klass) > -1;
  }

  function repeat(str, len) {
    if (!len) return '';
    var chr = str;
    for (var i = 1; i < len; i++) str += chr;
    return str;
  }

})();

},{}]},{},[1]);

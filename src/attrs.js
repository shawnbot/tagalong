var constants = require('./constants');
var T_PREFIX = constants.T.PREFIX;
var CONTROL_ATTRS = constants.CONTROL_ATTRS;

var ns = require('./ns');
var util = require('./util');
var defined = util.defined;

module.exports.getAttributeMap = function(node) {
  var map = {};
  var attrs = node.attributes;
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    var name = ns.qualify(attr.name);
    var localName = name.localName;
    var value = attr.value;
    if (localName.indexOf(T_PREFIX) === 0) {
      localName = localName.substr(T_PREFIX.length);
      if (CONTROL_ATTRS.indexOf(localName) > -1) {
        continue;
      }
      value = util.compileExpression(value);
    }
    var qname = name.prefix
      ? name.prefix + ':' + localName
      : localName;
    map[qname] = value;
  }
  return map;
};

module.exports.interpolateAttributes = function(attrMap, data) {
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
};

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./src');

},{"./src":14}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
/**
 * @license
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var patch = require('./src/patch').patch;
var elements = require('./src/virtual_elements');

module.exports = {
  patch: patch,
  elementVoid: elements.elementVoid,
  elementOpenStart: elements.elementOpenStart,
  elementOpenEnd: elements.elementOpenEnd,
  elementOpen: elements.elementOpen,
  elementClose: elements.elementClose,
  text: elements.text,
  attr: elements.attr
};


},{"./src/patch":8,"./src/virtual_elements":11}],4:[function(require,module,exports){
/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var nodes = require('./nodes'),
    createNode = nodes.createNode,
    getKey = nodes.getKey,
    getNodeName = nodes.getNodeName,
    getChild = nodes.getChild,
    registerChild = nodes.registerChild;
var markVisited = require('./traversal').markVisited;
var getWalker = require('./walker').getWalker;


/**
 * Checks whether or not a given node matches the specified nodeName and key.
 *
 * @param {?Node} node An HTML node, typically an HTMLElement or Text.
 * @param {?string} nodeName The nodeName for this node.
 * @param {?string} key An optional key that identifies a node.
 * @return {boolean} True if the node matches, false otherwise.
 */
var matches = function(node, nodeName, key) {
  return node &&
         key === getKey(node) &&
         nodeName === getNodeName(node);
};


/**
 * Aligns the virtual Element definition with the actual DOM, moving the
 * corresponding DOM node to the correct location or creating it if necessary.
 * @param {?string} nodeName For an Element, this should be a valid tag string.
 *     For a Text, this should be #text.
 * @param {?string} key The key used to identify this element.
 * @param {?Array<*>|string} statics For an Element, this should be an array of
 *     name-value pairs. For a Text, this should be the text content of the
 *     node.
 * @return {!Node} The matching node.
 */
var alignWithDOM = function(nodeName, key, statics) {
  var walker = getWalker();
  var currentNode = walker.currentNode;
  var parent = walker.getCurrentParent();
  var matchingNode;

  // Check to see if we have a node to reuse
  if (matches(currentNode, nodeName, key)) {
    matchingNode = currentNode;
  } else {
    var existingNode = key && getChild(parent, key);

    // Check to see if the node has moved within the parent or if a new one
    // should be created
    if (existingNode) {
      matchingNode = existingNode;
    } else {
      matchingNode = createNode(walker.doc, nodeName, key, statics);
      registerChild(parent, key, matchingNode);
    }

    parent.insertBefore(matchingNode, currentNode);
    walker.currentNode = matchingNode;
  }

  markVisited(parent, matchingNode);

  return matchingNode;
};


/** */
module.exports = {
  alignWithDOM: alignWithDOM
};


},{"./nodes":7,"./traversal":9,"./walker":12}],5:[function(require,module,exports){
/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var getData = require('./node_data').getData;


/**
 * Applies an attribute or property to a given Element. If the value is a object
 * or a function (which includes null), it is set as a property on the Element.
 * Otherwise, the value is set as an attribute.
 * @param {!Element} el
 * @param {string} name The attribute's name.
 * @param {*} value The attribute's value. If the value is a string, it is set
 *     as an HTML attribute, otherwise, it is set on node.
 */
var applyAttr = function(el, name, value) {
  var data = getData(el);
  var attrs = data.attrs;

  if (attrs[name] === value) {
    return;
  }

  var type = typeof value;

  if (value === undefined) {
    el.removeAttribute(name);
  } else if (type === 'object' || type === 'function') {
    el[name] = value;
  } else {
    el.setAttribute(name, value);
  }

  attrs[name] = value;
};


/**
 * Applies a style to an Element. No vendor prefix expansion is done for
 * property names/values.
 * @param {!Element} el
 * @param {string|Object<string,string>} style The style to set. Either a string
 *     of css or an object containing property-value pairs.
 */
var applyStyle = function(el, style) {
  if (typeof style === 'string' || style instanceof String) {
    el.style.cssText = style;
  } else {
    el.style.cssText = '';

    for (var prop in style) {
      el.style[prop] = style[prop];
    }
  }
};


/**
 * Updates a single attribute on an Element. For some types (e.g. id or class),
 * the value is applied directly to the Element using the corresponding accessor
 * function.
 * @param {!Element} el
 * @param {string} name The attribute's name.
 * @param {*} value The attribute's value. If the value is a string, it is set
 *     as an HTML attribute, otherwise, it is set on node.
 */
var updateAttribute = function(el, name, value) {
  switch (name) {
    case 'id':
      el.id = value;
      break;
    case 'class':
      el.className = value;
      break;
    case 'tabindex':
      el.tabIndex = value;
      break;
    case 'style':
      applyStyle(el, value);
      break;
    default:
      applyAttr(el, name, value);
      break;
  }
};


/** */
module.exports = {
  updateAttribute: updateAttribute
};


},{"./node_data":6}],6:[function(require,module,exports){
/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * Keeps track of information needed to perform diffs for a given DOM node.
 * @param {?string} nodeName
 * @param {?string} key
 * @constructor
 */
function NodeData(nodeName, key) {
  /**
   * The attributes and their values.
   * @const
   */
  this.attrs = {};

  /**
   * An array of attribute name/value pairs, used for quickly diffing the
   * incomming attributes to see if the DOM node's attributes need to be
   * updated.
   * @const {Array<*>}
   */
  this.attrsArr = [];

  /**
   * The incoming attributes for this Node, before they are updated.
   * @const {!Object<string, *>}
   */
  this.newAttrs = {};

  /**
   * The key used to identify this node, used to preserve DOM nodes when they
   * move within their parent.
   * @const
   */
  this.key = key;

  /**
   * Keeps track of children within this node by their key.
   * {?Object<string, Node>}
   */
  this.keyMap = null;

  /**
   * The last child to have been visited within the current pass.
   * {?Node}
   */
  this.lastVisitedChild = null;

  /**
   * The node name for this node.
   * @const
   */
  this.nodeName = nodeName;

  /**
   * @const {string}
   */
  this.text = null;
}


/**
 * Initializes a NodeData object for a Node.
 *
 * @param {!Node} node The node to initialze data for.
 * @param {string} nodeName The node name of node.
 * @param {?string} key The key that identifies the node.
 * @return {!NodeData} The newly initialized data object
 */
var initData = function(node, nodeName, key) {
  var data = new NodeData(nodeName, key);
  node['__incrementalDOMData'] = data;
  return data;
};


/**
 * Retrieves the NodeData object for a Node, creating it if necessary.
 *
 * @param {!Node} node The node to retrieve the data for.
 * @return {NodeData} The NodeData for this Node.
 */
var getData = function(node) {
  var data = node['__incrementalDOMData'];

  if (!data) {
    var nodeName = node.nodeName.toLowerCase();
    var key = null;

    if (node instanceof Element) {
      key = node.getAttribute('key');
    }

    data = initData(node, nodeName, key);
  }

  return data;
};


/** */
module.exports = {
  getData: getData,
  initData: initData
};


},{}],7:[function(require,module,exports){
/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var updateAttribute = require('./attributes').updateAttribute;
var nodeData = require('./node_data'),
    getData = nodeData.getData,
    initData = nodeData.initData;


/**
 * Creates an Element.
 * @param {!Document} doc The document with which to create the Element.
 * @param {string} tag The tag for the Element.
 * @param {?string} key A key to identify the Element.
 * @param {?Array<*>} statics An array of attribute name/value pairs of
 *     the static attributes for the Element.
 * @return {!Element}
 */
var createElement = function(doc, tag, key, statics) {
  var el = doc.createElement(tag);
  initData(el, tag, key);

  if (statics) {
    for (var i = 0; i < statics.length; i += 2) {
      updateAttribute(el, statics[i], statics[i + 1]);
    }
  }

  return el;
};

/**
 * Creates a Text.
 * @param {!Document} doc The document with which to create the Text.
 * @param {string} text The intial content of the Text.
 * @return {!Text}
 */
var createTextNode = function(doc, text) {
  var node = doc.createTextNode(text);
  getData(node).text = text;

  return node;
};


/**
 * Creates a Node, either a Text or an Element depending on the node name
 * provided.
 * @param {!Document} doc The document with which to create the Node.
 * @param {string} nodeName The tag if creating an element or #text to create
 *     a Text.
 * @param {?string} key A key to identify the Element.
 * @param {?Array<*>|string} statics The static data to initialize the Node
 *     with. For an Element, an array of attribute name/value pairs of
 *     the static attributes for the Element. For a Text, a string with the
 *     intial content of the Text.
 * @return {!Node}
 */
var createNode = function(doc, nodeName, key, statics) {
  if (nodeName === '#text') {
    return createTextNode(doc, statics);
  }

  return createElement(doc, nodeName, key, statics);
};


/**
 * Creates a mapping that can be used to look up children using a key.
 * @param {!Element} el
 * @return {!Object<string, !Node>} A mapping of keys to the children of the
 *     Element.
 */
var createKeyMap = function(el) {
  var map = {};
  var children = el.children;
  var count = children.length;

  for (var i = 0; i < count; i += 1) {
    var child = children[i];
    var key = getKey(child);

    if (key) {
      map[key] = child;
    }
  }

  return map;
};


/**
 * @param {?Node} node A node to get the key for.
 * @return {?string} The key for the Node, if applicable.
 */
var getKey = function(node) {
  return getData(node).key;
};


/**
 * @param {?Node} node A node to get the node name for.
 * @return {?string} The node name for the Node, if applicable.
 */
var getNodeName = function(node) {
  return getData(node).nodeName;
};


/**
 * Retrieves the mapping of key to child node for a given Element, creating it
 * if necessary.
 * @param {!Element} el
 * @return {!Object<string,!Node>} A mapping of keys to child Nodes
 */
var getKeyMap = function(el) {
  var data = getData(el);

  if (!data.keyMap) {
    data.keyMap = createKeyMap(el);
  }

  return data.keyMap;
};


/**
 * Retrieves a child from the parent with the given key.
 * @param {!Element} parent
 * @param {?string} key
 * @return {?Node} The child corresponding to the key.
 */
var getChild = function(parent, key) {
  return getKeyMap(parent)[key];
};


/**
 * Registers a node as being a child. If a key is provided, the parent will
 * keep track of the child using the key. The child can be retrieved using the
 * same key using getKeyMap. The provided key should be unique within the
 * parent Element.
 * @param {!Element} parent The parent of child.
 * @param {?string} key A key to identify the child with.
 * @param {!Node} child The child to register.
 */
var registerChild = function(parent, key, child) {
  if (key) {
    getKeyMap(parent)[key] = child;
  }
};


/** */
module.exports = {
  createNode: createNode,
  getKey: getKey,
  getNodeName: getNodeName,
  getChild: getChild,
  registerChild: registerChild
};


},{"./attributes":5,"./node_data":6}],8:[function(require,module,exports){
/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var traversal = require('./traversal'),
    firstChild = traversal.firstChild,
    parentNode = traversal.parentNode;
var TreeWalker = require('./tree_walker');
var walker = require('./walker'),
    getWalker = walker.getWalker,
    setWalker = walker.setWalker;


/**
 * Patches the document starting at el with the provided function. This function
 * may be called during an existing patch operation.
 * @param {!Element} el the element to patch
 * @param {!function} fn A function containing elementOpen/elementClose/etc.
 *     calls that describe the DOM.
 */
var patch = function(el, fn) {
  var prevWalker = getWalker();
  setWalker(new TreeWalker(el));

  firstChild();
  fn();
  parentNode();

  setWalker(prevWalker);
};


/** */
module.exports = {
  patch: patch
};


},{"./traversal":9,"./tree_walker":10,"./walker":12}],9:[function(require,module,exports){
/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var getWalker = require('./walker').getWalker;
var getData = require('./node_data').getData;


/**
 * Enters a Element, clearing out the last visited child field.
 * @param {!Element} node
 */
var enterNode = function(node) {
  var data = getData(node);
  data.lastVisitedChild = null;
};


/**
 * Clears out any unvisited Nodes, as the corresponding virtual element
 * functions were never called for them.
 * @param {!Element} node
 */
var exitNode = function(node) {
  var data = getData(node);
  var lastVisitedChild = data.lastVisitedChild;

  if (node.lastChild === lastVisitedChild) {
    return;
  }

  while (node.lastChild !== lastVisitedChild) {
    node.removeChild(node.lastChild);
  }

  // Invalidate the key map since we removed children. It will get recreated
  // next time we need it.
  data.keyMap = null;
};


/**
 * Marks a parent as having visited a child.
 * @param {!Element} parent
 * @param {!Node} child
 */
var markVisited = function(parent, child) {
  var data = getData(parent);
  data.lastVisitedChild = child;
};


/**
 * Changes to the first child of the current node.
 */
var firstChild = function() {
  var walker = getWalker();
  enterNode(walker.currentNode);
  walker.firstChild();
};


/**
 * Changes to the next sibling of the current node.
 */
var nextSibling = function() {
  var walker = getWalker();
  walker.nextSibling();
};


/**
 * Changes to the parent of the current node, removing any unvisited children.
 */
var parentNode = function() {
  var walker = getWalker();
  walker.parentNode();
  exitNode(walker.currentNode);
};


/** */
module.exports = {
  firstChild: firstChild,
  nextSibling: nextSibling,
  parentNode: parentNode,
  markVisited: markVisited
};


},{"./node_data":6,"./walker":12}],10:[function(require,module,exports){
/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Similar to the built-in Treewalker class, but simplified and allows direct
 * access to modify the currentNode property.
 * @param {!Node} node The root Node of the subtree the walker should start
 *     traversing.
 * @constructor
 */
function TreeWalker(node) {
  /**
   * Keeps track of the current parent node. This is necessary as the traversal
   * methods may traverse past the last child and we still need a way to get
   * back to the parent.
   * @const @private {!Array<!Node>}
   */
  this.stack_ = [];

  /** {?Node} */
  this.currentNode = node;

  /** {!Document} */
  this.doc = node.ownerDocument;
}


/**
 * @return {!Node} The current parent of the current location in the subtree.
 */
TreeWalker.prototype.getCurrentParent = function() {
  return this.stack_[this.stack_.length - 1];
};


/**
 * Changes the current location the firstChild of the current location.
 */
TreeWalker.prototype.firstChild = function() {
  this.stack_.push(this.currentNode);
  this.currentNode = this.currentNode.firstChild;
};


/**
 * Changes the current location the nextSibling of the current location.
 */
TreeWalker.prototype.nextSibling = function() {
  this.currentNode = this.currentNode.nextSibling;
};


/**
 * Changes the current location the parentNode of the current location.
 */
TreeWalker.prototype.parentNode = function() {
  this.currentNode = this.stack_.pop();
};


/** */
module.exports = TreeWalker;


},{}],11:[function(require,module,exports){
(function (process){
/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var alignWithDOM = require('./alignment').alignWithDOM;
var updateAttribute = require('./attributes').updateAttribute;
var getData = require('./node_data').getData;
var getWalker = require('./walker').getWalker;
var traversal = require('./traversal'),
    firstChild = traversal.firstChild,
    nextSibling = traversal.nextSibling,
    parentNode = traversal.parentNode;


/**
 * The offset in the virtual element declaration where the attributes are
 * specified.
 * @const
 */
var ATTRIBUTES_OFFSET = 3;


/**
 * Builds an array of arguments for use with elementOpenStart, attr and
 * elementOpenEnd.
 * @type {Array<*>}
 * @const
 */
var argsBuilder = [];


if (process.env.NODE_ENV !== 'production') {
  /**
   * Keeps track whether or not we are in an attributes declaration (after
   * elementOpenStart, but before elementOpenEnd).
   * @type {boolean}
   */
  var inAttributes = false;


  /** Makes sure that the caller is not where attributes are expected. */
  var assertNotInAttributes = function() {
    if (inAttributes) {
      throw new Error('Was not expecting a call to attr or elementOpenEnd, ' +
          'they must follow a call to elementOpenStart.');
    }
  };


  /** Makes sure that the caller is where attributes are expected. */
  var assertInAttributes = function() {
    if (!inAttributes) {
      throw new Error('Was expecting a call to attr or elementOpenEnd. ' +
          'elementOpenStart must be followed by zero or more calls to attr, ' +
          'then one call to elementOpenEnd.');
    }
  };


  /** Updates the state to being in an attribute declaration. */
  var setInAttributes = function() {
    inAttributes = true;
  };


  /** Updates the state to not being in an attribute declaration. */
  var setNotInAttributes = function() {
    inAttributes = false;
  };
}


/**
 * Checks to see if one or more attributes have changed for a given
 * Element. When no attributes have changed, this function is much faster than
 * checking each individual argument. When attributes have changed, the overhead
 * of this function is minimal.
 *
 * This function is called in the context of the Element and the arguments from
 * elementOpen-like function so that the arguments are not de-optimized.
 *
 * @this {Element} The Element to check for changed attributes.
 * @param {*} unused1
 * @param {*} unused2
 * @param {*} unused3
 * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
 *     for the Element.
 * @return {boolean} True if the Element has one or more changed attributes,
 *     false otherwise.
 */
var hasChangedAttrs = function(unused1, unused2, unused3, var_args) {
  var data = getData(this);
  var attrsArr = data.attrsArr;
  var attrsChanged = false;
  var i;

  for (i = ATTRIBUTES_OFFSET; i < arguments.length; i += 2) {
    // Translate the from the arguments index (for values) to the attribute's
    // ordinal. The attribute values are at arguments index 3, 5, 7, etc. To get
    // the ordinal, need to subtract the offset and divide by 2
    if (attrsArr[(i - ATTRIBUTES_OFFSET) >> 1] !== arguments[i + 1]) {
      attrsChanged = true;
      break;
    }
  }

  if (attrsChanged) {
    for (i = ATTRIBUTES_OFFSET; i < arguments.length; i += 2) {
      attrsArr[(i - ATTRIBUTES_OFFSET) >> 1] = arguments[i + 1];
    }
  }

  return attrsChanged;
};


/**
 * Updates the newAttrs object for an Element.
 *
 * This function is called in the context of the Element and the arguments from
 * elementOpen-like function so that the arguments are not de-optimized.
 *
 * @this {Element} The Element to update newAttrs for.
 * @param {*} unused1
 * @param {*} unused2
 * @param {*} unused3
 * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
 *     for the Element.
 * @return {!Object<string, *>} The updated newAttrs object.
 */
var updateNewAttrs = function(unused1, unused2, unused3, var_args) {
  var node = this;
  var data = getData(node);
  var newAttrs = data.newAttrs;

  for (var attr in newAttrs) {
    newAttrs[attr] = undefined;
  }

  for (var i = ATTRIBUTES_OFFSET; i < arguments.length; i += 2) {
    newAttrs[arguments[i]] = arguments[i + 1];
  }

  return newAttrs;
};


/**
 * Updates the attributes for a given Element.
 * @param {!Element} node
 * @param {!Object<string,*>} newAttrs The new attributes for node
 */
var updateAttributes = function(node, newAttrs) {
  for (var attr in newAttrs) {
    updateAttribute(node, attr, newAttrs[attr]);
  }
};


/**
 * Declares a virtual Element at the current location in the document. This
 * corresponds to an opening tag and a elementClose tag is required.
 * @param {string} tag The element's tag.
 * @param {?string} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {?Array<*>} statics An array of attribute name/value pairs of the
 *     static attributes for the Element. These will only be set once when the
 *     Element is created.
 * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
 *     for the Element.
 */
var elementOpen = function(tag, key, statics, var_args) {
  if (process.env.NODE_ENV !== 'production') {
    assertNotInAttributes();
  }

  var node = alignWithDOM(tag, key, statics);

  if (hasChangedAttrs.apply(node, arguments)) {
    var newAttrs = updateNewAttrs.apply(node, arguments);
    updateAttributes(node, newAttrs);
  }

  firstChild();
};


/**
 * Declares a virtual Element at the current location in the document. This
 * corresponds to an opening tag and a elementClose tag is required. This is
 * like elementOpen, but the attributes are defined using the attr function
 * rather than being passed as arguments. Must be folllowed by 0 or more calls
 * to attr, then a call to elementOpenEnd.
 * @param {string} tag The element's tag.
 * @param {?string} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {?Array<*>} statics An array of attribute name/value pairs of the
 *     static attributes for the Element. These will only be set once when the
 *     Element is created.
 */
var elementOpenStart = function(tag, key, statics) {
  if (process.env.NODE_ENV !== 'production') {
    assertNotInAttributes();
    setInAttributes();
  }

  argsBuilder[0] = tag;
  argsBuilder[1] = key;
  argsBuilder[2] = statics;
  argsBuilder.length = ATTRIBUTES_OFFSET;
};


/***
 * Defines a virtual attribute at this point of the DOM. This is only valid
 * when called between elementOpenStart and elementOpenEnd.
 *
 * @param {string} name
 * @param {*} value
 */
var attr = function(name, value) {
  if (process.env.NODE_ENV !== 'production') {
    assertInAttributes();
  }

  argsBuilder.push(name, value);
};


/**
 * Closes an open tag started with elementOpenStart.
 */
var elementOpenEnd = function() {
  if (process.env.NODE_ENV !== 'production') {
    assertInAttributes();
    setNotInAttributes();
  }

  elementOpen.apply(null, argsBuilder);
};


/**
 * Closes an open virtual Element.
 *
 * @param {string} tag The element's tag.
 */
var elementClose = function(tag) {
  if (process.env.NODE_ENV !== 'production') {
    assertNotInAttributes();
  }

  parentNode();
  nextSibling();
};


/**
 * Declares a virtual Element at the current location in the document that has
 * no children.
 * @param {string} tag The element's tag.
 * @param {?string} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {?Array<*>} statics An array of attribute name/value pairs of the
 *     static attributes for the Element. These will only be set once when the
 *     Element is created.
 * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
 *     for the Element.
 */
var elementVoid = function(tag, key, statics, var_args) {
  if (process.env.NODE_ENV !== 'production') {
    assertNotInAttributes();
  }

  elementOpen.apply(null, arguments);
  elementClose.apply(null, arguments);
};


/**
 * Declares a virtual Text at this point in the document.
 *
 * @param {string} value The text of the Text.
 */
var text = function(value) {
  if (process.env.NODE_ENV !== 'production') {
    assertNotInAttributes();
  }

  var node = alignWithDOM('#text', null, value);
  var data = getData(node);

  if (data.text !== value) {
    node.data = value;
    data.text = value;
  }

  nextSibling();
};


/** */
module.exports = {
  elementOpenStart: elementOpenStart,
  elementOpenEnd: elementOpenEnd,
  elementOpen: elementOpen,
  elementVoid: elementVoid,
  elementClose: elementClose,
  text: text,
  attr: attr
};


}).call(this,require('_process'))
},{"./alignment":4,"./attributes":5,"./node_data":6,"./traversal":9,"./walker":12,"_process":2}],12:[function(require,module,exports){
/**
 * Copyright 2015 The Incremental DOM Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @type {TreeWalker}
 */
var walker_;


/**
 * @return {TreeWalker} the current TreeWalker
 */
var getWalker = function() {
  return walker_;
};


/**
 * Sets the current TreeWalker
 * @param {TreeWalker} walker
 */
var setWalker = function(walker) {
  walker_ = walker;
};


/** */
module.exports = {
  getWalker: getWalker,
  setWalker: setWalker
};


},{}],13:[function(require,module,exports){
window.tagalong = require('../');

},{"../":1}],14:[function(require,module,exports){
var dom = require('incremental-dom');

var VOID_ELEMENTS = 'area base br col command embed hr img input keygen link meta param source track wbr'.split(' ');

module.exports = {
  compile: compile,
  /**
   * Bind data (with optional directives) to a node, and return a function that
   * can be used to rebind data to the same node.
   *
   * @example
   * var rebind = tagalong.bind('.template', data);
   * // later
   * rebind(otherData);
   *
   * @param {Node|String} node
   * @param {*}           data
   * @param {Object?}     directives
   */
  bind: function(node, data, directives) {
    var template = compile(node, directives);
    template(node, data);
    return function rebind(d) {
      return template(node, d || data);
    };
  }
};

/**
 * Compile a node (or CSS selector) and optional directives into a template
 * function. The source node is cloned once so that repeated bindings follow
 * the original template structure, rather than the one generated by previous
 * data bindings.
 *
 * @example
 * var template = tagalong.compile('.template');
 * template('.results', {});
 *
 * @param {Node|String} source
 * @param {Object?}     directives
 * @return {Function}   a template function that takes a target node and data
 */
function compile(source, directives) {
  if (typeof source === 'string') {
    source = document.querySelector(source);
  }
  if (!source) return noop;
  var template = binder(source.cloneNode(true), directives);
  return function(target, data) {
    if (typeof target === 'string') {
      target = document.querySelector(target);
    }
    if (!target) return null;
    // console.log('patching:', data, '-->', target);
    console.time('patch');
    var result = dom.patch(target, template(data));
    console.timeEnd('patch');
    return result;
  };
}

function binder(node, directives) {
  return function(data) {
    return function() {
      bindChildren(node, data, directives);
    };
  };
}

function bind(node, data, directives) {
  // console.log('bind:', data, '->', node, directives);
  if (Array.isArray(data)) {
    return bindArray(node, data, directives);
  } else if (data === false) {
    // only strictly false data causes an element to be skipped
    return;
  }

  var name = node.nodeName.toLowerCase();
  var attrs = interpolateAttributes(node, data, directives);
  var isVoid = VOID_ELEMENTS.indexOf(name) > -1;
  if (isVoid) {
    dom.elementVoid(name, '', attrs);
    return;
  }

  dom.elementOpen(name, '', attrs);
  switch (typeof data) {
    case 'string':
    case 'number':
      bindScalar(node, data, directives);
      break;

    case 'boolean':
    case 'object':
      // console.log('binding children:', data, '-->', node.childNodes);
      bindChildren(node, data, directives);
      break;
  }
  dom.elementClose(name);
}

function bindChildren(node, data, directives) {
  var values = interpolateData.call(node, data, directives);
  var key;
  for (var child = node.firstChild; child; child = child.nextSibling) {
    // console.log('child:', child);
    if (child.nodeType !== Node.ELEMENT_NODE) {
      if (child.nodeType === Node.TEXT_NODE) {
        dom.text(child.nodeValue);
      }
      continue;
    } else if (child.hasAttribute('data-if')) {
      key = child.getAttribute('data-if');
      var not = key.charAt(0) === '!'
        ? (key = key.substr(1), true)
        : false;
      var v = access.call(child, key, data);
      if (not ? v : !v) continue;
    }

    if (child.hasAttribute('data-each')) {
      key = child.getAttribute('data-each');
      var list = coalesce(data[key], directives[key]);
      if (Array.isArray(list)) {
        // console.log('bind array:', list, '->', child, directives[key]);
        bindArray(child, list, directives[key]);
      }
    } else if (child.hasAttribute('data-bind')) {
      key = child.getAttribute('data-bind');
      var v = access.call(child, key, data);
      var value = coalesce(v, directives[key]);
      bind(child, value, directives ? directives[key] : {});
    } else {
      bind(child, data, directives);
    }
  }
}

function bindArray(node, list, directives) {
  list.forEach(function(d) {
    bind(node, d, directives);
  });
}

function bindScalar(node, data, directives) {
  var target = node.querySelector('[data-bind="."]');
  if (target) {
    return bind(node, {'.': data}, directives);
  }

  if (typeof directives === 'function') {
    data = directives.call(node, data);
  }
  var text = stringify(data);
  dom.text(text);
}

function interpolateData(data, directives) {
  var result = extend({}, data);
  if (directives && typeof directives === 'object') {
    for (var key in directives) {
      if (key.charAt(0) === '@') continue;
      if (result.hasOwnProperty(key)) {
        if (typeof directives[key] === 'function') {
          result[key] = Array.isArray(result[key])
            ? result[key].map(directives[key], this)
            : access.call(this, directives[key], data, key);
        }
      } else {
        result[key] = directives[key];
      }
    }
  }
  return result;
}

function interpolateAttributes(node, data, directives) {
  if (!directives || typeof directives !== 'object') {
    return [];
  }
  var attrs = {};
  for (var attr in node.attributes) {
    attrs[attr.name] = attr.value;
  }
  for (var key in directives) {
    if (key.charAt(0) === '@') {
      attrs[key.substr(1)] = access.call(node, directives[key], data, key);
    }
  }
  return Object.keys(attrs)
    .reduce(function(list, attr) {
      return list.push(attr, attrs[attr]), list;
    }, []);
}

function access(key, data, i) {
  switch (typeof key) {
    case 'function':
      return key.call(this, data, i);
    case 'undefined':
      return null;
  }
  if (key === '.') {
    return data;
  } else if (key.indexOf('.') > 0) {
    var keys = key.split('.');
    for (var i = 0, len = keys.length; i < len; i++) {
      data = data[keys[i]];
      if (data === null || typeof data === 'undefined') {
        break;
      }
    }
    return data;
  }
  return data[key];
}

function style(styles, data) {
  if (!styles) return '';
  switch (typeof styles) {
    case 'object':
      return styles; // incremental-dom handles this internall
  }
  return stringify.call(this, styles, data);
}

function stringify(value) {
  if (value === null || typeof value === 'undefined') {
    return '';
  } else if (typeof value === 'object') {
    return JSON.stringify(value);
  } else if (typeof value === 'function') {
    return value.apply(this, [].slice.call(arguments, 1));
  }
  return String(value);
}

function noop() {
}

function extend(a, b) {
  for (var i = 1, len = arguments.length; i < len; i++) {
    if (arguments[i]) {
      var o = arguments[i];
      for (var key in o) a[key] = o[key];
    }
  }
  return a;
}

function coalesce() {
  for (var i = 0, len = arguments.length; i < len; i++) {
    var a = arguments[i];
    if (a !== null && typeof a !== 'undefined') return a;
  }
}

},{"incremental-dom":3}]},{},[13]);

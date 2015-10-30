(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/allens/work/tagalong/node_modules/document-register-element/build/document-register-element.js":[function(require,module,exports){
/*! (C) WebReflection Mit Style License */
(function(e,t,n,r){"use strict";function rt(e,t){for(var n=0,r=e.length;n<r;n++)dt(e[n],t)}function it(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],nt(r,b[ot(r)])}function st(e){return function(t){j(t)&&(dt(t,e),rt(t.querySelectorAll(w),e))}}function ot(e){var t=e.getAttribute("is"),n=e.nodeName.toUpperCase(),r=S.call(y,t?v+t.toUpperCase():d+n);return t&&-1<r&&!ut(n,t)?-1:r}function ut(e,t){return-1<w.indexOf(e+'[is="'+t+'"]')}function at(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target;Q&&(!i||i===t)&&t.attributeChangedCallback&&r!=="style"&&t.attributeChangedCallback(r,n===e[a]?null:e.prevValue,n===e[l]?null:e.newValue)}function ft(e){var t=st(e);return function(e){X.push(t,e.target)}}function lt(e){K&&(K=!1,e.currentTarget.removeEventListener(h,lt)),rt((e.target||t).querySelectorAll(w),e.detail===o?o:s),B&&pt()}function ct(e,t){var n=this;q.call(n,e,t),G.call(n,{target:n})}function ht(e,t){D(e,t),et?et.observe(e,z):(J&&(e.setAttribute=ct,e[i]=Z(e),e.addEventListener(p,G)),e.addEventListener(c,at)),e.createdCallback&&Q&&(e.created=!0,e.createdCallback(),e.created=!1)}function pt(){for(var e,t=0,n=F.length;t<n;t++)e=F[t],E.contains(e)||(F.splice(t,1),dt(e,o))}function dt(e,t){var n,r=ot(e);-1<r&&(tt(e,b[r]),r=0,t===s&&!e[s]?(e[o]=!1,e[s]=!0,r=1,B&&S.call(F,e)<0&&F.push(e)):t===o&&!e[o]&&(e[s]=!1,e[o]=!0,r=1),r&&(n=e[t+"Callback"])&&n.call(e))}if(r in t)return;var i="__"+r+(Math.random()*1e5>>0),s="attached",o="detached",u="extends",a="ADDITION",f="MODIFICATION",l="REMOVAL",c="DOMAttrModified",h="DOMContentLoaded",p="DOMSubtreeModified",d="<",v="=",m=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,g=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],y=[],b=[],w="",E=t.documentElement,S=y.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},x=n.prototype,T=x.hasOwnProperty,N=x.isPrototypeOf,C=n.defineProperty,k=n.getOwnPropertyDescriptor,L=n.getOwnPropertyNames,A=n.getPrototypeOf,O=n.setPrototypeOf,M=!!n.__proto__,_=n.create||function vt(e){return e?(vt.prototype=e,new vt):this},D=O||(M?function(e,t){return e.__proto__=t,e}:L&&k?function(){function e(e,t){for(var n,r=L(t),i=0,s=r.length;i<s;i++)n=r[i],T.call(e,n)||C(e,n,k(t,n))}return function(t,n){do e(t,n);while((n=A(n))&&!N.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),P=e.MutationObserver||e.WebKitMutationObserver,H=(e.HTMLElement||e.Element||e.Node).prototype,B=!N.call(H,E),j=B?function(e){return e.nodeType===1}:function(e){return N.call(H,e)},F=B&&[],I=H.cloneNode,q=H.setAttribute,R=H.removeAttribute,U=t.createElement,z=P&&{attributes:!0,characterData:!0,attributeOldValue:!0},W=P||function(e){J=!1,E.removeEventListener(c,W)},X,V=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,10)},$=!1,J=!0,K=!0,Q=!0,G,Y,Z,et,tt,nt;O||M?(tt=function(e,t){N.call(t,e)||ht(e,t)},nt=ht):(tt=function(e,t){e[i]||(e[i]=n(!0),ht(e,t))},nt=tt),B?(J=!1,function(){var e=k(H,"addEventListener"),t=e.value,n=function(e){var t=new CustomEvent(c,{bubbles:!0});t.attrName=e,t.prevValue=this.getAttribute(e),t.newValue=null,t[l]=t.attrChange=2,R.call(this,e),this.dispatchEvent(t)},r=function(e,t){var n=this.hasAttribute(e),r=n&&this.getAttribute(e),i=new CustomEvent(c,{bubbles:!0});q.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[f]=i.attrChange=1:i[a]=i.attrChange=0,this.dispatchEvent(i)},s=function(e){var t=e.currentTarget,n=t[i],r=e.propertyName,s;n.hasOwnProperty(r)&&(n=n[r],s=new CustomEvent(c,{bubbles:!0}),s.attrName=n.name,s.prevValue=n.value||null,s.newValue=n.value=t[r]||null,s.prevValue==null?s[a]=s.attrChange=0:s[f]=s.attrChange=1,t.dispatchEvent(s))};e.value=function(e,o,u){e===c&&this.attributeChangedCallback&&this.setAttribute!==r&&(this[i]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",s)),t.call(this,e,o,u)},C(H,"addEventListener",e)}()):P||(E.addEventListener(c,W),E.setAttribute(i,1),E.removeAttribute(i),J&&(G=function(e){var t=this,n,r,s;if(t===e.target){n=t[i],t[i]=r=Z(t);for(s in r){if(!(s in n))return Y(0,t,s,n[s],r[s],a);if(r[s]!==n[s])return Y(1,t,s,n[s],r[s],f)}for(s in n)if(!(s in r))return Y(2,t,s,n[s],r[s],l)}},Y=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,at(o)},Z=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),t[r]=function(n,r){p=n.toUpperCase(),$||($=!0,P?(et=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new P(function(r){for(var i,s,o=0,u=r.length;o<u;o++)i=r[o],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,Q&&s.attributeChangedCallback&&i.attributeName!=="style"&&s.attributeChangedCallback(i.attributeName,i.oldValue,s.getAttribute(i.attributeName)))})}(st(s),st(o)),et.observe(t,{childList:!0,subtree:!0})):(X=[],V(function E(){while(X.length)X.shift().call(null,X.shift());V(E)}),t.addEventListener("DOMNodeInserted",ft(s)),t.addEventListener("DOMNodeRemoved",ft(o))),t.addEventListener(h,lt),t.addEventListener("readystatechange",lt),t.createElement=function(e,n){var r=U.apply(t,arguments),i=""+e,s=S.call(y,(n?v:d)+(n||i).toUpperCase()),o=-1<s;return n&&(r.setAttribute("is",n=n.toLowerCase()),o&&(o=ut(i.toUpperCase(),n))),Q=!t.createElement.innerHTMLHelper,o&&nt(r,b[s]),r},H.cloneNode=function(e){var t=I.call(this,!!e),n=ot(t);return-1<n&&nt(t,b[n]),e&&it(t.querySelectorAll(w)),t});if(-2<S.call(y,v+p)+S.call(y,d+p))throw new Error("A "+n+" type is already registered");if(!m.test(p)||-1<S.call(g,p))throw new Error("The type "+n+" is invalid");var i=function(){return f?t.createElement(l,p):t.createElement(l)},a=r||x,f=T.call(a,u),l=f?r[u].toUpperCase():p,c=y.push((f?v:d)+p)-1,p;return w=w.concat(w.length?",":"",f?l+'[is="'+n.toLowerCase()+'"]':l),i.prototype=b[c]=T.call(a,"prototype")?a.prototype:_(H),rt(t.querySelectorAll(w),s),i}})(window,document,Object,"registerElement");
},{}],"/Users/allens/work/tagalong/node_modules/incremental-dom/dist/incremental-dom-cjs.js":[function(require,module,exports){
(function (process){

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

'use strict';

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

/** */
exports.notifications = {
  /**
   * Called after patch has compleated with any Nodes that have been created
   * and added to the DOM.
   * @type {?function(Array<!Node>)}
   */
  nodesCreated: null,

  /**
   * Called after patch has compleated with any Nodes that have been removed
   * from the DOM.
   * Note it's an applications responsibility to handle any childNodes.
   * @type {?function(Array<!Node>)}
   */
  nodesDeleted: null
};

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
 * @param {!Element|!DocumentFragment} node The root Node of the subtree the
 *     walker should start traversing.
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

  /**
   * @const {!Element|!DocumentFragment}
   */
  this.root = node;

  /**
   * @type {?Node}
   */
  this.currentNode = node;
}

/**
 * @return {!Node} The current parent of the current location in the subtree.
 */
TreeWalker.prototype.getCurrentParent = function () {
  return this.stack_[this.stack_.length - 1];
};

/**
 * Changes the current location the firstChild of the current location.
 */
TreeWalker.prototype.firstChild = function () {
  this.stack_.push(this.currentNode);
  this.currentNode = this.currentNode.firstChild;
};

/**
 * Changes the current location the nextSibling of the current location.
 */
TreeWalker.prototype.nextSibling = function () {
  this.currentNode = this.currentNode.nextSibling;
};

/**
 * Changes the current location the parentNode of the current location.
 */
TreeWalker.prototype.parentNode = function () {
  this.currentNode = this.stack_.pop();
};

/**
 * Keeps track of the state of a patch.
 * @param {!Element|!DocumentFragment} node The root Node of the subtree the
 *     is for.
 * @param {?Context} prevContext The previous context.
 * @constructor
 */
function Context(node, prevContext) {
  /**
   * @const {TreeWalker}
   */
  this.walker = new TreeWalker(node);

  /**
   * @const {Document}
   */
  this.doc = node.ownerDocument;

  /**
   * Keeps track of what namespace to create new Elements in.
   * @private
   * @const {!Array<(string|undefined)>}
   */
  this.nsStack_ = [undefined];

  /**
   * @const {?Context}
   */
  this.prevContext = prevContext;

  /**
   * @type {(Array<!Node>|undefined)}
   */
  this.created = exports.notifications.nodesCreated && [];

  /**
   * @type {(Array<!Node>|undefined)}
   */
  this.deleted = exports.notifications.nodesDeleted && [];
}

/**
 * @return {(string|undefined)} The current namespace to create Elements in.
 */
Context.prototype.getCurrentNamespace = function () {
  return this.nsStack_[this.nsStack_.length - 1];
};

/**
 * @param {string=} namespace The namespace to enter.
 */
Context.prototype.enterNamespace = function (namespace) {
  this.nsStack_.push(namespace);
};

/**
 * Exits the current namespace
 */
Context.prototype.exitNamespace = function () {
  this.nsStack_.pop();
};

/**
 * @param {!Node} node
 */
Context.prototype.markCreated = function (node) {
  if (this.created) {
    this.created.push(node);
  }
};

/**
 * @param {!Node} node
 */
Context.prototype.markDeleted = function (node) {
  if (this.deleted) {
    this.deleted.push(node);
  }
};

/**
 * Notifies about nodes that were created during the patch opearation.
 */
Context.prototype.notifyChanges = function () {
  if (this.created && this.created.length > 0) {
    exports.notifications.nodesCreated(this.created);
  }

  if (this.deleted && this.deleted.length > 0) {
    exports.notifications.nodesDeleted(this.deleted);
  }
};

/**
 * The current context.
 * @type {?Context}
 */
var context;

/**
 * Enters a new patch context.
 * @param {!Element|!DocumentFragment} node
 */
var enterContext = function (node) {
  context = new Context(node, context);
};

/**
 * Restores the previous patch context.
 */
var restoreContext = function () {
  context = context.prevContext;
};

/**
 * Gets the current patch context.
 * @return {?Context}
 */
var getContext = function () {
  return context;
};

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
 * A cached reference to the hasOwnProperty function.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * A cached reference to the create function.
 */
var create = Object.create;

/**
 * Used to prevent property collisions between our "map" and its prototype.
 * @param {!Object<string, *>} map The map to check.
 * @param {string} property The property to check.
 * @return {boolean} Whether map has property.
 */
var has = function (map, property) {
  return hasOwnProperty.call(map, property);
};

/**
 * Creates an map object without a prototype.
 * @return {!Object}
 */
var createMap = function () {
  return create(null);
};

/**
 * Keeps track of information needed to perform diffs for a given DOM node.
 * @param {!string} nodeName
 * @param {?string=} key
 * @constructor
 */
function NodeData(nodeName, key) {
  /**
   * The attributes and their values.
   * @const
   */
  this.attrs = createMap();

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
  this.newAttrs = createMap();

  /**
   * The key used to identify this node, used to preserve DOM nodes when they
   * move within their parent.
   * @const
   */
  this.key = key;

  /**
   * Keeps track of children within this node by their key.
   * {?Object<string, !Element>}
   */
  this.keyMap = null;

  /**
   * Whether or not the keyMap is currently valid.
   * {boolean}
   */
  this.keyMapValid = true;

  /**
   * The last child to have been visited within the current pass.
   * @type {?Node}
   */
  this.lastVisitedChild = null;

  /**
   * The node name for this node.
   * @const {string}
   */
  this.nodeName = nodeName;

  /**
   * @type {?string}
   */
  this.text = null;
}

/**
 * Initializes a NodeData object for a Node.
 *
 * @param {Node} node The node to initialize data for.
 * @param {string} nodeName The node name of node.
 * @param {?string=} key The key that identifies the node.
 * @return {!NodeData} The newly initialized data object
 */
var initData = function (node, nodeName, key) {
  var data = new NodeData(nodeName, key);
  node['__incrementalDOMData'] = data;
  return data;
};

/**
 * Retrieves the NodeData object for a Node, creating it if necessary.
 *
 * @param {Node} node The node to retrieve the data for.
 * @return {!NodeData} The NodeData for this Node.
 */
var getData = function (node) {
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

exports.symbols = {
  default: '__default',

  placeholder: '__placeholder'
};

/**
 * Applies an attribute or property to a given Element. If the value is null
 * or undefined, it is removed from the Element. Otherwise, the value is set
 * as an attribute.
 * @param {!Element} el
 * @param {string} name The attribute's name.
 * @param {?(boolean|number|string)=} value The attribute's value.
 */
exports.applyAttr = function (el, name, value) {
  if (value == null) {
    el.removeAttribute(name);
  } else {
    el.setAttribute(name, value);
  }
};

/**
 * Applies a property to a given Element.
 * @param {!Element} el
 * @param {string} name The property's name.
 * @param {*} value The property's value.
 */
exports.applyProp = function (el, name, value) {
  el[name] = value;
};

/**
 * Applies a style to an Element. No vendor prefix expansion is done for
 * property names/values.
 * @param {!Element} el
 * @param {string} name The attribute's name.
 * @param {string|Object<string,string>} style The style to set. Either a
 *     string of css or an object containing property-value pairs.
 */
var applyStyle = function (el, name, style) {
  if (typeof style === 'string') {
    el.style.cssText = style;
  } else {
    el.style.cssText = '';
    var elStyle = el.style;

    for (var prop in style) {
      if (has(style, prop)) {
        elStyle[prop] = style[prop];
      }
    }
  }
};

/**
 * Updates a single attribute on an Element.
 * @param {!Element} el
 * @param {string} name The attribute's name.
 * @param {*} value The attribute's value. If the value is an object or
 *     function it is set on the Element, otherwise, it is set as an HTML
 *     attribute.
 */
var applyAttributeTyped = function (el, name, value) {
  var type = typeof value;

  if (type === 'object' || type === 'function') {
    exports.applyProp(el, name, value);
  } else {
    exports.applyAttr(el, name, /** @type {?(boolean|number|string)} */value);
  }
};

/**
 * Calls the appropriate attribute mutator for this attribute.
 * @param {!Element} el
 * @param {string} name The attribute's name.
 * @param {*} value The attribute's value.
 */
var updateAttribute = function (el, name, value) {
  var data = getData(el);
  var attrs = data.attrs;

  if (attrs[name] === value) {
    return;
  }

  var mutator = exports.attributes[name] || exports.attributes[exports.symbols.default];
  mutator(el, name, value);

  attrs[name] = value;
};

/**
 * A publicly mutable object to provide custom mutators for attributes.
 * @const {!Object<string, function(!Element, string, *)>}
 */
exports.attributes = createMap();

// Special generic mutator that's called for any attribute that does not
// have a specific mutator.
exports.attributes[exports.symbols.default] = applyAttributeTyped;

exports.attributes[exports.symbols.placeholder] = function () {};

exports.attributes['style'] = applyStyle;

var SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * Enters a tag, checking to see if it is a namespace boundary, and if so,
 * updates the current namespace.
 * @param {string} tag The tag to enter.
 */
var enterTag = function (tag) {
  if (tag === 'svg') {
    getContext().enterNamespace(SVG_NS);
  } else if (tag === 'foreignObject') {
    getContext().enterNamespace(undefined);
  }
};

/**
 * Exits a tag, checking to see if it is a namespace boundary, and if so,
 * updates the current namespace.
 * @param {string} tag The tag to enter.
 */
var exitTag = function (tag) {
  if (tag === 'svg' || tag === 'foreignObject') {
    getContext().exitNamespace();
  }
};

/**
 * Gets the namespace to create an element (of a given tag) in.
 * @param {string} tag The tag to get the namespace for.
 * @return {(string|undefined)} The namespace to create the tag in.
 */
var getNamespaceForTag = function (tag) {
  if (tag === 'svg') {
    return SVG_NS;
  }

  return getContext().getCurrentNamespace();
};

/**
 * Creates an Element.
 * @param {Document} doc The document with which to create the Element.
 * @param {string} tag The tag for the Element.
 * @param {?string=} key A key to identify the Element.
 * @param {?Array<*>=} statics An array of attribute name/value pairs of
 *     the static attributes for the Element.
 * @return {!Element}
 */
var createElement = function (doc, tag, key, statics) {
  var namespace = getNamespaceForTag(tag);
  var el;

  if (namespace) {
    el = doc.createElementNS(namespace, tag);
  } else {
    el = doc.createElement(tag);
  }

  initData(el, tag, key);

  if (statics) {
    for (var i = 0; i < statics.length; i += 2) {
      updateAttribute(el, /** @type {!string}*/statics[i], statics[i + 1]);
    }
  }

  return el;
};

/**
 * Creates a Node, either a Text or an Element depending on the node name
 * provided.
 * @param {Document} doc The document with which to create the Node.
 * @param {string} nodeName The tag if creating an element or #text to create
 *     a Text.
 * @param {?string=} key A key to identify the Element.
 * @param {?Array<*>=} statics The static data to initialize the Node
 *     with. For an Element, an array of attribute name/value pairs of
 *     the static attributes for the Element.
 * @return {!Node}
 */
var createNode = function (doc, nodeName, key, statics) {
  if (nodeName === '#text') {
    return doc.createTextNode('');
  }

  return createElement(doc, nodeName, key, statics);
};

/**
 * Creates a mapping that can be used to look up children using a key.
 * @param {!Node} el
 * @return {!Object<string, !Element>} A mapping of keys to the children of the
 *     Element.
 */
var createKeyMap = function (el) {
  var map = createMap();
  var children = el.children;
  var count = children.length;

  for (var i = 0; i < count; i += 1) {
    var child = children[i];
    var key = getData(child).key;

    if (key) {
      map[key] = child;
    }
  }

  return map;
};

/**
 * Retrieves the mapping of key to child node for a given Element, creating it
 * if necessary.
 * @param {!Node} el
 * @return {!Object<string, !Node>} A mapping of keys to child Elements
 */
var getKeyMap = function (el) {
  var data = getData(el);

  if (!data.keyMap) {
    data.keyMap = createKeyMap(el);
  }

  return data.keyMap;
};

/**
 * Retrieves a child from the parent with the given key.
 * @param {!Node} parent
 * @param {?string=} key
 * @return {?Element} The child corresponding to the key.
 */
var getChild = function (parent, key) {
  return (/** @type {?Element} */key && getKeyMap(parent)[key]
  );
};

/**
 * Registers an element as being a child. The parent will keep track of the
 * child using the key. The child can be retrieved using the same key using
 * getKeyMap. The provided key should be unique within the parent Element.
 * @param {!Node} parent The parent of child.
 * @param {string} key A key to identify the child with.
 * @param {!Node} child The child to register.
 */
var registerChild = function (parent, key, child) {
  getKeyMap(parent)[key] = child;
};

if (process.env.NODE_ENV !== 'production') {
  /**
  * Makes sure that keyed Element matches the tag name provided.
  * @param {!Element} node The node that is being matched.
  * @param {string=} tag The tag name of the Element.
  * @param {?string=} key The key of the Element.
  */
  var assertKeyedTagMatches = function (node, tag, key) {
    var nodeName = getData(node).nodeName;
    if (nodeName !== tag) {
      throw new Error('Was expecting node with key "' + key + '" to be a ' + tag + ', not a ' + nodeName + '.');
    }
  };
}

/**
 * Checks whether or not a given node matches the specified nodeName and key.
 *
 * @param {!Node} node An HTML node, typically an HTMLElement or Text.
 * @param {?string} nodeName The nodeName for this node.
 * @param {?string=} key An optional key that identifies a node.
 * @return {boolean} True if the node matches, false otherwise.
 */
var matches = function (node, nodeName, key) {
  var data = getData(node);

  // Key check is done using double equals as we want to treat a null key the
  // same as undefined. This should be okay as the only values allowed are
  // strings, null and undefined so the == semantics are not too weird.
  return key == data.key && nodeName === data.nodeName;
};

/**
 * Aligns the virtual Element definition with the actual DOM, moving the
 * corresponding DOM node to the correct location or creating it if necessary.
 * @param {string} nodeName For an Element, this should be a valid tag string.
 *     For a Text, this should be #text.
 * @param {?string=} key The key used to identify this element.
 * @param {?Array<*>=} statics For an Element, this should be an array of
 *     name-value pairs.
 * @return {!Node} The matching node.
 */
var alignWithDOM = function (nodeName, key, statics) {
  var context = getContext();
  var walker = context.walker;
  var currentNode = walker.currentNode;
  var parent = walker.getCurrentParent();
  var matchingNode;

  // Check to see if we have a node to reuse
  if (currentNode && matches(currentNode, nodeName, key)) {
    matchingNode = currentNode;
  } else {
    var existingNode = getChild(parent, key);

    // Check to see if the node has moved within the parent or if a new one
    // should be created
    if (existingNode) {
      if (process.env.NODE_ENV !== 'production') {
        assertKeyedTagMatches(existingNode, nodeName, key);
      }

      matchingNode = existingNode;
    } else {
      matchingNode = createNode(context.doc, nodeName, key, statics);

      if (key) {
        registerChild(parent, key, matchingNode);
      }

      context.markCreated(matchingNode);
    }

    // If the node has a key, remove it from the DOM to prevent a large number
    // of re-orders in the case that it moved far or was completely removed.
    // Since we hold on to a reference through the keyMap, we can always add it
    // back.
    if (currentNode && getData(currentNode).key) {
      parent.replaceChild(matchingNode, currentNode);
      getData(parent).keyMapValid = false;
    } else {
      parent.insertBefore(matchingNode, currentNode);
    }

    walker.currentNode = matchingNode;
  }

  return matchingNode;
};

/**
 * Clears out any unvisited Nodes, as the corresponding virtual element
 * functions were never called for them.
 * @param {Node} node
 */
var clearUnvisitedDOM = function (node) {
  var context = getContext();
  var walker = context.walker;
  var data = getData(node);
  var keyMap = data.keyMap;
  var keyMapValid = data.keyMapValid;
  var lastVisitedChild = data.lastVisitedChild;
  var child = node.lastChild;
  var key;

  data.lastVisitedChild = null;

  if (child === lastVisitedChild && keyMapValid) {
    return;
  }

  if (data.attrs[exports.symbols.placeholder] && walker.currentNode !== walker.root) {
    return;
  }

  while (child !== lastVisitedChild) {
    node.removeChild(child);
    context.markDeleted( /** @type {!Node}*/child);

    key = getData(child).key;
    if (key) {
      delete keyMap[key];
    }
    child = node.lastChild;
  }

  // Clean the keyMap, removing any unusued keys.
  for (key in keyMap) {
    child = keyMap[key];
    if (!child.parentNode) {
      context.markDeleted(child);
      delete keyMap[key];
    }
  }

  data.keyMapValid = true;
};

/**
 * Enters an Element, setting the current namespace for nested elements.
 * @param {Node} node
 */
var enterNode = function (node) {
  var data = getData(node);
  enterTag(data.nodeName);
};

/**
 * Exits an Element, unwinding the current namespace to the previous value.
 * @param {Node} node
 */
var exitNode = function (node) {
  var data = getData(node);
  exitTag(data.nodeName);
};

/**
 * Marks node's parent as having visited node.
 * @param {Node} node
 */
var markVisited = function (node) {
  var context = getContext();
  var walker = context.walker;
  var parent = walker.getCurrentParent();
  var data = getData(parent);
  data.lastVisitedChild = node;
};

/**
 * Changes to the first child of the current node.
 */
var firstChild = function () {
  var context = getContext();
  var walker = context.walker;
  enterNode(walker.currentNode);
  walker.firstChild();
};

/**
 * Changes to the next sibling of the current node.
 */
var nextSibling = function () {
  var context = getContext();
  var walker = context.walker;
  markVisited(walker.currentNode);
  walker.nextSibling();
};

/**
 * Changes to the parent of the current node, removing any unvisited children.
 */
var parentNode = function () {
  var context = getContext();
  var walker = context.walker;
  walker.parentNode();
  exitNode(walker.currentNode);
};

if (process.env.NODE_ENV !== 'production') {
  var assertNoUnclosedTags = function (root) {
    var openElement = getContext().walker.getCurrentParent();
    if (!openElement) {
      return;
    }

    var openTags = [];
    while (openElement && openElement !== root) {
      openTags.push(openElement.nodeName.toLowerCase());
      openElement = openElement.parentNode;
    }

    throw new Error('One or more tags were not closed:\n' + openTags.join('\n'));
  };
}

/**
 * Patches the document starting at el with the provided function. This function
 * may be called during an existing patch operation.
 * @param {!Element|!DocumentFragment} node The Element or Document
 *     to patch.
 * @param {!function(T)} fn A function containing elementOpen/elementClose/etc.
 *     calls that describe the DOM.
 * @param {T=} data An argument passed to fn to represent DOM state.
 * @template T
 */
exports.patch = function (node, fn, data) {
  enterContext(node);

  firstChild();
  fn(data);
  parentNode();
  clearUnvisitedDOM(node);

  if (process.env.NODE_ENV !== 'production') {
    assertNoUnclosedTags(node);
  }

  getContext().notifyChanges();
  restoreContext();
};

/**
 * The offset in the virtual element declaration where the attributes are
 * specified.
 * @const
 */
var ATTRIBUTES_OFFSET = 3;

/**
 * Builds an array of arguments for use with elementOpenStart, attr and
 * elementOpenEnd.
 * @const {Array<*>}
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
  var assertNotInAttributes = function () {
    if (inAttributes) {
      throw new Error('Was not expecting a call to attr or elementOpenEnd, ' + 'they must follow a call to elementOpenStart.');
    }
  };

  /** Makes sure that the caller is where attributes are expected. */
  var assertInAttributes = function () {
    if (!inAttributes) {
      throw new Error('Was expecting a call to attr or elementOpenEnd. ' + 'elementOpenStart must be followed by zero or more calls to attr, ' + 'then one call to elementOpenEnd.');
    }
  };

  /**
   * Makes sure that placeholders have a key specified. Otherwise, conditional
   * placeholders and conditional elements next to placeholders will cause
   * placeholder elements to be re-used as non-placeholders and vice versa.
   * @param {string} key
   */
  var assertPlaceholderKeySpecified = function (key) {
    if (!key) {
      throw new Error('Placeholder elements must have a key specified.');
    }
  };

  /**
   * Makes sure that tags are correctly nested.
   * @param {string} tag
   */
  var assertCloseMatchesOpenTag = function (tag) {
    var context = getContext();
    var walker = context.walker;
    var closingNode = walker.getCurrentParent();
    var data = getData(closingNode);

    if (tag !== data.nodeName) {
      throw new Error('Received a call to close ' + tag + ' but ' + data.nodeName + ' was open.');
    }
  };

  /** Updates the state to being in an attribute declaration. */
  var setInAttributes = function () {
    inAttributes = true;
  };

  /** Updates the state to not being in an attribute declaration. */
  var setNotInAttributes = function () {
    inAttributes = false;
  };
}

/**
 * @param {string} tag The element's tag.
 * @param {?string=} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
 *     static attributes for the Element. These will only be set once when the
 *     Element is created.
 * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
 *     for the Element.
 * @return {!Element} The corresponding Element.
 */
exports.elementOpen = function (tag, key, statics, var_args) {
  if (process.env.NODE_ENV !== 'production') {
    assertNotInAttributes();
  }

  var node = /** @type {!Element}*/alignWithDOM(tag, key, statics);
  var data = getData(node);

  /*
   * Checks to see if one or more attributes have changed for a given Element.
   * When no attributes have changed, this is much faster than checking each
   * individual argument. When attributes have changed, the overhead of this is
   * minimal.
   */
  var attrsArr = data.attrsArr;
  var attrsChanged = false;
  var i = ATTRIBUTES_OFFSET;
  var j = 0;

  for (; i < arguments.length; i += 1, j += 1) {
    if (attrsArr[j] !== arguments[i]) {
      attrsChanged = true;
      break;
    }
  }

  for (; i < arguments.length; i += 1, j += 1) {
    attrsArr[j] = arguments[i];
  }

  if (j < attrsArr.length) {
    attrsChanged = true;
    attrsArr.length = j;
  }

  /*
   * Actually perform the attribute update.
   */
  if (attrsChanged) {
    var attr,
        newAttrs = data.newAttrs;

    for (attr in newAttrs) {
      newAttrs[attr] = undefined;
    }

    for (i = ATTRIBUTES_OFFSET; i < arguments.length; i += 2) {
      newAttrs[arguments[i]] = arguments[i + 1];
    }

    for (attr in newAttrs) {
      updateAttribute(node, attr, newAttrs[attr]);
    }
  }

  firstChild();
  return node;
};

/**
 * Declares a virtual Element at the current location in the document. This
 * corresponds to an opening tag and a elementClose tag is required. This is
 * like elementOpen, but the attributes are defined using the attr function
 * rather than being passed as arguments. Must be folllowed by 0 or more calls
 * to attr, then a call to elementOpenEnd.
 * @param {string} tag The element's tag.
 * @param {?string=} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
 *     static attributes for the Element. These will only be set once when the
 *     Element is created.
 */
exports.elementOpenStart = function (tag, key, statics) {
  if (process.env.NODE_ENV !== 'production') {
    assertNotInAttributes();
    setInAttributes();
  }

  argsBuilder[0] = tag;
  argsBuilder[1] = key;
  argsBuilder[2] = statics;
};

/***
 * Defines a virtual attribute at this point of the DOM. This is only valid
 * when called between elementOpenStart and elementOpenEnd.
 *
 * @param {string} name
 * @param {*} value
 */
exports.attr = function (name, value) {
  if (process.env.NODE_ENV !== 'production') {
    assertInAttributes();
  }

  argsBuilder.push(name, value);
};

/**
 * Closes an open tag started with elementOpenStart.
 * @return {!Element} The corresponding Element.
 */
exports.elementOpenEnd = function () {
  if (process.env.NODE_ENV !== 'production') {
    assertInAttributes();
    setNotInAttributes();
  }

  var node = exports.elementOpen.apply(null, argsBuilder);
  argsBuilder.length = 0;
  return node;
};

/**
 * Closes an open virtual Element.
 *
 * @param {string} tag The element's tag.
 * @return {!Element} The corresponding Element.
 */
exports.elementClose = function (tag) {
  if (process.env.NODE_ENV !== 'production') {
    assertNotInAttributes();
    assertCloseMatchesOpenTag(tag);
  }

  parentNode();

  var node = /** @type {!Element} */getContext().walker.currentNode;

  clearUnvisitedDOM(node);

  nextSibling();
  return node;
};

/**
 * Declares a virtual Element at the current location in the document that has
 * no children.
 * @param {string} tag The element's tag.
 * @param {?string=} key The key used to identify this element. This can be an
 *     empty string, but performance may be better if a unique value is used
 *     when iterating over an array of items.
 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
 *     static attributes for the Element. These will only be set once when the
 *     Element is created.
 * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
 *     for the Element.
 * @return {!Element} The corresponding Element.
 */
exports.elementVoid = function (tag, key, statics, var_args) {
  var node = exports.elementOpen.apply(null, arguments);
  exports.elementClose.apply(null, arguments);
  return node;
};

/**
 * Declares a virtual Element at the current location in the document that is a
 * placeholder element. Children of this Element can be manually managed and
 * will not be cleared by the library.
 *
 * A key must be specified to make sure that this node is correctly preserved
 * across all conditionals.
 *
 * @param {string} tag The element's tag.
 * @param {string} key The key used to identify this element.
 * @param {?Array<*>=} statics An array of attribute name/value pairs of the
 *     static attributes for the Element. These will only be set once when the
 *     Element is created.
 * @param {...*} var_args Attribute name/value pairs of the dynamic attributes
 *     for the Element.
 * @return {!Element} The corresponding Element.
 */
exports.elementPlaceholder = function (tag, key, statics, var_args) {
  if (process.env.NODE_ENV !== 'production') {
    assertPlaceholderKeySpecified(key);
  }

  var node = exports.elementOpen.apply(null, arguments);
  updateAttribute(node, exports.symbols.placeholder, true);
  exports.elementClose.apply(null, arguments);
  return node;
};

/**
 * Declares a virtual Text at this point in the document.
 *
 * @param {string|number|boolean} value The value of the Text.
 * @param {...(function((string|number|boolean)):string)} var_args
 *     Functions to format the value which are called only when the value has
 *     changed.
 * @return {!Text} The corresponding text node.
 */
exports.text = function (value, var_args) {
  if (process.env.NODE_ENV !== 'production') {
    assertNotInAttributes();
  }

  var node = /** @type {!Text}*/alignWithDOM('#text', null);
  var data = getData(node);

  if (data.text !== value) {
    data.text = /** @type {string} */value;

    var formatted = value;
    for (var i = 1; i < arguments.length; i += 1) {
      formatted = arguments[i](formatted);
    }

    node.data = formatted;
  }

  nextSibling();
  return node;
};
//# sourceMappingURL=incremental-dom-cjs.js.map
}).call(this,require('_process'))

},{"_process":"/usr/local/lib/node_modules/watchify/node_modules/browserify/node_modules/process/browser.js"}],"/Users/allens/work/tagalong/src/arrow.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isArrow = isArrow;
exports.parseArrow = parseArrow;
var ARROW_PATTERN = /^\s*\(?(\s*\w+\s*(,\s*\w+\s*)*)\)?\s*=>\s*({([^}]+)}|(.+))$/;

function isArrow(expression) {
  return String(expression).match(ARROW_PATTERN);
}

;

function parseArrow(expression) {
  var match = expression.match(ARROW_PATTERN);
  var args = match[1];
  var body = match[4] || match[5];
  return new Function(args, 'return (' + body + ')');
}

;

},{}],"/Users/allens/work/tagalong/src/evaluate.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = evaluate;
exports.evaluator = evaluator;

var _arrow = require('./arrow');

function evaluate(expression, context) {
  var fn = evaluator(expression);
  return fn.call(this, context);
}

;

function evaluator(expression) {
  if ((0, _arrow.isArrow)(expression)) {
    return (0, _arrow.parseArrow)(expression);
  }

  var symbol = 'd' + Date.now();
  // '.' is just the identity function
  if (expression === '.') {
    return function identity(d) {
      return d;
    };
    // '.foo' addresses the context directly
  } else if (expression.match(/^\s*\.\w/)) {
      expression = symbol + expression;
    }
  return new Function(symbol, [
  // 'console.info("', symbol, ' = ", ', symbol, ', "', expression, '"); ',
  'with (', symbol, ' || {}) {', '  return ', expression, ';', '}'].join(''));
}

;

},{"./arrow":"/Users/allens/work/tagalong/src/arrow.js"}],"/Users/allens/work/tagalong/src/main.js":[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('document-register-element');

var _tContext = require('./t-context');

var _tContext2 = _interopRequireDefault(_tContext);

var _render = require('./render');

window.tagalong = {
  TContext: _tContext2['default'],
  createRenderFunction: _render.createRenderFunction
};

},{"./render":"/Users/allens/work/tagalong/src/render.js","./t-context":"/Users/allens/work/tagalong/src/t-context.js","document-register-element":"/Users/allens/work/tagalong/node_modules/document-register-element/build/document-register-element.js"}],"/Users/allens/work/tagalong/src/property.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = property;

function property(read, write, value) {
  return {
    enumerable: false,

    get: function get() {
      return read ? read.call(this, value) : value;
    },

    set: function set(v) {
      if (v !== value) {
        var previous = value;
        return write.call(this, value = v, previous);
      }
    }
  };
}

;
module.exports = exports["default"];

},{}],"/Users/allens/work/tagalong/src/render.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports.createRenderFunction = createRenderFunction;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _evaluate = require('./evaluate');

var _evaluate2 = _interopRequireDefault(_evaluate);

var _incrementalDom = require('incremental-dom');

var T_NAMESPACE = 't-';
var T_IF = T_NAMESPACE + 'if';
var T_EACH = T_NAMESPACE + 'each';
var T_TEXT = T_NAMESPACE + 'text';
var T_FOREACH = T_NAMESPACE + 'foreach';

var CONTROL_ATTRS = new Set([T_IF, T_EACH, T_FOREACH, T_TEXT]);

var VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

function createRenderFunction(root) {
  var render = createRenderer(root);
  return function _render(data) {
    // console.log('rendering with data:', data);
    return (0, _incrementalDom.patch)(root, render.bind(this, data));
  };
}

;

function createRenderer(root) {
  var calls = [];
  for (var child = root.firstChild; child; child = child.nextSibling) {
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
    calls.forEach(function (fn) {
      return fn(data);
    });
  };
}

function createTextRenderer(node) {
  // TODO: expand {{ expressions }} ?
  return function (data) {
    return (0, _incrementalDom.text)(node.nodeValue);
  };
}

function createElementRenderer(node) {
  var name = node.nodeName.toLowerCase();

  var isVoid = isElementVoid(name);
  var attrMap = getAttributeMap(node);

  var condition = node.hasAttribute(T_IF) ? (0, _evaluate.evaluator)(node.getAttribute(T_IF)) : null;

  var renderChildren = undefined;

  // <span t-text="some.value"></span>
  var textExpression = node.getAttribute(T_TEXT);
  if (textExpression) {
    (function () {
      var getText = (0, _evaluate.evaluator)(textExpression);
      renderChildren = function (data) {
        var value = getText(data);
        if (value !== null && value !== undefined) {
          (0, _incrementalDom.text)(String(value));
        }
      };
    })();
  } else {
    renderChildren = createRenderer(node);
  }

  var render = function render(data) {
    // console.log('rendering', node, 'with data:', data);
    if (condition && !condition(data)) {
      return false;
    }

    var attrs = interpolateAttributes(attrMap, data);
    if (isVoid) {
      (0, _incrementalDom.elementVoid)(name, '', attrs);
    } else {
      (0, _incrementalDom.elementOpen)(name, '', attrs);
      renderChildren(data);
      (0, _incrementalDom.elementClose)(name);
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
  return function (data) {
    var values = (0, _evaluate2['default'])(expression, data);
    forEach(values, render);
  };
}

function getAttributeMap(node) {
  var map = new Map();
  var attrs = node.attributes;
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    var _name = String(attr.name);
    if (CONTROL_ATTRS.has(_name)) {
      // console.info('skipping control attribute', name, 'for', node);
      continue;
    } else if (_name.indexOf(T_NAMESPACE) === 0) {
      var getter = (0, _evaluate.evaluator)(attr.value);
      map.set(_name.substr(T_NAMESPACE.length), getter);
    } else {
      map.set(_name, attr.value);
    }
  }
  return map;
}

function interpolateAttributes(attrMap, data) {
  var attrs = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = attrMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2);

      var key = _step$value[0];
      var value = _step$value[1];

      attrs.push(key, typeof value === 'function' ? value(data, key) : String(value));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return attrs;
}

function isElementVoid(name) {
  return VOID_ELEMENTS.has(name);
}

function forEach(data, fn) {
  return data.forEach(fn, this);
}

},{"./evaluate":"/Users/allens/work/tagalong/src/evaluate.js","incremental-dom":"/Users/allens/work/tagalong/node_modules/incremental-dom/dist/incremental-dom-cjs.js"}],"/Users/allens/work/tagalong/src/t-context.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _property = require('./property');

var _property2 = _interopRequireDefault(_property);

var _evaluate = require('./evaluate');

var _evaluate2 = _interopRequireDefault(_evaluate);

var _render = require('./render');

// import Immutable, {Map, List} from 'immutable';

var RENDER = Symbol('template-render');

var DATA_ATTR = 'data';

var TContext = document.registerElement('t-context', {
  prototype: Object.create(HTMLElement.prototype, {
    attachedCallback: { value: function value() {
        console.log('attached!', this);
        this.update();
      } },

    attributeChangedCallback: { value: function value(attr, _value, previous) {
        switch (attr) {
          case DATA_ATTR:
            this.update();
            break;
        }
      } },

    update: { value: function value() {
        console.log('updating...');
        if (this.hasAttribute(DATA_ATTR)) {
          var expr = this.getAttribute(DATA_ATTR);
          var data = (0, _evaluate2['default'])(expr);
          console.log('setting data: (', expr, ') ->', data);
          this.data = data;
        }
      } },

    getParentContext: { value: function value() {} },

    render: { value: function value() {
        var render = this[RENDER];
        if (!render) {
          render = this[RENDER] = (0, _render.createRenderFunction)(this);
        }
        render(this.data);
      } },

    invalidate: { value: function value() {
        this[RENDER] = null;
        this.render();
      } },

    data: (0, _property2['default'])(function readTemplateData(data) {
      return data;
    }, function setTemplateData(data, previous) {
      if (data !== previous) {
        return this.render();
      }
    }, {})
  })
});

exports['default'] = TContext;
module.exports = exports['default'];

},{"./evaluate":"/Users/allens/work/tagalong/src/evaluate.js","./property":"/Users/allens/work/tagalong/src/property.js","./render":"/Users/allens/work/tagalong/src/render.js"}],"/usr/local/lib/node_modules/watchify/node_modules/browserify/node_modules/process/browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

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

},{}]},{},["/Users/allens/work/tagalong/src/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZG9jdW1lbnQtcmVnaXN0ZXItZWxlbWVudC9idWlsZC9kb2N1bWVudC1yZWdpc3Rlci1lbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL2luY3JlbWVudGFsLWRvbS9kaXN0L2luY3JlbWVudGFsLWRvbS1janMuanMiLCIvVXNlcnMvYWxsZW5zL3dvcmsvdGFnYWxvbmcvc3JjL2Fycm93LmpzIiwiL1VzZXJzL2FsbGVucy93b3JrL3RhZ2Fsb25nL3NyYy9ldmFsdWF0ZS5qcyIsIi9Vc2Vycy9hbGxlbnMvd29yay90YWdhbG9uZy9zcmMvbWFpbi5qcyIsIi9Vc2Vycy9hbGxlbnMvd29yay90YWdhbG9uZy9zcmMvcHJvcGVydHkuanMiLCIvVXNlcnMvYWxsZW5zL3dvcmsvdGFnYWxvbmcvc3JjL3JlbmRlci5qcyIsIi9Vc2Vycy9hbGxlbnMvd29yay90YWdhbG9uZy9zcmMvdC1jb250ZXh0LmpzIiwiLi4vLi4vLi4vLi4vdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3pyQ0EsSUFBTSxhQUFhLEdBQUcsNkRBQTZELENBQUM7O0FBRTdFLFNBQVMsT0FBTyxDQUFDLFVBQVUsRUFBRTtBQUNsQyxTQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7Q0FDaEQ7O0FBQUEsQ0FBQzs7QUFFSyxTQUFTLFVBQVUsQ0FBQyxVQUFVLEVBQUU7QUFDckMsTUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM1QyxNQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsTUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQyxTQUFPLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxVQUFVLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0NBQ3BEOztBQUFBLENBQUM7Ozs7Ozs7O3FCQ1RzQixRQUFR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QyxNQUFNLENBQUMsQ0FBQztBQUMxQixZQUFJLENBQUMsTUFBTSxFQUFFO0FBQ1gsZ0JBQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsa0NBQXFCLElBQUksQ0FBQyxDQUFDO1NBQ3BEO0FBQ0QsY0FBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUNuQixFQUFDOztBQUVGLGNBQVUsRUFBRSxFQUFDLEtBQUssRUFBRSxpQkFBVztBQUM3QixZQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztPQUNmLEVBQUM7O0FBRUYsUUFBSSxFQUFFLDJCQUNKLFNBQVMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO0FBQzlCLGFBQU8sSUFBSSxDQUFDO0tBQ2IsRUFDRCxTQUFTLGVBQWUsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ3ZDLFVBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtBQUNyQixlQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztPQUN0QjtLQUNGLEVBQ0QsRUFBRSxDQUNIO0dBQ0YsQ0FDRjtDQUNGLENBQUMsQ0FBQzs7cUJBRVksUUFBUTs7OztBQ25FdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohIChDKSBXZWJSZWZsZWN0aW9uIE1pdCBTdHlsZSBMaWNlbnNlICovXG4oZnVuY3Rpb24oZSx0LG4scil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcnQoZSx0KXtmb3IodmFyIG49MCxyPWUubGVuZ3RoO248cjtuKyspZHQoZVtuXSx0KX1mdW5jdGlvbiBpdChlKXtmb3IodmFyIHQ9MCxuPWUubGVuZ3RoLHI7dDxuO3QrKylyPWVbdF0sbnQocixiW290KHIpXSl9ZnVuY3Rpb24gc3QoZSl7cmV0dXJuIGZ1bmN0aW9uKHQpe2oodCkmJihkdCh0LGUpLHJ0KHQucXVlcnlTZWxlY3RvckFsbCh3KSxlKSl9fWZ1bmN0aW9uIG90KGUpe3ZhciB0PWUuZ2V0QXR0cmlidXRlKFwiaXNcIiksbj1lLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkscj1TLmNhbGwoeSx0P3YrdC50b1VwcGVyQ2FzZSgpOmQrbik7cmV0dXJuIHQmJi0xPHImJiF1dChuLHQpPy0xOnJ9ZnVuY3Rpb24gdXQoZSx0KXtyZXR1cm4tMTx3LmluZGV4T2YoZSsnW2lzPVwiJyt0KydcIl0nKX1mdW5jdGlvbiBhdChlKXt2YXIgdD1lLmN1cnJlbnRUYXJnZXQsbj1lLmF0dHJDaGFuZ2Uscj1lLmF0dHJOYW1lLGk9ZS50YXJnZXQ7USYmKCFpfHxpPT09dCkmJnQuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrJiZyIT09XCJzdHlsZVwiJiZ0LmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhyLG49PT1lW2FdP251bGw6ZS5wcmV2VmFsdWUsbj09PWVbbF0/bnVsbDplLm5ld1ZhbHVlKX1mdW5jdGlvbiBmdChlKXt2YXIgdD1zdChlKTtyZXR1cm4gZnVuY3Rpb24oZSl7WC5wdXNoKHQsZS50YXJnZXQpfX1mdW5jdGlvbiBsdChlKXtLJiYoSz0hMSxlLmN1cnJlbnRUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihoLGx0KSkscnQoKGUudGFyZ2V0fHx0KS5xdWVyeVNlbGVjdG9yQWxsKHcpLGUuZGV0YWlsPT09bz9vOnMpLEImJnB0KCl9ZnVuY3Rpb24gY3QoZSx0KXt2YXIgbj10aGlzO3EuY2FsbChuLGUsdCksRy5jYWxsKG4se3RhcmdldDpufSl9ZnVuY3Rpb24gaHQoZSx0KXtEKGUsdCksZXQ/ZXQub2JzZXJ2ZShlLHopOihKJiYoZS5zZXRBdHRyaWJ1dGU9Y3QsZVtpXT1aKGUpLGUuYWRkRXZlbnRMaXN0ZW5lcihwLEcpKSxlLmFkZEV2ZW50TGlzdGVuZXIoYyxhdCkpLGUuY3JlYXRlZENhbGxiYWNrJiZRJiYoZS5jcmVhdGVkPSEwLGUuY3JlYXRlZENhbGxiYWNrKCksZS5jcmVhdGVkPSExKX1mdW5jdGlvbiBwdCgpe2Zvcih2YXIgZSx0PTAsbj1GLmxlbmd0aDt0PG47dCsrKWU9Rlt0XSxFLmNvbnRhaW5zKGUpfHwoRi5zcGxpY2UodCwxKSxkdChlLG8pKX1mdW5jdGlvbiBkdChlLHQpe3ZhciBuLHI9b3QoZSk7LTE8ciYmKHR0KGUsYltyXSkscj0wLHQ9PT1zJiYhZVtzXT8oZVtvXT0hMSxlW3NdPSEwLHI9MSxCJiZTLmNhbGwoRixlKTwwJiZGLnB1c2goZSkpOnQ9PT1vJiYhZVtvXSYmKGVbc109ITEsZVtvXT0hMCxyPTEpLHImJihuPWVbdCtcIkNhbGxiYWNrXCJdKSYmbi5jYWxsKGUpKX1pZihyIGluIHQpcmV0dXJuO3ZhciBpPVwiX19cIityKyhNYXRoLnJhbmRvbSgpKjFlNT4+MCkscz1cImF0dGFjaGVkXCIsbz1cImRldGFjaGVkXCIsdT1cImV4dGVuZHNcIixhPVwiQURESVRJT05cIixmPVwiTU9ESUZJQ0FUSU9OXCIsbD1cIlJFTU9WQUxcIixjPVwiRE9NQXR0ck1vZGlmaWVkXCIsaD1cIkRPTUNvbnRlbnRMb2FkZWRcIixwPVwiRE9NU3VidHJlZU1vZGlmaWVkXCIsZD1cIjxcIix2PVwiPVwiLG09L15bQS1aXVtBLVowLTldKig/Oi1bQS1aMC05XSspKyQvLGc9W1wiQU5OT1RBVElPTi1YTUxcIixcIkNPTE9SLVBST0ZJTEVcIixcIkZPTlQtRkFDRVwiLFwiRk9OVC1GQUNFLVNSQ1wiLFwiRk9OVC1GQUNFLVVSSVwiLFwiRk9OVC1GQUNFLUZPUk1BVFwiLFwiRk9OVC1GQUNFLU5BTUVcIixcIk1JU1NJTkctR0xZUEhcIl0seT1bXSxiPVtdLHc9XCJcIixFPXQuZG9jdW1lbnRFbGVtZW50LFM9eS5pbmRleE9mfHxmdW5jdGlvbihlKXtmb3IodmFyIHQ9dGhpcy5sZW5ndGg7dC0tJiZ0aGlzW3RdIT09ZTspO3JldHVybiB0fSx4PW4ucHJvdG90eXBlLFQ9eC5oYXNPd25Qcm9wZXJ0eSxOPXguaXNQcm90b3R5cGVPZixDPW4uZGVmaW5lUHJvcGVydHksaz1uLmdldE93blByb3BlcnR5RGVzY3JpcHRvcixMPW4uZ2V0T3duUHJvcGVydHlOYW1lcyxBPW4uZ2V0UHJvdG90eXBlT2YsTz1uLnNldFByb3RvdHlwZU9mLE09ISFuLl9fcHJvdG9fXyxfPW4uY3JlYXRlfHxmdW5jdGlvbiB2dChlKXtyZXR1cm4gZT8odnQucHJvdG90eXBlPWUsbmV3IHZ0KTp0aGlzfSxEPU98fChNP2Z1bmN0aW9uKGUsdCl7cmV0dXJuIGUuX19wcm90b19fPXQsZX06TCYmaz9mdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSx0KXtmb3IodmFyIG4scj1MKHQpLGk9MCxzPXIubGVuZ3RoO2k8cztpKyspbj1yW2ldLFQuY2FsbChlLG4pfHxDKGUsbixrKHQsbikpfXJldHVybiBmdW5jdGlvbih0LG4pe2RvIGUodCxuKTt3aGlsZSgobj1BKG4pKSYmIU4uY2FsbChuLHQpKTtyZXR1cm4gdH19KCk6ZnVuY3Rpb24oZSx0KXtmb3IodmFyIG4gaW4gdCllW25dPXRbbl07cmV0dXJuIGV9KSxQPWUuTXV0YXRpb25PYnNlcnZlcnx8ZS5XZWJLaXRNdXRhdGlvbk9ic2VydmVyLEg9KGUuSFRNTEVsZW1lbnR8fGUuRWxlbWVudHx8ZS5Ob2RlKS5wcm90b3R5cGUsQj0hTi5jYWxsKEgsRSksaj1CP2Z1bmN0aW9uKGUpe3JldHVybiBlLm5vZGVUeXBlPT09MX06ZnVuY3Rpb24oZSl7cmV0dXJuIE4uY2FsbChILGUpfSxGPUImJltdLEk9SC5jbG9uZU5vZGUscT1ILnNldEF0dHJpYnV0ZSxSPUgucmVtb3ZlQXR0cmlidXRlLFU9dC5jcmVhdGVFbGVtZW50LHo9UCYme2F0dHJpYnV0ZXM6ITAsY2hhcmFjdGVyRGF0YTohMCxhdHRyaWJ1dGVPbGRWYWx1ZTohMH0sVz1QfHxmdW5jdGlvbihlKXtKPSExLEUucmVtb3ZlRXZlbnRMaXN0ZW5lcihjLFcpfSxYLFY9ZS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fGUud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxlLm1velJlcXVlc3RBbmltYXRpb25GcmFtZXx8ZS5tc1JlcXVlc3RBbmltYXRpb25GcmFtZXx8ZnVuY3Rpb24oZSl7c2V0VGltZW91dChlLDEwKX0sJD0hMSxKPSEwLEs9ITAsUT0hMCxHLFksWixldCx0dCxudDtPfHxNPyh0dD1mdW5jdGlvbihlLHQpe04uY2FsbCh0LGUpfHxodChlLHQpfSxudD1odCk6KHR0PWZ1bmN0aW9uKGUsdCl7ZVtpXXx8KGVbaV09bighMCksaHQoZSx0KSl9LG50PXR0KSxCPyhKPSExLGZ1bmN0aW9uKCl7dmFyIGU9ayhILFwiYWRkRXZlbnRMaXN0ZW5lclwiKSx0PWUudmFsdWUsbj1mdW5jdGlvbihlKXt2YXIgdD1uZXcgQ3VzdG9tRXZlbnQoYyx7YnViYmxlczohMH0pO3QuYXR0ck5hbWU9ZSx0LnByZXZWYWx1ZT10aGlzLmdldEF0dHJpYnV0ZShlKSx0Lm5ld1ZhbHVlPW51bGwsdFtsXT10LmF0dHJDaGFuZ2U9MixSLmNhbGwodGhpcyxlKSx0aGlzLmRpc3BhdGNoRXZlbnQodCl9LHI9ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLmhhc0F0dHJpYnV0ZShlKSxyPW4mJnRoaXMuZ2V0QXR0cmlidXRlKGUpLGk9bmV3IEN1c3RvbUV2ZW50KGMse2J1YmJsZXM6ITB9KTtxLmNhbGwodGhpcyxlLHQpLGkuYXR0ck5hbWU9ZSxpLnByZXZWYWx1ZT1uP3I6bnVsbCxpLm5ld1ZhbHVlPXQsbj9pW2ZdPWkuYXR0ckNoYW5nZT0xOmlbYV09aS5hdHRyQ2hhbmdlPTAsdGhpcy5kaXNwYXRjaEV2ZW50KGkpfSxzPWZ1bmN0aW9uKGUpe3ZhciB0PWUuY3VycmVudFRhcmdldCxuPXRbaV0scj1lLnByb3BlcnR5TmFtZSxzO24uaGFzT3duUHJvcGVydHkocikmJihuPW5bcl0scz1uZXcgQ3VzdG9tRXZlbnQoYyx7YnViYmxlczohMH0pLHMuYXR0ck5hbWU9bi5uYW1lLHMucHJldlZhbHVlPW4udmFsdWV8fG51bGwscy5uZXdWYWx1ZT1uLnZhbHVlPXRbcl18fG51bGwscy5wcmV2VmFsdWU9PW51bGw/c1thXT1zLmF0dHJDaGFuZ2U9MDpzW2ZdPXMuYXR0ckNoYW5nZT0xLHQuZGlzcGF0Y2hFdmVudChzKSl9O2UudmFsdWU9ZnVuY3Rpb24oZSxvLHUpe2U9PT1jJiZ0aGlzLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayYmdGhpcy5zZXRBdHRyaWJ1dGUhPT1yJiYodGhpc1tpXT17Y2xhc3NOYW1lOntuYW1lOlwiY2xhc3NcIix2YWx1ZTp0aGlzLmNsYXNzTmFtZX19LHRoaXMuc2V0QXR0cmlidXRlPXIsdGhpcy5yZW1vdmVBdHRyaWJ1dGU9bix0LmNhbGwodGhpcyxcInByb3BlcnR5Y2hhbmdlXCIscykpLHQuY2FsbCh0aGlzLGUsbyx1KX0sQyhILFwiYWRkRXZlbnRMaXN0ZW5lclwiLGUpfSgpKTpQfHwoRS5hZGRFdmVudExpc3RlbmVyKGMsVyksRS5zZXRBdHRyaWJ1dGUoaSwxKSxFLnJlbW92ZUF0dHJpYnV0ZShpKSxKJiYoRz1mdW5jdGlvbihlKXt2YXIgdD10aGlzLG4scixzO2lmKHQ9PT1lLnRhcmdldCl7bj10W2ldLHRbaV09cj1aKHQpO2ZvcihzIGluIHIpe2lmKCEocyBpbiBuKSlyZXR1cm4gWSgwLHQscyxuW3NdLHJbc10sYSk7aWYocltzXSE9PW5bc10pcmV0dXJuIFkoMSx0LHMsbltzXSxyW3NdLGYpfWZvcihzIGluIG4paWYoIShzIGluIHIpKXJldHVybiBZKDIsdCxzLG5bc10scltzXSxsKX19LFk9ZnVuY3Rpb24oZSx0LG4scixpLHMpe3ZhciBvPXthdHRyQ2hhbmdlOmUsY3VycmVudFRhcmdldDp0LGF0dHJOYW1lOm4scHJldlZhbHVlOnIsbmV3VmFsdWU6aX07b1tzXT1lLGF0KG8pfSxaPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdCxuLHI9e30saT1lLmF0dHJpYnV0ZXMscz0wLG89aS5sZW5ndGg7czxvO3MrKyl0PWlbc10sbj10Lm5hbWUsbiE9PVwic2V0QXR0cmlidXRlXCImJihyW25dPXQudmFsdWUpO3JldHVybiByfSkpLHRbcl09ZnVuY3Rpb24obixyKXtwPW4udG9VcHBlckNhc2UoKSwkfHwoJD0hMCxQPyhldD1mdW5jdGlvbihlLHQpe2Z1bmN0aW9uIG4oZSx0KXtmb3IodmFyIG49MCxyPWUubGVuZ3RoO248cjt0KGVbbisrXSkpO31yZXR1cm4gbmV3IFAoZnVuY3Rpb24ocil7Zm9yKHZhciBpLHMsbz0wLHU9ci5sZW5ndGg7bzx1O28rKylpPXJbb10saS50eXBlPT09XCJjaGlsZExpc3RcIj8obihpLmFkZGVkTm9kZXMsZSksbihpLnJlbW92ZWROb2Rlcyx0KSk6KHM9aS50YXJnZXQsUSYmcy5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2smJmkuYXR0cmlidXRlTmFtZSE9PVwic3R5bGVcIiYmcy5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soaS5hdHRyaWJ1dGVOYW1lLGkub2xkVmFsdWUscy5nZXRBdHRyaWJ1dGUoaS5hdHRyaWJ1dGVOYW1lKSkpfSl9KHN0KHMpLHN0KG8pKSxldC5vYnNlcnZlKHQse2NoaWxkTGlzdDohMCxzdWJ0cmVlOiEwfSkpOihYPVtdLFYoZnVuY3Rpb24gRSgpe3doaWxlKFgubGVuZ3RoKVguc2hpZnQoKS5jYWxsKG51bGwsWC5zaGlmdCgpKTtWKEUpfSksdC5hZGRFdmVudExpc3RlbmVyKFwiRE9NTm9kZUluc2VydGVkXCIsZnQocykpLHQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTU5vZGVSZW1vdmVkXCIsZnQobykpKSx0LmFkZEV2ZW50TGlzdGVuZXIoaCxsdCksdC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLGx0KSx0LmNyZWF0ZUVsZW1lbnQ9ZnVuY3Rpb24oZSxuKXt2YXIgcj1VLmFwcGx5KHQsYXJndW1lbnRzKSxpPVwiXCIrZSxzPVMuY2FsbCh5LChuP3Y6ZCkrKG58fGkpLnRvVXBwZXJDYXNlKCkpLG89LTE8cztyZXR1cm4gbiYmKHIuc2V0QXR0cmlidXRlKFwiaXNcIixuPW4udG9Mb3dlckNhc2UoKSksbyYmKG89dXQoaS50b1VwcGVyQ2FzZSgpLG4pKSksUT0hdC5jcmVhdGVFbGVtZW50LmlubmVySFRNTEhlbHBlcixvJiZudChyLGJbc10pLHJ9LEguY2xvbmVOb2RlPWZ1bmN0aW9uKGUpe3ZhciB0PUkuY2FsbCh0aGlzLCEhZSksbj1vdCh0KTtyZXR1cm4tMTxuJiZudCh0LGJbbl0pLGUmJml0KHQucXVlcnlTZWxlY3RvckFsbCh3KSksdH0pO2lmKC0yPFMuY2FsbCh5LHYrcCkrUy5jYWxsKHksZCtwKSl0aHJvdyBuZXcgRXJyb3IoXCJBIFwiK24rXCIgdHlwZSBpcyBhbHJlYWR5IHJlZ2lzdGVyZWRcIik7aWYoIW0udGVzdChwKXx8LTE8Uy5jYWxsKGcscCkpdGhyb3cgbmV3IEVycm9yKFwiVGhlIHR5cGUgXCIrbitcIiBpcyBpbnZhbGlkXCIpO3ZhciBpPWZ1bmN0aW9uKCl7cmV0dXJuIGY/dC5jcmVhdGVFbGVtZW50KGwscCk6dC5jcmVhdGVFbGVtZW50KGwpfSxhPXJ8fHgsZj1ULmNhbGwoYSx1KSxsPWY/clt1XS50b1VwcGVyQ2FzZSgpOnAsYz15LnB1c2goKGY/djpkKStwKS0xLHA7cmV0dXJuIHc9dy5jb25jYXQody5sZW5ndGg/XCIsXCI6XCJcIixmP2wrJ1tpcz1cIicrbi50b0xvd2VyQ2FzZSgpKydcIl0nOmwpLGkucHJvdG90eXBlPWJbY109VC5jYWxsKGEsXCJwcm90b3R5cGVcIik/YS5wcm90b3R5cGU6XyhIKSxydCh0LnF1ZXJ5U2VsZWN0b3JBbGwodykscyksaX19KSh3aW5kb3csZG9jdW1lbnQsT2JqZWN0LFwicmVnaXN0ZXJFbGVtZW50XCIpOyIsIlxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTUgVGhlIEluY3JlbWVudGFsIERPTSBBdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMtSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDE1IFRoZSBJbmNyZW1lbnRhbCBET00gQXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTLUlTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKiAqL1xuZXhwb3J0cy5ub3RpZmljYXRpb25zID0ge1xuICAvKipcbiAgICogQ2FsbGVkIGFmdGVyIHBhdGNoIGhhcyBjb21wbGVhdGVkIHdpdGggYW55IE5vZGVzIHRoYXQgaGF2ZSBiZWVuIGNyZWF0ZWRcbiAgICogYW5kIGFkZGVkIHRvIHRoZSBET00uXG4gICAqIEB0eXBlIHs/ZnVuY3Rpb24oQXJyYXk8IU5vZGU+KX1cbiAgICovXG4gIG5vZGVzQ3JlYXRlZDogbnVsbCxcblxuICAvKipcbiAgICogQ2FsbGVkIGFmdGVyIHBhdGNoIGhhcyBjb21wbGVhdGVkIHdpdGggYW55IE5vZGVzIHRoYXQgaGF2ZSBiZWVuIHJlbW92ZWRcbiAgICogZnJvbSB0aGUgRE9NLlxuICAgKiBOb3RlIGl0J3MgYW4gYXBwbGljYXRpb25zIHJlc3BvbnNpYmlsaXR5IHRvIGhhbmRsZSBhbnkgY2hpbGROb2Rlcy5cbiAgICogQHR5cGUgez9mdW5jdGlvbihBcnJheTwhTm9kZT4pfVxuICAgKi9cbiAgbm9kZXNEZWxldGVkOiBudWxsXG59O1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDE1IFRoZSBJbmNyZW1lbnRhbCBET00gQXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTLUlTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogU2ltaWxhciB0byB0aGUgYnVpbHQtaW4gVHJlZXdhbGtlciBjbGFzcywgYnV0IHNpbXBsaWZpZWQgYW5kIGFsbG93cyBkaXJlY3RcbiAqIGFjY2VzcyB0byBtb2RpZnkgdGhlIGN1cnJlbnROb2RlIHByb3BlcnR5LlxuICogQHBhcmFtIHshRWxlbWVudHwhRG9jdW1lbnRGcmFnbWVudH0gbm9kZSBUaGUgcm9vdCBOb2RlIG9mIHRoZSBzdWJ0cmVlIHRoZVxuICogICAgIHdhbGtlciBzaG91bGQgc3RhcnQgdHJhdmVyc2luZy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBUcmVlV2Fsa2VyKG5vZGUpIHtcbiAgLyoqXG4gICAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IHBhcmVudCBub2RlLiBUaGlzIGlzIG5lY2Vzc2FyeSBhcyB0aGUgdHJhdmVyc2FsXG4gICAqIG1ldGhvZHMgbWF5IHRyYXZlcnNlIHBhc3QgdGhlIGxhc3QgY2hpbGQgYW5kIHdlIHN0aWxsIG5lZWQgYSB3YXkgdG8gZ2V0XG4gICAqIGJhY2sgdG8gdGhlIHBhcmVudC5cbiAgICogQGNvbnN0IEBwcml2YXRlIHshQXJyYXk8IU5vZGU+fVxuICAgKi9cbiAgdGhpcy5zdGFja18gPSBbXTtcblxuICAvKipcbiAgICogQGNvbnN0IHshRWxlbWVudHwhRG9jdW1lbnRGcmFnbWVudH1cbiAgICovXG4gIHRoaXMucm9vdCA9IG5vZGU7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHs/Tm9kZX1cbiAgICovXG4gIHRoaXMuY3VycmVudE5vZGUgPSBub2RlO1xufVxuXG4vKipcbiAqIEByZXR1cm4geyFOb2RlfSBUaGUgY3VycmVudCBwYXJlbnQgb2YgdGhlIGN1cnJlbnQgbG9jYXRpb24gaW4gdGhlIHN1YnRyZWUuXG4gKi9cblRyZWVXYWxrZXIucHJvdG90eXBlLmdldEN1cnJlbnRQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnN0YWNrX1t0aGlzLnN0YWNrXy5sZW5ndGggLSAxXTtcbn07XG5cbi8qKlxuICogQ2hhbmdlcyB0aGUgY3VycmVudCBsb2NhdGlvbiB0aGUgZmlyc3RDaGlsZCBvZiB0aGUgY3VycmVudCBsb2NhdGlvbi5cbiAqL1xuVHJlZVdhbGtlci5wcm90b3R5cGUuZmlyc3RDaGlsZCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5zdGFja18ucHVzaCh0aGlzLmN1cnJlbnROb2RlKTtcbiAgdGhpcy5jdXJyZW50Tm9kZSA9IHRoaXMuY3VycmVudE5vZGUuZmlyc3RDaGlsZDtcbn07XG5cbi8qKlxuICogQ2hhbmdlcyB0aGUgY3VycmVudCBsb2NhdGlvbiB0aGUgbmV4dFNpYmxpbmcgb2YgdGhlIGN1cnJlbnQgbG9jYXRpb24uXG4gKi9cblRyZWVXYWxrZXIucHJvdG90eXBlLm5leHRTaWJsaW5nID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmN1cnJlbnROb2RlID0gdGhpcy5jdXJyZW50Tm9kZS5uZXh0U2libGluZztcbn07XG5cbi8qKlxuICogQ2hhbmdlcyB0aGUgY3VycmVudCBsb2NhdGlvbiB0aGUgcGFyZW50Tm9kZSBvZiB0aGUgY3VycmVudCBsb2NhdGlvbi5cbiAqL1xuVHJlZVdhbGtlci5wcm90b3R5cGUucGFyZW50Tm9kZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jdXJyZW50Tm9kZSA9IHRoaXMuc3RhY2tfLnBvcCgpO1xufTtcblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgc3RhdGUgb2YgYSBwYXRjaC5cbiAqIEBwYXJhbSB7IUVsZW1lbnR8IURvY3VtZW50RnJhZ21lbnR9IG5vZGUgVGhlIHJvb3QgTm9kZSBvZiB0aGUgc3VidHJlZSB0aGVcbiAqICAgICBpcyBmb3IuXG4gKiBAcGFyYW0gez9Db250ZXh0fSBwcmV2Q29udGV4dCBUaGUgcHJldmlvdXMgY29udGV4dC5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDb250ZXh0KG5vZGUsIHByZXZDb250ZXh0KSB7XG4gIC8qKlxuICAgKiBAY29uc3Qge1RyZWVXYWxrZXJ9XG4gICAqL1xuICB0aGlzLndhbGtlciA9IG5ldyBUcmVlV2Fsa2VyKG5vZGUpO1xuXG4gIC8qKlxuICAgKiBAY29uc3Qge0RvY3VtZW50fVxuICAgKi9cbiAgdGhpcy5kb2MgPSBub2RlLm93bmVyRG9jdW1lbnQ7XG5cbiAgLyoqXG4gICAqIEtlZXBzIHRyYWNrIG9mIHdoYXQgbmFtZXNwYWNlIHRvIGNyZWF0ZSBuZXcgRWxlbWVudHMgaW4uXG4gICAqIEBwcml2YXRlXG4gICAqIEBjb25zdCB7IUFycmF5PChzdHJpbmd8dW5kZWZpbmVkKT59XG4gICAqL1xuICB0aGlzLm5zU3RhY2tfID0gW3VuZGVmaW5lZF07XG5cbiAgLyoqXG4gICAqIEBjb25zdCB7P0NvbnRleHR9XG4gICAqL1xuICB0aGlzLnByZXZDb250ZXh0ID0gcHJldkNvbnRleHQ7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHsoQXJyYXk8IU5vZGU+fHVuZGVmaW5lZCl9XG4gICAqL1xuICB0aGlzLmNyZWF0ZWQgPSBleHBvcnRzLm5vdGlmaWNhdGlvbnMubm9kZXNDcmVhdGVkICYmIFtdO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7KEFycmF5PCFOb2RlPnx1bmRlZmluZWQpfVxuICAgKi9cbiAgdGhpcy5kZWxldGVkID0gZXhwb3J0cy5ub3RpZmljYXRpb25zLm5vZGVzRGVsZXRlZCAmJiBbXTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHsoc3RyaW5nfHVuZGVmaW5lZCl9IFRoZSBjdXJyZW50IG5hbWVzcGFjZSB0byBjcmVhdGUgRWxlbWVudHMgaW4uXG4gKi9cbkNvbnRleHQucHJvdG90eXBlLmdldEN1cnJlbnROYW1lc3BhY2UgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLm5zU3RhY2tfW3RoaXMubnNTdGFja18ubGVuZ3RoIC0gMV07XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbmFtZXNwYWNlIFRoZSBuYW1lc3BhY2UgdG8gZW50ZXIuXG4gKi9cbkNvbnRleHQucHJvdG90eXBlLmVudGVyTmFtZXNwYWNlID0gZnVuY3Rpb24gKG5hbWVzcGFjZSkge1xuICB0aGlzLm5zU3RhY2tfLnB1c2gobmFtZXNwYWNlKTtcbn07XG5cbi8qKlxuICogRXhpdHMgdGhlIGN1cnJlbnQgbmFtZXNwYWNlXG4gKi9cbkNvbnRleHQucHJvdG90eXBlLmV4aXROYW1lc3BhY2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubnNTdGFja18ucG9wKCk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7IU5vZGV9IG5vZGVcbiAqL1xuQ29udGV4dC5wcm90b3R5cGUubWFya0NyZWF0ZWQgPSBmdW5jdGlvbiAobm9kZSkge1xuICBpZiAodGhpcy5jcmVhdGVkKSB7XG4gICAgdGhpcy5jcmVhdGVkLnB1c2gobm9kZSk7XG4gIH1cbn07XG5cbi8qKlxuICogQHBhcmFtIHshTm9kZX0gbm9kZVxuICovXG5Db250ZXh0LnByb3RvdHlwZS5tYXJrRGVsZXRlZCA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIGlmICh0aGlzLmRlbGV0ZWQpIHtcbiAgICB0aGlzLmRlbGV0ZWQucHVzaChub2RlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBOb3RpZmllcyBhYm91dCBub2RlcyB0aGF0IHdlcmUgY3JlYXRlZCBkdXJpbmcgdGhlIHBhdGNoIG9wZWFyYXRpb24uXG4gKi9cbkNvbnRleHQucHJvdG90eXBlLm5vdGlmeUNoYW5nZXMgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmNyZWF0ZWQgJiYgdGhpcy5jcmVhdGVkLmxlbmd0aCA+IDApIHtcbiAgICBleHBvcnRzLm5vdGlmaWNhdGlvbnMubm9kZXNDcmVhdGVkKHRoaXMuY3JlYXRlZCk7XG4gIH1cblxuICBpZiAodGhpcy5kZWxldGVkICYmIHRoaXMuZGVsZXRlZC5sZW5ndGggPiAwKSB7XG4gICAgZXhwb3J0cy5ub3RpZmljYXRpb25zLm5vZGVzRGVsZXRlZCh0aGlzLmRlbGV0ZWQpO1xuICB9XG59O1xuXG4vKipcbiAqIFRoZSBjdXJyZW50IGNvbnRleHQuXG4gKiBAdHlwZSB7P0NvbnRleHR9XG4gKi9cbnZhciBjb250ZXh0O1xuXG4vKipcbiAqIEVudGVycyBhIG5ldyBwYXRjaCBjb250ZXh0LlxuICogQHBhcmFtIHshRWxlbWVudHwhRG9jdW1lbnRGcmFnbWVudH0gbm9kZVxuICovXG52YXIgZW50ZXJDb250ZXh0ID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgY29udGV4dCA9IG5ldyBDb250ZXh0KG5vZGUsIGNvbnRleHQpO1xufTtcblxuLyoqXG4gKiBSZXN0b3JlcyB0aGUgcHJldmlvdXMgcGF0Y2ggY29udGV4dC5cbiAqL1xudmFyIHJlc3RvcmVDb250ZXh0ID0gZnVuY3Rpb24gKCkge1xuICBjb250ZXh0ID0gY29udGV4dC5wcmV2Q29udGV4dDtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgY3VycmVudCBwYXRjaCBjb250ZXh0LlxuICogQHJldHVybiB7P0NvbnRleHR9XG4gKi9cbnZhciBnZXRDb250ZXh0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY29udGV4dDtcbn07XG5cbi8qKlxuICogQ29weXJpZ2h0IDIwMTUgVGhlIEluY3JlbWVudGFsIERPTSBBdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMtSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBBIGNhY2hlZCByZWZlcmVuY2UgdG8gdGhlIGhhc093blByb3BlcnR5IGZ1bmN0aW9uLlxuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgY2FjaGVkIHJlZmVyZW5jZSB0byB0aGUgY3JlYXRlIGZ1bmN0aW9uLlxuICovXG52YXIgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcblxuLyoqXG4gKiBVc2VkIHRvIHByZXZlbnQgcHJvcGVydHkgY29sbGlzaW9ucyBiZXR3ZWVuIG91ciBcIm1hcFwiIGFuZCBpdHMgcHJvdG90eXBlLlxuICogQHBhcmFtIHshT2JqZWN0PHN0cmluZywgKj59IG1hcCBUaGUgbWFwIHRvIGNoZWNrLlxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IFRoZSBwcm9wZXJ0eSB0byBjaGVjay5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgbWFwIGhhcyBwcm9wZXJ0eS5cbiAqL1xudmFyIGhhcyA9IGZ1bmN0aW9uIChtYXAsIHByb3BlcnR5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG1hcCwgcHJvcGVydHkpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIG1hcCBvYmplY3Qgd2l0aG91dCBhIHByb3RvdHlwZS5cbiAqIEByZXR1cm4geyFPYmplY3R9XG4gKi9cbnZhciBjcmVhdGVNYXAgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjcmVhdGUobnVsbCk7XG59O1xuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIGluZm9ybWF0aW9uIG5lZWRlZCB0byBwZXJmb3JtIGRpZmZzIGZvciBhIGdpdmVuIERPTSBub2RlLlxuICogQHBhcmFtIHshc3RyaW5nfSBub2RlTmFtZVxuICogQHBhcmFtIHs/c3RyaW5nPX0ga2V5XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTm9kZURhdGEobm9kZU5hbWUsIGtleSkge1xuICAvKipcbiAgICogVGhlIGF0dHJpYnV0ZXMgYW5kIHRoZWlyIHZhbHVlcy5cbiAgICogQGNvbnN0XG4gICAqL1xuICB0aGlzLmF0dHJzID0gY3JlYXRlTWFwKCk7XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGF0dHJpYnV0ZSBuYW1lL3ZhbHVlIHBhaXJzLCB1c2VkIGZvciBxdWlja2x5IGRpZmZpbmcgdGhlXG4gICAqIGluY29tbWluZyBhdHRyaWJ1dGVzIHRvIHNlZSBpZiB0aGUgRE9NIG5vZGUncyBhdHRyaWJ1dGVzIG5lZWQgdG8gYmVcbiAgICogdXBkYXRlZC5cbiAgICogQGNvbnN0IHtBcnJheTwqPn1cbiAgICovXG4gIHRoaXMuYXR0cnNBcnIgPSBbXTtcblxuICAvKipcbiAgICogVGhlIGluY29taW5nIGF0dHJpYnV0ZXMgZm9yIHRoaXMgTm9kZSwgYmVmb3JlIHRoZXkgYXJlIHVwZGF0ZWQuXG4gICAqIEBjb25zdCB7IU9iamVjdDxzdHJpbmcsICo+fVxuICAgKi9cbiAgdGhpcy5uZXdBdHRycyA9IGNyZWF0ZU1hcCgpO1xuXG4gIC8qKlxuICAgKiBUaGUga2V5IHVzZWQgdG8gaWRlbnRpZnkgdGhpcyBub2RlLCB1c2VkIHRvIHByZXNlcnZlIERPTSBub2RlcyB3aGVuIHRoZXlcbiAgICogbW92ZSB3aXRoaW4gdGhlaXIgcGFyZW50LlxuICAgKiBAY29uc3RcbiAgICovXG4gIHRoaXMua2V5ID0ga2V5O1xuXG4gIC8qKlxuICAgKiBLZWVwcyB0cmFjayBvZiBjaGlsZHJlbiB3aXRoaW4gdGhpcyBub2RlIGJ5IHRoZWlyIGtleS5cbiAgICogez9PYmplY3Q8c3RyaW5nLCAhRWxlbWVudD59XG4gICAqL1xuICB0aGlzLmtleU1hcCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRoZSBrZXlNYXAgaXMgY3VycmVudGx5IHZhbGlkLlxuICAgKiB7Ym9vbGVhbn1cbiAgICovXG4gIHRoaXMua2V5TWFwVmFsaWQgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgbGFzdCBjaGlsZCB0byBoYXZlIGJlZW4gdmlzaXRlZCB3aXRoaW4gdGhlIGN1cnJlbnQgcGFzcy5cbiAgICogQHR5cGUgez9Ob2RlfVxuICAgKi9cbiAgdGhpcy5sYXN0VmlzaXRlZENoaWxkID0gbnVsbDtcblxuICAvKipcbiAgICogVGhlIG5vZGUgbmFtZSBmb3IgdGhpcyBub2RlLlxuICAgKiBAY29uc3Qge3N0cmluZ31cbiAgICovXG4gIHRoaXMubm9kZU5hbWUgPSBub2RlTmFtZTtcblxuICAvKipcbiAgICogQHR5cGUgez9zdHJpbmd9XG4gICAqL1xuICB0aGlzLnRleHQgPSBudWxsO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGEgTm9kZURhdGEgb2JqZWN0IGZvciBhIE5vZGUuXG4gKlxuICogQHBhcmFtIHtOb2RlfSBub2RlIFRoZSBub2RlIHRvIGluaXRpYWxpemUgZGF0YSBmb3IuXG4gKiBAcGFyYW0ge3N0cmluZ30gbm9kZU5hbWUgVGhlIG5vZGUgbmFtZSBvZiBub2RlLlxuICogQHBhcmFtIHs/c3RyaW5nPX0ga2V5IFRoZSBrZXkgdGhhdCBpZGVudGlmaWVzIHRoZSBub2RlLlxuICogQHJldHVybiB7IU5vZGVEYXRhfSBUaGUgbmV3bHkgaW5pdGlhbGl6ZWQgZGF0YSBvYmplY3RcbiAqL1xudmFyIGluaXREYXRhID0gZnVuY3Rpb24gKG5vZGUsIG5vZGVOYW1lLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBuZXcgTm9kZURhdGEobm9kZU5hbWUsIGtleSk7XG4gIG5vZGVbJ19faW5jcmVtZW50YWxET01EYXRhJ10gPSBkYXRhO1xuICByZXR1cm4gZGF0YTtcbn07XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBOb2RlRGF0YSBvYmplY3QgZm9yIGEgTm9kZSwgY3JlYXRpbmcgaXQgaWYgbmVjZXNzYXJ5LlxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSBUaGUgbm9kZSB0byByZXRyaWV2ZSB0aGUgZGF0YSBmb3IuXG4gKiBAcmV0dXJuIHshTm9kZURhdGF9IFRoZSBOb2RlRGF0YSBmb3IgdGhpcyBOb2RlLlxuICovXG52YXIgZ2V0RGF0YSA9IGZ1bmN0aW9uIChub2RlKSB7XG4gIHZhciBkYXRhID0gbm9kZVsnX19pbmNyZW1lbnRhbERPTURhdGEnXTtcblxuICBpZiAoIWRhdGEpIHtcbiAgICB2YXIgbm9kZU5hbWUgPSBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGtleSA9IG51bGw7XG5cbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgIGtleSA9IG5vZGUuZ2V0QXR0cmlidXRlKCdrZXknKTtcbiAgICB9XG5cbiAgICBkYXRhID0gaW5pdERhdGEobm9kZSwgbm9kZU5hbWUsIGtleSk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn07XG5cbi8qKlxuICogQ29weXJpZ2h0IDIwMTUgVGhlIEluY3JlbWVudGFsIERPTSBBdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMtSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuZXhwb3J0cy5zeW1ib2xzID0ge1xuICBkZWZhdWx0OiAnX19kZWZhdWx0JyxcblxuICBwbGFjZWhvbGRlcjogJ19fcGxhY2Vob2xkZXInXG59O1xuXG4vKipcbiAqIEFwcGxpZXMgYW4gYXR0cmlidXRlIG9yIHByb3BlcnR5IHRvIGEgZ2l2ZW4gRWxlbWVudC4gSWYgdGhlIHZhbHVlIGlzIG51bGxcbiAqIG9yIHVuZGVmaW5lZCwgaXQgaXMgcmVtb3ZlZCBmcm9tIHRoZSBFbGVtZW50LiBPdGhlcndpc2UsIHRoZSB2YWx1ZSBpcyBzZXRcbiAqIGFzIGFuIGF0dHJpYnV0ZS5cbiAqIEBwYXJhbSB7IUVsZW1lbnR9IGVsXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgYXR0cmlidXRlJ3MgbmFtZS5cbiAqIEBwYXJhbSB7Pyhib29sZWFufG51bWJlcnxzdHJpbmcpPX0gdmFsdWUgVGhlIGF0dHJpYnV0ZSdzIHZhbHVlLlxuICovXG5leHBvcnRzLmFwcGx5QXR0ciA9IGZ1bmN0aW9uIChlbCwgbmFtZSwgdmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICBlbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBBcHBsaWVzIGEgcHJvcGVydHkgdG8gYSBnaXZlbiBFbGVtZW50LlxuICogQHBhcmFtIHshRWxlbWVudH0gZWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBwcm9wZXJ0eSdzIG5hbWUuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwcm9wZXJ0eSdzIHZhbHVlLlxuICovXG5leHBvcnRzLmFwcGx5UHJvcCA9IGZ1bmN0aW9uIChlbCwgbmFtZSwgdmFsdWUpIHtcbiAgZWxbbmFtZV0gPSB2YWx1ZTtcbn07XG5cbi8qKlxuICogQXBwbGllcyBhIHN0eWxlIHRvIGFuIEVsZW1lbnQuIE5vIHZlbmRvciBwcmVmaXggZXhwYW5zaW9uIGlzIGRvbmUgZm9yXG4gKiBwcm9wZXJ0eSBuYW1lcy92YWx1ZXMuXG4gKiBAcGFyYW0geyFFbGVtZW50fSBlbFxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIGF0dHJpYnV0ZSdzIG5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ3xPYmplY3Q8c3RyaW5nLHN0cmluZz59IHN0eWxlIFRoZSBzdHlsZSB0byBzZXQuIEVpdGhlciBhXG4gKiAgICAgc3RyaW5nIG9mIGNzcyBvciBhbiBvYmplY3QgY29udGFpbmluZyBwcm9wZXJ0eS12YWx1ZSBwYWlycy5cbiAqL1xudmFyIGFwcGx5U3R5bGUgPSBmdW5jdGlvbiAoZWwsIG5hbWUsIHN0eWxlKSB7XG4gIGlmICh0eXBlb2Ygc3R5bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgZWwuc3R5bGUuY3NzVGV4dCA9IHN0eWxlO1xuICB9IGVsc2Uge1xuICAgIGVsLnN0eWxlLmNzc1RleHQgPSAnJztcbiAgICB2YXIgZWxTdHlsZSA9IGVsLnN0eWxlO1xuXG4gICAgZm9yICh2YXIgcHJvcCBpbiBzdHlsZSkge1xuICAgICAgaWYgKGhhcyhzdHlsZSwgcHJvcCkpIHtcbiAgICAgICAgZWxTdHlsZVtwcm9wXSA9IHN0eWxlW3Byb3BdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBVcGRhdGVzIGEgc2luZ2xlIGF0dHJpYnV0ZSBvbiBhbiBFbGVtZW50LlxuICogQHBhcmFtIHshRWxlbWVudH0gZWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBhdHRyaWJ1dGUncyBuYW1lLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgYXR0cmlidXRlJ3MgdmFsdWUuIElmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3Qgb3JcbiAqICAgICBmdW5jdGlvbiBpdCBpcyBzZXQgb24gdGhlIEVsZW1lbnQsIG90aGVyd2lzZSwgaXQgaXMgc2V0IGFzIGFuIEhUTUxcbiAqICAgICBhdHRyaWJ1dGUuXG4gKi9cbnZhciBhcHBseUF0dHJpYnV0ZVR5cGVkID0gZnVuY3Rpb24gKGVsLCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcblxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV4cG9ydHMuYXBwbHlQcm9wKGVsLCBuYW1lLCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgZXhwb3J0cy5hcHBseUF0dHIoZWwsIG5hbWUsIC8qKiBAdHlwZSB7Pyhib29sZWFufG51bWJlcnxzdHJpbmcpfSAqL3ZhbHVlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxscyB0aGUgYXBwcm9wcmlhdGUgYXR0cmlidXRlIG11dGF0b3IgZm9yIHRoaXMgYXR0cmlidXRlLlxuICogQHBhcmFtIHshRWxlbWVudH0gZWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBhdHRyaWJ1dGUncyBuYW1lLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgYXR0cmlidXRlJ3MgdmFsdWUuXG4gKi9cbnZhciB1cGRhdGVBdHRyaWJ1dGUgPSBmdW5jdGlvbiAoZWwsIG5hbWUsIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gZ2V0RGF0YShlbCk7XG4gIHZhciBhdHRycyA9IGRhdGEuYXR0cnM7XG5cbiAgaWYgKGF0dHJzW25hbWVdID09PSB2YWx1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBtdXRhdG9yID0gZXhwb3J0cy5hdHRyaWJ1dGVzW25hbWVdIHx8IGV4cG9ydHMuYXR0cmlidXRlc1tleHBvcnRzLnN5bWJvbHMuZGVmYXVsdF07XG4gIG11dGF0b3IoZWwsIG5hbWUsIHZhbHVlKTtcblxuICBhdHRyc1tuYW1lXSA9IHZhbHVlO1xufTtcblxuLyoqXG4gKiBBIHB1YmxpY2x5IG11dGFibGUgb2JqZWN0IHRvIHByb3ZpZGUgY3VzdG9tIG11dGF0b3JzIGZvciBhdHRyaWJ1dGVzLlxuICogQGNvbnN0IHshT2JqZWN0PHN0cmluZywgZnVuY3Rpb24oIUVsZW1lbnQsIHN0cmluZywgKik+fVxuICovXG5leHBvcnRzLmF0dHJpYnV0ZXMgPSBjcmVhdGVNYXAoKTtcblxuLy8gU3BlY2lhbCBnZW5lcmljIG11dGF0b3IgdGhhdCdzIGNhbGxlZCBmb3IgYW55IGF0dHJpYnV0ZSB0aGF0IGRvZXMgbm90XG4vLyBoYXZlIGEgc3BlY2lmaWMgbXV0YXRvci5cbmV4cG9ydHMuYXR0cmlidXRlc1tleHBvcnRzLnN5bWJvbHMuZGVmYXVsdF0gPSBhcHBseUF0dHJpYnV0ZVR5cGVkO1xuXG5leHBvcnRzLmF0dHJpYnV0ZXNbZXhwb3J0cy5zeW1ib2xzLnBsYWNlaG9sZGVyXSA9IGZ1bmN0aW9uICgpIHt9O1xuXG5leHBvcnRzLmF0dHJpYnV0ZXNbJ3N0eWxlJ10gPSBhcHBseVN0eWxlO1xuXG52YXIgU1ZHX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcblxuLyoqXG4gKiBFbnRlcnMgYSB0YWcsIGNoZWNraW5nIHRvIHNlZSBpZiBpdCBpcyBhIG5hbWVzcGFjZSBib3VuZGFyeSwgYW5kIGlmIHNvLFxuICogdXBkYXRlcyB0aGUgY3VycmVudCBuYW1lc3BhY2UuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSB0YWcgdG8gZW50ZXIuXG4gKi9cbnZhciBlbnRlclRhZyA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgaWYgKHRhZyA9PT0gJ3N2ZycpIHtcbiAgICBnZXRDb250ZXh0KCkuZW50ZXJOYW1lc3BhY2UoU1ZHX05TKTtcbiAgfSBlbHNlIGlmICh0YWcgPT09ICdmb3JlaWduT2JqZWN0Jykge1xuICAgIGdldENvbnRleHQoKS5lbnRlck5hbWVzcGFjZSh1bmRlZmluZWQpO1xuICB9XG59O1xuXG4vKipcbiAqIEV4aXRzIGEgdGFnLCBjaGVja2luZyB0byBzZWUgaWYgaXQgaXMgYSBuYW1lc3BhY2UgYm91bmRhcnksIGFuZCBpZiBzbyxcbiAqIHVwZGF0ZXMgdGhlIGN1cnJlbnQgbmFtZXNwYWNlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgdGFnIHRvIGVudGVyLlxuICovXG52YXIgZXhpdFRhZyA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgaWYgKHRhZyA9PT0gJ3N2ZycgfHwgdGFnID09PSAnZm9yZWlnbk9iamVjdCcpIHtcbiAgICBnZXRDb250ZXh0KCkuZXhpdE5hbWVzcGFjZSgpO1xuICB9XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIG5hbWVzcGFjZSB0byBjcmVhdGUgYW4gZWxlbWVudCAob2YgYSBnaXZlbiB0YWcpIGluLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgdGFnIHRvIGdldCB0aGUgbmFtZXNwYWNlIGZvci5cbiAqIEByZXR1cm4geyhzdHJpbmd8dW5kZWZpbmVkKX0gVGhlIG5hbWVzcGFjZSB0byBjcmVhdGUgdGhlIHRhZyBpbi5cbiAqL1xudmFyIGdldE5hbWVzcGFjZUZvclRhZyA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgaWYgKHRhZyA9PT0gJ3N2ZycpIHtcbiAgICByZXR1cm4gU1ZHX05TO1xuICB9XG5cbiAgcmV0dXJuIGdldENvbnRleHQoKS5nZXRDdXJyZW50TmFtZXNwYWNlKCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gRWxlbWVudC5cbiAqIEBwYXJhbSB7RG9jdW1lbnR9IGRvYyBUaGUgZG9jdW1lbnQgd2l0aCB3aGljaCB0byBjcmVhdGUgdGhlIEVsZW1lbnQuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSB0YWcgZm9yIHRoZSBFbGVtZW50LlxuICogQHBhcmFtIHs/c3RyaW5nPX0ga2V5IEEga2V5IHRvIGlkZW50aWZ5IHRoZSBFbGVtZW50LlxuICogQHBhcmFtIHs/QXJyYXk8Kj49fSBzdGF0aWNzIEFuIGFycmF5IG9mIGF0dHJpYnV0ZSBuYW1lL3ZhbHVlIHBhaXJzIG9mXG4gKiAgICAgdGhlIHN0YXRpYyBhdHRyaWJ1dGVzIGZvciB0aGUgRWxlbWVudC5cbiAqIEByZXR1cm4geyFFbGVtZW50fVxuICovXG52YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIChkb2MsIHRhZywga2V5LCBzdGF0aWNzKSB7XG4gIHZhciBuYW1lc3BhY2UgPSBnZXROYW1lc3BhY2VGb3JUYWcodGFnKTtcbiAgdmFyIGVsO1xuXG4gIGlmIChuYW1lc3BhY2UpIHtcbiAgICBlbCA9IGRvYy5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlLCB0YWcpO1xuICB9IGVsc2Uge1xuICAgIGVsID0gZG9jLmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgfVxuXG4gIGluaXREYXRhKGVsLCB0YWcsIGtleSk7XG5cbiAgaWYgKHN0YXRpY3MpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXRpY3MubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIHVwZGF0ZUF0dHJpYnV0ZShlbCwgLyoqIEB0eXBlIHshc3RyaW5nfSovc3RhdGljc1tpXSwgc3RhdGljc1tpICsgMV0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIE5vZGUsIGVpdGhlciBhIFRleHQgb3IgYW4gRWxlbWVudCBkZXBlbmRpbmcgb24gdGhlIG5vZGUgbmFtZVxuICogcHJvdmlkZWQuXG4gKiBAcGFyYW0ge0RvY3VtZW50fSBkb2MgVGhlIGRvY3VtZW50IHdpdGggd2hpY2ggdG8gY3JlYXRlIHRoZSBOb2RlLlxuICogQHBhcmFtIHtzdHJpbmd9IG5vZGVOYW1lIFRoZSB0YWcgaWYgY3JlYXRpbmcgYW4gZWxlbWVudCBvciAjdGV4dCB0byBjcmVhdGVcbiAqICAgICBhIFRleHQuXG4gKiBAcGFyYW0gez9zdHJpbmc9fSBrZXkgQSBrZXkgdG8gaWRlbnRpZnkgdGhlIEVsZW1lbnQuXG4gKiBAcGFyYW0gez9BcnJheTwqPj19IHN0YXRpY3MgVGhlIHN0YXRpYyBkYXRhIHRvIGluaXRpYWxpemUgdGhlIE5vZGVcbiAqICAgICB3aXRoLiBGb3IgYW4gRWxlbWVudCwgYW4gYXJyYXkgb2YgYXR0cmlidXRlIG5hbWUvdmFsdWUgcGFpcnMgb2ZcbiAqICAgICB0aGUgc3RhdGljIGF0dHJpYnV0ZXMgZm9yIHRoZSBFbGVtZW50LlxuICogQHJldHVybiB7IU5vZGV9XG4gKi9cbnZhciBjcmVhdGVOb2RlID0gZnVuY3Rpb24gKGRvYywgbm9kZU5hbWUsIGtleSwgc3RhdGljcykge1xuICBpZiAobm9kZU5hbWUgPT09ICcjdGV4dCcpIHtcbiAgICByZXR1cm4gZG9jLmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgfVxuXG4gIHJldHVybiBjcmVhdGVFbGVtZW50KGRvYywgbm9kZU5hbWUsIGtleSwgc3RhdGljcyk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXBwaW5nIHRoYXQgY2FuIGJlIHVzZWQgdG8gbG9vayB1cCBjaGlsZHJlbiB1c2luZyBhIGtleS5cbiAqIEBwYXJhbSB7IU5vZGV9IGVsXG4gKiBAcmV0dXJuIHshT2JqZWN0PHN0cmluZywgIUVsZW1lbnQ+fSBBIG1hcHBpbmcgb2Yga2V5cyB0byB0aGUgY2hpbGRyZW4gb2YgdGhlXG4gKiAgICAgRWxlbWVudC5cbiAqL1xudmFyIGNyZWF0ZUtleU1hcCA9IGZ1bmN0aW9uIChlbCkge1xuICB2YXIgbWFwID0gY3JlYXRlTWFwKCk7XG4gIHZhciBjaGlsZHJlbiA9IGVsLmNoaWxkcmVuO1xuICB2YXIgY291bnQgPSBjaGlsZHJlbi5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSArPSAxKSB7XG4gICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgdmFyIGtleSA9IGdldERhdGEoY2hpbGQpLmtleTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIG1hcFtrZXldID0gY2hpbGQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1hcDtcbn07XG5cbi8qKlxuICogUmV0cmlldmVzIHRoZSBtYXBwaW5nIG9mIGtleSB0byBjaGlsZCBub2RlIGZvciBhIGdpdmVuIEVsZW1lbnQsIGNyZWF0aW5nIGl0XG4gKiBpZiBuZWNlc3NhcnkuXG4gKiBAcGFyYW0geyFOb2RlfSBlbFxuICogQHJldHVybiB7IU9iamVjdDxzdHJpbmcsICFOb2RlPn0gQSBtYXBwaW5nIG9mIGtleXMgdG8gY2hpbGQgRWxlbWVudHNcbiAqL1xudmFyIGdldEtleU1hcCA9IGZ1bmN0aW9uIChlbCkge1xuICB2YXIgZGF0YSA9IGdldERhdGEoZWwpO1xuXG4gIGlmICghZGF0YS5rZXlNYXApIHtcbiAgICBkYXRhLmtleU1hcCA9IGNyZWF0ZUtleU1hcChlbCk7XG4gIH1cblxuICByZXR1cm4gZGF0YS5rZXlNYXA7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlcyBhIGNoaWxkIGZyb20gdGhlIHBhcmVudCB3aXRoIHRoZSBnaXZlbiBrZXkuXG4gKiBAcGFyYW0geyFOb2RlfSBwYXJlbnRcbiAqIEBwYXJhbSB7P3N0cmluZz19IGtleVxuICogQHJldHVybiB7P0VsZW1lbnR9IFRoZSBjaGlsZCBjb3JyZXNwb25kaW5nIHRvIHRoZSBrZXkuXG4gKi9cbnZhciBnZXRDaGlsZCA9IGZ1bmN0aW9uIChwYXJlbnQsIGtleSkge1xuICByZXR1cm4gKC8qKiBAdHlwZSB7P0VsZW1lbnR9ICova2V5ICYmIGdldEtleU1hcChwYXJlbnQpW2tleV1cbiAgKTtcbn07XG5cbi8qKlxuICogUmVnaXN0ZXJzIGFuIGVsZW1lbnQgYXMgYmVpbmcgYSBjaGlsZC4gVGhlIHBhcmVudCB3aWxsIGtlZXAgdHJhY2sgb2YgdGhlXG4gKiBjaGlsZCB1c2luZyB0aGUga2V5LiBUaGUgY2hpbGQgY2FuIGJlIHJldHJpZXZlZCB1c2luZyB0aGUgc2FtZSBrZXkgdXNpbmdcbiAqIGdldEtleU1hcC4gVGhlIHByb3ZpZGVkIGtleSBzaG91bGQgYmUgdW5pcXVlIHdpdGhpbiB0aGUgcGFyZW50IEVsZW1lbnQuXG4gKiBAcGFyYW0geyFOb2RlfSBwYXJlbnQgVGhlIHBhcmVudCBvZiBjaGlsZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgQSBrZXkgdG8gaWRlbnRpZnkgdGhlIGNoaWxkIHdpdGguXG4gKiBAcGFyYW0geyFOb2RlfSBjaGlsZCBUaGUgY2hpbGQgdG8gcmVnaXN0ZXIuXG4gKi9cbnZhciByZWdpc3RlckNoaWxkID0gZnVuY3Rpb24gKHBhcmVudCwga2V5LCBjaGlsZCkge1xuICBnZXRLZXlNYXAocGFyZW50KVtrZXldID0gY2hpbGQ7XG59O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAvKipcbiAgKiBNYWtlcyBzdXJlIHRoYXQga2V5ZWQgRWxlbWVudCBtYXRjaGVzIHRoZSB0YWcgbmFtZSBwcm92aWRlZC5cbiAgKiBAcGFyYW0geyFFbGVtZW50fSBub2RlIFRoZSBub2RlIHRoYXQgaXMgYmVpbmcgbWF0Y2hlZC5cbiAgKiBAcGFyYW0ge3N0cmluZz19IHRhZyBUaGUgdGFnIG5hbWUgb2YgdGhlIEVsZW1lbnQuXG4gICogQHBhcmFtIHs/c3RyaW5nPX0ga2V5IFRoZSBrZXkgb2YgdGhlIEVsZW1lbnQuXG4gICovXG4gIHZhciBhc3NlcnRLZXllZFRhZ01hdGNoZXMgPSBmdW5jdGlvbiAobm9kZSwgdGFnLCBrZXkpIHtcbiAgICB2YXIgbm9kZU5hbWUgPSBnZXREYXRhKG5vZGUpLm5vZGVOYW1lO1xuICAgIGlmIChub2RlTmFtZSAhPT0gdGFnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dhcyBleHBlY3Rpbmcgbm9kZSB3aXRoIGtleSBcIicgKyBrZXkgKyAnXCIgdG8gYmUgYSAnICsgdGFnICsgJywgbm90IGEgJyArIG5vZGVOYW1lICsgJy4nKTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IGEgZ2l2ZW4gbm9kZSBtYXRjaGVzIHRoZSBzcGVjaWZpZWQgbm9kZU5hbWUgYW5kIGtleS5cbiAqXG4gKiBAcGFyYW0geyFOb2RlfSBub2RlIEFuIEhUTUwgbm9kZSwgdHlwaWNhbGx5IGFuIEhUTUxFbGVtZW50IG9yIFRleHQuXG4gKiBAcGFyYW0gez9zdHJpbmd9IG5vZGVOYW1lIFRoZSBub2RlTmFtZSBmb3IgdGhpcyBub2RlLlxuICogQHBhcmFtIHs/c3RyaW5nPX0ga2V5IEFuIG9wdGlvbmFsIGtleSB0aGF0IGlkZW50aWZpZXMgYSBub2RlLlxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgbm9kZSBtYXRjaGVzLCBmYWxzZSBvdGhlcndpc2UuXG4gKi9cbnZhciBtYXRjaGVzID0gZnVuY3Rpb24gKG5vZGUsIG5vZGVOYW1lLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBnZXREYXRhKG5vZGUpO1xuXG4gIC8vIEtleSBjaGVjayBpcyBkb25lIHVzaW5nIGRvdWJsZSBlcXVhbHMgYXMgd2Ugd2FudCB0byB0cmVhdCBhIG51bGwga2V5IHRoZVxuICAvLyBzYW1lIGFzIHVuZGVmaW5lZC4gVGhpcyBzaG91bGQgYmUgb2theSBhcyB0aGUgb25seSB2YWx1ZXMgYWxsb3dlZCBhcmVcbiAgLy8gc3RyaW5ncywgbnVsbCBhbmQgdW5kZWZpbmVkIHNvIHRoZSA9PSBzZW1hbnRpY3MgYXJlIG5vdCB0b28gd2VpcmQuXG4gIHJldHVybiBrZXkgPT0gZGF0YS5rZXkgJiYgbm9kZU5hbWUgPT09IGRhdGEubm9kZU5hbWU7XG59O1xuXG4vKipcbiAqIEFsaWducyB0aGUgdmlydHVhbCBFbGVtZW50IGRlZmluaXRpb24gd2l0aCB0aGUgYWN0dWFsIERPTSwgbW92aW5nIHRoZVxuICogY29ycmVzcG9uZGluZyBET00gbm9kZSB0byB0aGUgY29ycmVjdCBsb2NhdGlvbiBvciBjcmVhdGluZyBpdCBpZiBuZWNlc3NhcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30gbm9kZU5hbWUgRm9yIGFuIEVsZW1lbnQsIHRoaXMgc2hvdWxkIGJlIGEgdmFsaWQgdGFnIHN0cmluZy5cbiAqICAgICBGb3IgYSBUZXh0LCB0aGlzIHNob3VsZCBiZSAjdGV4dC5cbiAqIEBwYXJhbSB7P3N0cmluZz19IGtleSBUaGUga2V5IHVzZWQgdG8gaWRlbnRpZnkgdGhpcyBlbGVtZW50LlxuICogQHBhcmFtIHs/QXJyYXk8Kj49fSBzdGF0aWNzIEZvciBhbiBFbGVtZW50LCB0aGlzIHNob3VsZCBiZSBhbiBhcnJheSBvZlxuICogICAgIG5hbWUtdmFsdWUgcGFpcnMuXG4gKiBAcmV0dXJuIHshTm9kZX0gVGhlIG1hdGNoaW5nIG5vZGUuXG4gKi9cbnZhciBhbGlnbldpdGhET00gPSBmdW5jdGlvbiAobm9kZU5hbWUsIGtleSwgc3RhdGljcykge1xuICB2YXIgY29udGV4dCA9IGdldENvbnRleHQoKTtcbiAgdmFyIHdhbGtlciA9IGNvbnRleHQud2Fsa2VyO1xuICB2YXIgY3VycmVudE5vZGUgPSB3YWxrZXIuY3VycmVudE5vZGU7XG4gIHZhciBwYXJlbnQgPSB3YWxrZXIuZ2V0Q3VycmVudFBhcmVudCgpO1xuICB2YXIgbWF0Y2hpbmdOb2RlO1xuXG4gIC8vIENoZWNrIHRvIHNlZSBpZiB3ZSBoYXZlIGEgbm9kZSB0byByZXVzZVxuICBpZiAoY3VycmVudE5vZGUgJiYgbWF0Y2hlcyhjdXJyZW50Tm9kZSwgbm9kZU5hbWUsIGtleSkpIHtcbiAgICBtYXRjaGluZ05vZGUgPSBjdXJyZW50Tm9kZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZXhpc3RpbmdOb2RlID0gZ2V0Q2hpbGQocGFyZW50LCBrZXkpO1xuXG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBub2RlIGhhcyBtb3ZlZCB3aXRoaW4gdGhlIHBhcmVudCBvciBpZiBhIG5ldyBvbmVcbiAgICAvLyBzaG91bGQgYmUgY3JlYXRlZFxuICAgIGlmIChleGlzdGluZ05vZGUpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGFzc2VydEtleWVkVGFnTWF0Y2hlcyhleGlzdGluZ05vZGUsIG5vZGVOYW1lLCBrZXkpO1xuICAgICAgfVxuXG4gICAgICBtYXRjaGluZ05vZGUgPSBleGlzdGluZ05vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGNoaW5nTm9kZSA9IGNyZWF0ZU5vZGUoY29udGV4dC5kb2MsIG5vZGVOYW1lLCBrZXksIHN0YXRpY3MpO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIHJlZ2lzdGVyQ2hpbGQocGFyZW50LCBrZXksIG1hdGNoaW5nTm9kZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWFya0NyZWF0ZWQobWF0Y2hpbmdOb2RlKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgbm9kZSBoYXMgYSBrZXksIHJlbW92ZSBpdCBmcm9tIHRoZSBET00gdG8gcHJldmVudCBhIGxhcmdlIG51bWJlclxuICAgIC8vIG9mIHJlLW9yZGVycyBpbiB0aGUgY2FzZSB0aGF0IGl0IG1vdmVkIGZhciBvciB3YXMgY29tcGxldGVseSByZW1vdmVkLlxuICAgIC8vIFNpbmNlIHdlIGhvbGQgb24gdG8gYSByZWZlcmVuY2UgdGhyb3VnaCB0aGUga2V5TWFwLCB3ZSBjYW4gYWx3YXlzIGFkZCBpdFxuICAgIC8vIGJhY2suXG4gICAgaWYgKGN1cnJlbnROb2RlICYmIGdldERhdGEoY3VycmVudE5vZGUpLmtleSkge1xuICAgICAgcGFyZW50LnJlcGxhY2VDaGlsZChtYXRjaGluZ05vZGUsIGN1cnJlbnROb2RlKTtcbiAgICAgIGdldERhdGEocGFyZW50KS5rZXlNYXBWYWxpZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG1hdGNoaW5nTm9kZSwgY3VycmVudE5vZGUpO1xuICAgIH1cblxuICAgIHdhbGtlci5jdXJyZW50Tm9kZSA9IG1hdGNoaW5nTm9kZTtcbiAgfVxuXG4gIHJldHVybiBtYXRjaGluZ05vZGU7XG59O1xuXG4vKipcbiAqIENsZWFycyBvdXQgYW55IHVudmlzaXRlZCBOb2RlcywgYXMgdGhlIGNvcnJlc3BvbmRpbmcgdmlydHVhbCBlbGVtZW50XG4gKiBmdW5jdGlvbnMgd2VyZSBuZXZlciBjYWxsZWQgZm9yIHRoZW0uXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAqL1xudmFyIGNsZWFyVW52aXNpdGVkRE9NID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgdmFyIGNvbnRleHQgPSBnZXRDb250ZXh0KCk7XG4gIHZhciB3YWxrZXIgPSBjb250ZXh0LndhbGtlcjtcbiAgdmFyIGRhdGEgPSBnZXREYXRhKG5vZGUpO1xuICB2YXIga2V5TWFwID0gZGF0YS5rZXlNYXA7XG4gIHZhciBrZXlNYXBWYWxpZCA9IGRhdGEua2V5TWFwVmFsaWQ7XG4gIHZhciBsYXN0VmlzaXRlZENoaWxkID0gZGF0YS5sYXN0VmlzaXRlZENoaWxkO1xuICB2YXIgY2hpbGQgPSBub2RlLmxhc3RDaGlsZDtcbiAgdmFyIGtleTtcblxuICBkYXRhLmxhc3RWaXNpdGVkQ2hpbGQgPSBudWxsO1xuXG4gIGlmIChjaGlsZCA9PT0gbGFzdFZpc2l0ZWRDaGlsZCAmJiBrZXlNYXBWYWxpZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChkYXRhLmF0dHJzW2V4cG9ydHMuc3ltYm9scy5wbGFjZWhvbGRlcl0gJiYgd2Fsa2VyLmN1cnJlbnROb2RlICE9PSB3YWxrZXIucm9vdCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHdoaWxlIChjaGlsZCAhPT0gbGFzdFZpc2l0ZWRDaGlsZCkge1xuICAgIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgIGNvbnRleHQubWFya0RlbGV0ZWQoIC8qKiBAdHlwZSB7IU5vZGV9Ki9jaGlsZCk7XG5cbiAgICBrZXkgPSBnZXREYXRhKGNoaWxkKS5rZXk7XG4gICAgaWYgKGtleSkge1xuICAgICAgZGVsZXRlIGtleU1hcFtrZXldO1xuICAgIH1cbiAgICBjaGlsZCA9IG5vZGUubGFzdENoaWxkO1xuICB9XG5cbiAgLy8gQ2xlYW4gdGhlIGtleU1hcCwgcmVtb3ZpbmcgYW55IHVudXN1ZWQga2V5cy5cbiAgZm9yIChrZXkgaW4ga2V5TWFwKSB7XG4gICAgY2hpbGQgPSBrZXlNYXBba2V5XTtcbiAgICBpZiAoIWNoaWxkLnBhcmVudE5vZGUpIHtcbiAgICAgIGNvbnRleHQubWFya0RlbGV0ZWQoY2hpbGQpO1xuICAgICAgZGVsZXRlIGtleU1hcFtrZXldO1xuICAgIH1cbiAgfVxuXG4gIGRhdGEua2V5TWFwVmFsaWQgPSB0cnVlO1xufTtcblxuLyoqXG4gKiBFbnRlcnMgYW4gRWxlbWVudCwgc2V0dGluZyB0aGUgY3VycmVudCBuYW1lc3BhY2UgZm9yIG5lc3RlZCBlbGVtZW50cy5cbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICovXG52YXIgZW50ZXJOb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgdmFyIGRhdGEgPSBnZXREYXRhKG5vZGUpO1xuICBlbnRlclRhZyhkYXRhLm5vZGVOYW1lKTtcbn07XG5cbi8qKlxuICogRXhpdHMgYW4gRWxlbWVudCwgdW53aW5kaW5nIHRoZSBjdXJyZW50IG5hbWVzcGFjZSB0byB0aGUgcHJldmlvdXMgdmFsdWUuXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAqL1xudmFyIGV4aXROb2RlID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgdmFyIGRhdGEgPSBnZXREYXRhKG5vZGUpO1xuICBleGl0VGFnKGRhdGEubm9kZU5hbWUpO1xufTtcblxuLyoqXG4gKiBNYXJrcyBub2RlJ3MgcGFyZW50IGFzIGhhdmluZyB2aXNpdGVkIG5vZGUuXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAqL1xudmFyIG1hcmtWaXNpdGVkID0gZnVuY3Rpb24gKG5vZGUpIHtcbiAgdmFyIGNvbnRleHQgPSBnZXRDb250ZXh0KCk7XG4gIHZhciB3YWxrZXIgPSBjb250ZXh0LndhbGtlcjtcbiAgdmFyIHBhcmVudCA9IHdhbGtlci5nZXRDdXJyZW50UGFyZW50KCk7XG4gIHZhciBkYXRhID0gZ2V0RGF0YShwYXJlbnQpO1xuICBkYXRhLmxhc3RWaXNpdGVkQ2hpbGQgPSBub2RlO1xufTtcblxuLyoqXG4gKiBDaGFuZ2VzIHRvIHRoZSBmaXJzdCBjaGlsZCBvZiB0aGUgY3VycmVudCBub2RlLlxuICovXG52YXIgZmlyc3RDaGlsZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGNvbnRleHQgPSBnZXRDb250ZXh0KCk7XG4gIHZhciB3YWxrZXIgPSBjb250ZXh0LndhbGtlcjtcbiAgZW50ZXJOb2RlKHdhbGtlci5jdXJyZW50Tm9kZSk7XG4gIHdhbGtlci5maXJzdENoaWxkKCk7XG59O1xuXG4vKipcbiAqIENoYW5nZXMgdG8gdGhlIG5leHQgc2libGluZyBvZiB0aGUgY3VycmVudCBub2RlLlxuICovXG52YXIgbmV4dFNpYmxpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjb250ZXh0ID0gZ2V0Q29udGV4dCgpO1xuICB2YXIgd2Fsa2VyID0gY29udGV4dC53YWxrZXI7XG4gIG1hcmtWaXNpdGVkKHdhbGtlci5jdXJyZW50Tm9kZSk7XG4gIHdhbGtlci5uZXh0U2libGluZygpO1xufTtcblxuLyoqXG4gKiBDaGFuZ2VzIHRvIHRoZSBwYXJlbnQgb2YgdGhlIGN1cnJlbnQgbm9kZSwgcmVtb3ZpbmcgYW55IHVudmlzaXRlZCBjaGlsZHJlbi5cbiAqL1xudmFyIHBhcmVudE5vZGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjb250ZXh0ID0gZ2V0Q29udGV4dCgpO1xuICB2YXIgd2Fsa2VyID0gY29udGV4dC53YWxrZXI7XG4gIHdhbGtlci5wYXJlbnROb2RlKCk7XG4gIGV4aXROb2RlKHdhbGtlci5jdXJyZW50Tm9kZSk7XG59O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgYXNzZXJ0Tm9VbmNsb3NlZFRhZ3MgPSBmdW5jdGlvbiAocm9vdCkge1xuICAgIHZhciBvcGVuRWxlbWVudCA9IGdldENvbnRleHQoKS53YWxrZXIuZ2V0Q3VycmVudFBhcmVudCgpO1xuICAgIGlmICghb3BlbkVsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgb3BlblRhZ3MgPSBbXTtcbiAgICB3aGlsZSAob3BlbkVsZW1lbnQgJiYgb3BlbkVsZW1lbnQgIT09IHJvb3QpIHtcbiAgICAgIG9wZW5UYWdzLnB1c2gob3BlbkVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICBvcGVuRWxlbWVudCA9IG9wZW5FbGVtZW50LnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKCdPbmUgb3IgbW9yZSB0YWdzIHdlcmUgbm90IGNsb3NlZDpcXG4nICsgb3BlblRhZ3Muam9pbignXFxuJykpO1xuICB9O1xufVxuXG4vKipcbiAqIFBhdGNoZXMgdGhlIGRvY3VtZW50IHN0YXJ0aW5nIGF0IGVsIHdpdGggdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLiBUaGlzIGZ1bmN0aW9uXG4gKiBtYXkgYmUgY2FsbGVkIGR1cmluZyBhbiBleGlzdGluZyBwYXRjaCBvcGVyYXRpb24uXG4gKiBAcGFyYW0geyFFbGVtZW50fCFEb2N1bWVudEZyYWdtZW50fSBub2RlIFRoZSBFbGVtZW50IG9yIERvY3VtZW50XG4gKiAgICAgdG8gcGF0Y2guXG4gKiBAcGFyYW0geyFmdW5jdGlvbihUKX0gZm4gQSBmdW5jdGlvbiBjb250YWluaW5nIGVsZW1lbnRPcGVuL2VsZW1lbnRDbG9zZS9ldGMuXG4gKiAgICAgY2FsbHMgdGhhdCBkZXNjcmliZSB0aGUgRE9NLlxuICogQHBhcmFtIHtUPX0gZGF0YSBBbiBhcmd1bWVudCBwYXNzZWQgdG8gZm4gdG8gcmVwcmVzZW50IERPTSBzdGF0ZS5cbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmV4cG9ydHMucGF0Y2ggPSBmdW5jdGlvbiAobm9kZSwgZm4sIGRhdGEpIHtcbiAgZW50ZXJDb250ZXh0KG5vZGUpO1xuXG4gIGZpcnN0Q2hpbGQoKTtcbiAgZm4oZGF0YSk7XG4gIHBhcmVudE5vZGUoKTtcbiAgY2xlYXJVbnZpc2l0ZWRET00obm9kZSk7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnROb1VuY2xvc2VkVGFncyhub2RlKTtcbiAgfVxuXG4gIGdldENvbnRleHQoKS5ub3RpZnlDaGFuZ2VzKCk7XG4gIHJlc3RvcmVDb250ZXh0KCk7XG59O1xuXG4vKipcbiAqIFRoZSBvZmZzZXQgaW4gdGhlIHZpcnR1YWwgZWxlbWVudCBkZWNsYXJhdGlvbiB3aGVyZSB0aGUgYXR0cmlidXRlcyBhcmVcbiAqIHNwZWNpZmllZC5cbiAqIEBjb25zdFxuICovXG52YXIgQVRUUklCVVRFU19PRkZTRVQgPSAzO1xuXG4vKipcbiAqIEJ1aWxkcyBhbiBhcnJheSBvZiBhcmd1bWVudHMgZm9yIHVzZSB3aXRoIGVsZW1lbnRPcGVuU3RhcnQsIGF0dHIgYW5kXG4gKiBlbGVtZW50T3BlbkVuZC5cbiAqIEBjb25zdCB7QXJyYXk8Kj59XG4gKi9cbnZhciBhcmdzQnVpbGRlciA9IFtdO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAvKipcbiAgICogS2VlcHMgdHJhY2sgd2hldGhlciBvciBub3Qgd2UgYXJlIGluIGFuIGF0dHJpYnV0ZXMgZGVjbGFyYXRpb24gKGFmdGVyXG4gICAqIGVsZW1lbnRPcGVuU3RhcnQsIGJ1dCBiZWZvcmUgZWxlbWVudE9wZW5FbmQpLlxuICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICovXG4gIHZhciBpbkF0dHJpYnV0ZXMgPSBmYWxzZTtcblxuICAvKiogTWFrZXMgc3VyZSB0aGF0IHRoZSBjYWxsZXIgaXMgbm90IHdoZXJlIGF0dHJpYnV0ZXMgYXJlIGV4cGVjdGVkLiAqL1xuICB2YXIgYXNzZXJ0Tm90SW5BdHRyaWJ1dGVzID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChpbkF0dHJpYnV0ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2FzIG5vdCBleHBlY3RpbmcgYSBjYWxsIHRvIGF0dHIgb3IgZWxlbWVudE9wZW5FbmQsICcgKyAndGhleSBtdXN0IGZvbGxvdyBhIGNhbGwgdG8gZWxlbWVudE9wZW5TdGFydC4nKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqIE1ha2VzIHN1cmUgdGhhdCB0aGUgY2FsbGVyIGlzIHdoZXJlIGF0dHJpYnV0ZXMgYXJlIGV4cGVjdGVkLiAqL1xuICB2YXIgYXNzZXJ0SW5BdHRyaWJ1dGVzID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghaW5BdHRyaWJ1dGVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dhcyBleHBlY3RpbmcgYSBjYWxsIHRvIGF0dHIgb3IgZWxlbWVudE9wZW5FbmQuICcgKyAnZWxlbWVudE9wZW5TdGFydCBtdXN0IGJlIGZvbGxvd2VkIGJ5IHplcm8gb3IgbW9yZSBjYWxscyB0byBhdHRyLCAnICsgJ3RoZW4gb25lIGNhbGwgdG8gZWxlbWVudE9wZW5FbmQuJyk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBNYWtlcyBzdXJlIHRoYXQgcGxhY2Vob2xkZXJzIGhhdmUgYSBrZXkgc3BlY2lmaWVkLiBPdGhlcndpc2UsIGNvbmRpdGlvbmFsXG4gICAqIHBsYWNlaG9sZGVycyBhbmQgY29uZGl0aW9uYWwgZWxlbWVudHMgbmV4dCB0byBwbGFjZWhvbGRlcnMgd2lsbCBjYXVzZVxuICAgKiBwbGFjZWhvbGRlciBlbGVtZW50cyB0byBiZSByZS11c2VkIGFzIG5vbi1wbGFjZWhvbGRlcnMgYW5kIHZpY2UgdmVyc2EuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICovXG4gIHZhciBhc3NlcnRQbGFjZWhvbGRlcktleVNwZWNpZmllZCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoIWtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQbGFjZWhvbGRlciBlbGVtZW50cyBtdXN0IGhhdmUgYSBrZXkgc3BlY2lmaWVkLicpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogTWFrZXMgc3VyZSB0aGF0IHRhZ3MgYXJlIGNvcnJlY3RseSBuZXN0ZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0YWdcbiAgICovXG4gIHZhciBhc3NlcnRDbG9zZU1hdGNoZXNPcGVuVGFnID0gZnVuY3Rpb24gKHRhZykge1xuICAgIHZhciBjb250ZXh0ID0gZ2V0Q29udGV4dCgpO1xuICAgIHZhciB3YWxrZXIgPSBjb250ZXh0LndhbGtlcjtcbiAgICB2YXIgY2xvc2luZ05vZGUgPSB3YWxrZXIuZ2V0Q3VycmVudFBhcmVudCgpO1xuICAgIHZhciBkYXRhID0gZ2V0RGF0YShjbG9zaW5nTm9kZSk7XG5cbiAgICBpZiAodGFnICE9PSBkYXRhLm5vZGVOYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlY2VpdmVkIGEgY2FsbCB0byBjbG9zZSAnICsgdGFnICsgJyBidXQgJyArIGRhdGEubm9kZU5hbWUgKyAnIHdhcyBvcGVuLicpO1xuICAgIH1cbiAgfTtcblxuICAvKiogVXBkYXRlcyB0aGUgc3RhdGUgdG8gYmVpbmcgaW4gYW4gYXR0cmlidXRlIGRlY2xhcmF0aW9uLiAqL1xuICB2YXIgc2V0SW5BdHRyaWJ1dGVzID0gZnVuY3Rpb24gKCkge1xuICAgIGluQXR0cmlidXRlcyA9IHRydWU7XG4gIH07XG5cbiAgLyoqIFVwZGF0ZXMgdGhlIHN0YXRlIHRvIG5vdCBiZWluZyBpbiBhbiBhdHRyaWJ1dGUgZGVjbGFyYXRpb24uICovXG4gIHZhciBzZXROb3RJbkF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgaW5BdHRyaWJ1dGVzID0gZmFsc2U7XG4gIH07XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgZWxlbWVudCdzIHRhZy5cbiAqIEBwYXJhbSB7P3N0cmluZz19IGtleSBUaGUga2V5IHVzZWQgdG8gaWRlbnRpZnkgdGhpcyBlbGVtZW50LiBUaGlzIGNhbiBiZSBhblxuICogICAgIGVtcHR5IHN0cmluZywgYnV0IHBlcmZvcm1hbmNlIG1heSBiZSBiZXR0ZXIgaWYgYSB1bmlxdWUgdmFsdWUgaXMgdXNlZFxuICogICAgIHdoZW4gaXRlcmF0aW5nIG92ZXIgYW4gYXJyYXkgb2YgaXRlbXMuXG4gKiBAcGFyYW0gez9BcnJheTwqPj19IHN0YXRpY3MgQW4gYXJyYXkgb2YgYXR0cmlidXRlIG5hbWUvdmFsdWUgcGFpcnMgb2YgdGhlXG4gKiAgICAgc3RhdGljIGF0dHJpYnV0ZXMgZm9yIHRoZSBFbGVtZW50LiBUaGVzZSB3aWxsIG9ubHkgYmUgc2V0IG9uY2Ugd2hlbiB0aGVcbiAqICAgICBFbGVtZW50IGlzIGNyZWF0ZWQuXG4gKiBAcGFyYW0gey4uLip9IHZhcl9hcmdzIEF0dHJpYnV0ZSBuYW1lL3ZhbHVlIHBhaXJzIG9mIHRoZSBkeW5hbWljIGF0dHJpYnV0ZXNcbiAqICAgICBmb3IgdGhlIEVsZW1lbnQuXG4gKiBAcmV0dXJuIHshRWxlbWVudH0gVGhlIGNvcnJlc3BvbmRpbmcgRWxlbWVudC5cbiAqL1xuZXhwb3J0cy5lbGVtZW50T3BlbiA9IGZ1bmN0aW9uICh0YWcsIGtleSwgc3RhdGljcywgdmFyX2FyZ3MpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnROb3RJbkF0dHJpYnV0ZXMoKTtcbiAgfVxuXG4gIHZhciBub2RlID0gLyoqIEB0eXBlIHshRWxlbWVudH0qL2FsaWduV2l0aERPTSh0YWcsIGtleSwgc3RhdGljcyk7XG4gIHZhciBkYXRhID0gZ2V0RGF0YShub2RlKTtcblxuICAvKlxuICAgKiBDaGVja3MgdG8gc2VlIGlmIG9uZSBvciBtb3JlIGF0dHJpYnV0ZXMgaGF2ZSBjaGFuZ2VkIGZvciBhIGdpdmVuIEVsZW1lbnQuXG4gICAqIFdoZW4gbm8gYXR0cmlidXRlcyBoYXZlIGNoYW5nZWQsIHRoaXMgaXMgbXVjaCBmYXN0ZXIgdGhhbiBjaGVja2luZyBlYWNoXG4gICAqIGluZGl2aWR1YWwgYXJndW1lbnQuIFdoZW4gYXR0cmlidXRlcyBoYXZlIGNoYW5nZWQsIHRoZSBvdmVyaGVhZCBvZiB0aGlzIGlzXG4gICAqIG1pbmltYWwuXG4gICAqL1xuICB2YXIgYXR0cnNBcnIgPSBkYXRhLmF0dHJzQXJyO1xuICB2YXIgYXR0cnNDaGFuZ2VkID0gZmFsc2U7XG4gIHZhciBpID0gQVRUUklCVVRFU19PRkZTRVQ7XG4gIHZhciBqID0gMDtcblxuICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSwgaiArPSAxKSB7XG4gICAgaWYgKGF0dHJzQXJyW2pdICE9PSBhcmd1bWVudHNbaV0pIHtcbiAgICAgIGF0dHJzQ2hhbmdlZCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSwgaiArPSAxKSB7XG4gICAgYXR0cnNBcnJbal0gPSBhcmd1bWVudHNbaV07XG4gIH1cblxuICBpZiAoaiA8IGF0dHJzQXJyLmxlbmd0aCkge1xuICAgIGF0dHJzQ2hhbmdlZCA9IHRydWU7XG4gICAgYXR0cnNBcnIubGVuZ3RoID0gajtcbiAgfVxuXG4gIC8qXG4gICAqIEFjdHVhbGx5IHBlcmZvcm0gdGhlIGF0dHJpYnV0ZSB1cGRhdGUuXG4gICAqL1xuICBpZiAoYXR0cnNDaGFuZ2VkKSB7XG4gICAgdmFyIGF0dHIsXG4gICAgICAgIG5ld0F0dHJzID0gZGF0YS5uZXdBdHRycztcblxuICAgIGZvciAoYXR0ciBpbiBuZXdBdHRycykge1xuICAgICAgbmV3QXR0cnNbYXR0cl0gPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZm9yIChpID0gQVRUUklCVVRFU19PRkZTRVQ7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIG5ld0F0dHJzW2FyZ3VtZW50c1tpXV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgIH1cblxuICAgIGZvciAoYXR0ciBpbiBuZXdBdHRycykge1xuICAgICAgdXBkYXRlQXR0cmlidXRlKG5vZGUsIGF0dHIsIG5ld0F0dHJzW2F0dHJdKTtcbiAgICB9XG4gIH1cblxuICBmaXJzdENoaWxkKCk7XG4gIHJldHVybiBub2RlO1xufTtcblxuLyoqXG4gKiBEZWNsYXJlcyBhIHZpcnR1YWwgRWxlbWVudCBhdCB0aGUgY3VycmVudCBsb2NhdGlvbiBpbiB0aGUgZG9jdW1lbnQuIFRoaXNcbiAqIGNvcnJlc3BvbmRzIHRvIGFuIG9wZW5pbmcgdGFnIGFuZCBhIGVsZW1lbnRDbG9zZSB0YWcgaXMgcmVxdWlyZWQuIFRoaXMgaXNcbiAqIGxpa2UgZWxlbWVudE9wZW4sIGJ1dCB0aGUgYXR0cmlidXRlcyBhcmUgZGVmaW5lZCB1c2luZyB0aGUgYXR0ciBmdW5jdGlvblxuICogcmF0aGVyIHRoYW4gYmVpbmcgcGFzc2VkIGFzIGFyZ3VtZW50cy4gTXVzdCBiZSBmb2xsbG93ZWQgYnkgMCBvciBtb3JlIGNhbGxzXG4gKiB0byBhdHRyLCB0aGVuIGEgY2FsbCB0byBlbGVtZW50T3BlbkVuZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGVsZW1lbnQncyB0YWcuXG4gKiBAcGFyYW0gez9zdHJpbmc9fSBrZXkgVGhlIGtleSB1c2VkIHRvIGlkZW50aWZ5IHRoaXMgZWxlbWVudC4gVGhpcyBjYW4gYmUgYW5cbiAqICAgICBlbXB0eSBzdHJpbmcsIGJ1dCBwZXJmb3JtYW5jZSBtYXkgYmUgYmV0dGVyIGlmIGEgdW5pcXVlIHZhbHVlIGlzIHVzZWRcbiAqICAgICB3aGVuIGl0ZXJhdGluZyBvdmVyIGFuIGFycmF5IG9mIGl0ZW1zLlxuICogQHBhcmFtIHs/QXJyYXk8Kj49fSBzdGF0aWNzIEFuIGFycmF5IG9mIGF0dHJpYnV0ZSBuYW1lL3ZhbHVlIHBhaXJzIG9mIHRoZVxuICogICAgIHN0YXRpYyBhdHRyaWJ1dGVzIGZvciB0aGUgRWxlbWVudC4gVGhlc2Ugd2lsbCBvbmx5IGJlIHNldCBvbmNlIHdoZW4gdGhlXG4gKiAgICAgRWxlbWVudCBpcyBjcmVhdGVkLlxuICovXG5leHBvcnRzLmVsZW1lbnRPcGVuU3RhcnQgPSBmdW5jdGlvbiAodGFnLCBrZXksIHN0YXRpY3MpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnROb3RJbkF0dHJpYnV0ZXMoKTtcbiAgICBzZXRJbkF0dHJpYnV0ZXMoKTtcbiAgfVxuXG4gIGFyZ3NCdWlsZGVyWzBdID0gdGFnO1xuICBhcmdzQnVpbGRlclsxXSA9IGtleTtcbiAgYXJnc0J1aWxkZXJbMl0gPSBzdGF0aWNzO1xufTtcblxuLyoqKlxuICogRGVmaW5lcyBhIHZpcnR1YWwgYXR0cmlidXRlIGF0IHRoaXMgcG9pbnQgb2YgdGhlIERPTS4gVGhpcyBpcyBvbmx5IHZhbGlkXG4gKiB3aGVuIGNhbGxlZCBiZXR3ZWVuIGVsZW1lbnRPcGVuU3RhcnQgYW5kIGVsZW1lbnRPcGVuRW5kLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKi9cbmV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydEluQXR0cmlidXRlcygpO1xuICB9XG5cbiAgYXJnc0J1aWxkZXIucHVzaChuYW1lLCB2YWx1ZSk7XG59O1xuXG4vKipcbiAqIENsb3NlcyBhbiBvcGVuIHRhZyBzdGFydGVkIHdpdGggZWxlbWVudE9wZW5TdGFydC5cbiAqIEByZXR1cm4geyFFbGVtZW50fSBUaGUgY29ycmVzcG9uZGluZyBFbGVtZW50LlxuICovXG5leHBvcnRzLmVsZW1lbnRPcGVuRW5kID0gZnVuY3Rpb24gKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydEluQXR0cmlidXRlcygpO1xuICAgIHNldE5vdEluQXR0cmlidXRlcygpO1xuICB9XG5cbiAgdmFyIG5vZGUgPSBleHBvcnRzLmVsZW1lbnRPcGVuLmFwcGx5KG51bGwsIGFyZ3NCdWlsZGVyKTtcbiAgYXJnc0J1aWxkZXIubGVuZ3RoID0gMDtcbiAgcmV0dXJuIG5vZGU7XG59O1xuXG4vKipcbiAqIENsb3NlcyBhbiBvcGVuIHZpcnR1YWwgRWxlbWVudC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBlbGVtZW50J3MgdGFnLlxuICogQHJldHVybiB7IUVsZW1lbnR9IFRoZSBjb3JyZXNwb25kaW5nIEVsZW1lbnQuXG4gKi9cbmV4cG9ydHMuZWxlbWVudENsb3NlID0gZnVuY3Rpb24gKHRhZykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydE5vdEluQXR0cmlidXRlcygpO1xuICAgIGFzc2VydENsb3NlTWF0Y2hlc09wZW5UYWcodGFnKTtcbiAgfVxuXG4gIHBhcmVudE5vZGUoKTtcblxuICB2YXIgbm9kZSA9IC8qKiBAdHlwZSB7IUVsZW1lbnR9ICovZ2V0Q29udGV4dCgpLndhbGtlci5jdXJyZW50Tm9kZTtcblxuICBjbGVhclVudmlzaXRlZERPTShub2RlKTtcblxuICBuZXh0U2libGluZygpO1xuICByZXR1cm4gbm9kZTtcbn07XG5cbi8qKlxuICogRGVjbGFyZXMgYSB2aXJ0dWFsIEVsZW1lbnQgYXQgdGhlIGN1cnJlbnQgbG9jYXRpb24gaW4gdGhlIGRvY3VtZW50IHRoYXQgaGFzXG4gKiBubyBjaGlsZHJlbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGVsZW1lbnQncyB0YWcuXG4gKiBAcGFyYW0gez9zdHJpbmc9fSBrZXkgVGhlIGtleSB1c2VkIHRvIGlkZW50aWZ5IHRoaXMgZWxlbWVudC4gVGhpcyBjYW4gYmUgYW5cbiAqICAgICBlbXB0eSBzdHJpbmcsIGJ1dCBwZXJmb3JtYW5jZSBtYXkgYmUgYmV0dGVyIGlmIGEgdW5pcXVlIHZhbHVlIGlzIHVzZWRcbiAqICAgICB3aGVuIGl0ZXJhdGluZyBvdmVyIGFuIGFycmF5IG9mIGl0ZW1zLlxuICogQHBhcmFtIHs/QXJyYXk8Kj49fSBzdGF0aWNzIEFuIGFycmF5IG9mIGF0dHJpYnV0ZSBuYW1lL3ZhbHVlIHBhaXJzIG9mIHRoZVxuICogICAgIHN0YXRpYyBhdHRyaWJ1dGVzIGZvciB0aGUgRWxlbWVudC4gVGhlc2Ugd2lsbCBvbmx5IGJlIHNldCBvbmNlIHdoZW4gdGhlXG4gKiAgICAgRWxlbWVudCBpcyBjcmVhdGVkLlxuICogQHBhcmFtIHsuLi4qfSB2YXJfYXJncyBBdHRyaWJ1dGUgbmFtZS92YWx1ZSBwYWlycyBvZiB0aGUgZHluYW1pYyBhdHRyaWJ1dGVzXG4gKiAgICAgZm9yIHRoZSBFbGVtZW50LlxuICogQHJldHVybiB7IUVsZW1lbnR9IFRoZSBjb3JyZXNwb25kaW5nIEVsZW1lbnQuXG4gKi9cbmV4cG9ydHMuZWxlbWVudFZvaWQgPSBmdW5jdGlvbiAodGFnLCBrZXksIHN0YXRpY3MsIHZhcl9hcmdzKSB7XG4gIHZhciBub2RlID0gZXhwb3J0cy5lbGVtZW50T3Blbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICBleHBvcnRzLmVsZW1lbnRDbG9zZS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICByZXR1cm4gbm9kZTtcbn07XG5cbi8qKlxuICogRGVjbGFyZXMgYSB2aXJ0dWFsIEVsZW1lbnQgYXQgdGhlIGN1cnJlbnQgbG9jYXRpb24gaW4gdGhlIGRvY3VtZW50IHRoYXQgaXMgYVxuICogcGxhY2Vob2xkZXIgZWxlbWVudC4gQ2hpbGRyZW4gb2YgdGhpcyBFbGVtZW50IGNhbiBiZSBtYW51YWxseSBtYW5hZ2VkIGFuZFxuICogd2lsbCBub3QgYmUgY2xlYXJlZCBieSB0aGUgbGlicmFyeS5cbiAqXG4gKiBBIGtleSBtdXN0IGJlIHNwZWNpZmllZCB0byBtYWtlIHN1cmUgdGhhdCB0aGlzIG5vZGUgaXMgY29ycmVjdGx5IHByZXNlcnZlZFxuICogYWNyb3NzIGFsbCBjb25kaXRpb25hbHMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgZWxlbWVudCdzIHRhZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSB1c2VkIHRvIGlkZW50aWZ5IHRoaXMgZWxlbWVudC5cbiAqIEBwYXJhbSB7P0FycmF5PCo+PX0gc3RhdGljcyBBbiBhcnJheSBvZiBhdHRyaWJ1dGUgbmFtZS92YWx1ZSBwYWlycyBvZiB0aGVcbiAqICAgICBzdGF0aWMgYXR0cmlidXRlcyBmb3IgdGhlIEVsZW1lbnQuIFRoZXNlIHdpbGwgb25seSBiZSBzZXQgb25jZSB3aGVuIHRoZVxuICogICAgIEVsZW1lbnQgaXMgY3JlYXRlZC5cbiAqIEBwYXJhbSB7Li4uKn0gdmFyX2FyZ3MgQXR0cmlidXRlIG5hbWUvdmFsdWUgcGFpcnMgb2YgdGhlIGR5bmFtaWMgYXR0cmlidXRlc1xuICogICAgIGZvciB0aGUgRWxlbWVudC5cbiAqIEByZXR1cm4geyFFbGVtZW50fSBUaGUgY29ycmVzcG9uZGluZyBFbGVtZW50LlxuICovXG5leHBvcnRzLmVsZW1lbnRQbGFjZWhvbGRlciA9IGZ1bmN0aW9uICh0YWcsIGtleSwgc3RhdGljcywgdmFyX2FyZ3MpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnRQbGFjZWhvbGRlcktleVNwZWNpZmllZChrZXkpO1xuICB9XG5cbiAgdmFyIG5vZGUgPSBleHBvcnRzLmVsZW1lbnRPcGVuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gIHVwZGF0ZUF0dHJpYnV0ZShub2RlLCBleHBvcnRzLnN5bWJvbHMucGxhY2Vob2xkZXIsIHRydWUpO1xuICBleHBvcnRzLmVsZW1lbnRDbG9zZS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICByZXR1cm4gbm9kZTtcbn07XG5cbi8qKlxuICogRGVjbGFyZXMgYSB2aXJ0dWFsIFRleHQgYXQgdGhpcyBwb2ludCBpbiB0aGUgZG9jdW1lbnQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfGJvb2xlYW59IHZhbHVlIFRoZSB2YWx1ZSBvZiB0aGUgVGV4dC5cbiAqIEBwYXJhbSB7Li4uKGZ1bmN0aW9uKChzdHJpbmd8bnVtYmVyfGJvb2xlYW4pKTpzdHJpbmcpfSB2YXJfYXJnc1xuICogICAgIEZ1bmN0aW9ucyB0byBmb3JtYXQgdGhlIHZhbHVlIHdoaWNoIGFyZSBjYWxsZWQgb25seSB3aGVuIHRoZSB2YWx1ZSBoYXNcbiAqICAgICBjaGFuZ2VkLlxuICogQHJldHVybiB7IVRleHR9IFRoZSBjb3JyZXNwb25kaW5nIHRleHQgbm9kZS5cbiAqL1xuZXhwb3J0cy50ZXh0ID0gZnVuY3Rpb24gKHZhbHVlLCB2YXJfYXJncykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydE5vdEluQXR0cmlidXRlcygpO1xuICB9XG5cbiAgdmFyIG5vZGUgPSAvKiogQHR5cGUgeyFUZXh0fSovYWxpZ25XaXRoRE9NKCcjdGV4dCcsIG51bGwpO1xuICB2YXIgZGF0YSA9IGdldERhdGEobm9kZSk7XG5cbiAgaWYgKGRhdGEudGV4dCAhPT0gdmFsdWUpIHtcbiAgICBkYXRhLnRleHQgPSAvKiogQHR5cGUge3N0cmluZ30gKi92YWx1ZTtcblxuICAgIHZhciBmb3JtYXR0ZWQgPSB2YWx1ZTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgZm9ybWF0dGVkID0gYXJndW1lbnRzW2ldKGZvcm1hdHRlZCk7XG4gICAgfVxuXG4gICAgbm9kZS5kYXRhID0gZm9ybWF0dGVkO1xuICB9XG5cbiAgbmV4dFNpYmxpbmcoKTtcbiAgcmV0dXJuIG5vZGU7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5jcmVtZW50YWwtZG9tLWNqcy5qcy5tYXAiLCJjb25zdCBBUlJPV19QQVRURVJOID0gL15cXHMqXFwoPyhcXHMqXFx3K1xccyooLFxccypcXHcrXFxzKikqKVxcKT9cXHMqPT5cXHMqKHsoW159XSspfXwoLispKSQvO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNBcnJvdyhleHByZXNzaW9uKSB7XG4gIHJldHVybiBTdHJpbmcoZXhwcmVzc2lvbikubWF0Y2goQVJST1dfUEFUVEVSTik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VBcnJvdyhleHByZXNzaW9uKSB7XG4gIGxldCBtYXRjaCA9IGV4cHJlc3Npb24ubWF0Y2goQVJST1dfUEFUVEVSTik7XG4gIGxldCBhcmdzID0gbWF0Y2hbMV07XG4gIGxldCBib2R5ID0gbWF0Y2hbNF0gfHwgbWF0Y2hbNV07XG4gIHJldHVybiBuZXcgRnVuY3Rpb24oYXJncywgJ3JldHVybiAoJyArIGJvZHkgKyAnKScpO1xufTtcbiIsImltcG9ydCB7aXNBcnJvdywgcGFyc2VBcnJvd30gZnJvbSAnLi9hcnJvdyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV2YWx1YXRlKGV4cHJlc3Npb24sIGNvbnRleHQpIHtcbiAgbGV0IGZuID0gZXZhbHVhdG9yKGV4cHJlc3Npb24pO1xuICByZXR1cm4gZm4uY2FsbCh0aGlzLCBjb250ZXh0KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0b3IoZXhwcmVzc2lvbikge1xuICBpZiAoaXNBcnJvdyhleHByZXNzaW9uKSkge1xuICAgIHJldHVybiBwYXJzZUFycm93KGV4cHJlc3Npb24pO1xuICB9XG5cbiAgbGV0IHN5bWJvbCA9ICdkJyArIERhdGUubm93KCk7XG4gIC8vICcuJyBpcyBqdXN0IHRoZSBpZGVudGl0eSBmdW5jdGlvblxuICBpZiAoZXhwcmVzc2lvbiA9PT0gJy4nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlkZW50aXR5KGQpIHsgcmV0dXJuIGQ7IH07XG4gIC8vICcuZm9vJyBhZGRyZXNzZXMgdGhlIGNvbnRleHQgZGlyZWN0bHlcbiAgfSBlbHNlIGlmIChleHByZXNzaW9uLm1hdGNoKC9eXFxzKlxcLlxcdy8pKSB7XG4gICAgZXhwcmVzc2lvbiA9IHN5bWJvbCArIGV4cHJlc3Npb247XG4gIH1cbiAgcmV0dXJuIG5ldyBGdW5jdGlvbihzeW1ib2wsIFtcbiAgICAvLyAnY29uc29sZS5pbmZvKFwiJywgc3ltYm9sLCAnID0gXCIsICcsIHN5bWJvbCwgJywgXCInLCBleHByZXNzaW9uLCAnXCIpOyAnLFxuICAgICd3aXRoICgnLCBzeW1ib2wsICcgfHwge30pIHsnLFxuICAgICcgIHJldHVybiAnLCBleHByZXNzaW9uLCAnOycsXG4gICAgJ30nXG4gIF0uam9pbignJykpO1xufTtcbiIsImltcG9ydCAnZG9jdW1lbnQtcmVnaXN0ZXItZWxlbWVudCc7XG5pbXBvcnQgVENvbnRleHQgZnJvbSAnLi90LWNvbnRleHQnO1xuaW1wb3J0IHtjcmVhdGVSZW5kZXJGdW5jdGlvbn0gZnJvbSAnLi9yZW5kZXInO1xuXG53aW5kb3cudGFnYWxvbmcgPSB7XG4gIFRDb250ZXh0LFxuICBjcmVhdGVSZW5kZXJGdW5jdGlvblxufTtcblxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvcGVydHkocmVhZCwgd3JpdGUsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG5cbiAgICBnZXQoKSB7XG4gICAgICByZXR1cm4gcmVhZCA/IHJlYWQuY2FsbCh0aGlzLCB2YWx1ZSkgOiB2YWx1ZTtcbiAgICB9LFxuXG4gICAgc2V0KHYpIHtcbiAgICAgIGlmICh2ICE9PSB2YWx1ZSkge1xuICAgICAgICBsZXQgcHJldmlvdXMgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHdyaXRlLmNhbGwodGhpcywgdmFsdWUgPSB2LCBwcmV2aW91cyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufTtcbiIsImltcG9ydCBldmFsdWF0ZSwge2V2YWx1YXRvcn0gZnJvbSAnLi9ldmFsdWF0ZSc7XG5cbmltcG9ydCB7XG4gIGVsZW1lbnRPcGVuLFxuICBlbGVtZW50Q2xvc2UsXG4gIGVsZW1lbnRWb2lkLFxuICB0ZXh0LFxuICBwYXRjaFxufSBmcm9tICdpbmNyZW1lbnRhbC1kb20nO1xuXG5jb25zdCBUX05BTUVTUEFDRSA9ICd0LSc7XG5jb25zdCBUX0lGID0gVF9OQU1FU1BBQ0UgKyAnaWYnO1xuY29uc3QgVF9FQUNIID0gVF9OQU1FU1BBQ0UgKyAnZWFjaCc7XG5jb25zdCBUX1RFWFQgPSBUX05BTUVTUEFDRSArICd0ZXh0JztcbmNvbnN0IFRfRk9SRUFDSCA9IFRfTkFNRVNQQUNFICsgJ2ZvcmVhY2gnO1xuXG5jb25zdCBDT05UUk9MX0FUVFJTID0gbmV3IFNldChbVF9JRiwgVF9FQUNILCBUX0ZPUkVBQ0gsIFRfVEVYVF0pO1xuXG5jb25zdCBWT0lEX0VMRU1FTlRTID0gbmV3IFNldChbXG4gICdhcmVhJywgJ2Jhc2UnLCAnYnInLCAnY29sJywgJ2NvbW1hbmQnLCAnZW1iZWQnLCAnaHInLCAnaW1nJyxcbiAgJ2lucHV0JywgJ2tleWdlbicsICdsaW5rJywgJ21ldGEnLCAncGFyYW0nLCAnc291cmNlJywgJ3RyYWNrJyxcbiAgJ3dicidcbl0pO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVuZGVyRnVuY3Rpb24ocm9vdCkge1xuICBsZXQgcmVuZGVyID0gY3JlYXRlUmVuZGVyZXIocm9vdCk7XG4gIHJldHVybiBmdW5jdGlvbiBfcmVuZGVyKGRhdGEpIHtcbiAgICAvLyBjb25zb2xlLmxvZygncmVuZGVyaW5nIHdpdGggZGF0YTonLCBkYXRhKTtcbiAgICByZXR1cm4gcGF0Y2gocm9vdCwgcmVuZGVyLmJpbmQodGhpcywgZGF0YSkpO1xuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUmVuZGVyZXIocm9vdCkge1xuICBsZXQgY2FsbHMgPSBbXTtcbiAgZm9yIChcbiAgICBsZXQgY2hpbGQgPSByb290LmZpcnN0Q2hpbGQ7IGNoaWxkO1xuICAgIGNoaWxkID0gY2hpbGQubmV4dFNpYmxpbmdcbiAgKSB7XG4gICAgc3dpdGNoIChjaGlsZC5ub2RlVHlwZSkge1xuICAgICAgY2FzZSBOb2RlLlRFWFRfTk9ERTpcbiAgICAgICAgY2FsbHMucHVzaChjcmVhdGVUZXh0UmVuZGVyZXIoY2hpbGQpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFOlxuICAgICAgICBjYWxscy5wdXNoKGNyZWF0ZUVsZW1lbnRSZW5kZXJlcihjaGlsZCkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIHBhdGNoKGRhdGEpIHtcbiAgICAvLyBjb25zb2xlLmxvZygncGF0Y2hpbmc6Jywgcm9vdCwgJ3dpdGgnLCBkYXRhKTtcbiAgICBjYWxscy5mb3JFYWNoKGZuID0+IGZuKGRhdGEpKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGV4dFJlbmRlcmVyKG5vZGUpIHtcbiAgLy8gVE9ETzogZXhwYW5kIHt7IGV4cHJlc3Npb25zIH19ID9cbiAgcmV0dXJuIChkYXRhKSA9PiB0ZXh0KG5vZGUubm9kZVZhbHVlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudFJlbmRlcmVyKG5vZGUpIHtcbiAgbGV0IG5hbWUgPSBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG5cbiAgbGV0IGlzVm9pZCA9IGlzRWxlbWVudFZvaWQobmFtZSk7XG4gIGxldCBhdHRyTWFwID0gZ2V0QXR0cmlidXRlTWFwKG5vZGUpO1xuXG4gIGxldCBjb25kaXRpb24gPSBub2RlLmhhc0F0dHJpYnV0ZShUX0lGKVxuICAgID8gZXZhbHVhdG9yKG5vZGUuZ2V0QXR0cmlidXRlKFRfSUYpKVxuICAgIDogbnVsbDtcblxuICBsZXQgcmVuZGVyQ2hpbGRyZW47XG5cbiAgLy8gPHNwYW4gdC10ZXh0PVwic29tZS52YWx1ZVwiPjwvc3Bhbj5cbiAgbGV0IHRleHRFeHByZXNzaW9uID0gbm9kZS5nZXRBdHRyaWJ1dGUoVF9URVhUKTtcbiAgaWYgKHRleHRFeHByZXNzaW9uKSB7XG4gICAgbGV0IGdldFRleHQgPSBldmFsdWF0b3IodGV4dEV4cHJlc3Npb24pO1xuICAgIHJlbmRlckNoaWxkcmVuID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgbGV0IHZhbHVlID0gZ2V0VGV4dChkYXRhKTtcbiAgICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRleHQoU3RyaW5nKHZhbHVlKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZW5kZXJDaGlsZHJlbiA9IGNyZWF0ZVJlbmRlcmVyKG5vZGUpO1xuICB9XG5cbiAgbGV0IHJlbmRlciA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAvLyBjb25zb2xlLmxvZygncmVuZGVyaW5nJywgbm9kZSwgJ3dpdGggZGF0YTonLCBkYXRhKTtcbiAgICBpZiAoY29uZGl0aW9uICYmICFjb25kaXRpb24oZGF0YSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgYXR0cnMgPSBpbnRlcnBvbGF0ZUF0dHJpYnV0ZXMoYXR0ck1hcCwgZGF0YSk7XG4gICAgaWYgKGlzVm9pZCkge1xuICAgICAgZWxlbWVudFZvaWQobmFtZSwgJycsIGF0dHJzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudE9wZW4obmFtZSwgJycsIGF0dHJzKTtcbiAgICAgIHJlbmRlckNoaWxkcmVuKGRhdGEpO1xuICAgICAgZWxlbWVudENsb3NlKG5hbWUpO1xuICAgIH1cbiAgfTtcblxuICBsZXQgZWFjaEV4cHJlc3Npb24gPSBub2RlLmdldEF0dHJpYnV0ZShUX0VBQ0gpO1xuICBsZXQgZm9yRWFjaEV4cHJlc3Npb24gPSBub2RlLmdldEF0dHJpYnV0ZShUX0ZPUkVBQ0gpO1xuXG4gIC8vIDx1bD48bGkgdC1lYWNoPVwiaXRlbXNcIj57eyAuIH19PC9saT48L3VsPlxuICBpZiAoZWFjaEV4cHJlc3Npb24pIHtcbiAgICAvLyBjb25zb2xlLmluZm8oJ3JlbmRlciBlYWNoOicsIG5vZGUsIGVhY2hFeHByZXNzaW9uKTtcbiAgICByZW5kZXIgPSByZW5kZXJFYWNoKGVhY2hFeHByZXNzaW9uLCByZW5kZXIpO1xuICAvLyA8dWwgdC1mb3JlYWNoPVwiaXRlbXNcIj48bGk+e3sgLiB9fTwvbGk+PC91bD5cbiAgfSBlbHNlIGlmIChmb3JFYWNoRXhwcmVzc2lvbikge1xuICAgIC8vIGNvbnNvbGUuaW5mbygncmVuZGVyIGZvcmVhY2g6Jywgbm9kZSwgZm9yRWFjaEV4cHJlc3Npb24pO1xuICAgIHJlbmRlckNoaWxkcmVuID0gcmVuZGVyRWFjaChmb3JFYWNoRXhwcmVzc2lvbiwgcmVuZGVyQ2hpbGRyZW4pO1xuICB9IGVsc2Uge1xuICAgIC8vIGNvbnNvbGUuaW5mbygncmVuZGVyIG9uY2U6Jywgbm9kZSk7XG4gIH1cblxuICByZXR1cm4gcmVuZGVyO1xufVxuXG5mdW5jdGlvbiByZW5kZXJFYWNoKGV4cHJlc3Npb24sIHJlbmRlcikge1xuICByZXR1cm4gKGRhdGEpID0+IHtcbiAgICBsZXQgdmFsdWVzID0gZXZhbHVhdGUoZXhwcmVzc2lvbiwgZGF0YSk7XG4gICAgZm9yRWFjaCh2YWx1ZXMsIHJlbmRlcik7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZU1hcChub2RlKSB7XG4gIGxldCBtYXAgPSBuZXcgTWFwKCk7XG4gIGxldCBhdHRycyA9IG5vZGUuYXR0cmlidXRlcztcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBhdHRyID0gYXR0cnNbaV07XG4gICAgbGV0IG5hbWUgPSBTdHJpbmcoYXR0ci5uYW1lKTtcbiAgICBpZiAoQ09OVFJPTF9BVFRSUy5oYXMobmFtZSkpIHtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbygnc2tpcHBpbmcgY29udHJvbCBhdHRyaWJ1dGUnLCBuYW1lLCAnZm9yJywgbm9kZSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9IGVsc2UgaWYgKG5hbWUuaW5kZXhPZihUX05BTUVTUEFDRSkgPT09IDApIHtcbiAgICAgIGxldCBnZXR0ZXIgPSBldmFsdWF0b3IoYXR0ci52YWx1ZSk7XG4gICAgICBtYXAuc2V0KG5hbWUuc3Vic3RyKFRfTkFNRVNQQUNFLmxlbmd0aCksIGdldHRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcC5zZXQobmFtZSwgYXR0ci52YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXA7XG59XG5cbmZ1bmN0aW9uIGludGVycG9sYXRlQXR0cmlidXRlcyhhdHRyTWFwLCBkYXRhKSB7XG4gIGxldCBhdHRycyA9IFtdO1xuICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgYXR0ck1hcCkge1xuICAgIGF0dHJzLnB1c2goa2V5LCAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKVxuICAgICAgPyB2YWx1ZShkYXRhLCBrZXkpXG4gICAgICA6IFN0cmluZyh2YWx1ZSkpO1xuICB9XG4gIHJldHVybiBhdHRycztcbn1cblxuZnVuY3Rpb24gaXNFbGVtZW50Vm9pZChuYW1lKSB7XG4gIHJldHVybiBWT0lEX0VMRU1FTlRTLmhhcyhuYW1lKTtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaChkYXRhLCBmbikge1xuICByZXR1cm4gZGF0YS5mb3JFYWNoKGZuLCB0aGlzKTtcbn1cbiIsImltcG9ydCBwcm9wZXJ0eSBmcm9tICcuL3Byb3BlcnR5JztcbmltcG9ydCBldmFsdWF0ZSBmcm9tICcuL2V2YWx1YXRlJztcbmltcG9ydCB7Y3JlYXRlUmVuZGVyRnVuY3Rpb259IGZyb20gJy4vcmVuZGVyJztcbi8vIGltcG9ydCBJbW11dGFibGUsIHtNYXAsIExpc3R9IGZyb20gJ2ltbXV0YWJsZSc7XG5cbmNvbnN0IFJFTkRFUiA9IFN5bWJvbCgndGVtcGxhdGUtcmVuZGVyJyk7XG5cbmNvbnN0IERBVEFfQVRUUiA9ICdkYXRhJztcblxubGV0IFRDb250ZXh0ID0gZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KCd0LWNvbnRleHQnLCB7XG4gIHByb3RvdHlwZTogT2JqZWN0LmNyZWF0ZShcbiAgICBIVE1MRWxlbWVudC5wcm90b3R5cGUsXG4gICAge1xuICAgICAgYXR0YWNoZWRDYWxsYmFjazoge3ZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2F0dGFjaGVkIScsIHRoaXMpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgfX0sXG5cbiAgICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjazoge3ZhbHVlOiBmdW5jdGlvbihhdHRyLCB2YWx1ZSwgcHJldmlvdXMpIHtcbiAgICAgICAgc3dpdGNoIChhdHRyKSB7XG4gICAgICAgICAgY2FzZSBEQVRBX0FUVFI6XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH19LFxuXG4gICAgICB1cGRhdGU6IHt2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGluZy4uLicpO1xuICAgICAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoREFUQV9BVFRSKSkge1xuICAgICAgICAgIGxldCBleHByID0gdGhpcy5nZXRBdHRyaWJ1dGUoREFUQV9BVFRSKTtcbiAgICAgICAgICBsZXQgZGF0YSA9IGV2YWx1YXRlKGV4cHIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXR0aW5nIGRhdGE6ICgnLCBleHByLCAnKSAtPicsIGRhdGEpO1xuICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICAgIH19LFxuXG4gICAgICBnZXRQYXJlbnRDb250ZXh0OiB7dmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgfX0sXG5cbiAgICAgIHJlbmRlcjoge3ZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHJlbmRlciA9IHRoaXNbUkVOREVSXTtcbiAgICAgICAgaWYgKCFyZW5kZXIpIHtcbiAgICAgICAgICByZW5kZXIgPSB0aGlzW1JFTkRFUl0gPSBjcmVhdGVSZW5kZXJGdW5jdGlvbih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICByZW5kZXIodGhpcy5kYXRhKTtcbiAgICAgIH19LFxuXG4gICAgICBpbnZhbGlkYXRlOiB7dmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzW1JFTkRFUl0gPSBudWxsO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgfX0sXG5cbiAgICAgIGRhdGE6IHByb3BlcnR5KFxuICAgICAgICBmdW5jdGlvbiByZWFkVGVtcGxhdGVEYXRhKGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24gc2V0VGVtcGxhdGVEYXRhKGRhdGEsIHByZXZpb3VzKSB7XG4gICAgICAgICAgaWYgKGRhdGEgIT09IHByZXZpb3VzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHt9XG4gICAgICApXG4gICAgfVxuICApXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgVENvbnRleHQ7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IHRydWU7XG4gICAgdmFyIGN1cnJlbnRRdWV1ZTtcbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgdmFyIGkgPSAtMTtcbiAgICAgICAgd2hpbGUgKCsraSA8IGxlbikge1xuICAgICAgICAgICAgY3VycmVudFF1ZXVlW2ldKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xufVxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICBxdWV1ZS5wdXNoKGZ1bik7XG4gICAgaWYgKCFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIl19

!function(t){function e(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return t[r].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){n(1);var r=n(2),a=n(6);window.tagalong={Template:r,createRenderer:a.create,render:a.render}},function(t,e){/*! (C) WebReflection Mit Style License */
!function(t,e,n,r){"use strict";function a(t,e){for(var n=0,r=t.length;r>n;n++)v(t[n],e)}function i(t){for(var e,n=0,r=t.length;r>n;n++)e=t[n],E(e,R[u(e)])}function o(t){return function(e){nt(e)&&(v(e,t),a(e.querySelectorAll(I),t))}}function u(t){var e=t.getAttribute("is"),n=t.nodeName.toUpperCase(),r=U.call(F,e?S+e.toUpperCase():M+n);return e&&r>-1&&!l(n,e)?-1:r}function l(t,e){return-1<I.indexOf(t+'[is="'+e+'"]')}function s(t){var e=t.currentTarget,n=t.attrChange,r=t.attrName,a=t.target;pt&&(!a||a===e)&&e.attributeChangedCallback&&"style"!==r&&e.attributeChangedCallback(r,n===t[x]?null:t.prevValue,n===t[V]?null:t.newValue)}function c(t){var e=o(t);return function(t){m.push(e,t.target)}}function f(t){dt&&(dt=!1,t.currentTarget.removeEventListener(T,f)),a((t.target||e).querySelectorAll(I),t.detail===A?A:O),et&&p()}function h(t,e){var n=this;it.call(n,t,e),g.call(n,{target:n})}function d(t,e){J(t,e),w?w.observe(t,lt):(ht&&(t.setAttribute=h,t[C]=y(t),t.addEventListener(L,g)),t.addEventListener(D,s)),t.createdCallback&&pt&&(t.created=!0,t.createdCallback(),t.created=!1)}function p(){for(var t,e=0,n=rt.length;n>e;e++)t=rt[e],q.contains(t)||(rt.splice(e,1),v(t,A))}function v(t,e){var n,r=u(t);r>-1&&(N(t,R[r]),r=0,e!==O||t[O]?e===A&&!t[A]&&(t[O]=!1,t[A]=!0,r=1):(t[A]=!1,t[O]=!0,r=1,et&&U.call(rt,t)<0&&rt.push(t)),r&&(n=t[e+"Callback"])&&n.call(t))}if(!(r in e)){var m,g,b,y,w,N,E,C="__"+r+(1e5*Math.random()>>0),O="attached",A="detached",k="extends",x="ADDITION",_="MODIFICATION",V="REMOVAL",D="DOMAttrModified",T="DOMContentLoaded",L="DOMSubtreeModified",M="<",S="=",P=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,j=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],F=[],R=[],I="",q=e.documentElement,U=F.indexOf||function(t){for(var e=this.length;e--&&this[e]!==t;);return e},H=n.prototype,W=H.hasOwnProperty,Z=H.isPrototypeOf,$=n.defineProperty,z=n.getOwnPropertyDescriptor,G=n.getOwnPropertyNames,X=n.getPrototypeOf,B=n.setPrototypeOf,K=!!n.__proto__,Y=n.create||function vt(t){return t?(vt.prototype=t,new vt):this},J=B||(K?function(t,e){return t.__proto__=e,t}:G&&z?function(){function t(t,e){for(var n,r=G(e),a=0,i=r.length;i>a;a++)n=r[a],W.call(t,n)||$(t,n,z(e,n))}return function(e,n){do t(e,n);while((n=X(n))&&!Z.call(n,e));return e}}():function(t,e){for(var n in e)t[n]=e[n];return t}),Q=t.MutationObserver||t.WebKitMutationObserver,tt=(t.HTMLElement||t.Element||t.Node).prototype,et=!Z.call(tt,q),nt=et?function(t){return 1===t.nodeType}:function(t){return Z.call(tt,t)},rt=et&&[],at=tt.cloneNode,it=tt.setAttribute,ot=tt.removeAttribute,ut=e.createElement,lt=Q&&{attributes:!0,characterData:!0,attributeOldValue:!0},st=Q||function(t){ht=!1,q.removeEventListener(D,st)},ct=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.msRequestAnimationFrame||function(t){setTimeout(t,10)},ft=!1,ht=!0,dt=!0,pt=!0;B||K?(N=function(t,e){Z.call(e,t)||d(t,e)},E=d):(N=function(t,e){t[C]||(t[C]=n(!0),d(t,e))},E=N),et?(ht=!1,function(){var t=z(tt,"addEventListener"),e=t.value,n=function(t){var e=new CustomEvent(D,{bubbles:!0});e.attrName=t,e.prevValue=this.getAttribute(t),e.newValue=null,e[V]=e.attrChange=2,ot.call(this,t),this.dispatchEvent(e)},r=function(t,e){var n=this.hasAttribute(t),r=n&&this.getAttribute(t),a=new CustomEvent(D,{bubbles:!0});it.call(this,t,e),a.attrName=t,a.prevValue=n?r:null,a.newValue=e,n?a[_]=a.attrChange=1:a[x]=a.attrChange=0,this.dispatchEvent(a)},a=function(t){var e,n=t.currentTarget,r=n[C],a=t.propertyName;r.hasOwnProperty(a)&&(r=r[a],e=new CustomEvent(D,{bubbles:!0}),e.attrName=r.name,e.prevValue=r.value||null,e.newValue=r.value=n[a]||null,null==e.prevValue?e[x]=e.attrChange=0:e[_]=e.attrChange=1,n.dispatchEvent(e))};t.value=function(t,i,o){t===D&&this.attributeChangedCallback&&this.setAttribute!==r&&(this[C]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,e.call(this,"propertychange",a)),e.call(this,t,i,o)},$(tt,"addEventListener",t)}()):Q||(q.addEventListener(D,st),q.setAttribute(C,1),q.removeAttribute(C),ht&&(g=function(t){var e,n,r,a=this;if(a===t.target){e=a[C],a[C]=n=y(a);for(r in n){if(!(r in e))return b(0,a,r,e[r],n[r],x);if(n[r]!==e[r])return b(1,a,r,e[r],n[r],_)}for(r in e)if(!(r in n))return b(2,a,r,e[r],n[r],V)}},b=function(t,e,n,r,a,i){var o={attrChange:t,currentTarget:e,attrName:n,prevValue:r,newValue:a};o[i]=t,s(o)},y=function(t){for(var e,n,r={},a=t.attributes,i=0,o=a.length;o>i;i++)e=a[i],n=e.name,"setAttribute"!==n&&(r[n]=e.value);return r})),e[r]=function(t,n){if(r=t.toUpperCase(),ft||(ft=!0,Q?(w=function(t,e){function n(t,e){for(var n=0,r=t.length;r>n;e(t[n++]));}return new Q(function(r){for(var a,i,o=0,u=r.length;u>o;o++)a=r[o],"childList"===a.type?(n(a.addedNodes,t),n(a.removedNodes,e)):(i=a.target,pt&&i.attributeChangedCallback&&"style"!==a.attributeName&&i.attributeChangedCallback(a.attributeName,a.oldValue,i.getAttribute(a.attributeName)))})}(o(O),o(A)),w.observe(e,{childList:!0,subtree:!0})):(m=[],ct(function g(){for(;m.length;)m.shift().call(null,m.shift());ct(g)}),e.addEventListener("DOMNodeInserted",c(O)),e.addEventListener("DOMNodeRemoved",c(A))),e.addEventListener(T,f),e.addEventListener("readystatechange",f),e.createElement=function(t,n){var r=ut.apply(e,arguments),a=""+t,i=U.call(F,(n?S:M)+(n||a).toUpperCase()),o=i>-1;return n&&(r.setAttribute("is",n=n.toLowerCase()),o&&(o=l(a.toUpperCase(),n))),pt=!e.createElement.innerHTMLHelper,o&&E(r,R[i]),r},tt.cloneNode=function(t){var e=at.call(this,!!t),n=u(e);return n>-1&&E(e,R[n]),t&&i(e.querySelectorAll(I)),e}),-2<U.call(F,S+r)+U.call(F,M+r))throw new Error("A "+t+" type is already registered");if(!P.test(r)||-1<U.call(j,r))throw new Error("The type "+t+" is invalid");var r,s=function(){return d?e.createElement(p,r):e.createElement(p)},h=n||H,d=W.call(h,k),p=d?n[k].toUpperCase():r,v=F.push((d?S:M)+r)-1;return I=I.concat(I.length?",":"",d?p+'[is="'+t.toLowerCase()+'"]':p),s.prototype=R[v]=W.call(h,"prototype")?h.prototype:Y(tt),a(e.querySelectorAll(I),O),s}}}(window,document,Object,"registerElement")},function(t,e,n){var r=n(3),a=n(4).evaluate,i=n(6).create,o="__render",u="data",l=document.registerElement("t-template",{prototype:Object.create(HTMLElement.prototype,{attachedCallback:{value:function(){console.log("attached!",this),this.update()}},attributeChangedCallback:{value:function(t,e,n){switch(t){case u:this.update()}}},update:{value:function(){if(console.log("updating..."),this.hasAttribute(u)){var t=this.getAttribute(u),e=a(t);console.log("setting data: (",t,") ->",e),this.data=e}}},render:{value:function(t){arguments.length||(t=this.data);var e=this[o];return e||(e=this[o]=i(this)),e(t),t}},invalidate:{value:function(){this[o]=null,this.render()}},data:r(function(t){return t},function(t,e){return this.render(t)},{})})});t.exports=l},function(t,e){t.exports=function(t,e,n){return{enumerable:!1,get:function(){return t?t.call(this,n):n},set:function(t){if(t!==n){var r=n;return n=e.call(this,t,r)}}}}},function(t,e,n){function r(t){return t}var a=n(5),i=function(t,e){var n=o(t);return n.call(this,e)},o=function(t){if(a.is(t))return a.parse(t);var e="d"+Date.now();return t.match(/^\s*\.\s*$/)?r:(t.match(/^\s*\.\w/)&&(t=e+t),new Function(e,["try { ","  with (this) {","    with (",e,") {","      return (",t,");","    } ","  } ","} catch (error) { }"].join("\n")))};t.exports={evaluate:i,evaluator:o}},function(t,e){var n=/^\s*\(?(\s*\w+\s*(,\s*\w+\s*)*)\)?\s*=>\s*({([^}]+)}|(.+))$/,r=function(t){return String(t).match(n)},a=function(t){var e=t.match(n);if(!e)throw new Error('invalid arrow expression: "'+t+'"');var r=e[1],a=e[4]||e[5];return new Function(r,["try {","  with (this) {","    return (",a,");","  }","} catch (error) { }"].join("\n"))};t.exports={is:r,parse:a}},function(t,e,n){function r(t,e){if("string"==typeof t){var n=t;if(t=document.querySelector(n),!t)throw new Error('no element found with selector: "'+n+'"')}var r=a(t);return arguments.length<2&&(e={}),function(n){return y.patch(t,r.bind(e,n))}}function a(t){for(var e=[],n=t.firstChild;n;n=n.nextSibling)switch(n.nodeType){case Node.TEXT_NODE:e.push(i(n));break;case Node.ELEMENT_NODE:e.push(o(n))}return function(t){e.forEach(function(e){e.call(this,t)},this)}}function i(t){var e=t.nodeValue;return N.isTemplate(e)?function(t){var n=N.call(this,e,t);y.text(v(n)?n:"")}:function(){y.text(e)}}function o(t){var e=t.nodeName.toLowerCase();if(t.hasAttribute(A))return b;var n=h(e),r=s(t),i=t.hasAttribute(k)?w.evaluator(t.getAttribute(k)):null;if(t.hasAttribute(x)){if(i)throw new Error("element has both t-if and t-else attributes");var o=f(t,"["+k+"]");if(!o)throw new Error("element with t-else has no matching t-if sibling");i=m(w.evaluator(o.getAttribute(k)))}var d,g=t.getAttribute(T);if(g){var N=w.evaluator(g);d=function(t){var e=N.call(this,t);v(e)&&y.text(String(e))}}else d=a(t);var E=function(t){if(i&&!i.call(this,t))return!1;var a=c.call(this,r,t);n?y.elementVoid(e,"",a):(y.elementOpen(e,"",a),d.call(this,t),y.elementClose(e))},C=t.getAttribute(_),L=t.getAttribute(V),M=t.getAttribute(D),S=t.getAttribute(O);return C?E=u(C,E,S):L?d=u(L,d,S):M?E=l(M,E,S):S&&(E=p(S,E)),E}function u(t,e,n){var r=w.evaluator(t);return function(t){var a=r.call(this,t);d.call(this,a,e,n)}}function l(t,e,n){var r=w.evaluator(t);return n&&(e=p(n,e)),function(t){t=r.call(this,t),e.call(this,t)}}function s(t){for(var e={},n=t.attributes,r=0;r<n.length;r++){var a=n[r],i=String(a.name);if(0===i.indexOf(C)){if(i=i.substr(C.length),L.indexOf(i)>-1)continue;var o=w.evaluator(a.value);switch(i){case"class":o=E.className(o);break;case"style":o=E.style(o)}e[i]=o}else e[i]=a.value}return e}function c(t,e){var n=[];for(var r in t){var a=t[r];"function"==typeof a&&(a=a.call(this,e,r)),v(a)&&n.push(r,a)}return n}function f(t,e){for(;(t=t.previousSibling)&&t;)if(t.matches(e))return t;throw new Error("no previous sibling found matching: "+e)}function h(t){return M.indexOf(t)>-1}function d(t,e,n){var r=n?p(n,e):e,a="$i",i=function(t,e){this[a]=e,r.call(this,t),delete this[a]};if("object"==typeof t){if(Array.isArray(t))return t.forEach(i,this);var o=0;for(var u in t)t.hasOwnProperty(u)&&i.call(this,{key:u,value:t[u]},o++)}else if("string"==typeof t)return t.split("").forEach(i,this)}function p(t,e){return function(n){var r=g(this,t,n);e.call(this,n),g(this,t,r)}}function v(t){return null!==t&&void 0!==t}function m(t){return function(){return!t.apply(this,arguments)}}function g(t,e,n){var r=t[e];return void 0===n?delete t[e]:t[e]=n,r}function b(){}var y=(n(4),n(7)),w=n(4),N=n(9),E=n(10),C="t-",O=C+"as",A=C+"skip",k=C+"if",x=C+"else",_=C+"each",V=C+"foreach",D=C+"with",T=C+"text",L=["if","else","each","foreach","with","text","as","skip"],M=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"];t.exports={create:r,render:function(t,e,n){var a=r(t,n);return a(e),a}}},function(t,e,n){(function(t){/**
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
"use strict";function n(t){this.stack_=[],this.root=t,this.currentNode=t}function r(t,r){this.walker=new n(t),this.doc=t.ownerDocument,this.nsStack_=[void 0],this.prevContext=r,this.created=e.notifications.nodesCreated&&[],this.deleted=e.notifications.nodesDeleted&&[]}function a(t,e){this.attrs=h(),this.attrsArr=[],this.newAttrs=h(),this.key=e,this.keyMap=null,this.keyMapValid=!0,this.lastVisitedChild=null,this.nodeName=t,this.text=null}e.notifications={nodesCreated:null,nodesDeleted:null},n.prototype.getCurrentParent=function(){return this.stack_[this.stack_.length-1]},n.prototype.firstChild=function(){this.stack_.push(this.currentNode),this.currentNode=this.currentNode.firstChild},n.prototype.nextSibling=function(){this.currentNode=this.currentNode.nextSibling},n.prototype.parentNode=function(){this.currentNode=this.stack_.pop()},r.prototype.getCurrentNamespace=function(){return this.nsStack_[this.nsStack_.length-1]},r.prototype.enterNamespace=function(t){this.nsStack_.push(t)},r.prototype.exitNamespace=function(){this.nsStack_.pop()},r.prototype.markCreated=function(t){this.created&&this.created.push(t)},r.prototype.markDeleted=function(t){this.deleted&&this.deleted.push(t)},r.prototype.notifyChanges=function(){this.created&&this.created.length>0&&e.notifications.nodesCreated(this.created),this.deleted&&this.deleted.length>0&&e.notifications.nodesDeleted(this.deleted)};var i,o=function(t){i=new r(t,i)},u=function(){i=i.prevContext},l=function(){return i},s=Object.prototype.hasOwnProperty,c=Object.create,f=function(t,e){return s.call(t,e)},h=function(){return c(null)},d=function(t,e,n){var r=new a(e,n);return t.__incrementalDOMData=r,r},p=function(t){var e=t.__incrementalDOMData;if(!e){var n=t.nodeName.toLowerCase(),r=null;t instanceof Element&&(r=t.getAttribute("key")),e=d(t,n,r)}return e};e.symbols={"default":"__default",placeholder:"__placeholder"},e.applyAttr=function(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)},e.applyProp=function(t,e,n){t[e]=n};var v=function(t,e,n){if("string"==typeof n)t.style.cssText=n;else{t.style.cssText="";var r=t.style;for(var a in n)f(n,a)&&(r[a]=n[a])}},m=function(t,n,r){var a=typeof r;"object"===a||"function"===a?e.applyProp(t,n,r):e.applyAttr(t,n,r)},g=function(t,n,r){var a=p(t),i=a.attrs;if(i[n]!==r){var o=e.attributes[n]||e.attributes[e.symbols["default"]];o(t,n,r),i[n]=r}};e.attributes=h(),e.attributes[e.symbols["default"]]=m,e.attributes[e.symbols.placeholder]=function(){},e.attributes.style=v;var b="http://www.w3.org/2000/svg",y=function(t){"svg"===t?l().enterNamespace(b):"foreignObject"===t&&l().enterNamespace(void 0)},w=function(t){("svg"===t||"foreignObject"===t)&&l().exitNamespace()},N=function(t){return"svg"===t?b:l().getCurrentNamespace()},E=function(t,e,n,r){var a,i=N(e);if(a=i?t.createElementNS(i,e):t.createElement(e),d(a,e,n),r)for(var o=0;o<r.length;o+=2)g(a,r[o],r[o+1]);return a},C=function(t,e,n,r){return"#text"===e?t.createTextNode(""):E(t,e,n,r)},O=function(t){for(var e=h(),n=t.children,r=n.length,a=0;r>a;a+=1){var i=n[a],o=p(i).key;o&&(e[o]=i)}return e},A=function(t){var e=p(t);return e.keyMap||(e.keyMap=O(t)),e.keyMap},k=function(t,e){return e&&A(t)[e]},x=function(t,e,n){A(t)[e]=n};if("production"!==t.env.NODE_ENV)var _=function(t,e,n){var r=p(t).nodeName;if(r!==e)throw new Error('Was expecting node with key "'+n+'" to be a '+e+", not a "+r+".")};var V=function(t,e,n){var r=p(t);return n==r.key&&e===r.nodeName},D=function(e,n,r){var a,i=l(),o=i.walker,u=o.currentNode,s=o.getCurrentParent();if(u&&V(u,e,n))a=u;else{var c=k(s,n);c?("production"!==t.env.NODE_ENV&&_(c,e,n),a=c):(a=C(i.doc,e,n,r),n&&x(s,n,a),i.markCreated(a)),u&&p(u).key?(s.replaceChild(a,u),p(s).keyMapValid=!1):s.insertBefore(a,u),o.currentNode=a}return a},T=function(t){var n,r=l(),a=r.walker,i=p(t),o=i.keyMap,u=i.keyMapValid,s=i.lastVisitedChild,c=t.lastChild;if(i.lastVisitedChild=null,!(c===s&&u||i.attrs[e.symbols.placeholder]&&a.currentNode!==a.root)){for(;c!==s;)t.removeChild(c),r.markDeleted(c),n=p(c).key,n&&delete o[n],c=t.lastChild;for(n in o)c=o[n],c.parentNode||(r.markDeleted(c),delete o[n]);i.keyMapValid=!0}},L=function(t){var e=p(t);y(e.nodeName)},M=function(t){var e=p(t);w(e.nodeName)},S=function(t){var e=l(),n=e.walker,r=n.getCurrentParent(),a=p(r);a.lastVisitedChild=t},P=function(){var t=l(),e=t.walker;L(e.currentNode),e.firstChild()},j=function(){var t=l(),e=t.walker;S(e.currentNode),e.nextSibling()},F=function(){var t=l(),e=t.walker;e.parentNode(),M(e.currentNode)};if("production"!==t.env.NODE_ENV)var R=function(t){var e=l().walker.getCurrentParent();if(e){for(var n=[];e&&e!==t;)n.push(e.nodeName.toLowerCase()),e=e.parentNode;throw new Error("One or more tags were not closed:\n"+n.join("\n"))}};e.patch=function(e,n,r){o(e),P(),n(r),F(),T(e),"production"!==t.env.NODE_ENV&&R(e),l().notifyChanges(),u()};var I=3,q=[];if("production"!==t.env.NODE_ENV)var U=!1,H=function(){if(U)throw new Error("Was not expecting a call to attr or elementOpenEnd, they must follow a call to elementOpenStart.")},W=function(){if(!U)throw new Error("Was expecting a call to attr or elementOpenEnd. elementOpenStart must be followed by zero or more calls to attr, then one call to elementOpenEnd.")},Z=function(t){if(!t)throw new Error("Placeholder elements must have a key specified.")},$=function(t){var e=l(),n=e.walker,r=n.getCurrentParent(),a=p(r);if(t!==a.nodeName)throw new Error("Received a call to close "+t+" but "+a.nodeName+" was open.")},z=function(){U=!0},G=function(){U=!1};e.elementOpen=function(e,n,r,a){"production"!==t.env.NODE_ENV&&H();for(var i=D(e,n,r),o=p(i),u=o.attrsArr,l=!1,s=I,c=0;s<arguments.length;s+=1,c+=1)if(u[c]!==arguments[s]){l=!0;break}for(;s<arguments.length;s+=1,c+=1)u[c]=arguments[s];if(c<u.length&&(l=!0,u.length=c),l){var f,h=o.newAttrs;for(f in h)h[f]=void 0;for(s=I;s<arguments.length;s+=2)h[arguments[s]]=arguments[s+1];for(f in h)g(i,f,h[f])}return P(),i},e.elementOpenStart=function(e,n,r){"production"!==t.env.NODE_ENV&&(H(),z()),q[0]=e,q[1]=n,q[2]=r},e.attr=function(e,n){"production"!==t.env.NODE_ENV&&W(),q.push(e,n)},e.elementOpenEnd=function(){"production"!==t.env.NODE_ENV&&(W(),G());var n=e.elementOpen.apply(null,q);return q.length=0,n},e.elementClose=function(e){"production"!==t.env.NODE_ENV&&(H(),$(e)),F();var n=l().walker.currentNode;return T(n),j(),n},e.elementVoid=function(t,n,r,a){var i=e.elementOpen.apply(null,arguments);return e.elementClose.apply(null,arguments),i},e.elementPlaceholder=function(n,r,a,i){"production"!==t.env.NODE_ENV&&Z(r);var o=e.elementOpen.apply(null,arguments);return g(o,e.symbols.placeholder,!0),e.elementClose.apply(null,arguments),o},e.text=function(e,n){"production"!==t.env.NODE_ENV&&H();var r=D("#text",null),a=p(r);if(a.text!==e){a.text=e;for(var i=e,o=1;o<arguments.length;o+=1)i=arguments[o](i);r.data=i}return j(),r}}).call(e,n(8))},function(t,e){function n(){s=!1,o.length?l=o.concat(l):c=-1,l.length&&r()}function r(){if(!s){var t=setTimeout(n);s=!0;for(var e=l.length;e;){for(o=l,l=[];++c<e;)o&&o[c].run();c=-1,e=l.length}o=null,s=!1,clearTimeout(t)}}function a(t,e){this.fun=t,this.array=e}function i(){}var o,u=t.exports={},l=[],s=!1,c=-1;u.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];l.push(new a(t,e)),1!==l.length||s||setTimeout(r,0)},a.prototype.run=function(){this.fun.apply(null,this.array)},u.title="browser",u.browser=!0,u.env={},u.argv=[],u.version="",u.versions={},u.on=i,u.addListener=i,u.once=i,u.off=i,u.removeListener=i,u.removeAllListeners=i,u.emit=i,u.binding=function(t){throw new Error("process.binding is not supported")},u.cwd=function(){return"/"},u.chdir=function(t){throw new Error("process.chdir is not supported")},u.umask=function(){return 0}},function(t,e,n){function r(t,e){var n=this;return t.replace(i,function(t,r){return a.call(n,r,e)})}var a=n(4).evaluate,i=/{{([^}]+)}}/g;t.exports=r,t.exports.isTemplate=function(t){return!!t.match(i)}},function(t,e){function n(t){return Array.isArray(t)?t.join("; "):Object.keys(t).map(function(e){return[r(e),": ",t[e],";"].join("")}).join(" ")}function r(t){return t.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()})}function a(t){return Array.isArray(t)?t.join(" "):Object.keys(t).filter(function(e){return!!t[e]}).join(" ")}var i=function(t){return function(){var e=t.apply(this,arguments);return e&&"object"==typeof e?n(e):e}},o=function(t){return function(){var e=t.apply(this,arguments);return e&&"object"==typeof e?a(e):e}};t.exports={style:i,className:o}}]);
//# sourceMappingURL=tagalong.js.map
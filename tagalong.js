!function(t){function e(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return t[r].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){n(1);var r=n(2),a=n(6);window.tagalong={Template:r,createRenderer:a.create,render:a.render}},function(t,e){/*! (C) WebReflection Mit Style License */
!function(t,e,n,r){"use strict";function a(t,e){for(var n=0,r=t.length;r>n;n++)v(t[n],e)}function o(t){for(var e,n=0,r=t.length;r>n;n++)e=t[n],E(e,R[u(e)])}function i(t){return function(e){nt(e)&&(v(e,t),a(e.querySelectorAll(I),t))}}function u(t){var e=t.getAttribute("is"),n=t.nodeName.toUpperCase(),r=U.call(j,e?S+e.toUpperCase():M+n);return e&&r>-1&&!l(n,e)?-1:r}function l(t,e){return-1<I.indexOf(t+'[is="'+e+'"]')}function c(t){var e=t.currentTarget,n=t.attrChange,r=t.attrName,a=t.target;pt&&(!a||a===e)&&e.attributeChangedCallback&&"style"!==r&&e.attributeChangedCallback(r,n===t[_]?null:t.prevValue,n===t[V]?null:t.newValue)}function s(t){var e=i(t);return function(t){m.push(e,t.target)}}function f(t){ht&&(ht=!1,t.currentTarget.removeEventListener(L,f)),a((t.target||e).querySelectorAll(I),t.detail===A?A:O),et&&p()}function d(t,e){var n=this;ot.call(n,t,e),g.call(n,{target:n})}function h(t,e){J(t,e),N?N.observe(t,lt):(dt&&(t.setAttribute=d,t[C]=y(t),t.addEventListener(T,g)),t.addEventListener(D,c)),t.createdCallback&&pt&&(t.created=!0,t.createdCallback(),t.created=!1)}function p(){for(var t,e=0,n=rt.length;n>e;e++)t=rt[e],q.contains(t)||(rt.splice(e,1),v(t,A))}function v(t,e){var n,r=u(t);r>-1&&(w(t,R[r]),r=0,e!==O||t[O]?e===A&&!t[A]&&(t[O]=!1,t[A]=!0,r=1):(t[A]=!1,t[O]=!0,r=1,et&&U.call(rt,t)<0&&rt.push(t)),r&&(n=t[e+"Callback"])&&n.call(t))}if(!(r in e)){var m,g,b,y,N,w,E,C="__"+r+(1e5*Math.random()>>0),O="attached",A="detached",k="extends",_="ADDITION",x="MODIFICATION",V="REMOVAL",D="DOMAttrModified",L="DOMContentLoaded",T="DOMSubtreeModified",M="<",S="=",P=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,F=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],j=[],R=[],I="",q=e.documentElement,U=j.indexOf||function(t){for(var e=this.length;e--&&this[e]!==t;);return e},H=n.prototype,W=H.hasOwnProperty,Z=H.isPrototypeOf,z=n.defineProperty,G=n.getOwnPropertyDescriptor,X=n.getOwnPropertyNames,$=n.getPrototypeOf,B=n.setPrototypeOf,K=!!n.__proto__,Y=n.create||function vt(t){return t?(vt.prototype=t,new vt):this},J=B||(K?function(t,e){return t.__proto__=e,t}:X&&G?function(){function t(t,e){for(var n,r=X(e),a=0,o=r.length;o>a;a++)n=r[a],W.call(t,n)||z(t,n,G(e,n))}return function(e,n){do t(e,n);while((n=$(n))&&!Z.call(n,e));return e}}():function(t,e){for(var n in e)t[n]=e[n];return t}),Q=t.MutationObserver||t.WebKitMutationObserver,tt=(t.HTMLElement||t.Element||t.Node).prototype,et=!Z.call(tt,q),nt=et?function(t){return 1===t.nodeType}:function(t){return Z.call(tt,t)},rt=et&&[],at=tt.cloneNode,ot=tt.setAttribute,it=tt.removeAttribute,ut=e.createElement,lt=Q&&{attributes:!0,characterData:!0,attributeOldValue:!0},ct=Q||function(t){dt=!1,q.removeEventListener(D,ct)},st=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.msRequestAnimationFrame||function(t){setTimeout(t,10)},ft=!1,dt=!0,ht=!0,pt=!0;B||K?(w=function(t,e){Z.call(e,t)||h(t,e)},E=h):(w=function(t,e){t[C]||(t[C]=n(!0),h(t,e))},E=w),et?(dt=!1,function(){var t=G(tt,"addEventListener"),e=t.value,n=function(t){var e=new CustomEvent(D,{bubbles:!0});e.attrName=t,e.prevValue=this.getAttribute(t),e.newValue=null,e[V]=e.attrChange=2,it.call(this,t),this.dispatchEvent(e)},r=function(t,e){var n=this.hasAttribute(t),r=n&&this.getAttribute(t),a=new CustomEvent(D,{bubbles:!0});ot.call(this,t,e),a.attrName=t,a.prevValue=n?r:null,a.newValue=e,n?a[x]=a.attrChange=1:a[_]=a.attrChange=0,this.dispatchEvent(a)},a=function(t){var e,n=t.currentTarget,r=n[C],a=t.propertyName;r.hasOwnProperty(a)&&(r=r[a],e=new CustomEvent(D,{bubbles:!0}),e.attrName=r.name,e.prevValue=r.value||null,e.newValue=r.value=n[a]||null,null==e.prevValue?e[_]=e.attrChange=0:e[x]=e.attrChange=1,n.dispatchEvent(e))};t.value=function(t,o,i){t===D&&this.attributeChangedCallback&&this.setAttribute!==r&&(this[C]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,e.call(this,"propertychange",a)),e.call(this,t,o,i)},z(tt,"addEventListener",t)}()):Q||(q.addEventListener(D,ct),q.setAttribute(C,1),q.removeAttribute(C),dt&&(g=function(t){var e,n,r,a=this;if(a===t.target){e=a[C],a[C]=n=y(a);for(r in n){if(!(r in e))return b(0,a,r,e[r],n[r],_);if(n[r]!==e[r])return b(1,a,r,e[r],n[r],x)}for(r in e)if(!(r in n))return b(2,a,r,e[r],n[r],V)}},b=function(t,e,n,r,a,o){var i={attrChange:t,currentTarget:e,attrName:n,prevValue:r,newValue:a};i[o]=t,c(i)},y=function(t){for(var e,n,r={},a=t.attributes,o=0,i=a.length;i>o;o++)e=a[o],n=e.name,"setAttribute"!==n&&(r[n]=e.value);return r})),e[r]=function(t,n){if(r=t.toUpperCase(),ft||(ft=!0,Q?(N=function(t,e){function n(t,e){for(var n=0,r=t.length;r>n;e(t[n++]));}return new Q(function(r){for(var a,o,i=0,u=r.length;u>i;i++)a=r[i],"childList"===a.type?(n(a.addedNodes,t),n(a.removedNodes,e)):(o=a.target,pt&&o.attributeChangedCallback&&"style"!==a.attributeName&&o.attributeChangedCallback(a.attributeName,a.oldValue,o.getAttribute(a.attributeName)))})}(i(O),i(A)),N.observe(e,{childList:!0,subtree:!0})):(m=[],st(function g(){for(;m.length;)m.shift().call(null,m.shift());st(g)}),e.addEventListener("DOMNodeInserted",s(O)),e.addEventListener("DOMNodeRemoved",s(A))),e.addEventListener(L,f),e.addEventListener("readystatechange",f),e.createElement=function(t,n){var r=ut.apply(e,arguments),a=""+t,o=U.call(j,(n?S:M)+(n||a).toUpperCase()),i=o>-1;return n&&(r.setAttribute("is",n=n.toLowerCase()),i&&(i=l(a.toUpperCase(),n))),pt=!e.createElement.innerHTMLHelper,i&&E(r,R[o]),r},tt.cloneNode=function(t){var e=at.call(this,!!t),n=u(e);return n>-1&&E(e,R[n]),t&&o(e.querySelectorAll(I)),e}),-2<U.call(j,S+r)+U.call(j,M+r))throw new Error("A "+t+" type is already registered");if(!P.test(r)||-1<U.call(F,r))throw new Error("The type "+t+" is invalid");var r,c=function(){return h?e.createElement(p,r):e.createElement(p)},d=n||H,h=W.call(d,k),p=h?n[k].toUpperCase():r,v=j.push((h?S:M)+r)-1;return I=I.concat(I.length?",":"",h?p+'[is="'+t.toLowerCase()+'"]':p),c.prototype=R[v]=W.call(d,"prototype")?d.prototype:Y(tt),a(e.querySelectorAll(I),O),c}}}(window,document,Object,"registerElement")},function(t,e,n){var r=n(3),a=n(4).evaluate,o=n(6).create,i="__render",u="data",l=document.registerElement("t-template",{prototype:Object.create(HTMLElement.prototype,{attachedCallback:{value:function(){console.log("attached!",this),this.update()}},attributeChangedCallback:{value:function(t,e,n){switch(t){case u:this.update()}}},update:{value:function(){if(console.log("updating..."),this.hasAttribute(u)){var t=this.getAttribute(u),e=a(t);console.log("setting data: (",t,") ->",e),this.data=e}}},render:{value:function(t){arguments.length||(t=this.data);var e=this[i];return e||(e=this[i]=o(this)),e(t),t}},invalidate:{value:function(){this[i]=null,this.render()}},data:r(function(t){return t},function(t,e){return this.render(t)},{})})});t.exports=l},function(t,e){t.exports=function(t,e,n){return{enumerable:!1,get:function(){return t?t.call(this,n):n},set:function(t){if(t!==n){var r=n;return n=e.call(this,t,r)}}}}},function(t,e,n){var r=n(5),a=function(t,e){var n=o(t);return n.call(this,e)},o=function(t){if(r.is(t))return parseArrow(t);var e="d"+Date.now();return"."===t?function(t){return t}:(t.match(/^\s*\.\w/)&&(t=e+t),new Function(e,["try { ","with (",e," || {}) {","  return ",t,";","} ","} catch (error) { }"].join("")))};t.exports={evaluate:a,evaluator:o}},function(t,e){var n=/^\s*\(?(\s*\w+\s*(,\s*\w+\s*)*)\)?\s*=>\s*({([^}]+)}|(.+))$/,r=function(t){return String(t).match(n)},a=function(t){var e=t.match(n);if(!e)throw new Error('invalid arrow expression: "'+t+'"');var r=e[1],a=e[4]||e[5];return new Function(r,"return ("+a+")")};t.exports={is:r,parse:a}},function(t,e,n){function r(t){if("string"==typeof t){var e=t;if(t=document.querySelector(e),!t)throw new Error('no element found with selector: "'+e+'"')}var n=a(t);return function(e){return h.patch(t,n.bind(this,e))}}function a(t){for(var e=[],n=t.firstChild;n;n=n.nextSibling)switch(n.nodeType){case Node.TEXT_NODE:e.push(o(n));break;case Node.ELEMENT_NODE:e.push(i(n))}return function(t){e.forEach(function(e){e(t)})}}function o(t){return function(e){h.text(t.nodeValue)}}function i(t){var e,n=t.nodeName.toLowerCase(),r=s(n),o=l(t),i=t.hasAttribute(g)?p.evaluator(t.getAttribute(g)):null,f=t.getAttribute(y);if(f){var v=p.evaluator(f);e=function(t){var e=v(t);d(e)&&h.text(String(e))}}else e=a(t);var m=function(t){if(i&&!i(t))return!1;var a=c(o,t);r?h.elementVoid(n,"",a):(h.elementOpen(n,"",a),e(t),h.elementClose(n))},w=t.getAttribute(b),E=t.getAttribute(N);return w?m=u(w,m):E&&(e=u(E,e)),m}function u(t,e){return function(n){var r=p.evaluate(t,n);f(r,e)}}function l(t){for(var e={},n=t.attributes,r=0;r<n.length;r++){var a=n[r],o=String(a.name);if(!(w.indexOf(o)>-1))if(0===o.indexOf(m)){var i=p.evaluator(a.value);switch(o=o.substr(m.length)){case"class":i=v.className(i);break;case"style":i=v.style(i)}e[o]=i}else e[o]=a.value}return e}function c(t,e){var n=[];for(var r in t){var a=t[r];"function"==typeof a&&(a=a.call(this,e,r)),d(a)&&n.push(r,a)}return n}function s(t){return E.indexOf(t)>-1}function f(t,e){return t.forEach(e,this)}function d(t){return null!==t&&void 0!==t}var h=(n(4),n(7)),p=n(4),v=n(9),m="t-",g=m+"if",b=m+"each",y=m+"text",N=m+"foreach",w=[g,b,N,y],E=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"];t.exports={create:r,render:function(t,e){var n=r(t);return n(e),n}}},function(t,e,n){(function(t){/**
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
"use strict";function n(t){this.stack_=[],this.root=t,this.currentNode=t}function r(t,r){this.walker=new n(t),this.doc=t.ownerDocument,this.nsStack_=[void 0],this.prevContext=r,this.created=e.notifications.nodesCreated&&[],this.deleted=e.notifications.nodesDeleted&&[]}function a(t,e){this.attrs=d(),this.attrsArr=[],this.newAttrs=d(),this.key=e,this.keyMap=null,this.keyMapValid=!0,this.lastVisitedChild=null,this.nodeName=t,this.text=null}e.notifications={nodesCreated:null,nodesDeleted:null},n.prototype.getCurrentParent=function(){return this.stack_[this.stack_.length-1]},n.prototype.firstChild=function(){this.stack_.push(this.currentNode),this.currentNode=this.currentNode.firstChild},n.prototype.nextSibling=function(){this.currentNode=this.currentNode.nextSibling},n.prototype.parentNode=function(){this.currentNode=this.stack_.pop()},r.prototype.getCurrentNamespace=function(){return this.nsStack_[this.nsStack_.length-1]},r.prototype.enterNamespace=function(t){this.nsStack_.push(t)},r.prototype.exitNamespace=function(){this.nsStack_.pop()},r.prototype.markCreated=function(t){this.created&&this.created.push(t)},r.prototype.markDeleted=function(t){this.deleted&&this.deleted.push(t)},r.prototype.notifyChanges=function(){this.created&&this.created.length>0&&e.notifications.nodesCreated(this.created),this.deleted&&this.deleted.length>0&&e.notifications.nodesDeleted(this.deleted)};var o,i=function(t){o=new r(t,o)},u=function(){o=o.prevContext},l=function(){return o},c=Object.prototype.hasOwnProperty,s=Object.create,f=function(t,e){return c.call(t,e)},d=function(){return s(null)},h=function(t,e,n){var r=new a(e,n);return t.__incrementalDOMData=r,r},p=function(t){var e=t.__incrementalDOMData;if(!e){var n=t.nodeName.toLowerCase(),r=null;t instanceof Element&&(r=t.getAttribute("key")),e=h(t,n,r)}return e};e.symbols={"default":"__default",placeholder:"__placeholder"},e.applyAttr=function(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)},e.applyProp=function(t,e,n){t[e]=n};var v=function(t,e,n){if("string"==typeof n)t.style.cssText=n;else{t.style.cssText="";var r=t.style;for(var a in n)f(n,a)&&(r[a]=n[a])}},m=function(t,n,r){var a=typeof r;"object"===a||"function"===a?e.applyProp(t,n,r):e.applyAttr(t,n,r)},g=function(t,n,r){var a=p(t),o=a.attrs;if(o[n]!==r){var i=e.attributes[n]||e.attributes[e.symbols["default"]];i(t,n,r),o[n]=r}};e.attributes=d(),e.attributes[e.symbols["default"]]=m,e.attributes[e.symbols.placeholder]=function(){},e.attributes.style=v;var b="http://www.w3.org/2000/svg",y=function(t){"svg"===t?l().enterNamespace(b):"foreignObject"===t&&l().enterNamespace(void 0)},N=function(t){("svg"===t||"foreignObject"===t)&&l().exitNamespace()},w=function(t){return"svg"===t?b:l().getCurrentNamespace()},E=function(t,e,n,r){var a,o=w(e);if(a=o?t.createElementNS(o,e):t.createElement(e),h(a,e,n),r)for(var i=0;i<r.length;i+=2)g(a,r[i],r[i+1]);return a},C=function(t,e,n,r){return"#text"===e?t.createTextNode(""):E(t,e,n,r)},O=function(t){for(var e=d(),n=t.children,r=n.length,a=0;r>a;a+=1){var o=n[a],i=p(o).key;i&&(e[i]=o)}return e},A=function(t){var e=p(t);return e.keyMap||(e.keyMap=O(t)),e.keyMap},k=function(t,e){return e&&A(t)[e]},_=function(t,e,n){A(t)[e]=n};if("production"!==t.env.NODE_ENV)var x=function(t,e,n){var r=p(t).nodeName;if(r!==e)throw new Error('Was expecting node with key "'+n+'" to be a '+e+", not a "+r+".")};var V=function(t,e,n){var r=p(t);return n==r.key&&e===r.nodeName},D=function(e,n,r){var a,o=l(),i=o.walker,u=i.currentNode,c=i.getCurrentParent();if(u&&V(u,e,n))a=u;else{var s=k(c,n);s?("production"!==t.env.NODE_ENV&&x(s,e,n),a=s):(a=C(o.doc,e,n,r),n&&_(c,n,a),o.markCreated(a)),u&&p(u).key?(c.replaceChild(a,u),p(c).keyMapValid=!1):c.insertBefore(a,u),i.currentNode=a}return a},L=function(t){var n,r=l(),a=r.walker,o=p(t),i=o.keyMap,u=o.keyMapValid,c=o.lastVisitedChild,s=t.lastChild;if(o.lastVisitedChild=null,!(s===c&&u||o.attrs[e.symbols.placeholder]&&a.currentNode!==a.root)){for(;s!==c;)t.removeChild(s),r.markDeleted(s),n=p(s).key,n&&delete i[n],s=t.lastChild;for(n in i)s=i[n],s.parentNode||(r.markDeleted(s),delete i[n]);o.keyMapValid=!0}},T=function(t){var e=p(t);y(e.nodeName)},M=function(t){var e=p(t);N(e.nodeName)},S=function(t){var e=l(),n=e.walker,r=n.getCurrentParent(),a=p(r);a.lastVisitedChild=t},P=function(){var t=l(),e=t.walker;T(e.currentNode),e.firstChild()},F=function(){var t=l(),e=t.walker;S(e.currentNode),e.nextSibling()},j=function(){var t=l(),e=t.walker;e.parentNode(),M(e.currentNode)};if("production"!==t.env.NODE_ENV)var R=function(t){var e=l().walker.getCurrentParent();if(e){for(var n=[];e&&e!==t;)n.push(e.nodeName.toLowerCase()),e=e.parentNode;throw new Error("One or more tags were not closed:\n"+n.join("\n"))}};e.patch=function(e,n,r){i(e),P(),n(r),j(),L(e),"production"!==t.env.NODE_ENV&&R(e),l().notifyChanges(),u()};var I=3,q=[];if("production"!==t.env.NODE_ENV)var U=!1,H=function(){if(U)throw new Error("Was not expecting a call to attr or elementOpenEnd, they must follow a call to elementOpenStart.")},W=function(){if(!U)throw new Error("Was expecting a call to attr or elementOpenEnd. elementOpenStart must be followed by zero or more calls to attr, then one call to elementOpenEnd.")},Z=function(t){if(!t)throw new Error("Placeholder elements must have a key specified.")},z=function(t){var e=l(),n=e.walker,r=n.getCurrentParent(),a=p(r);if(t!==a.nodeName)throw new Error("Received a call to close "+t+" but "+a.nodeName+" was open.")},G=function(){U=!0},X=function(){U=!1};e.elementOpen=function(e,n,r,a){"production"!==t.env.NODE_ENV&&H();for(var o=D(e,n,r),i=p(o),u=i.attrsArr,l=!1,c=I,s=0;c<arguments.length;c+=1,s+=1)if(u[s]!==arguments[c]){l=!0;break}for(;c<arguments.length;c+=1,s+=1)u[s]=arguments[c];if(s<u.length&&(l=!0,u.length=s),l){var f,d=i.newAttrs;for(f in d)d[f]=void 0;for(c=I;c<arguments.length;c+=2)d[arguments[c]]=arguments[c+1];for(f in d)g(o,f,d[f])}return P(),o},e.elementOpenStart=function(e,n,r){"production"!==t.env.NODE_ENV&&(H(),G()),q[0]=e,q[1]=n,q[2]=r},e.attr=function(e,n){"production"!==t.env.NODE_ENV&&W(),q.push(e,n)},e.elementOpenEnd=function(){"production"!==t.env.NODE_ENV&&(W(),X());var n=e.elementOpen.apply(null,q);return q.length=0,n},e.elementClose=function(e){"production"!==t.env.NODE_ENV&&(H(),z(e)),j();var n=l().walker.currentNode;return L(n),F(),n},e.elementVoid=function(t,n,r,a){var o=e.elementOpen.apply(null,arguments);return e.elementClose.apply(null,arguments),o},e.elementPlaceholder=function(n,r,a,o){"production"!==t.env.NODE_ENV&&Z(r);var i=e.elementOpen.apply(null,arguments);return g(i,e.symbols.placeholder,!0),e.elementClose.apply(null,arguments),i},e.text=function(e,n){"production"!==t.env.NODE_ENV&&H();var r=D("#text",null),a=p(r);if(a.text!==e){a.text=e;for(var o=e,i=1;i<arguments.length;i+=1)o=arguments[i](o);r.data=o}return F(),r}}).call(e,n(8))},function(t,e){function n(){c=!1,i.length?l=i.concat(l):s=-1,l.length&&r()}function r(){if(!c){var t=setTimeout(n);c=!0;for(var e=l.length;e;){for(i=l,l=[];++s<e;)i&&i[s].run();s=-1,e=l.length}i=null,c=!1,clearTimeout(t)}}function a(t,e){this.fun=t,this.array=e}function o(){}var i,u=t.exports={},l=[],c=!1,s=-1;u.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];l.push(new a(t,e)),1!==l.length||c||setTimeout(r,0)},a.prototype.run=function(){this.fun.apply(null,this.array)},u.title="browser",u.browser=!0,u.env={},u.argv=[],u.version="",u.versions={},u.on=o,u.addListener=o,u.once=o,u.off=o,u.removeListener=o,u.removeAllListeners=o,u.emit=o,u.binding=function(t){throw new Error("process.binding is not supported")},u.cwd=function(){return"/"},u.chdir=function(t){throw new Error("process.chdir is not supported")},u.umask=function(){return 0}},function(t,e){function n(t){return Array.isArray(t)?t.join("; "):Object.keys(t).map(function(e){return[r(e),": ",t[e],";"].join("")}).join(" ")}function r(t){return t.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()})}function a(t){return Array.isArray(t)?t.join(" "):Object.keys(t).filter(function(e){return!!t[e]}).join(" ")}var o=function(t){return function(){var e=t.apply(this,arguments);return e&&"object"==typeof e?n(e):e}},i=function(t){return function(){var e=t.apply(this,arguments);return e&&"object"==typeof e?a(e):e}};t.exports={style:o,className:i}}]);
//# sourceMappingURL=tagalong.js.map
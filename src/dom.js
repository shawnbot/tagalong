module.exports.getPreviousSibling = function(node, selector) {
  while (node = node.previousSibling) {
    if (!node) break;
    // FIXME this needs a vendor prefix in IE 9+
    // <http://caniuse.com/#search=matches>
    if (node.matches(selector)) return node;
  }
  throw new Error('no previous sibling found matching: ' + selector);
};

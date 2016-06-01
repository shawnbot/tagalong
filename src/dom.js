module.exports.getPreviousSibling = function(node, selector) {
  // eslint-disable-next-line no-cond-assign
  while (node = node.previousSibling) {
    if (!node) break;
    // FIXME this needs a vendor prefix in IE 9+
    // <http://caniuse.com/#search=matches>
    if (node.nodeType === 1 && node.matches(selector)) {
      return node;
    }
  }
  throw new Error('no previous sibling found matching: ' + selector);
};

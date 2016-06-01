var prefixToURI = {
  svg: 'http://www.w3.org/2000/svg',
  xlink: 'http://www.w3.org/TR/xlink/',
  xmlns: 'http://www.w3.org/2000/xmlns/'
};

var uriToPrefix = {};
Object.keys(prefixToURI).forEach(function(prefix) {
  uriToPrefix[prefixToURI[prefix]] = prefix;
});

var qualify = function(qname) {
  var prefix;
  var localName = qname;
  var colon = qname.indexOf(':');
  if (colon > -1) {
    prefix = qname.substr(0, colon);
    localName = qname.substr(colon + 1);
  }
  return {
    name: qname,
    localName: localName,
    prefix: prefix,
    namespaceURI: prefixToURI[prefix]
  };
};

var getPrefixedName = function(node) {
  var name = node.nodeName.toLowerCase();
  var prefix = node.prefix;
  if (!prefix && node.namespaceURI) {
    prefix = uriToPrefix[node.namespaceURI];
  }
  return prefix
    ? (prefix + ':' + name)
    : name;
};

module.exports = {
  getPrefixedName: getPrefixedName,
  prefixToURI: prefixToURI,
  uriToPrefix: uriToPrefix,
  qualify: qualify
};

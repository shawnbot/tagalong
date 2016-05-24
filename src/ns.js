var prefixToURI = {
  svg: 'http://www.w3.org/2000/svg',
  xlink: 'http://www.w3.org/TR/xlink/',
  xmlns: 'http://www.w3.org/2000/xmlns/'
};

var uriToPrefix = {};
Object.keys(prefixToURI).forEach(function(prefix) {
  uriToPrefix[prefixToURI[prefix]] = prefix;
});

var qualify = function(name) {
  var colon = name.indexOf(':');
  var prefix;
  if (colon > -1) {
    prefix = name.substr(0, colon);
    name = name.substr(colon + 1);
  }
  return {
    localName: name,
    prefix: prefix,
    namespaceURI: prefixToURI[prefix]
  };
};

module.exports = {
  prefixToURI: prefixToURI,
  uriToPrefix: uriToPrefix,
  qualify: qualify
};

require('document-register-element');

var Template = require('./t-template');
var createRenderer = require('./render');

var render = function(node, data) {
  var _render = createRenderer(node);
  _render(data);
  return _render;
};

window.tagalong = {
  Template: Template,
  createRenderer: createRenderer,
  render: render
};


require('document-register-element');

var Template = require('./t-template');
var render = require('./render');

window.tagalong = {
  Template: Template,
  createRenderer: render.create,
  render: render.render
};

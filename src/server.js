const tagalong = require('./');
const jsdom = require('jsdom').jsdom;
const HTML = '<!DOCTYPE html><html><body></body>';
const globalExporter = function(fn) {
  return function() {
    if (!global.document) {
      var document = jsdom(HTML);
      global.document = document;
      global.window = document.defaultView;
      global.Node = global.window.Node;
    }
    return fn.apply(this, arguments);
  };
};

tagalong.renderString = globalExporter(function(template, data, context) {
  var el = document.createElement('div');
  el.innerHTML = template;
  context = Object(context);
  if (context.TAGALONG_PRESERVE === undefined) {
    context.TAGALONG_PRESERVE = true;
  }
  tagalong.render(el, data, context);
  return el.innerHTML;
});

module.exports = tagalong;

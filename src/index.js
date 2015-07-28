var patcher = require('./patcher');
var dom = require('incremental-dom');

/**
 * compile a template, render data into the node, and return a
 * function that can be used to bind new data without having to pass
 * the node in again.
 */
function bind(node, data, directives) {
  node = coerceNode(node);
  var template = compile(node);
  var render = function(data, directives) {
    return template(node, data, directives);
  };
  render(data, directives);
  return render;
}

/**
 * compile a template and return a function that renders it into a
 * target element with data and directives.
 */
function compile(node) {
  var patch = patcher(coerceNode(node));
  return function(target, data, directives) {
    target = coerceNode(target);
    dom.patch(target, function() {
      patch(data, directives);
    });
    return target;
  };
}

/**
 * render a node once "into" itself with data and directives
 */
function render(node, data, directives) {
  node = coerceNode(node);
  var template = compile(node);
  return template(node, data, directives);
}

function coerceNode(nodeOrSelector) {
  return (typeof nodeOrSelector === 'string')
    ? document.querySelector(nodeOrSelector)
    : nodeOrSelector;
}

module.exports = {
  bind: bind,
  compile: compile,
  render: render
};

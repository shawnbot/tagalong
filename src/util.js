var code = require('./evaluate');
var interpolate = require('./interpolate');

module.exports.defined = function(value) {
  return value !== null && value !== undefined;
};

module.exports.compileExpression = function(expr) {
  return interpolate.isTemplate(expr)
    ? interpolate.compile(expr)
    : code.evaluator(expr);
};

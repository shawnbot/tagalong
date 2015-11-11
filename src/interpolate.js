var evaluate = require('./evaluate').evaluate;
var pattern = /{{([^}]+)}}/g;

module.exports = interpolate;

module.exports.isTemplate = function(template) {
  return !!template.match(pattern);
};

function interpolate(template, data) {
  var that = this;
  return template.replace(pattern, function(_, expr) {
    return evaluate.call(that, expr, data);
  });
}

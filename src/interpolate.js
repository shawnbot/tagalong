var evaluate = require('./evaluate').evaluate;

module.exports = interpolate;

function interpolate(template, data) {
  var that = this;
  return template.replace(/{{([^}]+)}}/g, function(_, expr) {
    return evaluate.call(that, expr, data);
  });
}

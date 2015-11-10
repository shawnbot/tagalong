var arrow = require('./arrow');

var evaluate = function(expression, data) {
  var fn = evaluator(expression);
  return fn.call(this, data);
};

var evaluator = function(expression) {
  if (arrow.is(expression)) {
    return parseArrow(expression);
  }

  var symbol = 'd' + Date.now();
  // '.' is just the identity function
  if (expression === '.') {
    return function identity(d) { return d; };
  // '.foo' addresses the context directly
  } else if (expression.match(/^\s*\.\w/)) {
    expression = symbol + expression;
  }
  return new Function(symbol, [
    // 'console.info("', symbol, ' = ", ', symbol, ', "', expression, '"); ',
    'try { ',
    '  with (this) {',
    '    with (', symbol, ') {',
    '      return ', expression, ';',
    '    } ',
    '  } ',
    '} catch (error) { }'
  ].join(''));
};

module.exports = {
  evaluate: evaluate,
  evaluator: evaluator,
}

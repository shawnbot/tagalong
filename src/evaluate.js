/* eslint no-new-func: "warn" */
var arrow = require('./arrow');
var functor = require('./functor');

var evaluate = function(expression, data) {
  var fn = evaluator(expression);
  return fn.call(this, data);
};

var evaluator = function(expression) {
  if (typeof expression !== 'string') {
    expression = String(expression);
  }

  if (!expression.trim()) {
    return functor(undefined);
  }

  if (arrow.is(expression)) {
    return arrow.parse(expression);
  }

  var symbol = 'd';
  // '.' is just the identity function
  if (expression.match(/^\s*\.\s*$/)) {
    return identity;
  // '.foo' addresses the context directly
  } else if (expression.match(/^\s*\.\w/)) {
    expression = symbol + expression;
  }
  return new Function(symbol, [
    // 'console.info("', symbol, ' = ", ', symbol, ', "', expression, '"); ',
    'try { ',
    '  with (this) {',
    '    with (', symbol, ') {',
    '      return (', expression, ');',
    '    } ',
    '  } ',
    '} catch (error) { }'
  ].join('\n'));
};

module.exports = {
  evaluate: evaluate,
  evaluator: evaluator
};

function identity(d) {
  return d;
}

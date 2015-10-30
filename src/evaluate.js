import {isArrow, parseArrow} from './arrow';

export default function evaluate(expression, context) {
  let fn = evaluator(expression);
  return fn.call(this, context);
};

export function evaluator(expression) {
  if (isArrow(expression)) {
    return parseArrow(expression);
  }

  let symbol = 'd' + Date.now();
  // '.' is just the identity function
  if (expression === '.') {
    return function identity(d) { return d; };
  // '.foo' addresses the context directly
  } else if (expression.match(/^\s*\.\w/)) {
    expression = symbol + expression;
  }
  return new Function(symbol, [
    // 'console.info("', symbol, ' = ", ', symbol, ', "', expression, '"); ',
    'with (', symbol, ' || {}) {',
    '  return ', expression, ';',
    '}'
  ].join(''));
};

/* eslint no-new-func: "warn" */
var ARROW_PATTERN = /^\s*\(?(\s*\w+\s*(,\s*\w+\s*)*)?\)?\s*=>\s*({([^}]+)}|(.+))$/;

var isArrow = function(expression) {
  return String(expression).match(ARROW_PATTERN);
};

var parseArrow = function parseArrow(expression) {
  var match = expression.match(ARROW_PATTERN);
  if (!match) throw new Error('invalid arrow expression: "' + expression + '"');
  var args = match[1];
  var body = (match[4] || match[5]).trim() || 'undefined';
  return new Function(args, [
    'with (this) {',
    ' return ', body, '; ',
    '}',
  ].join(''));
};

module.exports = {
  is: isArrow,
  parse: parseArrow
};

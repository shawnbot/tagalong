const ARROW_PATTERN = /^\s*\(?(\s*\w+\s*(,\s*\w+\s*)*)\)?\s*=>\s*({([^}]+)}|(.+))$/;

export function isArrow(expression) {
  return String(expression).match(ARROW_PATTERN);
};

export function parseArrow(expression) {
  let match = expression.match(ARROW_PATTERN);
  let args = match[1];
  let body = match[4] || match[5];
  return new Function(args, 'return (' + body + ')');
};

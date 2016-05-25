/**
 * functional composition functions take a function and return a
 * wrapped function that calls the passed one and applies some
 * additional logic.
 */

var defined = require('./util').defined;

/**
 * @param {Function}  fn
 * @return {Function} a function that returns the inverse (`!`)
 *                    value of the `fn`, given the same arguments.
 */
module.exports.not = function(fn) {
  return function() {
    return !fn.apply(this, arguments);
  };
};

/**
 * @param {Function}  fn
 * @return {Function} a function that returns the stringified
 *                    value of the `fn`, given the same arguments.
 */
module.exports.stringify = function(fn) {
  return function() {
    var value = fn.apply(this, arguments);
    return defined(value) ? String(value) : '';
  };
};

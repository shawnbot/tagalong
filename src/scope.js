var code = require('./evaluate');
var HIDE_CSS = require('./constants').HIDE_CSS;

var renderEach = function(expr, render, symbol, preserved) {
  var fn = code.evaluator(expr);
  return function(data, index) {
    var values = fn.call(this, data, index);
    var empty = !values || !values.length;
    if (preserved && empty) {
      values = [undefined]; // XXX this may cause problems
    }
    var elements = forEach.call(this, values, render, symbol);
    if (preserved) {
      var el = elements[0];
      if (empty) {
        el.setAttribute('style', HIDE_CSS);
      } else if (el.getAttribute('style') === HIDE_CSS) {
        el.removeAttribute('style');
      }
      for (var i = elements.length - 1; i > 0; i--) {
        el = elements[i];
        el.removeAttribute('t-each');
        el.setAttribute('t-skip', '');
        if (el.getAttribute('style') === HIDE_CSS) {
          el.removeAttribute('style');
        }
      }
    }
    return elements;
  };
};

var renderWith = function(fn, render, symbol) {
  render = symbolSetter(symbol, render);
  return function(data) {
    data = fn.call(this, data);
    return render.call(this, data);
  };
};

var forEach = function(data, fn, symbol) {
  var iterate = symbol
    ? symbolSetter(symbol, fn)
    : fn;

  var result = [];
  var INDEX = '$i';
  var each = function(d, i) {
    this[INDEX] = i;
    result.push(iterate.call(this, d, i));
    delete this[INDEX];
  };

  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      data.forEach(each, this);
    } else {
      var i = 0;
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          each.call(this, {key: key, value: data[key]}, i++);
        }
      }
    }
  } else if (typeof data === 'string') {
    data.split('').forEach(each, this);
  }

  return result;
};

var symbolSetter = function(symbol, fn) {
  return function(data) {
    var previous = set(this, symbol, data);
    var result = fn.call(this, data);
    set(this, symbol, previous);
    return result;
  };
};

var set = function(context, symbol, value) {
  var previous = context[symbol];
  if (value === undefined) {
    delete context[symbol];
  } else {
    context[symbol] = value;
  }
  return previous;
};

module.exports = {
  renderWith: renderWith,
  renderEach: renderEach,
  symbolSetter: symbolSetter
};

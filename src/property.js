module.exports = function property(read, write, defaultValue) {
  var symbol = '[[t-' + Date.now() + ']]';
  return {
    enumerable: false,

    get: function() {
      var value = (symbol in this)
        ? this[symbol]
        : this[symbol] = defaultValue;
      return read
        ? read.call(this, value)
        : value;
    },

    set: function(value) {
      var previous = this[symbol];
      if (value !== previous) {
        // eslint-disable-next-line no-return-assign
        return this[symbol] = write.call(this, value, previous);
      }
      return undefined;
    }
  };
};

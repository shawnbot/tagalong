module.exports = function property(read, write, value) {
  return {
    enumerable: false,

    get: function() {
      return read ? read.call(this, value) : value;
    },

    set: function(v) {
      if (v !== value) {
        var previous = value;
        return value = write.call(this, v, previous);
      }
    }
  };
};

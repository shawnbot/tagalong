export default function property(read, write, value) {
  return {
    enumerable: false,

    get() {
      return read ? read.call(this, value) : value;
    },

    set(v) {
      if (v !== value) {
        let previous = value;
        return write.call(this, value = v, previous);
      }
    }
  };
};

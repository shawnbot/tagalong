module.exports = function functor(x) {
  return function f() {
    return x;
  }
};


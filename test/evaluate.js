var e = require('../src/evaluate');
var assert = require('assert');

describe('evaluator()', () => {
  it('returns a function', () => {
    assert.equal(typeof e.evaluator('x'), 'function');
    assert.equal(typeof e.evaluator('x + 1'), 'function');
  });
});

describe('evaluate()', () => {

  it('evaluates simple expressions', () => {
    var data = {
      x: 1,
      y: 2,
      z: {
        a: 3
      }
    };

    [
      'x', ' x ', '(x)',
      'y - 1',
      'z.a - 2'
    ]
    .forEach(expr => {
      assert.strictEqual(e.evaluate(expr, data), 1);
    });
  });

  it('evaluates fat arrow functions', () => {
    var data = {
      x: 1,
      y: 2,
      z: {
        a: 3
      }
    };

    [
      'd => d.x',
      '(d) => d.y - 1',
      '(d, i) => d.z.a - 2',
      '() => 1'
    ]
    .forEach(expr => {
      assert.strictEqual(e.evaluator(expr)(data), 1, expr);
    });
  });

  it('inherits symbols from the calling context', () => {
    var data = {
      x: 1,
      y: 2,
      z: {
        a: 3
      }
    };

    var context = {
      a: 100,
      b: 200,
      c: {
        d: 300
      },
      f: function(x) {
        return x + 100;
      }
    };

    [
      'x + a',
      'y + b',
      'z.a + c.d',
      'd => f(d.x)'
    ]
    .forEach(expr => {
      var v = e.evaluator(expr).call(context, data);
      assert.equal(
        v % 101,
        0,
        expr + ' -> "' + v + '"'
      );
    });
  });

});

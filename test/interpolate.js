var assert = require('assert');
var interpolate = require('../src/interpolate');

describe('interpolate.isTemplate()', () => {
  it('correctly identifies a template', () => {
    ['{{x}}', '{{ x }}', 'y {{ x }}', 'y {{ x }} z']
      .forEach((str) => {
        assert.ok(interpolate.isTemplate(str), str);
      });
  });

  it('rejects non-templates', () => {
    ['', 'foo', 'foo{}', '{}', '{{', '{{}', '{}}', '}}']
      .forEach((str) => {
        assert.equal(interpolate.isTemplate(str), false, str);
      });
  });
});

describe('interpolate.compile()', () => {
  it('returns a function for strings', () => {
    assert.equal(typeof interpolate.compile('x'), 'function');
  });

  it('throws an error when it gets anything else', () => {
    [1, NaN, null, undefined, /x/, {}, []]
      .forEach((x) => {
        assert.throws(() => interpolate.compile(x), null, x);
      });
  });
});

describe('interpolate()', () => {
  it('interpolates expressions', () => {
    assert.equal(interpolate('{{ x }}', {x: 100}), '100');
    assert.equal(interpolate('x = {{ x }}!', {x: 100}), 'x = 100!');
  });
});

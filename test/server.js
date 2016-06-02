const tagalong = require('../src/server');
const assert = require('assert');
const HIDE_CSS = require('../src/constants').HIDE_CSS;

describe('renderString()', function() {
  it('reads and writes strings', function() {
    assert.equal(
      tagalong.renderString(
        '<div t-if="word">{{ word }}</div>',
        {word: 'hello!'}
      ),
      '<div t-if="word">hello!</div>'
    );
  });

  it('preserves t-each attributes and skips the repeated ones', function() {
    assert.equal(
      tagalong.renderString(
        '<b t-each=".">{{ . }}</b>',
        [1, 2, 3]
      ),
      '<b t-each=".">1</b><b t-skip="">2</b><b t-skip="">3</b>'
    );
  });

  it('preserves t-each elements even for empty lists', function() {
    assert.equal(
      tagalong.renderString('<b t-each=".">{{ . }}</b>', []),
      '<b t-each="." style="' + HIDE_CSS + '">{{ . }}</b>'
    );
  });

  it('eats its own dog food', function() {
    var input = '<b t-each=".">{{ x }}</b>';
    var data = [{x: 1}, {x: 2}, {x: 3}];
    var template = tagalong.renderString(input, []);
    assert.equal(
      template,
      '<b t-each="." style="' + HIDE_CSS + '">{{ x }}</b>'
    );
    assert.equal(
      tagalong.renderString(template, data),
      '<b t-each=".">1</b><b t-skip="">2</b><b t-skip="">3</b>'
    );
  });

  it('does not preserve dynamic attributes when told', function() {
    assert.equal(
      tagalong.renderString(
        '<div t-if="word">{{ word }}</div>',
        {word: 'hello!'},
        {TAGALONG_PRESERVE: false}
      ),
      '<div>hello!</div>'
    );
  });
});


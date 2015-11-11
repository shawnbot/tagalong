var jsdom = require('jsdom');
var assert = require('assert');
var path = require('path');
var source = path.join(__dirname, '../tagalong.js');

describe('render()', function() {
  var window;
  var document;
  var body;
  var tagalong;

  beforeEach(function(done) {
    var context = this;
    jsdom.env('<body></body>', [source], function(errors, _window) {
      if (errors) return done(errors[0]);
      window = _window;
      document = _window.document;
      body = _window.document.body;
      tagalong = _window.tagalong;
      done();
    });
  });

  it('throws an error when it cannot find its target', function() {
    assert.throws(function() {
      tagalong.render('#blargh', {foo: 'bar'});
    });
  });

  it('accepts a CSS selector as a template target', function() {
    body.innerHTML = '<div t-text="foo"></div>';
    tagalong.render('body', {foo: 'bar'});
    assert.equal(body.innerHTML, '<div>bar</div>');
  });

  it('returns a render function for updates', function() {
    body.innerHTML = '<div t-text="foo"></div>';
    var render = tagalong.render(body, {foo: 'bar'});
    assert.equal(body.innerHTML, '<div>bar</div>');
    render({foo: 'qux'});
    assert.equal(body.innerHTML, '<div>qux</div>');
  });

  it('renders a key expression as text', function() {
    body.innerHTML = '<div t-text="foo"></div>';
    tagalong.render(body, {foo: 'bar'});
    assert.equal(body.innerHTML, '<div>bar</div>');
  });

  it('renders a nested object key as text', function() {
    body.innerHTML = '<div t-text="foo.bar"></div>';
    tagalong.render(body, {foo: {bar: 'baz'}});
    assert.equal(body.innerHTML, '<div>baz</div>');
  });

  it('renders expression attributes with the "t-" prefix', function() {
    body.innerHTML = '<div t-type="foo.bar">hi</div>';
    tagalong.render(body, {foo: {bar: 'baz'}});
    assert.equal(body.innerHTML, '<div type="baz">hi</div>');
  });

  xit('re-renders attributes with the "t-" prefix', function() {
    body.innerHTML = '<div t-class="foo.bar">hi</div>';
    var render = tagalong.render(body, {foo: {bar: 'baz'}});
    assert.equal(body.innerHTML, '<div class="baz">hi</div>');
    render({foo: {bar: 'qux'}});
    assert.equal(body.innerHTML, '<div class="qux">hi</div>');
  });

  it('renders class names with t-class="{names}"', function() {
    body.innerHTML = '<div t-class="foo">hi</div>';
    var render = tagalong.render(body, {foo: {bar: true, baz: false}});
    assert.equal(body.innerHTML, '<div class="bar">hi</div>');
  });

  xit('re-renders class names with t-class="{names}"', function() {
    body.innerHTML = '<div t-class="foo">hi</div>';
    var render = tagalong.render(body, {foo: {bar: true, baz: false}});
    assert.equal(body.innerHTML, '<div class="bar">hi</div>');
    render({foo: null});
    assert.equal(body.innerHTML, '<div class="baz">hi</div>');
  });

  it('renders inline styles with t-style="{properties}"', function() {
    body.innerHTML = '<div t-style="x">hi</div>';
    var render = tagalong.render(body, {x: {color: 'green', fontWeight: 'bold'}});
    assert.equal(body.innerHTML, '<div style="color: green; font-weight: bold;">hi</div>');
  });

  xit('re-renders inline styles with t-style="{properties}"', function() {
    body.innerHTML = '<div t-style="x">hi</div>';
    var render = tagalong.render(body, {x: {color: 'green', fontWeight: 'bold'}});
    assert.equal(body.innerHTML, '<div style="color: green; font-weight: bold;">hi</div>');
    render({x: {color: 'blue', lineHeight: '2'}});
    assert.equal(body.innerHTML, '<div style="color: blue; line-height: 2;">hi</div>');
  });

  describe('t-if', function() {
    it('interprets if statements', function() {
      body.innerHTML = '<div t-if="foo">yes</div>';
      var render = tagalong.render(body, {foo: 0});
      assert.equal(body.innerHTML, '');
      render({foo: 1});
      assert.equal(body.innerHTML, '<div>yes</div>');
    });

    it('interprets if/else statements', function() {
      body.innerHTML = '<div t-if="foo">yes</div><span t-else>no</span>';
      var render = tagalong.render(body, {foo: 0});
      assert.equal(body.innerHTML, '<span>no</span>');
      render({foo: 1});
      assert.equal(body.innerHTML, '<div>yes</div>');
    });
  });

  describe('t-each', function() {
    it('iterates over arrays', function() {
      body.innerHTML = '<b t-each="things">{{.}}</b>';
      tagalong.render(body, {things: ['foo', 'bar']});
      assert.equal(body.innerHTML, '<b>foo</b><b>bar</b>');
    });

    it('sets the $i variable', function() {
      body.innerHTML = '<b t-each="things">{{.}}@{{$i}}</b>';
      tagalong.render(body, {things: ['foo', 'bar']});
      assert.equal(body.innerHTML, '<b>foo@0</b><b>bar@1</b>');
    });
  });

  describe('t-foreach', function() {
    it('iterates over arrays', function() {
      body.innerHTML = '<b t-foreach="things"><i>{{.}}</i></b>';
      tagalong.render(body, {things: ['foo', 'bar']});
      assert.equal(body.innerHTML, '<b><i>foo</i><i>bar</i></b>');
    });

    it('sets the $i variable', function() {
      body.innerHTML = '<b t-foreach="things">{{.}}@{{$i}};</b>';
      tagalong.render(body, {things: ['foo', 'bar']});
      assert.equal(body.innerHTML, '<b>foo@0;bar@1;</b>');
    });
  });

  describe('t-skip', function() {
    it('skips elements with t-skip attributes', function() {
      body.innerHTML = '<div>hello, world<span t-skip>!</span></div>';
      var render = tagalong.render(body);
      assert.equal(body.innerHTML, '<div>hello, world</div>');
    });
  });

  describe('t-with', function() {
    it('does the right thing', function() {
      body.innerHTML = [
        '<h1 t-with="items">',
          '<b t-text="length">0</b>',
          ' item<i t-if="length !== 1">s</i>',
        '</h1>'
      ].join('');
      var render = tagalong.render(body, {
        items: ['foo']
      });
      assert.equal(body.innerHTML, '<h1><b>1</b> item</h1>');
      render({items: ['foo', 'bar']});
      assert.equal(body.innerHTML, '<h1><b>2</b> item<i>s</i></h1>');
    });
  });

  describe('text expressions', function() {
    it('interoplates {{ expressions }}', function() {
      body.innerHTML = 'Hello, {{ world }}!';
      var render = tagalong.render(body, {world: 'Earth'});
      assert.equal(body.innerHTML, 'Hello, Earth!');
      render({world: 'world'});
      assert.equal(body.innerHTML, 'Hello, world!');
    });

    it('doesn\'t get greedy with curlies', function() {
      body.innerHTML = 'The {{x}} and the {{y || x}}';
      var render = tagalong.render(body, {x: 'birds', y: 'bees'});
      assert.equal(body.innerHTML, 'The birds and the bees');
      render({x: 'birds', y: null});
      assert.equal(body.innerHTML, 'The birds and the birds');
    });
  });

  describe('expressions', function() {

    it('inherits scope from the calling context', function() {
      body.innerHTML = '<div t-text="lower(name)">Joe</div>';
      var render = tagalong.createRenderer(body, {
        lower: function(name) { return name.toLowerCase(); }
      });
      render({name: 'Bill'});
      assert.equal(body.innerHTML, '<div>bill</div>');
    });

    it('aliases symbols', function() {
      body.innerHTML = [
        '<ul t-foreach="." t-as="item">',
          '<li t-text="item">Jill</li>',
        '</ul>'
      ].join('');
      var data = ['Jill', 'Jane', 'Joe'];
      tagalong.render(body, data);
      assert.equal(body.innerHTML, '<ul><li>Jill</li><li>Jane</li><li>Joe</li></ul>');
    });

    it('interprets "." as identity', function() {
      body.innerHTML = '<b t-text=".">foo</b>';
      tagalong.render(body, 'bar');
      assert.equal(body.innerHTML, '<b>bar</b>');

      body.innerHTML = '<b>{{.}}</b>';
      tagalong.render(body, 'baz');
      assert.equal(body.innerHTML, '<b>baz</b>');
    });

    it('understands fat arrows', function() {
      var variants = [
        '<span t-with="x => x[0]">{{ . }}</span>',
        '<span t-with="(x) => x[0]">{{ . }}</span>',
        '<span t-with="(x) => { x[0] }">{{ . }}</span>',
      ];

      variants.forEach(function(html) {
        body.innerHTML = html;
        tagalong.render(body, ['foo']);
        assert.equal(body.innerHTML, '<span>foo</span>');
      });
    });

    it('passes scope to fat arrows', function() {
      body.innerHTML = '<b t-text="x => f(x)"></b>';
      tagalong.render(body, 10, {
        f: function(x) { return x * x; }
      });
      assert.equal(body.innerHTML, '<b>100</b>');
    });

  });

});

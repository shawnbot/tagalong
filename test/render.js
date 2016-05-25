const jsdom = require('jsdom');
const assert = require('assert');
const path = require('path');
const tagalong = require('../');

// namespace URIs, for convenience
const ns = require('../src/ns');
const XLINK = ns.prefixToURI.xlink;
const XMLNS = ns.prefixToURI.xmlns;
const SVG = ns.prefixToURI.svg;

var root;
before(function(done) {
  var context = this;
  jsdom.env('<!DOCTYPE html>\n<div id="root"></div>', function(errors, _window) {
    if (errors) return done(errors[0]);
    global.window = _window;
    global.document = _window.document;
    root = _window.document.getElementById('root');
    done();
  });
});

describe('render()', function() {

  it('throws an error when it cannot find its target', function() {
    assert.throws(function() {
      tagalong.render('#blargh', {foo: 'bar'});
    });
  });

  it('accepts a CSS selector as a template target', function() {
    root.innerHTML = '<div t-text="foo"></div>';
    tagalong.render('#root', {foo: 'bar'});
    assert.equal(root.innerHTML, '<div>bar</div>');
  });

  it('returns a render function for updates', function() {
    root.innerHTML = '<div t-text="foo"></div>';
    var render = tagalong.render(root, {foo: 'bar'});
    assert.equal(root.innerHTML, '<div>bar</div>');
    render({foo: 'qux'});
    assert.equal(root.innerHTML, '<div>qux</div>');
  });

  it('renders a key expression as text', function() {
    root.innerHTML = '<div t-text="foo"></div>';
    tagalong.render(root, {foo: 'bar'});
    assert.equal(root.innerHTML, '<div>bar</div>');
  });

  it('renders a nested object key as text', function() {
    root.innerHTML = '<div t-text="foo.bar"></div>';
    tagalong.render(root, {foo: {bar: 'baz'}});
    assert.equal(root.innerHTML, '<div>baz</div>');
  });

  describe('t- attributes', function() {
    it('renders expression attributes with the "t-" prefix', function() {
      root.innerHTML = '<div t-id="foo.bar">hi</div>';
      tagalong.render(root, {foo: {bar: 'baz'}});
      assert.equal(root.innerHTML, '<div id="baz">hi</div>');
    });

    it('renders template strings in prefixed attrs', function() {
      root.innerHTML = '<a t-href="#{{ id }}">hi</a>';
      tagalong.render(root, {id: 'foo'});
      assert.equal(root.innerHTML, '<a href="#foo">hi</a>');
    });

    it('does not confuse template strings and fat arrows', function() {
      root.innerHTML = '<a t-title="x => {{ id }}">hi</a>';
      tagalong.render(root, {id: 'foo'});
      assert.equal(root.innerHTML, '<a title="x => foo">hi</a>');
    });

    it('re-renders attributes with the "t-" prefix', function() {
      root.innerHTML = '<div t-class="foo.bar">hi</div>';
      var render = tagalong.render(root, {foo: {bar: 'baz'}});
      assert.equal(root.innerHTML, '<div class="baz">hi</div>');
      render({foo: {bar: 'qux'}});
      assert.equal(root.innerHTML, '<div class="qux">hi</div>');
    });
  });

  describe('t-class attribute', function() {
    it('renders class names with t-class="{names}"', function() {
      root.innerHTML = '<div t-class="foo">hi</div>';
      var render = tagalong.render(root, {foo: {bar: true, baz: false}});
      assert.equal(root.innerHTML, '<div class="bar">hi</div>');
    });

    it('re-renders class names with t-class="{names}"', function() {
      root.innerHTML = '<div t-class="foo">hi</div>';
      var render = tagalong.render(root, {foo: {bar: true, baz: false}});
      assert.equal(root.innerHTML, '<div class="bar">hi</div>');
      render({foo: null});
      assert.equal(root.innerHTML, '<div>hi</div>');
    });
  });

  describe('t-style attribute', function() {
    it('renders inline styles with t-style="{properties}"', function() {
      root.innerHTML = '<div t-style="x">hi</div>';
      var render = tagalong.render(root, {x: {color: 'green', fontWeight: 'bold'}});
      assert.equal(root.innerHTML, '<div style="color: green; font-weight: bold;">hi</div>');
    });

    it('re-renders inline styles with t-style="{properties}"', function() {
      root.innerHTML = '<div t-style="x">hi</div>';
      var render = tagalong.render(root, {x: {color: 'green', fontWeight: 'bold'}});
      assert.equal(root.innerHTML, '<div style="color: green; font-weight: bold;">hi</div>');
      render({x: {color: 'blue', lineHeight: '2'}});
      assert.equal(root.innerHTML, '<div style="color: blue; line-height: 2;">hi</div>');
    });
  });

  describe('t-if', function() {
    it('interprets if statements', function() {
      root.innerHTML = '<div t-if="foo">yes</div>';
      var render = tagalong.render(root, {foo: 0});
      assert.equal(root.innerHTML, '');
      render({foo: 1});
      assert.equal(root.innerHTML, '<div>yes</div>');
    });

    it('interprets if/else statements', function() {
      root.innerHTML = '<div t-if="foo">yes</div><span t-else>no</span>';
      var render = tagalong.render(root, {foo: 0});
      assert.equal(root.innerHTML, '<span>no</span>');
      render({foo: 1});
      assert.equal(root.innerHTML, '<div>yes</div>');
    });
  });

  describe('t-each', function() {
    it('iterates over arrays', function() {
      root.innerHTML = '<b t-each="things">{{.}}</b>';
      tagalong.render(root, {things: ['foo', 'bar']});
      assert.equal(root.innerHTML, '<b>foo</b><b>bar</b>');
    });

    it('sets the $i variable', function() {
      root.innerHTML = '<b t-each="things">{{.}}@{{$i}}</b>';
      tagalong.render(root, {things: ['foo', 'bar']});
      assert.equal(root.innerHTML, '<b>foo@0</b><b>bar@1</b>');
    });
  });

  describe('t-foreach', function() {
    it('iterates over arrays', function() {
      root.innerHTML = '<b t-foreach="things"><i>{{.}}</i></b>';
      tagalong.render(root, {things: ['foo', 'bar']});
      assert.equal(root.innerHTML, '<b><i>foo</i><i>bar</i></b>');
    });

    it('sets the $i variable', function() {
      root.innerHTML = '<b t-foreach="things">{{.}}@{{$i}};</b>';
      tagalong.render(root, {things: ['foo', 'bar']});
      assert.equal(root.innerHTML, '<b>foo@0;bar@1;</b>');
    });
  });

  describe('t-skip', function() {
    it('skips elements with t-skip attributes', function() {
      root.innerHTML = 'hello, world<span t-skip>!</span>';
      var render = tagalong.render(root, {});
      assert.equal(root.innerHTML, 'hello, world');
    });
  });

  describe('t-with', function() {
    it('does the right thing', function() {
      root.innerHTML = [
        '<h1 t-with="items">',
          '<b t-text="length">0</b>',
          ' item<i t-if="length !== 1">s</i>',
        '</h1>'
      ].join('');
      var render = tagalong.render(root, {
        items: ['foo']
      });
      assert.equal(root.innerHTML, '<h1><b>1</b> item</h1>');
      render({items: ['foo', 'bar']});
      assert.equal(root.innerHTML, '<h1><b>2</b> item<i>s</i></h1>');
    });
  });

  describe('text expressions', function() {
    it('interoplates {{ expressions }}', function() {
      root.innerHTML = 'Hello, {{ world }}!';
      var render = tagalong.render(root, {world: 'Earth'});
      assert.equal(root.innerHTML, 'Hello, Earth!');
      render({world: 'world'});
      assert.equal(root.innerHTML, 'Hello, world!');
    });

    it("doesn't get greedy with curlies", function() {
      root.innerHTML = 'The {{x}} and the {{y || x}}';
      var render = tagalong.render(root, {x: 'birds', y: 'bees'});
      assert.equal(root.innerHTML, 'The birds and the bees');
      render({x: 'birds', y: null});
      assert.equal(root.innerHTML, 'The birds and the birds');
    });
  });

  xit('preserves namespaces', function() {
    root.innerHTML = '<svg xmlns:xlink="http://www.w3.org/TR/xlink/"></svg>';

    var svg = root.querySelector('svg');
    var nsURI = svg.namespaceURI;
    /*
     * This should cover a bad assumption on my part, namely that
     * we're always executing in a compliant HTML5 DOM, in which
     * namespaced elements like <svg> are implicitly namespaced.
     */
    assert.equal(nsURI, SVG,
                 'wrong <svg> namespaceURI before morph: ' + nsURI);

    tagalong.render(root, {
      items: [
        {href: '#foo'},
        {href: '#bar'}
      ]
    });

    svg = root.querySelector('svg');
    nsURI = svg.namespaceURI;

    assert.equal(
      svg.outerHTML,
      '<svg xmlns:xlink="http://www.w3.org/TR/xlink/"></svg>'
    );

    // XXX jsdom: XHTML, seriously? very weird.
    assert.equal(nsURI, SVG,
                 'wrong <svg> namespaceURI after morph: ' + nsURI);
    assert.equal(svg.getAttributeNS(XMLNS, 'xlink'), XLINK);
  });

  it('preserves namespaces in templated attributes', function() {
    root.innerHTML = (
      '<svg>' +
      '<a t-each="items" xlink:t-href="href"></a>' +
      '</svg>'
    );
    tagalong.render(root, {
      items: [
        {href: '#foo'},
        {href: '#bar'}
      ]
    });
    assert.equal(
      root.innerHTML,
      (
        '<svg>' +
        '<a xlink:href="#foo"></a>' +
        '<a xlink:href="#bar"></a>' +
        '</svg>'
      )
    );
  });

  describe('expressions', function() {

    it('inherits scope from the calling context', function() {
      root.innerHTML = '<div t-text="lower(name)">Joe</div>';
      var render = tagalong.render(root, null, {
        lower: function(name) { return name.toLowerCase(); }
      });
      render({name: 'Bill'});
      assert.equal(root.innerHTML, '<div>bill</div>');
    });

    it('aliases symbols', function() {
      root.innerHTML = [
        '<ul t-foreach="." t-as="item">',
          '<li t-text="item">Jill</li>',
        '</ul>'
      ].join('');
      var data = ['Jill', 'Jane', 'Joe'];
      tagalong.render(root, data);
      assert.equal(root.innerHTML, '<ul><li>Jill</li><li>Jane</li><li>Joe</li></ul>');
    });

    it('interprets "." as identity', function() {
      root.innerHTML = '<b t-text=".">foo</b>';
      tagalong.render(root, 'bar');
      assert.equal(root.innerHTML, '<b>bar</b>');

      root.innerHTML = '<b>{{.}}</b>';
      tagalong.render(root, 'baz');
      assert.equal(root.innerHTML, '<b>baz</b>');
    });

    it('understands fat arrows', function() {
      var variants = [
        '<span t-with="x => x[0]">{{ . }}</span>',
        '<span t-with="(x) => x[0]">{{ . }}</span>',
        '<span t-with="(x) => { x[0] }">{{ . }}</span>',
      ];

      variants.forEach(function(html) {
        root.innerHTML = html;
        tagalong.render(root, ['foo']);
        assert.equal(root.innerHTML, '<span>foo</span>');
      });
    });

    it('passes scope to fat arrows', function() {
      root.innerHTML = '<b t-text="x => f(x)"></b>';
      tagalong.render(root, 10, {
        f: function(x) { return x * x; }
      });
      assert.equal(root.innerHTML, '<b>100</b>');
    });

  });

  xdescribe('on* attributes', function() {
    it('should not evaluate on* attrs', function(done) {
      root.innerHTML = '<a id="foo" t-onclick="click">hi</a>';
      var rendered = false;
      tagalong.render(root, {
        click: function(e) {
          assert.equal(rendered, false, 'this should not call until after rendering');
          assert.equal(e.target.id, 'foo');
          done();
        }
      });
      var link = root.querySelector('a');
      assert.ok(!link.hasAttribute('onclick'));
      rendered = true;
      link.dispatchEvent(new window.CustomEvent('click'));
    });
  });

});

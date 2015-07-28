var patcher = require('../src/patcher');
var dom = require('incremental-dom');
var assert = require('assert');

describe('patcher', function() {

  describe('basics', function() {

    it('leaves nodes as-is without data or directives', function() {
      assert.equal(
        templatize('<div>x <b>y</b></div>'),
        '<div>x <b>y</b></div>'
      );
    });

    it('understands void elements', function() {
      assert.equal(
        templatize('<input name="foo">', 'bar'),
        '<input name="foo">'
      );
    });
  }); // basics

  describe('key binding', function() {

    it('can set text via data-bind="key"', function() {
      assert.equal(
        templatize('<div data-bind="foo">foo</div>', {foo: 'bar'}),
        '<div>bar</div>'
      );
    });

    it('can access nested keys', function() {
      assert.equal(
        templatize('<div data-bind="foo.bar">foo</div>', {foo: {bar: 'baz'}}),
        '<div>baz</div>'
      );
    });

    it('can apply the same key more than once', function() {
      assert.equal(
        templatize(
          '<div>little bunny <b data-bind="foo"></b> <b data-bind="foo"></b></div>',
          {foo: 'x'}
        ),
        '<div>little bunny <b>x</b> <b>x</b></div>'
      );
    });

    it('inserts empty text for null and undefined values', function() {
      assert.equal(
        templatize('<div><b data-bind="foo">null key</b></div>', {foo: null}),
        '<div><b></b></div>'
      );
      assert.equal(
        templatize('<div><b data-bind="foo">empty object</b></div>', {}),
        '<div><b></b></div>'
      );
      assert.equal(
        templatize('<div><b data-bind="foo">no data</b></div>'),
        '<div><b></b></div>'
      );
    });

  }); // key binding

  describe('attributes', function() {

    it('can set attributes by key', function() {
      assert.equal(
        templatize('<div>foo</div>', {foo: 'baz'}, {'@id': 'foo'}),
        '<div id="baz">foo</div>'
      );
    });

    it('can set attributes by function', function() {
      assert.equal(
        templatize('<div>foo</div>', {foo: 'baz'}, {
          '@id': function(d) { return d.foo; }
        }),
        '<div id="baz">foo</div>'
      );
    });

    it('interpolates attributes on nested directives', function() {
      assert.equal(
        templatize(
          '<a data-bind="link"></a>',
          {foo: 'baz'},
          {link: {
            text: 'foo', 
            '@href': function(d) { return '#' + d.foo; }
          }}
        ),
        '<a href="#baz">baz</a>'
      );
    });

    it('recognizes class values', function() {
      assert.equal(
        templatize(
          '<a class="link" data-bind="link"></a>',
          {foo: 'bar'},
          {link: {
            '@class': 'foo'
          }}
        ),
        '<a class="link bar"></a>'
      );
    });

    it('recognizes class lists', function() {
      assert.equal(
        templatize(
          '<a class="link" data-bind="link"></a>',
          {foo: 'bar'},
          {link: {
            '@class': function(d) {
              return ['x', d.foo];
            }
          }}
        ),
        '<a class="link x bar"></a>'
      );
    });

    it('recognizes class maps', function() {
      assert.equal(
        templatize(
          '<a class="link" data-bind="link"></a>',
          {foo: 'bar'},
          {link: {
            '@class': {
              x: true,
              y: false,
              bar: function(d) {
                return d.foo === 'bar';
              }
            }
          }}
        ),
        '<a class="link x bar"></a>'
      );
    });

    it('recognizes style maps', function() {
      assert.equal(
        templatize(
          '<a class="foo" data-bind="link"></a>',
          {foo: 'bar'},
          {link: {
            '@style': {
              'text-transform': 'uppercase',
              'font-weight': function(d) {
                return d.foo === 'bar'
                  ? 'bold'
                  : 'normal';
              }
            }
          }}
        ),
        '<a class="foo" style="text-transform: uppercase; font-weight: bold; "></a>'
      );
    });

  }); // attributes

  describe('directives', function() {

    it('can interpolate directives as key references', function() {
      assert.equal(
        templatize(
          '<div data-bind="bar">foo</div>',
          {foo: 'baz'},
          {bar: 'foo'}
        ),
        '<div>baz</div>'
      );
    });

    it('can interpolate directives as functions', function() {
      assert.equal(
        templatize(
          '<div data-bind="foo">foo</div>',
          {foo: 'baz', bar: 'qux'},
          {foo: function(d) { return d + 1; }}
        ),
        '<div>baz1</div>'
      );
    });

    it('interpolates "dotted" directives with similar keys', function() {
      assert.equal(
        templatize(
          '<div data-bind="foo">foo</div>',
          {foo: 'baz'},
          {'.foo': function(foo) { return '!' + foo; }}
        ),
        '<div>!baz</div>'
      );
    });

    it('interpolates nested directives (with unresolved data)', function() {
      assert.equal(
        templatize(
          '<div data-bind="x"><b data-bind="y"></b></div>',
          {foo: 'baz'},
          {x: {y: 'foo'}}
        ),
        '<div><b>baz</b></div>'
      );
    });

  }); // directives

  describe('iteration', function() {

    it('can iterate with data-each="key" accessing an Array', function() {
      assert.equal(
        templatize(
          '<ul><li data-each="items"></li></ul>',
          {items: [1, 2, 3]}
        ),
        '<ul><li>1</li><li>2</li><li>3</li></ul>'
      );
    });

    it('can iterate with data-each="key" accessing an Object', function() {
      assert.equal(
        templatize(
          '<ul><li data-each="items"><b data-bind="key">key</b>: <i data-bind="value"></i></li></ul>',
          {items: {foo: 'bar', baz: 'qux'}}
        ),
        '<ul><li><b>foo</b>: <i>bar</i></li><li><b>baz</b>: <i>qux</i></li></ul>'
      );
    });

    it('can bind to an empty array', function() {
      assert.equal(
        templatize(
          '<ul><li data-each="items"></li></ul>',
          {items: []}
        ),
        '<ul></ul>'
      );
    });

    it('treats null/undefined as an empty list', function() {
      assert.equal(
        templatize(
          '<ul><li data-each="items"></li></ul>',
          {items: null}
        ),
        '<ul></ul>'
      );
      assert.equal(
        templatize(
          '<ul><li data-each="items"></li></ul>',
          {}
        ),
        '<ul></ul>'
      );
    });

    it('treats a scalar as a single-item list', function() {
      assert.equal(
        templatize(
          '<ul><li data-each="items"></li></ul>',
          {items: 'foo'}
        ),
        '<ul><li>foo</li></ul>'
      );
    });

    it('can set nested directives on array accessors', function() {
      assert.equal(
        templatize(
          '<ul><li data-each="items"><a data-bind="link"></a></li></ul>',
          {id: 'foo', text: 'bar'},
          {
            items: function(d) {
              return [d];
            },
            'items.@id': 'id',
            'items.link': {
              text: 'text',
              '@href': function(d) {
                return '#' + d.id;
              }
            }
          }
        ),
        '<ul><li id="foo"><a href="#foo">bar</a></li></ul>'
      );
    });

  }); // iteration

  describe('conditional rendering', function() {

    it('can conditionally render with data-if="key"', function() {
      assert.equal(
        templatize(
          '<b>bar <span data-if="foo">Foo!</span> baz</b>',
          {foo: false}
        ),
        '<b>bar  baz</b>'
      );
    });

    it('can negate conditional rendering with data-if="!key"', function() {
      assert.equal(
        templatize(
          '<b>bar <span data-if="!foo">Foo!</span> baz</b>',
          {foo: false}
        ),
        '<b>bar <span>Foo!</span> baz</b>'
      );
    });

  }); // conditional rendering

});

function templatize(html, data, directives) {
  var template = domify(html);
  var result = document.createElement('div');
  var patch = patcher(template, true);
  dom.patch(result, function() {
    patch(data, directives);
  });
  // console.log('1. template:', html);
  // console.log('2. result:', result.innerHTML);
  return result.innerHTML;
}

function domify(html) {
  var el = document.createElement('div');
  el.innerHTML = html;
  return el;
}

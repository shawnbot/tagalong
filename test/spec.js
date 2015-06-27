var tagalong = require('../');
var assert = require('assert');
var jsdom = require('jsdom');

describe('tagalong', function() {

  var window, document;
  beforeEach(function(done) {
    jsdom.env('<body></body>', function(error, _window) {
      if (error) return done(error);
      window = _window;
      document = window.document;
      return done();
    });
  });

  afterEach(function() {
    window.close();
    window = document = null;
  });

  describe('scalar binding', function() {
    it('binds a scalar to element text', function() {
      var el = document.createElement('span');
      tagalong(el, 'foo');
      assert.equal(el.textContent, 'foo');
    });
  });

  describe('object binding', function() {

    it('binds a key to a classed element', function() {
      var el = document.createElement('div');
      var span = el.appendChild(document.createElement('span'));
      span.className = 'foo';
      tagalong(el, {foo: 'bar'});
      assert.equal(span.textContent, 'bar');
    });

    it('binds a key to an element with data-bind="key"', function() {
      var el = document.createElement('div');
      var span = el.appendChild(document.createElement('span'));
      span.setAttribute('data-bind', 'foo');
      tagalong(el, {foo: 'bar'});
      assert.equal(span.textContent, 'bar');
    });

    it('binds a key to an element with data-bind="Some Key"', function() {
      var el = document.createElement('div');
      var span = el.appendChild(document.createElement('span'));
      span.setAttribute('data-bind', 'Some Key');
      tagalong(el, {'Some Key': 'bar'});
      assert.equal(span.textContent, 'bar');
    });

    describe('@attribute', function() {

      it('binds attributes with "@attr" directives as strings', function() {
        var div = document.createElement('div');
        tagalong(div, {foo: 'bar'}, {'@id': 'foo'});
        assert.equal(div.id, 'bar');
      });

      it('binds attributes with "@attr" directives as functions', function() {
        var div = document.createElement('div');
        tagalong(div, {foo: 'bar'}, {'@id': function(d) { return d.foo + '_'; }});
        assert.equal(div.id, 'bar_');
      });

      it('binds attributes with "@attr" directives as `true`', function() {
        var div = document.createElement('div');
        tagalong(div, {id: 'bar'}, {'@id': true});
        assert.equal(div.id, 'bar');
      });

      it('binds nested attributes with "@attr" directives', function() {
        var div = document.createElement('div');
        var span = div.appendChild(document.createElement('span'));
        span.className = 'x';
        tagalong(div, {x: {foo: 'bar'}}, {x: {'@id': 'foo'}});
        assert.equal(span.id, 'bar');
        assert.equal(span.textContent, '');
      });

      it('understands nested attribute directives (`x.@id`)', function() {
        var div = document.createElement('div');
        var span = div.appendChild(document.createElement('span'));
        span.className = 'x';
        tagalong(div, {x: {foo: 'bar'}}, {'x.@id': 'foo'});
        assert.equal(span.id, 'bar');
        assert.equal(span.textContent, '');
      });

    }); // @attributes setting

    describe('directive interpolation', function() {

      it('interpolates key strings from directives', function() {
        var div = document.createElement('div');
        var span = div.appendChild(document.createElement('span'));
        span.className = 'x';
        tagalong(div, {y: 'foo'}, {x: 'y'});
        assert.equal(span.textContent, 'foo');
      });

      it('interpolates object-nested directives ({x:y:{}})', function() {
        var div = document.createElement('div');
        var span = div.appendChild(document.createElement('span'));
        span.className = 'x';
        var i = span.appendChild(document.createElement('i'));
        i.className = 'y';
        tagalong(div, {x: {foo: 'bar'}}, {x: {y: 'foo'}});
        assert.equal(i.textContent, 'bar');
      });

      it('interpolates string-nested directives (`x.y`)', function() {
        var div = document.createElement('div');
        var span = div.appendChild(document.createElement('span'));
        span.className = 'x';
        var i = span.appendChild(document.createElement('i'));
        i.className = 'y';
        tagalong(div, {x: {foo: 'bar'}}, {'x.y': 'foo'});
        assert.equal(i.textContent, 'bar');
      });

      it('interpolates functions as directives', function() {
        var div = document.createElement('div');
        var span = div.appendChild(document.createElement('span'));
        span.className = 'x';
        tagalong(div, {y: 'foo'}, {x: function(d) { return d.y; }});
        assert.equal(span.textContent, 'foo');
      });

    }); // directive interpolation

  }); // object binding

  describe('array binding', function() {

    it("binds an array to a node's children", function() {
      var ul = document.createElement('ul');
      var li = ul.appendChild(document.createElement('li'));
      tagalong(ul, ['foo', 'bar']);
      var lis = ul.querySelectorAll('li');
      assert.equal(lis.length, 2);
      assert.equal(lis[0].textContent, 'foo');
      assert.equal(lis[1].textContent, 'bar');
    });

    it('binds a array by property name', function() {
      var div = document.createElement('div');
      var ul = div.appendChild(document.createElement('ul'));
      ul.className = 'items';
      var li = ul.appendChild(document.createElement('li'));
      tagalong(div, {items: ['foo', 'bar']});
      var lis = ul.querySelectorAll('li');
      assert.equal(lis.length, 2);
      assert.equal(lis[0].textContent, 'foo');
      assert.equal(lis[1].textContent, 'bar');
    });

    it('binds a array by property name and object key', function() {
      var div = document.createElement('div');
      var ul = div.appendChild(document.createElement('ul'));
      ul.className = 'items';
      var li = ul.appendChild(document.createElement('li'));
      li.appendChild(document.createElement('span')).className = 'value';
      tagalong(div, {
        items: [
          {value: 'foo'},
          {value: 'bar'}
        ]
      });
      var lis = ul.querySelectorAll('li');
      assert.equal(lis.length, 2);
      assert.equal(lis[0].firstChild.textContent, 'foo');
      assert.equal(lis[1].firstChild.textContent, 'bar');
    });

    it('can bind to empty arrays, then non-empty ones', function() {
      var div = document.createElement('div');
      var ul = div.appendChild(document.createElement('ul'));
      ul.className = 'items';
      var li = ul.appendChild(document.createElement('li'));
      li.appendChild(document.createElement('span')).className = 'value';

      var data = {items: []};
      tagalong(div, data);
      data.items = [{value: 'x'}, {value: 'y'}];
      tagalong(div, data);

      var lis = ul.querySelectorAll('li');
      assert.equal(lis.length, 2);
      assert.equal(lis[0].firstChild.textContent, 'x');
      assert.equal(lis[1].firstChild.textContent, 'y');
    });

  }); // array binding

}); // bind

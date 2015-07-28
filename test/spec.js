var tagalong = require('../');
var assert = require('assert');

describe('tagalong', function() {

  xdescribe('scalar binding', function() {

    it('binds a string to element text', function() {
      var el = document.createElement('span');
      tagalong(el, 'foo');
      assert.equal(el.textContent, 'foo');
    });

    it('binds a number to element text', function() {
      var el = document.createElement('span');
      tagalong(el, 5);
      assert.equal(el.textContent, '5');
    });

  }); // scalar binding

  describe('object binding', function() {

    it('binds a key to an element with data-bind="key"', function() {
      var div = document.createElement('div');
      var span = div.appendChild(document.createElement('span'));
      span.setAttribute('data-bind', 'foo');
      tagalong(div, {foo: 'bar'});
      assert.equal(div.firstChild.textContent, 'bar');
    });

    it('binds a key to an element with data-bind="Some Key"', function() {
      var div = document.createElement('div');
      var span = div.appendChild(document.createElement('span'));
      span.setAttribute('data-bind', 'Some Key');
      tagalong(div, {'Some Key': 'bar'});
      assert.equal(div.firstChild.textContent, 'bar');
    });

    xit('binds a key to a classed element', function() {
      var div = document.createElement('div');
      var span = div.appendChild(document.createElement('span'));
      span.className = 'foo';
      tagalong(div, {foo: 'bar'});
      assert.equal(div.firstChild.textContent, 'bar');
    });

    describe('@attribute', function() {

      it('binds attributes with "@attr" directives as strings', function() {
        var div = document.createElement('div');
        var span = div.appendChild(document.createElement('span'));
        tagalong(div, {foo: 'bar'}, {'@id': 'foo'});
        assert.equal(div.firstChild.id, 'bar');
      });

      it('binds attributes with "@attr" directives as functions', function() {
        var div = document.createElement('div');
        var span = div.appendChild(document.createElement('span'));
        tagalong(div, {foo: 'bar'}, {'@id': function(d) { return d.foo + '_'; }});
        // console.log(div.outerHTML);
        assert.equal(div.querySelector('span').id, 'bar_');
      });

      /*
      xit('binds attributes with "@attr" directives as `true`', function() {
        var div = document.createElement('div');
        tagalong(div, {id: 'bar'}, {'@id': true});
        assert.equal(div.id, 'bar');
      });
      */

      it('binds nested attributes with "@attr" directives', function() {
        var div = document.createElement('div');
        var span = div.appendChild(document.createElement('span'));
        span.setAttribute('data-bind', 'x');
        tagalong(div, {x: {foo: 'bar'}}, {x: {'@id': 'foo'}});
        span = div.querySelector('span');
        assert.equal(span.id, 'bar');
        assert.equal(span.textContent, '');
      });

      /*
      xit('understands nested attribute directives (`x.@id`)', function() {
        var div = document.createElement('div');
        var span = div.appendChild(document.createElement('span'));
        span.className = 'x';
        tagalong(div, {x: {foo: 'bar'}}, {'x.@id': 'foo'});
        assert.equal(span.id, 'bar');
        assert.equal(span.textContent, '');
      });
      */

    }); // @attributes setting

    describe('directive interpolation', function() {

      it('interpolates key strings from directives', function() {
        var div = document.createElement('div');
        var span = div.appendChild(document.createElement('span'));
        span.setAttribute('data-bind', 'x');
        tagalong(div, {y: 'foo'}, {x: 'y'});
        assert.equal(div.firstChild.textContent, 'foo');
      });

      it('interpolates object-nested directives ({x:{y:{}})', function() {
        var div = document.createElement('div');
        var span = div.appendChild(document.createElement('span'));
        span.setAttribute('data-bind', 'x');
        var i = span.appendChild(document.createElement('i'));
        i.setAttribute('data-bind', 'y');
        tagalong(div, {x: {foo: 'bar'}}, {x: {y: 'foo'}});
        assert.equal(div.querySelector('i').textContent, 'bar');
      });

      /*
      xit('interpolates string-nested directives (`x.y`)', function() {
        var div = document.createElement('div');
        var span = div.appendChild(document.createElement('span'));
        span.className = 'x';
        var i = span.appendChild(document.createElement('i'));
        i.className = 'y';
        tagalong(div, {x: {foo: 'bar'}}, {'x.y': 'foo'});
        assert.equal(div.querySelector('i').textContent, 'bar');
      });
      */

      it('interpolates functions as directives', function() {
        var div = document.createElement('div');
        var span = div.appendChild(document.createElement('span'));
        span.setAttribute('data-bind', 'x');
        tagalong(div, {y: 'foo'}, {x: function(d) { return d.y; }});
        assert.equal(div.firstChild.textContent, 'foo');
      });

      // XXX not sure what the problem is here...
      xit('interpolates nested directives', function() {
        var div = document.createElement('div');
        var span = div.appendChild(document.createElement('span'));
        span.setAttribute('data-bind', 'x');
        var b = span.appendChild(document.createElement('b'));
        b.setAttribute('data-bind', 'y');
        tagalong(div, {y: 'foo'}, {x: {y: 'y'}});
        // console.log(div.outerHTML);
        assert.equal(div.querySelector('b').textContent, 'foo');
      });

    }); // directive interpolation

  }); // object binding

  describe('array binding', function() {

    it("binds an array to a node's children", function() {
      var ul = document.createElement('ul');
      var li = ul.appendChild(document.createElement('li'));
      tagalong(ul, ['foo', 'bar']);
      // console.log(ul.outerHTML);
      var lis = ul.querySelectorAll('li');
      assert.equal(lis.length, 2);
      assert.equal(lis[0].textContent, 'foo');
      assert.equal(lis[1].textContent, 'bar');
    });

    it('binds an array by property name', function() {
      var div = document.createElement('div');
      var ul = div.appendChild(document.createElement('ul'));
      var li = ul.appendChild(document.createElement('li'));
      li.setAttribute('data-each', 'items');
      tagalong(div, {items: ['foo', 'bar']});
      // console.log(div.innerHTML);
      var lis = div.querySelectorAll('li');
      assert.equal(lis.length, 2);
      assert.equal(lis[0].textContent, 'foo');
      assert.equal(lis[1].textContent, 'bar');
    });

    it('binds a array by property name and object key', function() {
      var div = document.createElement('div');
      var ul = div.appendChild(document.createElement('ul'));
      var li = ul.appendChild(document.createElement('li'));
      ul.setAttribute('data-bind', 'items');
      li.appendChild(document.createElement('span')).setAttribute('data-bind', 'value');
      tagalong(div, {
        items: [
          {value: 'foo'},
          {value: 'bar'}
        ]
      });
      var lis = div.querySelectorAll('li');
      assert.equal(lis.length, 2);
      assert.equal(lis[0].firstChild.textContent, 'foo');
      assert.equal(lis[1].firstChild.textContent, 'bar');
    });

    it('can bind to empty arrays, then non-empty ones', function() {
      var div = document.createElement('div');
      var ul = div.appendChild(document.createElement('ul'));
      var li = ul.appendChild(document.createElement('li'));
      li.setAttribute('data-each', 'items');
      li.appendChild(document.createElement('span')).setAttribute('data-bind', 'value');

      var data = {items: []};
      var rebind = tagalong(div, data);
      data.items = [{value: 'x'}, {value: 'y'}];
      rebind(data);

      var lis = div.querySelectorAll('li');
      assert.equal(lis.length, 2);
      assert.equal(lis[0].firstChild.textContent, 'x');
      assert.equal(lis[1].firstChild.textContent, 'y');
    });

    it('binds directives to individual array elements', function() {
      var list = document.createElement('ul');
      var item = list.appendChild(document.createElement('li'));
      var link = item.appendChild(document.createElement('a'));
      link.setAttribute('data-bind', 'link');

      var data = [
        {text: 'foo', href: 'foo.html'},
        {text: 'bar', href: 'bar.html'}
      ];
      tagalong(list, data, {
        link: {
          text: 'text',
          '@href': 'href'
        }
      });
      // console.log(list.outerHTML);
      var links = list.querySelectorAll('li a');
      assert.equal(links.length, 2);
      assert.equal(links[0].getAttribute('href'), 'foo.html');
      assert.equal(links[1].getAttribute('href'), 'bar.html');
      assert.equal(links[0].textContent, 'foo');
    });

    it('binds objects as key/value pairs with data-each', function() {
      var div = document.createElement('div');
      var ul = div.appendChild(document.createElement('ul'));
      var li = ul.appendChild(document.createElement('li'));
      li.setAttribute('data-each', 'values');
      li.appendChild(document.createElement('b')).setAttribute('data-each', 'key');
      li.appendChild(document.createTextNode(' = '));
      li.appendChild(document.createElement('i')).setAttribute('data-each', 'value');

      var data = {
        values: {
          foo: 'bar',
          bar: 'baz'
        }
      };
      tagalong(div, data);

      var lis = div.querySelectorAll('li');
      assert.equal(lis[0].innerHTML, '<b>foo</b> = <i>bar</i>');
      assert.equal(lis[1].innerHTML, '<b>bar</b> = <i>baz</i>');
    });

  }); // array binding

}); // bind

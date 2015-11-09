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

  it('renders a single object key as text', function() {
    body.innerHTML = '<div t-text="foo"></div>';
    tagalong.render(body, {foo: 'bar'});
    assert.equal(body.innerHTML, '<div>bar</div>');
  });

  it('accepts a CSS selector as a template target', function() {
    body.innerHTML = '<div t-text="foo"></div>';
    tagalong.render('body', {foo: 'bar'});
    assert.equal(body.innerHTML, '<div>bar</div>');
  });

  it('throws an error when it cannot find its target', function() {
    assert.throws(function() {
      tagalong.render('#blargh', {foo: 'bar'});
    });
  });

  it('returns a render function for updates', function() {
    body.innerHTML = '<div t-text="foo"></div>';
    var render = tagalong.render(body, {foo: 'bar'});
    assert.equal(body.innerHTML, '<div>bar</div>');
    render({foo: 'qux'});
    assert.equal(body.innerHTML, '<div>qux</div>');
  });

  it('renders a nested object key as text', function() {
    body.innerHTML = '<div t-text="foo.bar"></div>';
    tagalong.render(body, {foo: {bar: 'baz'}});
    assert.equal(body.innerHTML, '<div>baz</div>');
  });

  it('renders attributes with the "t-" prefix', function() {
    body.innerHTML = '<div t-class="foo.bar">hi</div>';
    tagalong.render(body, {foo: {bar: 'baz'}});
    assert.equal(body.innerHTML, '<div class="baz">hi</div>');
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

  it('renders an if statement', function() {
    body.innerHTML = '<div t-if="foo > 0">yes</div>';
    var render = tagalong.render(body, {foo: 0});
    assert.equal(body.innerHTML, '');
    render({foo: 1});
    assert.equal(body.innerHTML, '<div>yes</div>');
  });

  it('renders an if/else statement', function() {
    body.innerHTML = '<div t-if="foo">yes</div><span t-else>no</span>';
    var render = tagalong.render(body, {foo: 0});
    assert.equal(body.innerHTML, '<span>no</span>');
    render({foo: 1});
    assert.equal(body.innerHTML, '<div>yes</div>');
  });

});

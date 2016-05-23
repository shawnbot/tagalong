const h = require('../src/h');
const assert = require('assert');
const jsdom = require('jsdom');

const setup = (done) => {
  jsdom.env('<html><body></body></html>', function(errors, window) {
    if (errors) {
      return done(errors[0]);
    }
    global.window = window;
    global.document = window.document;
    done();
  });
};

const SVG = 'https://www.w3.org/2000/svg';
const XLINK = 'https://www.w3.org/TR/xlink/';
const XMLNS = 'https://www.w3.org/2000/xmlns/';

before(setup);

describe('h(name)', () => {
  it('creates a named element', () => {
    assert.equal(h('div').nodeName, 'DIV');
  });

  it('respects ns:name format', () => {
    var svg = h('svg:svg');
    assert.equal(svg.localName, 'svg');
    assert.equal(svg.namespaceURI, SVG);
  });

  it('respects {name, prefix} format', () => {
    var svg = h({name: 'svg', prefix: 'svg'});
    assert.equal(svg.localName, 'svg');
    assert.equal(svg.namespaceURI, SVG);
  });
});

describe('h(name, props)', () => {
  it('sets attributes', () => {
    assert.equal(h('div', {foo: 'bar'}).getAttribute('foo'), 'bar');
  });

  it('sets namespaced attributes', () => {
    var el = h('div', {'xlink:href': '#xyz'})
    assert.equal(
      el.getAttributeNS(XLINK, 'href'),
      '#xyz'
    );
  });

  it('sets xmlns attributes', () => {
    var el = h('div', {'xmlns:xlink': XLINK})
    assert.equal(el.getAttributeNS(XMLNS, 'xlink'), XLINK);
  });
});

describe('h(name, children)', () => {
  it('appends children', () => {
    var el = h('div', ['foo']);
    assert.equal(el.childNodes.length, 1);
    assert.equal(el.firstChild.nodeValue, 'foo');
  });
});

describe('h(name, props, children)', () => {
  it('appends text children in arrays', () => {
    var el = h('div', null, ['foo']);
    assert.equal(el.childNodes.length, 1);
    assert.equal(el.textContent, 'foo');

    el = h('div', null, ['foo', 'bar']);
    assert.equal(el.childNodes.length, 2);
    assert.equal(el.textContent, 'foobar');
  });

  it('appends node children in arrays', () => {
    var el = h('div', null, [
      h('span', 'a'),
      h('span', 'b')
    ]);
    assert.equal(el.childNodes.length, 2);
    assert.equal(el.innerHTML, '<span>a</span><span>b</span>');
  });
});

describe('h(name, children)', () => {
  it('appends text children in arrays', () => {
    var el = h('div', ['foo']);
    assert.equal(el.childNodes.length, 1);
    assert.equal(el.textContent, 'foo');

    el = h('div', ['foo', 'bar']);
    assert.equal(el.childNodes.length, 2);
    assert.equal(el.textContent, 'foobar');
  });

  it('appends node children in arrays', () => {
    var el = h('div', [
      h('span', 'a'),
      h('span', 'b')
    ]);
    assert.equal(el.childNodes.length, 2);
    assert.equal(el.innerHTML, '<span>a</span><span>b</span>');
  });
});

describe('h([])', () => {
  it('creates a document fragment', () => {
    var fragment = h(['foo', 'bar']);
    assert.equal(fragment.nodeType, 11);
  });
});

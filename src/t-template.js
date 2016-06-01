var property = require('./property');
var evaluate = require('./evaluate').evaluate;
var createRenderer = require('./render').create;

var RENDER = '[[t-render]]';

var DATA_ATTR = 'data';

var Template = document.registerElement('t-template', {
  prototype: Object.create(
    HTMLElement.prototype,
    {
      attachedCallback: {value: function() {
        this.update();
      }},

      // eslint-disable-next-line no-unused-vars
      attributeChangedCallback: {value: function(attr, value, previous) {
        switch (attr) {
          case DATA_ATTR:
            this.update();
            break;
          default:
            return;
        }
      }},

      update: {value: function() {
        console.log('updating...');
        if (this.hasAttribute(DATA_ATTR)) {
          var expr = this.getAttribute(DATA_ATTR);
          var data = evaluate(expr);
          console.log('setting data: (', expr, ') ->', data);
          this.data = data;
        }
      }},

      /**
       * @param {Object?} data
       */
      render: {value: function(data) {
        if (!arguments.length) {
          data = this.data;
        }

        var render = this[RENDER];
        if (!render) {
          render = this[RENDER] = createRenderer(this);
        }

        render(data);
        return data;
      }},

      /**
       * @param {Element} node
       * @param {Object?} data
       */
      renderTo: {value: function(node, data) {
        if (arguments.length < 2) {
          data = this.data;
        }

        var render = this[RENDER];
        if (!render) {
          render = this[RENDER] = createRenderer(this);
        }
        render(node, data);
        return data;
      }},

      /**
       * Invalidate this element's compiled template, so that it
       * will be recompiled on the next render.
       */
      invalidate: {value: function() {
        this[RENDER] = null;
      }},

      /**
       * Returns the element's bound data.
       */
      data: property(
        function readTemplateData(data) {
          return data;
        },
        // eslint-disable-next-line no-unused-vars
        function setTemplateData(data, previous) {
          return this.render(data);
        },
        {}
      )
    }
  )
});

// only listen for changes to the data attribute
Object.defineProperty(Template, 'observedAttributes', {
  get: function() {
    return [DATA_ATTR];
  }
});

module.exports = Template;

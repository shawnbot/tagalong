var property = require('./property');
var evaluate = require('./evaluate').evaluate;
var createRenderer = require('./render');

var RENDER = '__render';

var DATA_ATTR = 'data';

var Template = document.registerElement('t-template', {
  prototype: Object.create(
    HTMLElement.prototype,
    {
      attachedCallback: {value: function() {
        console.log('attached!', this);
        this.update();
      }},

      attributeChangedCallback: {value: function(attr, value, previous) {
        switch (attr) {
          case DATA_ATTR:
            this.update();
            break;
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

      render: {value: function(data) {
        if (!arguments.length) data = this.data;

        var render = this[RENDER];
        if (!render) {
          render = this[RENDER] = createRenderer(this);
        }

        render(data);
        return data;
      }},

      invalidate: {value: function() {
        this[RENDER] = null;
        this.render();
      }},

      data: property(
        function readTemplateData(data) {
          return data;
        },
        function setTemplateData(data, previous) {
          return this.render(data);
        },
        {}
      )
    }
  )
});

module.exports = Template;

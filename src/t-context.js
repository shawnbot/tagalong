import property from './property';
import evaluate from './evaluate';
import {createRenderFunction} from './render';
// import Immutable, {Map, List} from 'immutable';

const RENDER = Symbol('template-render');

const DATA_ATTR = 'data';

let TContext = document.registerElement('t-context', {
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
          let expr = this.getAttribute(DATA_ATTR);
          let data = evaluate(expr);
          console.log('setting data: (', expr, ') ->', data);
          this.data = data;
        }
      }},

      getParentContext: {value: function() {
      }},

      render: {value: function() {
        let render = this[RENDER];
        if (!render) {
          render = this[RENDER] = createRenderFunction(this);
        }
        render(this.data);
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
          if (data !== previous) {
            return this.render();
          }
        },
        {}
      )
    }
  )
});

export default TContext;

(function() {

  var theme = 'eclipse';
  var inputHTML = CodeMirror.fromTextArea(document.querySelector('#input-html'), {
    lineNumbers: true,
    viewportMargin: Infinity,
    theme: theme,
    mode: 'htmlmixed'
  });

  var inputJS = CodeMirror.fromTextArea(document.querySelector('#input-js'), {
    lineNumbers: true,
    viewportMargin: Infinity,
    theme: theme,
    mode: 'javascript'
  });

  var outputNode = document.querySelector('#output-node');
  var outputHTML = document.querySelector('#output-html');
  var timer = document.querySelector('#timer');

  var change = (function(ms) {
    var timeout;
    return function(force) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(function() {
        // console.log('rendering...');
        outputNode.innerHTML = inputHTML.getValue();

        // wrap the script in an IIFE, so it doesn't leak globals
        var script = '(function() {' +
          inputJS.getValue() +
        ' })()';

        var then = Date.now();
        try {
          eval(script);
        } catch (error) {
          console.error(error);
        }
        timer.textContent = (Date.now() - then).toFixed(1) + 'ms';
        outputHTML.textContent = outputNode.innerHTML;
      }, force === true ? 10 : ms);
    };
  })(200);

  inputHTML.on('change', change);
  inputJS.on('change', change);

  // change();

  var multiline = function(fn) {
    return fn.toString()
      .trim()
      .replace(/^function\s*\(\)\s*{\s*\/\*\s*/, '')
      .replace(/\s*\*\/}$/, '');
  };

  var examples = [

    {
      id: '',
      title: 'Default',
      description: multiline(function(){/*
A basic example with templated text nodes and a repeated list
item.
      */}),
      template: inputHTML.getValue(),
      script: inputJS.getValue()
    },

    {
      id: 'list',
      title: 'Lists',
      description: multiline(function(){/*
Iterate over a list of values with t-each="expression" (to repeat a
single element) or t-foreach="expression" (to repeat an element's
children).
      */}),

      template: multiline(function(){/*
<div id="template">
  <p>With t-each on each list item:</p>
  <ul>
    <li t-each=".">{{ first }} {{ last }}</li>
  </ul>
  <p>With t-foreach on the enclosing list:</p>
  <ul t-foreach=".">
    <li>{{ first }} {{ last }}</li>
  </ul>
</div>
      */}),

      script: multiline(function(){/*
tagalong.render('#template', [
  {first: 'Jill', last: 'Hughes'},
  {first: 'Jack', last: 'Adams'},
  {first: 'Jo', last: 'Weaver'}
]);
      */})

    },

    {
      id: 'table',
      title: 'Table',
      description: multiline(function(){/*
This example shows one way of rendering a data table and
demonstrates how the properties of both the data and context objects
(the second and third arguments to tagalong.render) are available in
dynamic expressions. The t-as attribute is used on each row to alias
the row object to a named variable for use in each cell expression.
      */}),

      template: multiline(function(){/*
<table id="template">
  <caption t-text="title"></caption>
  <thead>
    <tr>
      <th t-each="columns">{{ title }}</th>
    </tr>
  </thead>
  <tbody>
    <tr t-each="rows" t-as="row">
      <td t-each="columns" t-as="col">{{ row[col.key] }}</td>
    </tr>
  </tbody>
</table>
      */}),
      script: multiline(function(){/*
tagalong.render('#template', {
  title: 'Cool People',
  rows: [
    {name: 'Judy', age: 28, occ: 'Developer'},
    {name: 'Jackie', age: 32, occ: 'Designer'},
    {name: 'Rosie', age: 30, occ: 'Riveter'}
  ]
}, {
  columns: [
    {key: 'name', title: 'Name'},
    {key: 'age', title: 'Age'},
    {key: 'occ', title: 'Occupation'}
  ]
});
      */})
    },

    {
      id: 'events',
      title: 'Events',

      description: multiline(function(){/*
This example demonstrates how using "t-on" attributes to attach
data-aware event handlers to individual elements. Clicking on a
checkbox re-renders the list and the count above.
      */}),

      template: multiline(function(){/*
<div id="template">
  <p>
    Selected
    {{ selected.length }}
    {{ selected.length === 1 ? 'person' : 'people' }}:
  </p>
  <ul>
    <li t-each="people">
      <label>
        <input type="checkbox" name="people"
          t-checked="selected ? 'checked' : null"
          t-value="{{ first }} {{ last }}"
          t-onclick="(d, e) => toggle(d)">
        {{ first }} {{ last }}
      </label>
    </li>
  </ul>
</div>
      */}),

      script: multiline(function(){/*
var data = {
  people: [
    {first: 'Jill', last: 'Hughes', selected: true},
    {first: 'Jack', last: 'Adams', selected: false},
    {first: 'Jo', last: 'Weaver', selected: false}
  ]
};

var render = tagalong.render('#template', data, {
  get selected() {
    return data.people.filter(function(d) {
      return d.selected;
    });
  },
  toggle: function(d) {
    d.selected = !d.selected;
    render(data);
  }
});
      */})
    }

  ];

  var ex = document.querySelector('#examples');
  var selectedExample = examples[0];
  if (location.hash) {
    selectedExample = examples.filter(function(d) {
        return d.id === location.hash.substr(1);
    })[0] || selectedExample;
  }

  var renderExamples = tagalong.render(ex, examples, {
    selected: selectedExample,
    select: function(d) {
      this.selected = d;
      renderExamples(examples);
    }
  });

  var hashchange = function() {
    var link = document.querySelector('[href="' + location.hash + '"]');
    if (!link) {
      link = ex.querySelector('a[href]');
    }
    if (link) {
      inputHTML.setValue(link.getAttribute('data-template'));
      inputJS.setValue(link.getAttribute('data-script'));
      change(true);
    } else {
      console.log('no such example:', location.hash);
    }
  };

  window.addEventListener('hashchange', hashchange);
  hashchange();

})();

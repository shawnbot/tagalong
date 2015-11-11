(function() {

  var theme = 'elegant';
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
        var script = inputJS.getValue();
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
      template: inputHTML.getValue(),
      script: inputJS.getValue()
    },

    {
      id: 'list',
      title: 'List',
      template: multiline(function(){/*
<ul id="template">
  <li t-each=".">{{ first }} {{ last }}</li>
</ul>
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
    {key: 'age', title: 'Name'},
    {key: 'occ', title: 'Occupation'}
  ]
});
      */})
    },

  ];

  var ex = document.querySelector('#examples');
  tagalong.render(ex, examples);

  var selectedLink;
  var hashchange = function() {
    if (selectedLink) selectedLink.classList.remove('active');
    var link = document.querySelector('[href="' + location.hash + '"]');
    if (!link) link = ex.querySelector('a[href]');
    if (link) {
      link.classList.add('active');
      // console.log('activating example:', link);
      inputHTML.setValue(link.getAttribute('data-template'));
      inputJS.setValue(link.getAttribute('data-script'));
      selectedLink = link;
      change(true);
    } else {
      console.log('no such example:', location.hash);
    }
  };

  window.addEventListener('hashchange', hashchange);
  hashchange();

})();

(function() {

  var theme = 'ttcn';
  var inputHTML = CodeMirror.fromTextArea(document.querySelector('#input-html'), {
    lineNumbers: true,
    theme: theme,
    mode: 'text'
  });

  var inputJS = CodeMirror.fromTextArea(document.querySelector('#input-js'), {
    lineNumbers: true,
    theme: theme,
    mode: 'javascript'
  });

  var outputNode = document.querySelector('#output-node');
  var outputHTML = document.querySelector('#output-html');

  var change = (function(ms) {
    var timeout;
    return function(force) {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(function() {
        // console.log('rendering...');
        outputNode.innerHTML = inputHTML.getValue();
        var script = inputJS.getValue();
        try {
          eval(script);
        } catch (error) {
          console.error(error);
        }
        outputHTML.textContent = template.outerHTML;
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
  <li>
    <span class="first"></span>
    <span class="last"></span>
  </li>
</ul>
      */}),
      script: multiline(function(){/*
tagalong('#template', [
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
  <caption class="title"></caption>
  <thead>
    <tr class="columns">
      <th></th>
    </tr>
  </thead>
  <tbody class="rows">
    <tr>
      <td></td>
    </tr>
  </tbody>
</table>
      */}),
      script: multiline(function(){/*
tagalong('#template', {
  columns: ['name', 'age', 'occupation'],
  rows: [
    ['Judy', 28, 'Developer'],
    ['Jackie', 32, 'Designer'],
    ['Rosie', 30, 'Riveter']
  ]
});
      */})
    }

  ];

  var ex = tagalong('#examples', examples, {
    '@href': function(d) { return '#' + d.id; },
    '@data-template': 'template',
    '@data-script': 'script'
  });

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

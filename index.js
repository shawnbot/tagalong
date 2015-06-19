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
    return function() {
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
      }, ms);
    };
  })(500);

  inputHTML.on('change', change);
  inputJS.on('change', change);

  change();

})();

var style = function(getter) {
  return function() {
    var data = getter.apply(this, arguments);
    if (data && typeof data === 'object') {
      return formatStyle(data);
    }
    return data;
  };
};

var className = function(getter) {
  return function() {
    var data = getter.apply(this, arguments);
    if (data && typeof data === 'object') {
      return formatClassName(data);
    }
    return data;
  };
};

module.exports = {
  style: style,
  className: className
};

function formatStyle(obj) {
  if (Array.isArray(obj)) {
    return obj.join('; ');
  }
  return Object.keys(obj)
    .map(function(key) {
      return [
        reformatCamelCase(key),
        ': ',
        obj[key],
        ';'
      ].join('');
    })
    .join(' ');
}

function reformatCamelCase(str) {
  return str.replace(/[A-Z]/g, function(char) {
    return '-' + char.toLowerCase();
  });
}

function formatClassName(obj) {
  if (Array.isArray(obj)) {
    return obj.join(' ');
  }
  return Object.keys(obj).filter(function(key) {
    return !!obj[key];
  }).join(' ');
}

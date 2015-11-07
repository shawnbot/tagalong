var xp = require('./evaluate');
var render = require('./render');

module.exports = {
  createRenderer: render.create,
  render: render.render
};

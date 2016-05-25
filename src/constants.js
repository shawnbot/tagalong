var prefix = 't-';

var T = {
  PREFIX: prefix
};

T.AS = prefix + 'as';
T.EACH = prefix + 'each';
T.ELSE = prefix + 'else';
T.FOREACH = prefix + 'foreach';
T.IF = prefix + 'if';
T.SKIP = prefix + 'skip';
T.TEXT = prefix + 'text';
T.WITH = prefix + 'with';

module.exports.T = T;

module.exports.CONTROL_ATTRS = [
  'as',
  'each',
  'else',
  'foreach',
  'if',
  'skip',
  'text',
  'with'
];

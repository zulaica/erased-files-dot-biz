const { reset } = require('chalk');
const { summary } = require('./shared');

/**
 * @type {import('stylelint').Formatter}
 */
module.exports = function (results /*, returnValue*/) {
  return reset(`${summary('Stylelint', 0, results.length)}\n`);
};

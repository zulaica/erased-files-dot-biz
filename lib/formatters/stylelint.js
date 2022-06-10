const { bold, reset } = require('chalk');

const summary = (problemTotal, sourceTotal) =>
  bold.underline(
    `Stylelint found ${problemTotal} ${
      problemTotal === 1 ? 'problem' : 'problems'
    } in ${sourceTotal} source ${sourceTotal === 1 ? 'file' : 'files'}\n`
  );

/**
 * @type {import('stylelint').Formatter}
 */
module.exports = function (results /*, returnValue*/) {
  return reset(`${summary(0, results.length)}\n`);
};

const { bold, red, green, yellow } = require('chalk');

const status = Object.freeze({
  error: {
    color: red,
    icon: '\u2716',
    severity: 'error'
  },
  success: {
    color: green,
    icon: '\u2714',
    severity: 'success'
  },
  warning: {
    color: yellow,
    icon: '\u26A0',
    severity: 'warning'
  }
});

const summary = (linter, problemTotal, sourceTotal) =>
  bold.underline(
    `${linter} found ${problemTotal} ${
      problemTotal === 1 ? 'problem' : 'problems'
    } in ${sourceTotal} source ${sourceTotal === 1 ? 'file' : 'files'}\n`
  );

module.exports = {
  status,
  summary
};

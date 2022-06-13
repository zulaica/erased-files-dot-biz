const { blue, bold, green, red, underline, yellow } = require('chalk');
const stripAnsi = require('strip-ansi');

const STATUSES = Object.freeze({
  error: {
    color: red,
    icon: '\u274c',
    severity: 'error'
  },
  info: {
    color: blue,
    icon: '\u2139\ufe0f',
    severity: 'info'
  },
  success: {
    color: green,
    icon: '\u2705',
    severity: 'success'
  },
  warning: {
    color: yellow,
    icon: '\u26a0\ufe0f',
    severity: 'warning'
  }
});

const TABLE_OPTIONS = Object.freeze({
  align: ['r', 'l'],
  stringLength(str) {
    return stripAnsi(str).length;
  }
});

const resultSource = (path, icon) => `${icon} ${path}\n`;

const summary = (linter, problemTotal, sourceTotal) =>
  bold(
    `${STATUSES.info.icon} ${underline(
      `${linter} found ${problemTotal} ${
        problemTotal === 1 ? 'problem' : 'problems'
      } among ${sourceTotal} source ${sourceTotal === 1 ? 'file' : 'files'}`
    )}\n`
  );

module.exports = {
  resultSource,
  summary,
  STATUSES,
  TABLE_OPTIONS
};

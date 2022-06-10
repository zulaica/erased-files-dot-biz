const { bold, blue, red, green, yellow, underline } = require('chalk');
const stripAnsi = require('strip-ansi');

const STATUSES = Object.freeze({
  error: {
    color: red,
    icon: '\u2716',
    severity: 'error'
  },
  info: {
    color: blue,
    icon: '\u2139',
    severity: 'info'
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

const TABLE_OPTIONS = Object.freeze({
  align: ['r', 'l'],
  stringLength(str) {
    return stripAnsi(str).length;
  }
});

const formatSource = (path, color, icon) => `${color(icon)}  ${path}\n`;

const summary = (linter, problemTotal, sourceTotal) =>
  bold(
    `${STATUSES.info.color(STATUSES.info.icon)}  ${underline(
      `${linter} found ${problemTotal} ${
        problemTotal === 1 ? 'problem' : 'problems'
      } among ${sourceTotal} source ${sourceTotal === 1 ? 'file' : 'files'}`
    )}\n`
  );

module.exports = {
  formatSource,
  STATUSES,
  summary,
  TABLE_OPTIONS
};

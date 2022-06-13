const { blue, bold, green, red, underline, yellow } = require('chalk');
const stripAnsi = require('strip-ansi');

const STATUSES = Object.freeze({
  error: {
    color: red,
    icon: '\u274c'
  },
  info: {
    color: blue,
    icon: '\u2139\ufe0f '
  },
  success: {
    color: green,
    icon: '\u2705'
  },
  warning: {
    color: yellow,
    icon: '\u26a0\ufe0f '
  }
});

const TABLE_OPTIONS = Object.freeze({
  align: ['r', 'l'],
  stringLength(str) {
    return stripAnsi(str).length;
  }
});

const formatResultSourcePath = (path, icon) => `${icon} ${path}\n`;

const summary = (linter, problemTotal, sourceTotal) =>
  bold(
    `${STATUSES.info.icon} ${underline(
      `${linter} found ${problemTotal} ${
        problemTotal === 1 ? 'problem' : 'problems'
      } among ${sourceTotal} source ${sourceTotal === 1 ? 'file' : 'files'}`
    )}\n`
  );

module.exports = {
  formatResultSourcePath,
  summary,
  STATUSES,
  TABLE_OPTIONS
};

const {
  blue,
  bold,
  dim,
  green,
  red,
  reset,
  underline,
  yellow
} = require('chalk');
const table = require('text-table');
const stripAnsi = require('strip-ansi');
const { relative } = require('path');

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

const displaySummary = (
  linter,
  problemTotal,
  problems,
  sourcesTotal,
  successes
) =>
  reset(
    `${formatSummary(
      linter,
      problemTotal,
      sourcesTotal
    )}\n${successes}\n${problems}`
  );

const formatAllResultProblems = (messages) =>
  `${table(
    messages.map(({ column, line, text, rule, severity }) =>
      formatResultProblem(column, line, text, rule, severity)
    ),
    TABLE_OPTIONS
  )}\n\n`;

const formatResultProblem = (column, line, message, rule, severity) => [
  dim(`${line}:${column}`),
  STATUSES[severity].color(severity),
  message.replace(/\(([^()]*)\)/g, '').trim(),
  dim(rule)
];

const formatResultSourcePath = (path, icon) => `${icon} ${path}\n`;

const formatSummary = (linter, problemTotal, sourceTotal) =>
  bold(
    `${STATUSES.info.icon} ${underline(
      `${linter} found ${problemTotal} ${
        problemTotal === 1 ? 'problem' : 'problems'
      } among ${sourceTotal} source ${sourceTotal === 1 ? 'file' : 'files'}`
    )}\n`
  );

const getRelativePath = (cwd, path) => relative(cwd, path);

module.exports = {
  displaySummary,
  formatAllResultProblems,
  formatResultSourcePath,
  getRelativePath,
  STATUSES
};

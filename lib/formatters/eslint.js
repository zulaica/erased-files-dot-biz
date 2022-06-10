const { underline, dim, reset } = require('chalk');
const stripAnsi = require('strip-ansi');
const table = require('text-table');
const { relative } = require('path');
const { status, summary } = require('./shared');

const tableOptions = Object.freeze({
  align: ['r', 'l'],
  stringLength(str) {
    return stripAnsi(str).length;
  }
});

const formatSource = (path, color, icon) =>
  `${color(icon)}  ${underline(path)}\n`;

module.exports = function (results, { cwd }) {
  let problemCount = 0;
  let problems = '';
  let successes = '';

  results.forEach(({ messages, filePath, errorCount, warningCount }) => {
    const path = relative(cwd, filePath);
    const isError = !!errorCount;
    const isWarning = !!warningCount;
    const { color, icon, severity } = isError
      ? status.error
      : isWarning
      ? status.warning
      : status.success;

    if (!isError && !isWarning) {
      successes += formatSource(path, color, icon);
      return;
    }

    problemCount += errorCount + warningCount;

    problems += formatSource(path, color, icon);
    problems += `${table(
      messages.map(({ column, line, message, ruleId }) => [
        dim(`${line}:${column}`),
        color(severity),
        message,
        dim(ruleId || '')
      ]),
      tableOptions
    )}\n\n`;
  });

  return reset(
    `${summary(
      'ESLint',
      problemCount,
      results.length
    )}\n${successes}\n${problems}`
  );
};

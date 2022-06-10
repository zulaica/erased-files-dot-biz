const { red, green, yellow, bold, underline, dim, reset } = require('chalk');
const stripAnsi = require('strip-ansi');
const table = require('text-table');
const { cwd } = require('process');
const { relative } = require('path');

const sourceRoot = cwd();

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

const tableOptions = Object.freeze({
  align: ['r', 'l'],
  stringLength(str) {
    return stripAnsi(str).length;
  }
});

const summary = (problemTotal, sourceTotal) =>
  bold.underline(
    `ESLint found ${problemTotal} ${
      problemTotal === 1 ? 'problem' : 'problems'
    } in ${sourceTotal} source ${sourceTotal === 1 ? 'file' : 'files'}\n`
  );

const formatSource = (path, color, icon) =>
  `${color(icon)}  ${underline(path)}\n`;

module.exports = function (results) {
  let problemCount = 0;
  let problems = '';
  let successes = '';

  results.forEach(({ messages, filePath, errorCount, warningCount }) => {
    const path = relative(sourceRoot, filePath);
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
    `${summary(problemCount, results.length)}\n${successes}\n${problems}`
  );
};

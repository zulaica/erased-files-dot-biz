const { red, green, yellow, bold, underline, dim, reset } = require('chalk');
const stripAnsi = require('strip-ansi');
const table = require('text-table');
const { cwd } = require('process');
const { relative } = require('path');

const sourceRoot = cwd();

const icons = Object.freeze({
  error: red('\u2716 '),
  success: green('\u2714 '),
  warning: yellow('\u26A0 ')
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

module.exports = function (results) {
  let problemCount = 0;
  let problems = '';
  let successes = '';

  results.forEach((result) => {
    const { messages, filePath, errorCount, warningCount } = result;
    const relativeFilePath = relative(sourceRoot, filePath);

    if (messages.length === 0) {
      successes += `${icons.success} ${underline(relativeFilePath)}\n`;
      return;
    }

    problemCount += errorCount + warningCount;

    problems += `${errorCount === 0 ? icons.warning : icons.error} ${underline(
      relativeFilePath
    )}\n`;

    problems += `${table(
      messages.map((message) => {
        const location = dim(`${message.line}:${message.column}`);
        const isError = message.fatal || message.severity === 2;

        return [
          location,
          isError ? red('error') : yellow('warning'),
          message.message.replace(/([^ ])\.$/u, '$1'),
          dim(message.ruleId || '')
        ];
      }),
      tableOptions
    )}\n\n`;
  });

  const report = `${summary(
    problemCount,
    results.length
  )}\n${successes}\n${problems}`;

  return reset(report);
};

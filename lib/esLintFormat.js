const chalk = require('chalk');
const stripAnsi = require('strip-ansi');
const table = require('text-table');
const process = require('process');
const path = require('path');

const cwd = process.cwd();

const icons = Object.freeze({
  error: chalk.red('\u2716 '),
  success: chalk.green('\u2714 '),
  warning: chalk.yellow('\u26A0 ')
});

const tableOptions = Object.freeze({
  align: ['r', 'l'],
  stringLength(str) {
    return stripAnsi(str).length;
  }
});

const summary = (problemTotal, sourceTotal) =>
  chalk.bold.underline(
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
    const relativeFilePath = path.relative(cwd, filePath);

    if (messages.length === 0) {
      successes += `${icons['success']} ${chalk.underline(relativeFilePath)}\n`;
      return;
    }

    problemCount += errorCount + warningCount;

    problems += `${
      errorCount === 0 ? icons['warning'] : icons['error']
    } ${chalk.underline(relativeFilePath)}\n`;

    problems += `${table(
      messages.map((message) => {
        const location = chalk.dim(`${message.line}:${message.column}`);
        const isError = message.fatal || message.severity === 2;

        return [
          location,
          isError ? chalk.red('error') : chalk.yellow('warning'),
          message.message.replace(/([^ ])\.$/u, '$1'),
          chalk.dim(message.ruleId || '')
        ];
      }),
      tableOptions
    )}\n\n`;
  });

  const report = `${summary(
    problemCount,
    results.length
  )}\n${successes}\n${problems}`;

  return chalk.reset(report);
};

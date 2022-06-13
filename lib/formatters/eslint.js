const { dim, reset } = require('chalk');
const table = require('text-table');
const { relative } = require('path');
const { resultSource, summary, STATUSES, TABLE_OPTIONS } = require('./shared');

/**
 * @type {import('eslint/lib/shared/types').FormatterFunction}
 */
module.exports = function (results, { cwd }) {
  let problemTotal = 0;
  let problems = '';
  let successes = '';

  results.forEach(({ messages, filePath, errorCount, warningCount }) => {
    const path = relative(cwd, filePath);
    const hasError = !!errorCount;
    const hasWarning = !!warningCount;
    const { color, icon, severity } = hasError
      ? STATUSES.error
      : hasWarning
      ? STATUSES.warning
      : STATUSES.success;

    if (!hasError && !hasWarning) {
      successes += resultSource(path, icon);
      return;
    }

    problemTotal += errorCount + warningCount;

    problems += resultSource(path, icon);
    problems += `${table(
      messages.map(({ column, line, message, ruleId }) => [
        dim(`${line}:${column}`),
        color(severity),
        message,
        dim(ruleId || '')
      ]),
      TABLE_OPTIONS
    )}\n\n`;
  });

  return reset(
    `${summary(
      'ESLint',
      problemTotal,
      results.length
    )}\n${successes}\n${problems}`
  );
};

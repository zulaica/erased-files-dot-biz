const { dim, reset } = require('chalk');
const table = require('text-table');
const { relative } = require('path');
const {
  formatResultSourcePath,
  summary,
  STATUSES,
  TABLE_OPTIONS
} = require('./shared');

/**
 * @type {import('stylelint').Formatter}
 */
module.exports = function (results, { cwd }) {
  let problemTotal = 0;
  let problems = '';
  let successes = '';

  results.forEach(({ source, errored: hasError, warnings }) => {
    const path = relative(cwd, source);
    const hasWarning = !!warnings.length;
    const { icon } = hasError
      ? STATUSES.error
      : hasWarning
      ? STATUSES.warning
      : STATUSES.success;

    if (!hasError && !hasWarning) {
      successes += formatResultSourcePath(path, icon);
      return;
    }

    problemTotal += warnings.length;

    problems += formatResultSourcePath(path, icon);
    problems += `${table(
      warnings.map(({ column, line, text, rule = '', severity }) => [
        dim(`${line}:${column}`),
        STATUSES[severity].color(severity),
        text.replace(/\(([^()]*)\)/g, '').trim(),
        dim(rule)
      ]),
      TABLE_OPTIONS
    )}\n\n`;
  });

  return reset(
    `${summary(
      'Stylelint',
      problemTotal,
      results.length
    )}\n${successes}\n${problems}`
  );
};

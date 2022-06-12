const { dim, reset } = require('chalk');
const table = require('text-table');
const { relative } = require('path');
const { formatSource, summary, STATUSES, TABLE_OPTIONS } = require('./shared');

/**
 * @type {import('stylelint').Formatter}
 */
module.exports = function (results, { cwd }) {
  let problemTotal = 0;
  let problems = '';
  let successes = '';

  results.forEach(({ source, errored, warnings }) => {
    const path = relative(cwd, source);
    const { color, icon, severity } = errored
      ? STATUSES.error
      : warnings.length
      ? STATUSES.warning
      : STATUSES.success;

    if (!errored && !warnings.length) {
      successes += formatSource(path, icon);
      return;
    }

    problemTotal += warnings.length;

    problems += formatSource(path, icon);
    problems += `${table(
      warnings.map(({ column, line, text, rule }) => [
        dim(`${line}:${column}`),
        color(severity),
        text.replace(/\(([^()]*)\)/g, '').trim(),
        dim(rule || '')
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

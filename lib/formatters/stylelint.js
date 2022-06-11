const { dim, reset } = require('chalk');
const table = require('text-table');
const { cwd } = require('process');
const { relative } = require('path');
const { summary, formatSource, STATUSES, TABLE_OPTIONS } = require('./shared');

const sourceRoot = cwd();

/**
 * @type {import('stylelint').Formatter}
 */
module.exports = function (results /*, returnValue*/) {
  let problemCount = 0;
  let problems = '';
  let successes = '';

  results.forEach(({ source, errored, warnings }) => {
    const path = relative(sourceRoot, source);
    const { color, icon, severity } = errored
      ? STATUSES.error
      : warnings.length
      ? STATUSES.warning
      : STATUSES.success;

    if (!errored && !warnings.length) {
      successes += formatSource(path, color, icon);
      return;
    }

    problemCount += warnings.length;

    problems += formatSource(path, color, icon);
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
      problemCount,
      results.length
    )}\n${successes}\n${problems}`
  );
};

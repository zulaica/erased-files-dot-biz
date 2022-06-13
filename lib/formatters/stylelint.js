const {
  displaySummary,
  formatAllResultProblems,
  formatResultSourcePath,
  getRelativePath,
  STATUSES
} = require('./shared');

/**
 * @type {import('stylelint').Formatter}
 */
module.exports = function (results, { cwd }) {
  let problemTotal = 0;
  let problems = '';
  let successes = '';

  results.forEach(({ source, errored: hasError, warnings }) => {
    const path = getRelativePath(cwd, source);
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

    const normalizedMessages = warnings.map((warning) => {
      const { column, line, text, severity } = warning;
      const rule = warning.rule || '';

      return { column, line, text, rule, severity };
    });
    problems += formatResultSourcePath(path, icon);
    problems += formatAllResultProblems(normalizedMessages);
    problemTotal += warnings.length;
  });

  return displaySummary(
    'Stylelint',
    problemTotal,
    problems,
    results.length,
    successes
  );
};

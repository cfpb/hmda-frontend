const fs = require('fs')
const path = require('path')

const FAILING_TESTS_REPORTER = path.join(
  __dirname,
  '../results/failing-tests.txt',
)

function formatFailingTests(results) {
  const testResultLinesArray = []

  for (const run of (results && results.runs) || []) {
    const specName = run.spec ? run.spec.name : 'unknown spec'

    if (run.error) {
      testResultLinesArray.push(
        `Spec failed to run: ${run.error.split('\n')[0]} (${specName})`,
      )
    }

    for (const test of run.tests || []) {
      if (test.state !== 'failed') continue
      testResultLinesArray.push(`${test.title.join(' › ')} (${specName})`)
    }
  }

  if (
    !testResultLinesArray.length &&
    results &&
    results.status === 'failed' &&
    results.message
  ) {
    testResultLinesArray.push(
      `Cypress failed to run: ${results.message.split('\n')[0]}`,
    )
  }

  return testResultLinesArray
}

function reportFailingTests(results) {
  const testResultLinesArray = formatFailingTests(results)
  fs.mkdirSync(path.dirname(FAILING_TESTS_REPORTER), { recursive: true })
  fs.writeFileSync(
    FAILING_TESTS_REPORTER,
    testResultLinesArray.length ? `${testResultLinesArray.join('\n')}\n` : '',
  )
}

module.exports = {
  reportFailingTests,
  formatFailingTests,
  FAILING_TESTS_REPORTER,
}

## Jest + Enyzme (OLD TESTS)

Folder contains all Jest + Enzme tests that were scattered around the codebase. For several years we have migrated to Cypress to run our E2E & Integration tests. The Jest + Enyzme tests do not run nightly haven't been used in active development for several years. The purpose of keeping the old tests is to give us a stating point when we want to expand into [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/overview).

Here are the results when running the `old-tests` script:

#### Test Suites:

126 Failed <br>
57 Passed <br>

#### Tests:

45 Failed <br>
1 Skipped <br>
170 Passed <br>

Running an individual test: `yarn jest -- -t 'TEST_FILE_NAME'`

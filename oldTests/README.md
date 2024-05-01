## Jest + Enyzme (OLD TESTS)

Folder contains all Jest + Enzme tests that were scattered around the codebase.

For several years we have migrated to Cypress to run our E2E & Integration tests. The Jest + Enyzme tests do not run nightly haven't been used in active development for several years. The purpose of keeping the old tests is to give us a stating point when we want to expand into [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/overview).

Paths for a lot of the tests have not been updated to support the moving of the tests into the `oldTests` directory.

Running all the old tests is done by `yarn old-tests`. Uses a script in the `package.json` file.

Running an individual test: `yarn jest -- -t 'TEST_FILE_NAME'`

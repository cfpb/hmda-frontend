# Cypress Integration Testing

In an effort to automate system validation, this test suite emulates user interaction with the HMDA Frontend using the Cypress testing library.

- [Cypress Integration Testing](#cypress-integration-testing)
  - [Environment Configuration](#environment-configuration)
  - [Running Tests](#running-tests)
    - [via CLI](#via-cli)
    - [via Cypress UI](#via-cypress-ui)
  - [Test categories](#test-categories)
  - [Cronjob integration](#cronjob-integration)
    - [Updating the test image](#updating-the-test-image)
    - [Updating Specs/Fixtures](#updating-specsfixtures)
    - [Updating Credentials](#updating-credentials)


## Environment Configuration

Cypress environment variables can be found in Cypress' [config file](https://github.com/cfpb/hmda-frontend/blob/master/cypress.config.js). To temporarily override a variable without editing the config file, export the variable name with `CYPRESS_` prepended. For example, to run the end-to-end tests against localhost instead of production, you could do:

```
CYPRESS_HOST=http://localhost:3000 yarn test
```

Some of our tests require authentication with Keycloak and you'll need to define `CYPRESS_USERNAME` and `CYPRESS_PASSWORD`. See our [test categories](#end-to-end-test-categories) below.

You can also pass variables directly to Cypress with its [`--env` flag](https://docs.cypress.io/app/guides/environment-variables#4---env-CLI-flag), e.g.:

```
yarn cypress open --env USERNAME=cypress,INSTITUTION=FRONTENDTESTBANK9999,TEST_DELAY=1000,ACTION_DELAY=1000,ENVIRONMENT=NOTCI,HOST="https://some.dev.server.cfpb.gov",AUTH_BASE_URL="https://some.dev.server.cfpb.gov/",PASSWORD='some-password',USERPATH="auth/admin/master/console/#/hmda2/users/xxxxxxxxxxx/settings"
```

## Running Tests

Cypress tests can be run via the UI or from the command line.

### via CLI

`yarn test`

When run via the command line, Cypress will generate separate videos of each test file's execution in the `/cypress/videos` directory. In the event of a test failure, it will also generate a snapshot image in `/cypress/snapshots` for quick review of the error encountered.

By default it will run all available tests. To execute an individual test file, pass the filepath via the `--spec` option

```
yarn test --spec ./cypress/e2e/updates-notes/ChangeLog.spec.js
```

To run a subset of tests, check out our [test categories](#test-categories) below.

### Via Cypress UI

The Cypress UI allows you to run individual tests, or the full test suite, while observing Cypress in action.

Note: No videos or snapshots are created when running tests via the Cypress UI, though you will be able to mouse through the before/after state of each testing step after the test run is complete.

```
yarn cypress open
```

## Test categories

We use [`@cypress/grep`](https://www.npmjs.com/package/@cypress/grep) to organize our end-to-end tests into subcategories:

- `yarn test`: Runs every end-to-end test against production (https://ffiec.cfpb.gov).
- `yarn test-localhost`: Runs end-to-end tests against `localhost:3000` and excludes tests that require [backend services](https://github.com/cfpb/hmda-platform) or the [documentation website](https://github.com/cfpb/hmda-combined-documentation). Designed for environments, such as a front-end developer's laptop, where `yarn start` is running but no other HMDA services are running.
- `yarn test-smoke`: Executes much quicker than the full suite of tests by running a subset of end-to-end tests that represent core functionality.
- `yarn test-unauthenticated`: Runs all tests that don't require Keycloak authentication.
- `yarn test-large`: Runs our large filer test which uploads a very large file and takes awhile.

When you add new tests, make sure to tag them appropriately so that they run with the above commands. You can view the commands and their tags in [`package.json`](https://github.com/cfpb/hmda-frontend/blob/master/package.json). For example, localhost tests have a `@localhost` tag. Tests that require Keycloak authentication have a `@auth-required` tag and the above `yarn test-unauthenticated` command runs all tests *without* this tag.

## Cronjob integration

Integration testing automatically runs once daily via cronjob.

### Updating the test image

The test image only needs to be updated when there is a change to the testing workflow (i.e. changes to `./docker-runner.sh`) or updates to the image dependencies (`./package.json`, `./install-cypress-dependencies.sh`, './Dockerfile`)

```
docker build . -t hmda-cypress -f cypress/Dockerfile &&
docker tag hmda-cypress <image_repo>/hmda/hmda-cypress &&
docker push  <image_repo>/hmda/hmda-cypress
```

### Updating Specs/Fixtures

Cronjob specs and fixtures are pulled from AWS S3 on each job run.

These files need to be updated when:

- There are tests being added/removed/updated
- There are files that tests depend on (Ex. LAR files for Filing tests) that have changed

Prerequisites:

- Verify that `/cypress/fixtures/2020-FRONTENDTEST-MAX.txt` exists. If not, use `yarn make-lar frontendtestbank9999 2020 MAX` to generate it (this requires the HMDA Platform - Check Digit service to be running locally: `sbt "project check-digit" "run"`).

Upload S3 files:

- To update the testing data used, from the root directory `/hmda-frontend/`, run

  ```
  yarn cy-update-s3
  ```

- You will be prompted for an AWS user profile that has `write` access to the S3 bucket.

### Updating Credentials

In order to update the login credentials used by the testing pod, please see the `Quick Start` section in `/hmda-devops/kubernetes/cypress/README.md`.

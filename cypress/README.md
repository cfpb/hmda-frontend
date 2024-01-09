# Cypress Integration Testing

In an effort to automate system validation, this test suite emulates user interaction with the HMDA Frontend using the Cypress testing library.

- [Cypress Integration Testing](#cypress-integration-testing)
  - [Setup](#setup)
    - [Installation Issues](#installation-issues)
    - [Environment Configuration](#environment-configuration)
  - [Running Tests](#running-tests)
    - [via CLI](#via-cli)
    - [via Cypress UI](#via-cypress-ui)
  - [Cronjob integration](#cronjob-integration)
    - [Updating the test image](#updating-the-test-image)
    - [Updating Specs/Fixtures](#updating-specsfixtures)
    - [Updating Credentials](#updating-credentials)

## Setup

Install [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm#installing-and-updating)

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source $HOME/.bashrc
```

Install [yarn](https://yarnpkg.com/getting-started/install)

```
brew install yarn
```

Install project dependencies

```
cd hmda-frontend
nvm install 12.14.1
nvm use
yarn install
```

### Installation Issues

If you encounter `yarn` errors regarding missing packages:

- Edit the `.yarnc` file to comment-out the `--install.offline` option
  ```
  # --install.offline true
  ```
- Save changes and re-run `yarn install`

### Environment Configuration

```
export CYPRESS_USERNAME=<username>
export CYPRESS_PASSWORD=<password>
export CYPRESS_INSTITUTION=<target-institution-lei>
export CYPRESS_TEST_DELAY=1000 # No delay (milliseconds)
export CYPRESS_ACTION_DELAY=1000 # No delay (milliseconds)
export CYPRESS_SHOULD_LOAD_TEST=true
export CYPRESS_TEST_LIST='cypress/integration/data-browser/**,cypress/integration/data-publication/**,cypress/integration/filing/**,cypress/integration/hmda-help/**,cypress/integration/tools/**'
```

## Running Tests

Cypress tests can be run via the UI or from the command line.

### via CLI

When run via the command line, Cypress will generate separate videos of each test file's execution in the `/cypress/videos` directory.

In the event of a test failure, it will also generate a snapshot image in `/cypress/snapshots` for quick review of the error encountered.

By default it will run all available tests.

```
yarn cypress run
```

To execute an individual test file, pass the filepath via the `--spec` option

```
yarn cypress run --spec ./cypress/integration/tools/RateSpread.spec.js
```

### via Cypress UI

The Cypress UI allows you to run individual tests, or the full test suite, while observing Cypress in action.

Note: No videos or snapshots are created when running tests via the Cypress UI, though you will be able to mouse through the before/after state of each testing step after the test run is complete.

```
yarn cypress open
```

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

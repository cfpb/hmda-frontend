# Cypress Integration Testing
In an effort to automate system validation, this test suite emulates user interaction with the HMDA Frontend using the Cypress testing library.
  * [Setup](#setup)
    + [Installation Issues](#installation-issues)
    + [Environment Configuration](#environment-configuration)
  * [Running Tests](#running-tests)
    + [via CLI](#via-cli)
    + [via Cypress UI](#via-cypress-ui)
  * [Cronjob integration](#cronjob-integration)
    + [Updating Specs](#updating-specs)
    + [Updating Credentials](#updating-credentials)

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

### Updating Specs
Integration testing automatically runs twice daily via cronjob. To update the testing pod with the latest specs we need only update the image `hmda-cypress:latest`.  From the root directory `/hmda-frontend/` run:
```
docker build . -t hmda-cypress -f cypress/Dockerfile && 
docker tag hmda-cypress <image_repo>/hmda/hmda-cypress && 
docker push  <image_repo>/hmda/hmda-cypress
``` 

### Updating Credentials 
In order to update the login credentials used by the testing pod, please see the `Quick Start` section in `/hmda-devops/kubernetes/cypress/README.md`.

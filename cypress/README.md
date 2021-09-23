# Cypress

In an effort to eliminate manual verification of system deployments, this test suite aims to simulate user interaction with the HMDA Front-end using the Cypress testing library.

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
export CYPRESS_TEST_DELAY=0 # No delay (milliseconds)
export CYPRESS_ACTION_DELAY=0 # No delay (milliseconds)
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

### Building
From the `hmda-frontend` folder:
```
docker build . -f cypress/Dockerfile
```

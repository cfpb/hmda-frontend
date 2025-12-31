const { defineConfig } = require('cypress')
const { plugin: cypressGrepPlugin } = require('@cypress/grep/plugin')
const fs = require('fs')

module.exports = defineConfig({
  chromeWebSecurity: false,
  video: true,
  env: {
    HOST: 'https://ffiec.cfpb.gov',
    ENVIRONMENT: 'NOT CI',
    USERNAME: 'frontend.testing@mailinator.com',
    INSTITUTION: 'FRONTENDTESTBANK9999',
    TEST_DELAY: 1000,
    ACTION_DELAY: 1000,
    NAV_DELAY: 5000,
    AUTH_REALM: 'hmda2',
    AUTH_CLIENT_ID: 'hmda2-api',
    preserveCookies: ['_login_gov_session'],
    // Always enable spec filtering
    grepFilterSpecs: true,
    // Always omit filtered tests
    grepOmitFiltered: true,
  },

  defaultCommandTimeout: 10000,
  projectId: 'uk89dv',

  retries: {
    runMode: 1,
    openMode: 0,
  },

  experimentalStudio: true,

  e2e: {
    experimentalRunAllSpecs: true,
    testIsolation: true,
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    experimentalOriginDependencies: true,
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    // Delete videos for specs without failing or retried tests, see docs:
    // https://docs.cypress.io/app/guides/screenshots-and-videos#Delete-videos-for-specs-without-failing-or-retried-tests
    setupNodeEvents(on, config) {
      config.hosts = {
        'files.ffiec.cfpb.gov': '23.215.77.114',
        'https://files.ffiec.cfpb.gov': '23.215.77.114',
      }
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          // Do we have failures for any retry attempts?
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === 'failed'),
          )
          // Check to make sure the video file exists before deleting, see https://stackoverflow.com/a/76113045
          if (!failures && fs.existsSync(results.video)) {
            // delete the video if the spec passed and no tests retried
            fs.unlinkSync(results.video)
            console.log(
              `All tests passed, deleting video file: ${results.video}`,
            )
          }
        }
      })
      cypressGrepPlugin(config)
      return config
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})

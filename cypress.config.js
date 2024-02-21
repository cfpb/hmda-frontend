const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
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
      require('@cypress/code-coverage/task')(on, config)
      require('./cypress/plugins/index.js')(on, config)
      return config
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})

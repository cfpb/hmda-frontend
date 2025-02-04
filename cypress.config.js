const { defineConfig } = require('cypress')

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
      openMode: 0
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})

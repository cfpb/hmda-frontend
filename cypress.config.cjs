const { defineConfig } = require('cypress')
const codeCoverageTask = require('@cypress/code-coverage/task.js')
const plugins = require('./cypress/plugins/index.js')

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
    codeCoverageTasksRegistered: true,
  },

  defaultCommandTimeout: 10000,
  projectId: 'uk89dv',

  retries: {
    runMode: 1,
    openMode: 0,
  },

  experimentalStudio: true,

  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    experimentalRunAllSpecs: true,
    testIsolation: true,
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config)
      plugins(on, config)
      return config
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
})

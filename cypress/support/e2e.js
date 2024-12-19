import { logEnv, urlExists } from './helpers'
import '@testing-library/cypress/add-commands'
import 'cypress-keycloak'
import 'cypress-file-upload'

// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands'

Cypress.Commands.add('hasValidHref', { prevSubject: true }, (anchor) => {
  return urlExists(anchor.attr('href'))
})

Cypress.Commands.add('dataUrl', { prevSubject: true }, (target) => {
  return urlExists(target.attr('data-url'))
})

Cypress.Commands.add('logEnv', { prevSubject: true }, (vars) => {
  logEnv(vars[0])
})

// Login via UI
Cypress.Commands.add('hmdaLogin', (app) => {
  const { USERNAME, PASSWORD, AUTH_BASE_URL } = Cypress.env()
  cy.visit(`${AUTH_BASE_URL}${app}`)

  cy.wait(1000)

  if (app.match('filing')) cy.get('button[title="Login"').click()

  cy.get('#username').type(USERNAME)
  cy.get('#password').type(PASSWORD)
  cy.get('#kc-login').click()
})

// Handles uncaught exceptions...
// https://docs.cypress.io/api/cypress-api/catalog-of-events#Uncaught-Exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // _384 is related to Google Tag Manager/Google Analytics
  if (err.message.includes('_384')) {
    return false
  }
  return false
  // we still want to ensure there are no other unexpected
  // errors, so we let them fail the test
})

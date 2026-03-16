import { register as registerCypressGrep } from '@cypress/grep'
import '@testing-library/cypress/add-commands'
import 'cypress-file-upload'
import 'cypress-keycloak'
import { addCompareSnapshotCommand } from 'cypress-visual-regression/dist/command'
import { logEnv, urlExists } from './helpers'

registerCypressGrep()
addCompareSnapshotCommand({ errorThreshold: 0.1 })

// Create a name for the screenshot based on the test title
const getScreenshotName = title => title.replace(/[^a-zA-Z0-9-_]/g, '-').replace(/-{2,}/g, '-').slice(0, 120)

// When CYPRESS_visualRegressionType env var is set (to either `base` or `regression`),
// a screenshot will be taken after each test.
// See https://github.com/cypress-visual-regression/cypress-visual-regression#plugin-options
afterEach(function () {
  if (!Cypress.env('visualRegressionType')) return
  if (this.currentTest?.state !== 'passed') return

  const name = getScreenshotName(this.currentTest.fullTitle())

  cy.get('body', { log: false }).then((body) => {
    // Make sure the page is done loading
    const isLoading = body.find('.LoadingIconWrapper').length > 0
    if (isLoading) return

    // Every page (I think?) has a #mainWrapper div that contains the content
    const hasMainWrapper = body.find('#mainWrapper').length > 0
    const screenshotWrapper = hasMainWrapper ? '#mainWrapper' : 'body'
    const screenshotElement = body.find(screenshotWrapper).first()

    if (!screenshotElement.length || !screenshotElement.is(':visible')) return

    cy.get(screenshotWrapper, { log: false }).compareSnapshot(name)
  })
})

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

// Login via Keycloak Impersonate
Cypress.Commands.add('keycloakLogin', (app) => {
  const { USERNAME, PASSWORD, AUTH_BASE_URL, USERPATH } = Cypress.env()
  cy.viewport(1201, 700)
  // Visit the login page
  cy.visit(`${AUTH_BASE_URL}${USERPATH}`)
  cy.document().should('have.property', 'readyState', 'complete')
  cy.get('#kc-page-title').contains('Sign in to your account')

  // Enter username
  cy.get('#username').type(USERNAME)

  // Enter password
  cy.get('#password').type(PASSWORD)

  // Click submit button
  cy.get('#kc-login').click()

  // Verify successful login
  cy.url().should('include', `${AUTH_BASE_URL}${USERPATH}`, { timeout: 30000 })

  // Select Impersonate
  cy.get('[data-testid="action-dropdown"]').click()
  cy.get('li').contains('Impersonate').should('be.visible').click()

  // Confirm Impersonation in Modal
  cy.get('#modal-confirm')
    .should('be.visible')
    .invoke('removeAttr', 'target')
    .click({ timeout: 2000 })

  // Go to App page
  cy.visit(`${AUTH_BASE_URL}${app}/2020/institutions`)

  cy.wait(10000)
})

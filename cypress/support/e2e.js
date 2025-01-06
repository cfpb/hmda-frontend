import { logEnv, urlExists } from './helpers'
import '@testing-library/cypress/add-commands'
import 'cypress-keycloak'
import 'cypress-file-upload'



Cypress.Commands.add('generateOTP', (secret) => {
    return authenticator.generate(secret);
});

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

// Login via UI with Keycloak
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

// Login via Login.gov
Cypress.Commands.add('hmdaLoginGov', (app) => {
  const { USERNAME, PASSWORD, AUTH_BASE_URL, OTP_SECRET } = Cypress.env()
  cy.clearCookies()
  cy.clearLocalStorage()
  
  // Initial visit with minimal automation indicators
  cy.visit(`${AUTH_BASE_URL}${app}`, {
    failOnStatusCode: false,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive'
    },
    onBeforeLoad: (win) => {
      // Remove automation flags
      delete win.navigator.__proto__.webdriver
      delete win.Cypress
      delete win.runnerWs
      delete win.open

      // Add real browser characteristics
      Object.defineProperties(win, {
        outerHeight: { get: () => 900 },
        outerWidth: { get: () => 1440 },
        innerHeight: { get: () => 800 },
        innerWidth: { get: () => 1420 }
      })
    }
  })

  // Select Filing menu
  if (app.match('filing')) {
    cy.get('button[title="Login"]', { timeout: 10000 })
      .should('be.visible')
      .click()
  }

  // Select Login.gov redirect
  // cy.get('a.login-gov-redirect')
  //   .should('be.visible')
  //   .click()

  // Login.gov
  cy.origin('secure.login.gov', 
    { args: { USERNAME, PASSWORD, OTP_SECRET } },
    ({ USERNAME, PASSWORD, OTP_SECRET }) => {

      // Remove automation indicators on Login.gov domain
      cy.on('window:before:load', (win) => {
        delete win.navigator.__proto__.webdriver
        delete win.Cypress
        delete win.runnerWs
        delete win.open
      })

      // Enter email
      cy.get('#user_email')
        .should('be.visible')
        .type(USERNAME, { delay: 200 })

      cy.wait(2000)

      // Enter password
      cy.get('input[name="user[password]"]')
        .should('be.visible')
        .type(PASSWORD, { delay: 200 })

      cy.wait(2000)

      // Click Submit
      cy.get('.usa-button--full-width')
        .click()

      cy.wait(3000)

      // Generate + Enter OTP
      cy.task('generateOTP', OTP_SECRET).then(otpCode => {
        cy.get('input[autocomplete="one-time-code"]')
          .should('be.visible')
          .type(otpCode, { delay: 200 })
      })

      cy.wait(1000)

      cy.get('.usa-button--big.usa-button--wide')
        .click()

      cy.wait(3000)
    }
  )
})



// Login via Keycloak Impersonate
Cypress.Commands.add('keycloakLogin', (app) => {
  const { USERNAME, PASSWORD, AUTH_BASE_URL, OTP_SECRET } = Cypress.env()
    console.log("Keycloak Test")
    cy.viewport(1201, 700)
      // Visit the login page
      cy.visit(`${AUTH_BASE_URL}auth/`)
      cy.document().should('have.property', 'readyState', 'complete')
      cy.get('#kc-page-title').contains('Sign in to your account')

      // Enter username
      cy.get('#username')
        .type(USERNAME)

      // Enter password
      cy.get('#password')
        .type(PASSWORD)

      // Click submit button
      cy.get('#kc-login').click()

      // Verify successful login
      cy.url().should('include', `${AUTH_BASE_URL}auth/admin/master/console/`, { timeout: 30000 })
      
      // Wait for Admin Panel page to load
      cy.get('h1').should('have.text', 'master realm', { timeout: 15000 })

      // Select hmda2
      cy.get('[data-testid="realmSelector"]').should('be.visible').click({ timeout: 15000 })
      cy.get('li').contains('hmda2').should('be.visible').click()

      // Verify hmda2 loaded
      cy.get('h1.pf-v5-c-empty-state__title-text').contains('HMDA')

      // Go to Users page
      cy.visit(`${AUTH_BASE_URL}auth/admin/master/console/#/hmda2/users`)

      // Search hmdahelp_test
      cy.get('input[aria-label="Search"]').type('hmdahelp_test')
      cy.get('button[aria-label="Search"]').click()

      // Click the user link
      cy.contains('a', 'hmdahelp_test@cfpb.gov').click()
      cy.get('h1').should('contain', 'hmdahelp_test@cfpb.gov')

      // Select Impersonate
      cy.get('[data-testid="action-dropdown"]').click()
      cy.get('li').contains('Impersonate').should('be.visible').click()

      // Confirm Impersonation in Modal
      cy.get('#modal-confirm').should('be.visible').invoke('removeAttr', 'target').click({timeout: 2000})

      // Go to App page
      cy.visit(`${AUTH_BASE_URL}${app}`)

      cy.wait(10000)
  
})
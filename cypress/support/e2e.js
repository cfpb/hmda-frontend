import { logEnv, urlExists } from './helpers'
import '@testing-library/cypress/add-commands'
import 'cypress-keycloak'
import 'cypress-file-upload'

import { authenticator } from 'otplib';

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

  if (app.match('filing')) cy.get('button[title="Login"').click()

  cy.get('#username').type(USERNAME)
  cy.get('#password').type(PASSWORD)
  cy.get('#kc-login').click()
})

// Login via UI with Login.gov
Cypress.Commands.add('hmdaLoginGov', (app) => {
  const { USERNAME, PASSWORD, AUTH_BASE_URL, OTP_SECRET } = Cypress.env()
  cy.visit(`${AUTH_BASE_URL}${app}`)

  if (app.match('filing')) cy.get('button[title="Login"').click()

  // Wait for and click the login.gov redirect link
    cy.get('a.login-gov-redirect').should('be.visible').click();

    // Fill in the email field
    cy.get('#user_email')
      .scrollIntoView()
      .should('be.visible')
      .type(USERNAME);

    // Fill in the password field
    cy.get('input[name="user[password]"]')
      .scrollIntoView()
      .should('be.visible')
      .type(PASSWORD);
    
    // Click the submit button
    cy.get('.usa-button--full-width')
      .scrollIntoView()
      .should('be.visible')
      .click();
    
    // Generate OTP
    cy.wait(2000)
    cy.generateOTP(OTP_SECRET).then(code => {
        cy.get('input[autocomplete="one-time-code"]').type(code);
    });

    // Click the OTP Submit Button
    cy.get('.usa-button--big.usa-button--wide')
      .scrollIntoView()
      .should('be.visible')
      .click();
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

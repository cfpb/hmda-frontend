import { authenticator } from 'otplib';

Cypress.Commands.add('generateOTP', (secret) => {
    return authenticator.generate(secret);
});

describe('Login.gov', () => {
  it('Login using Login.gov', () => {
    // Go to filing page
    cy.visit('https://ffiec.cfpb.gov/filing/');

    // Wait for the login button to be visible and click it
    cy.get('button[title="Login"]').should('be.visible').click();

    // Wait for and click the login.gov redirect link
    cy.get('a.login-gov-redirect').should('be.visible').click();

    // Fill in the email field
    cy.get('#user_email')
      .scrollIntoView()
      .should('be.visible')
      .type('hmdahelp_test@cfpb.gov');

    // Fill in the password field
    cy.get('input[name="user[password]"]')
      .scrollIntoView()
      .should('be.visible')
      .type('9QOyESY@rMKQ');
    
    // Click the submit button
    cy.get('.usa-button--full-width')
      .scrollIntoView()
      .should('be.visible')
      .click();
    
    // Generate OTP
    cy.generateOTP('HI5AKNIJFEALEU4QLJVA52C5QWLWLBQ6').then(code => {
        cy.get('input[autocomplete="one-time-code"]').type(code);
    });

    // Click the OTP Submit Button
    cy.get('.usa-button--big.usa-button--wide')
      .scrollIntoView()
      .should('be.visible')
      .click();
    
  });
});
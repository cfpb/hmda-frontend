import { isCI } from '../../support/helpers'

const { HOST, USERNAME, PASSWORD, ENVIRONMENT } = Cypress.env()

describe('Keycloak', () => {
  if(isCI(ENVIRONMENT)) 
    it('Does not run on CI')
  else {
    beforeEach(() => {
      cy.visit(`${HOST}/filing`)
    })
  
    it('Can log in via UI', () => {
      cy.findByText('Log in').click()
      cy.findByLabelText('Email').type(USERNAME)
      cy.findByLabelText('Password').type(PASSWORD)
      cy.findByText('Log In').click()
      cy.url().should('match', /\/filing\/\d{4}\/institutions$/)
    })
  
    describe('Account creation', () => {
      it('Performs form validation', () => {
        const registerText = "Register"
        const formPassword = "1234567890Ab!"
        const passwordMismatch = "Passwords do not match"
        const confirmLabel = "Confirm password"
        const emailLabel = 'Email'
        const institutionError = '#institutions .hmda-error-message'

        cy.findByText('Create an account').click()
        cy.findByText(registerText).should('be', 'disabled')
        cy.findByLabelText('First name').type('First')
        cy.findByLabelText('Last name').type('Last')
  
        // Displays error when no Institutions associate with email domain
        cy.findByLabelText(emailLabel).type('frontend.testing@mailinator.co')
        cy.get(institutionError).should('exist')
        
        // Find Institutions for associated email domains
        cy.findByLabelText(emailLabel).type('{selectall}frontend.testing@mailinator.com')
        cy.get(institutionError).should('exist')
        cy.findByText("Select your institution").should('exist')
        cy.get('#institutions li label').first().click()
        cy.findByText(registerText).should('be', 'disabled')
  
        // Validates password
        cy.findByLabelText("Password").type(formPassword)
        cy.findByLabelText(confirmLabel).focus().blur()
        cy.contains(passwordMismatch).should('be.visible')
        cy.findByLabelText(confirmLabel).type(formPassword).blur()
        cy.contains(passwordMismatch).should('not.be.visible')
  
        // Able to submit once form entries are valid
        cy.findByText(registerText).should('not.be', 'disabled').click()

        // Blocks re-registration of existing account
        cy.findByText('• This email already exists.')
      })
    })
  }
})
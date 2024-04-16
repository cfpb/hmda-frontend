import { getDefaultConfig } from '../../../src/common/configUtils'
import { getFilingPeriods } from '../../../src/common/constants/configHelpers'
import { isCI } from '../../support/helpers'

const { HOST, USERNAME, PASSWORD, ENVIRONMENT, YEARS } = Cypress.env()

describe('Keycloak', () => {
  if (isCI(ENVIRONMENT)) it('Does not run on CI')
  else {
    beforeEach(() => {
      cy.visit(`${HOST}/filing`)
      cy.get({ HOST, USERNAME, PASSWORD, ENVIRONMENT }).logEnv()
    })

    describe('Sign In', () => {
      const config = getDefaultConfig(HOST)
      const years = (YEARS && YEARS.toString().split(',')) || getFilingPeriods(config)

      it('Can log in and out', () => {
        cy.findByText('Log in').click()
        cy.findByLabelText('Email').type(USERNAME)
        cy.findByLabelText('Password').type(PASSWORD)
        cy.findByText('Sign In').click()

        // Successful sign in lands on Instutituions page
        cy.url().then((url) => {
          const urlParts = url.split('/')
          const yearIndex = urlParts.findIndex((part) => part === 'filing') + 1
          const yearFromUrl = urlParts[yearIndex]

          expect(years).to.include(yearFromUrl)
          expect(url).to.include(`/filing/${yearFromUrl}/institutions`)
        })

        // Logout
        cy.findByText('Logout').click()
      })

      it('Provides valid password reset link', () => {
        cy.findByText('Log in').click()

        // Always displayed password reset link
        cy.findByText('Forgot Password?').click()

        // Verify we're on the Reset page
        cy.findByText('Reset password').should('exist')

        // Navigate back to Sign In
        cy.findByText('go back to login').click()
        cy.findByText('Sign in')

        // Navigate to the account creation page
        const createTitle = 'Create an account'
        cy.findByText(createTitle).should('not.exist')
        cy.findByText('create an account').click()
        cy.findByText(createTitle).should('exist')
      })

      it('Failed login attempt provides valid password reset links', () => {
        const msg = '• Invalid username or password provided.'
        // No error message
        cy.findByText(msg).should('not.exist')

        // Attempt sign in with wrong password
        cy.findByText('Log in').click()
        cy.findByLabelText('Email').type(USERNAME)
        cy.findByLabelText('Password').type(PASSWORD + 'wrong')
        cy.findByText('Sign In').click()

        // Verify password error is shown
        cy.findByText(msg).should('exist')

        // Navigate to password reset page
        cy.findByText('Reset password').should('not.exist')
        cy.findAllByText('Forgot password?').click()
        cy.findByText('Reset password').should('exist')
        cy.findByText('Submit')

        // Navigate back to sign in page
        cy.findByText('go back to login').click()
        cy.findByText('Sign In').click()
      })
    })

    describe('Account creation', () => {
      it('Performs form validation', () => {
        const registerText = 'Register'
        const formPassword = '1234567890Ab!'
        const passwordMismatch = 'Passwords do not match'
        const confirmLabel = 'Confirm password'
        const emailLabel = 'Email'
        const institutionError = '#institutions .hmda-error-message'

        cy.wait(1000)
        cy.findByText('Create an account').click()
        cy.findByText(registerText).should('be.disabled')
        cy.findByLabelText('First name').type('First')
        cy.findByLabelText('Last name').type('Last')

        // Displays error when no Institutions associate with email domain
        cy.findByLabelText(emailLabel).type('frontend.testing@mailinator.co')
        cy.get(institutionError).should('exist')

        // Find Institutions for associated email domains
        cy.findByLabelText(emailLabel).type(
          '{selectall}frontend.testing@mailinator.com',
        )
        cy.get(institutionError).should('not.exist')
        cy.contains(
          /Select all available institutions|Select your institution/,
        ).should('exist')
        cy.get('#institutions li label').first().click()

        // Validates password
        cy.findByLabelText('Password').type(formPassword)
        cy.findByLabelText(confirmLabel).focus().blur()
        cy.contains(passwordMismatch).should('be.visible')
        cy.findByLabelText(confirmLabel).type(formPassword).blur()
        cy.contains(passwordMismatch).should('not.be.visible')

        // Able to submit once form entries are valid
        cy.findByText(registerText).should('not.be.disabled').click()

        // Blocks re-registration of existing account
        cy.findByText('• This email already exists.')
      })
    })
  }
})

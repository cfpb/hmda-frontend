import { isBeta, isCI } from '../../support/helpers'
import { getDefaultConfig } from '../../../src/common/configUtils'
import { getFilingPeriods } from '../../../src/common/constants/configHelpers'

const {
  HOST,
  USERNAME,
  PASSWORD,
  INSTITUTION,
  ACTION_DELAY,
  TEST_DELAY,
  NAV_DELAY,
  ENVIRONMENT,
  AUTH_BASE_URL,
  AUTH_REALM,
  AUTH_CLIENT_ID,
  YEARS,
} = Cypress.env()

describe('Complete Profile Page', {testIsolation: false}, () => {
  before(() => {    
    cy.get({
      HOST,
      USERNAME,
      PASSWORD,
      INSTITUTION,
      ACTION_DELAY,
      TEST_DELAY,
      NAV_DELAY,
      ENVIRONMENT,
      AUTH_BASE_URL,
      AUTH_REALM,
      AUTH_CLIENT_ID,
    }).logEnv()

    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => win.sessionStorage.clear())
    
    cy.keycloakLogin('filing')
    cy.url().should('contains', `${AUTH_BASE_URL}filing/`)
    cy.url().should('contains', `/institutions`)


    cy.viewport(1600, 900)
  })

  it('Navigate to the profile page and ensures the correct information is visible', () => {
    cy.wait(ACTION_DELAY)

    // Complete your profile page checks
    cy.get('.profile_icon_container').click()
    cy.get('.profile_form_container > :nth-child(1) > input').should(
      'have.value',
      'Cypress',
    )
    cy.get(':nth-child(2) > input').should('have.value', 'Test')
    cy.get(':nth-child(3) > input').should(
      'have.value',
      'hmdahelp_test@cfpb.gov',
    )
    cy.get('.institutions_checkbox_container').should('have.length', 1)
  })

  it('Removes associated institution, banner should popup saying that one associated institution is required to use the filing platform', () => {
    cy.wait(ACTION_DELAY)

    cy.get('.institutions_checkbox_container input[type="checkbox"]').uncheck()
    cy.get('.profile_save_container > button').click()
    cy.wait(1000)

    cy.get('.alert-heading').contains(
      'An institution must be associated with your account.',
    )
  })

  it('User gets redirected to complete profile page due to no associated LEIs on their account', () => {
    cy.wait(5000)

    cy.url().should('contains', '/filing/profile')

    cy.get('.institution_info_container > input').click({ multiple: true })
    cy.get('.profile_save_container > button').click()
    cy.wait(1000)

    // Back button verifies that the institution was re-added to the account
    cy.get('.button').contains('Back')
  })


})
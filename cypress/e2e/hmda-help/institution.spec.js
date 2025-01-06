import { isCI, getSelectedOptionValue, isBeta } from '../../support/helpers'
import { getFilingYears } from '../../../src/common/constants/configHelpers'
import { getDefaultConfig } from '../../../src/common/configUtils'
import { onlyOn } from '@cypress/skip-test'

const {
  HOST,
  ENVIRONMENT,
  AUTH_BASE_URL,
  AUTH_CLIENT_ID,
  AUTH_REALM,
  USERNAME,
  PASSWORD,
  INSTITUTION,
} = Cypress.env()

const LOCAL_ACTION_DELAY = 250

const NOTE_HISTORY_ON_CI_FIXED = false

onlyOn(isBeta(HOST), () => {
  describe('HMDA Help - Institutions', function () {
    it('Does not run in Beta environments', () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('HMDA Help - Institutions', () => {
    const years = getFilingYears(getDefaultConfig(HOST))

    it('Can update existing Institutions', () => {
      cy.get({
        HOST,
        ENVIRONMENT,
        AUTH_BASE_URL,
        AUTH_CLIENT_ID,
        AUTH_REALM,
        USERNAME,
        PASSWORD,
        INSTITUTION,
      }).logEnv()

      // Log in
      if (!isCI(ENVIRONMENT)) {
        cy.keycloakLogin('hmda-help')
        cy.url().should('contains', `${AUTH_BASE_URL}hmda-help`)
      }

      // Load site
      cy.viewport(1600, 900)
      cy.visit(`${HOST}/hmda-help`)
      cy.wait(LOCAL_ACTION_DELAY)

      // Search for existing Instititution
      cy.wait(5000) // HACK TO ALLOW CASCADING FILER LIST SEARCHES
      cy.get('#lei-select')
        .click()
        .type(INSTITUTION + '{enter}')
      cy.wait(LOCAL_ACTION_DELAY)
      cy.findAllByText('Update')
        .eq(1) // First row
        .click()

      const successMessage = `The institution, ${INSTITUTION}, has been updated.`
      const nameLabelText = 'Respondent Name'
      const updateButtonText = 'Update the Institution'
      const testName = 'Cypress Test Name Update'

      const timestamp1 = Date.now()
      cy.findByText('Note History').click()

      // CI will not have any existing History
      if (!isCI(ENVIRONMENT)) {
        cy.get('.note-list li', { timeout: 30000 })
          .first()
          .find('button .text')
          .should('not.contain.text', timestamp1)
      }

      cy.findByLabelText(nameLabelText).then(($name) => {
        const savedName = $name.attr('value')

        /**
         * Make changes to the Institution data
         * 
         * No longer updating Quarterly Filer select as it has been disabled.
         */

        // Change Respondent Name [Text Field]
        cy.findByLabelText(nameLabelText)
          .type('{selectAll}' + testName)
          .blur()
          .then(() => {
            // Notes field is required on Update
            cy.findByText(updateButtonText).should('not.be.enabled')
            cy.findByLabelText('Notes')
              .type('Cypress - Change respondent name ' + timestamp1)
              .blur()
            cy.findByText(updateButtonText)
              .should('be.enabled')
              .click()
              .then(() => {
                // Validate
                cy.findAllByText(successMessage)
                  .should('exist')
                  .then(() => {
                    // Check Note History entry correctly created
                    if (isCI(ENVIRONMENT) && NOTE_HISTORY_ON_CI_FIXED) {
                      cy.wait(2000)
                      cy.get('.note-list li').first().as('firstNote')
                      cy.get('@firstNote')
                        .find('button .text')
                        .should('contain.text', timestamp1)
                      cy.get('@firstNote')
                        .find('.details tbody td')
                        .eq(0)
                        .should('contain.text', 'respondent')
                        .should('contain.text', 'name')
                      cy.get('@firstNote')
                        .find('.details tbody td')
                        .eq(1)
                        .should('contain.text', savedName)
                      cy.get('@firstNote')
                        .find('.details tbody td')
                        .eq(2)
                        .should('contain.text', testName)
                    }
                  })
              })
          })

        /**
         * Revert changes to the Institution data
         */
        cy.findByLabelText(nameLabelText)
          .type('{selectAll}' + savedName)
          .blur()

        // Notes field is required on Update
        cy.findByText(updateButtonText).should('not.be.enabled')
        cy.findByLabelText('Notes')
          .type('Cypress - Change respondent name back')
          .blur()
          .then(() => {
            cy.wait(LOCAL_ACTION_DELAY)
            cy.findByText(updateButtonText)
              .should('be.enabled')
              .click()
              .then(() => {
                // Validate
                cy.findAllByText(successMessage)
                  .should('exist')
                  .then(() => {
                    expect($name.attr('value')).to.contain(savedName)
                  })
              })
          })
      })
    })

    /* 
      NOTE: Test is now being skipped
      
      Background: This test was checking the quarterly filers selector functionality.
      However, since new institutions have the quarterly filer option disabled by default as of November 2024,
      the test would fail immediately when creating new test institutions.
      
      Potential Future TODO: Revisit this test once we determine how to handle the default disabled state
      of the quarterly filer selector for new institutions.
    */
    it.skip('Can delete and create Institutions', () => {
      cy.get({
        HOST,
        ENVIRONMENT,
        AUTH_BASE_URL,
        AUTH_CLIENT_ID,
        AUTH_REALM,
        USERNAME,
        PASSWORD,
        INSTITUTION,
      }).logEnv()

      // Log in
      if (!isCI(ENVIRONMENT)) {
        cy.keycloakLogin('hmda-help')
        cy.url().should('contains', `${AUTH_BASE_URL}hmda-help`)
      }

      // Load site
      cy.viewport(1600, 900)
      cy.visit(`${HOST}/hmda-help`)
      cy.wait(LOCAL_ACTION_DELAY)

      const institution = 'MEISSADIATESTBANK001'
      const year = years[1].toString() // This will be the current filing season year

      // Delete
      cy.wait(5000) // HACK TO ALLOW CASCADING FILER LIST SEARCHES
      cy.get('#lei-select').click().type(`${institution}{enter}`)
      cy.wait(LOCAL_ACTION_DELAY)
      cy.get('table.institutions tbody tr')
        .first()
        .get('td')
        .first()
        .should('contain', year)
      cy.findAllByText('Delete').first().click()
      cy.findAllByText('Yes').first().click()
      cy.get('table.institutions tbody tr')
        .first()
        .get('td')
        .first()
        .should('not.contain', year)

      // Create
      cy.wait(LOCAL_ACTION_DELAY)
      cy.visit(`${HOST}/hmda-help`)
      cy.wait(5000) // HACK TO ALLOW CASCADING FILER LIST SEARCHES
      cy.get('#lei-select').click().type('MEISSADIATESTBANK001{enter}')
      cy.wait(LOCAL_ACTION_DELAY)
      cy.findByText(`Add ${institution} for ${year}`).click()

      cy.findByLabelText('Activity Year')
        .select(year)
        .should('have.value', year)
      cy.findByLabelText('Respondent Name').type('MD Bank 1')
      cy.findByLabelText('Email Domains').type('bank1.com')
      cy.findByLabelText('Tax Id').type('53-0000001')
      cy.findByLabelText(
        '9 - Consumer Financial Protection Bureau (CFPB)',
      ).click()
      cy.findByLabelText('Quarterly Filer')
        .select('true')
        .should('have.value', 'true')

      cy.findByText('Show other fields').click()
      cy.findByLabelText('RSSD').type('-1')
      cy.findByLabelText('Parent ID RSSD').type('-1')
      cy.findByLabelText('Assets').type('-1')
      cy.findByLabelText('Top Holder ID RSSD').type('-1')

      cy.findByText('Add the Institution').should('be.enabled').click()

      cy.findAllByText(
        `The institution, ${institution}, has been added!`,
      ).should('exist')
    })
  })
})

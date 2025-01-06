import { isCI, isProd, isBeta } from '../../support/helpers'
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

const ACTION_DELAY = 250

onlyOn(isBeta(HOST), () => {
  describe('HMDA Help - Publications', function () {
    it('Does not run in Beta environments', () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('HMDA Help - Publications', () => {
    it('Can trigger Publication regeneration', () => {
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

      cy.on('window:confirm', () => true)

      // Log in
      if (!isCI(ENVIRONMENT)) {
        cy.wait(ACTION_DELAY)
        cy.keycloakLogin('hmda-help')
        cy.url().should('contains', `${AUTH_BASE_URL}hmda-help`)
      }

      // Load site
      cy.viewport(1600, 900)
      cy.visit(`${HOST}/hmda-help`)
      cy.wait(ACTION_DELAY)

      // Search for existing Instititution
      cy.wait(5000) // HACK TO ALLOW CASCADING FILER LIST SEARCHES
      cy.get('#lei-select')
        .click()
        .type(INSTITUTION + '{enter}')
      cy.wait(2 * ACTION_DELAY)
      cy.findByText('Search Publications').click()
      cy.wait(ACTION_DELAY)

      // Trigger Publication regeneration
      cy.findAllByText('IRS')
        .parent('tr')
        .last()
        .findByText('Regenerate')
        .should('not.have.class', 'disabled')
        .as('lastRow')
        .click()

      cy.get('@lastRow').parent('div').should('contain.text', 'triggered!')

      if (isProd(HOST)) {
        // Has valid Download links
        cy.findAllByText('Download').each((link) => {
          cy.get(link)
            .hasValidHref()
            .then(({ status, url }) => {
              assert.isTrue(
                status,
                `"${link.text()}" is a valid link. URL: ${url}`,
              )
            })
          cy.wait(ACTION_DELAY)
        })
      }
    })
  })
})

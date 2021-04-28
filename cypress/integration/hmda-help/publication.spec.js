import { isCI, isProd } from '../../support/helpers'

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

describe('HMDA Help - Publications', () => {
  const authUrl = HOST.indexOf('localhost') > -1 ? AUTH_BASE_URL : HOST

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
      cy.logout({ root: authUrl, realm: AUTH_REALM })
      cy.wait(ACTION_DELAY)
      cy.login({
        root: authUrl,
        realm: AUTH_REALM,
        client_id: AUTH_CLIENT_ID,
        redirect_uri: HOST,
        username: USERNAME,
        password: PASSWORD
      })
    }
    
    // Load site
    cy.viewport(1600, 900)
    cy.visit(`${HOST}/hmda-help/`)
    cy.wait(ACTION_DELAY)

    // Search for existing Instititution
    cy.get('#lei-select').click().type(INSTITUTION + "{enter}")
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
      cy.findAllByText('Download').each(link => {
        cy.get(link).hasValidHref().then(({ status, url }) => {
          assert.isTrue(status, `"${link.text()}" is a valid link. URL: ${url}`)
        })
        cy.wait(ACTION_DELAY)
      })
    }
  })
})

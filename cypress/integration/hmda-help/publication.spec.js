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

  // beforeEach(() => {
    // if (!isCI(ENVIRONMENT)) {
    //   cy.logout({ root: authUrl, realm: AUTH_REALM })
    //   cy.wait(ACTION_DELAY)
    //   cy.login({
    //     root: authUrl,
    //     realm: AUTH_REALM,
    //     client_id: HH_AUTH_CLIENT_ID,
    //     redirect_uri: HOST,
    //     username: HH_USERNAME,
    //     password: HH_PASSWORD
    //   })
    // }
    
    // cy.viewport(1600, 900)
    // cy.visit(`${HOST}/hmda-help/`)
  // })

  it('Can trigger Publication regeneration', () => {
    cy.on('window:confirm', () => true)
    let row = 0

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
    cy.findByLabelText("LEI").type(INSTITUTION)
    cy.findByText('Search publications').click()
    cy.wait(ACTION_DELAY)

    // Can't generate Publication for future year
    cy.get('#publications table tbody tr').eq(row).as('mlarRow')
    cy.get('@mlarRow').contains('td', '2020')
    cy.get('@mlarRow').contains('td', 'Modified LAR')
    cy.get('@mlarRow').contains('td', 'No file')
    cy.get('@mlarRow').contains('td', 'Regenerate')
    cy.findAllByText('Regenerate').eq(row).should('have.class', 'disabled')

    // Can generate Publication for past year
    row = 3
    cy.get('#publications table tbody tr').eq(row).as('irsRow')
    cy.get('@irsRow').contains('td', '2019')
    cy.get('@irsRow').contains('td', 'IRS')
    cy.get('@irsRow').contains('td', 'Download')
    cy.get('@irsRow').contains('td', 'Regenerate')
    cy.findAllByText('Regenerate').eq(row).click()
    cy.get('@irsRow').contains('Regeneration of 2019 IRS triggered!')
    cy.wait(ACTION_DELAY)

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

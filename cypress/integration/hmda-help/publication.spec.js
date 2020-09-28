const {
  HH_HOST,
  HH_USERNAME,
  HH_PASSWORD,
  HH_INSTITUTION,
  HH_AUTH_URL,
  HH_AUTH_REALM,
  HH_AUTH_CLIENT_ID
} = Cypress.env()

describe('HMDA Help', () => {
  beforeEach(() => {
    cy.logout({ root: HH_AUTH_URL, realm: HH_AUTH_REALM })
    cy.login({
      root: HH_AUTH_URL,
      realm: HH_AUTH_REALM,
      client_id: HH_AUTH_CLIENT_ID,
      redirect_uri: HH_HOST,
      username: HH_USERNAME,
      password: HH_PASSWORD
    })
    cy.viewport(1600, 900)
    cy.visit(HH_HOST)
  })

  it('Can trigger Publication regeneration', () => {
    cy.on('window:confirm', () => true)
    let row = 0

    // Search for existing Instititution
    cy.findByLabelText("LEI").type(HH_INSTITUTION)
    cy.findByText('Search publications').click()

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

    // Has valid Download links
    cy.findAllByText('Download').each(link => {
      cy.get(link).hasValidHref().then(({ status }) => {
        assert.isTrue(status, `${link.text()} is a valid link`)
      })
    })
  })
})

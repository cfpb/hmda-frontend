import { isCI, getSelectedOptionValue } from '../../support/helpers'

const {
  HOST,
  ENVIRONMENT,
  HH_USERNAME,
  HH_PASSWORD,
  HH_INSTITUTION,
  HH_AUTH_REALM,
  HH_AUTH_CLIENT_ID,
} = Cypress.env()

const NOTE_HISTORY_ON_CI_FIXED = false

describe('HMDA Help', () => {
  const authUrl = HOST.indexOf('localhost') > -1 ? AUTH_BASE_URL : HOST

  beforeEach(() => {
    if (!isCI(ENVIRONMENT)) {
      cy.logout({ root: authUrl, realm: HH_AUTH_REALM })
      cy.login({
        root: authUrl,
        realm: HH_AUTH_REALM,
        client_id: HH_AUTH_CLIENT_ID,
        redirect_uri: HOST,
        username: HH_USERNAME,
        password: HH_PASSWORD,
      })
    }

    cy.viewport(1600, 900)
    cy.visit(`${HOST}/hmda-help/`)
  })

  it('Can update existing Institutions', () => {
    // Search for existing Instititution
    cy.findByLabelText('LEI').type(HH_INSTITUTION)
    cy.findByText('Search institutions').click()
    cy.findAllByText('Update')
      .eq(1) // 2019
      .click()

    const successMessage = `The institution, ${HH_INSTITUTION}, has been updated.`
    const nameLabelText = 'Respondent Name'
    const updateButtonText = 'Update the institution'
    const testName = 'Cypress Test Name Update'
    const quarterlyFilerLabel = 'Quarterly Filer'

    const timestamp1 = Date.now()
    cy.findByText('Note History').click()
    cy.get('.note-list li', { timeout: 30000 })
      .first()
      .find('button .text')
      .should('not.contain.text', timestamp1)

    cy.findByLabelText(nameLabelText).then(($name) => {
      const savedName = $name.attr('value')

      cy.findByLabelText(quarterlyFilerLabel).then(($qFiler) => {
        const savedQFiler = getSelectedOptionValue($qFiler, 'false')
        const flippedQFilerVal =
          ['true'].indexOf(savedQFiler) > -1 ? 'false' : 'true'

        /**
         * Make changes to the Institution data
         */

        // Change Respondent Name [Text Field]
        cy.findByLabelText(nameLabelText)
          .type('{selectAll}' + testName)
          .blur()
          .then(($name2) => {
            // Flip Quarterly Filer value [Select Field]
            cy.findByLabelText(quarterlyFilerLabel)
              .select(flippedQFilerVal)
              .blur()
              .then(($qFiler2) => {
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
                        expect($name2.attr('value')).to.contain(testName)
                        expect(getSelectedOptionValue($qFiler2)).to.contain(
                          flippedQFilerVal
                        )

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
          })

        /**
         * Revert changes to the Institution data
         */
        cy.findByLabelText(nameLabelText)
          .type('{selectAll}' + savedName)
          .blur()
        cy.findByLabelText(quarterlyFilerLabel).select(savedQFiler).blur()

        // Notes field is required on Update
        cy.findByText(updateButtonText).should('not.be.enabled')
        cy.findByLabelText('Notes')
          .type('Cypress - Change respondent name back')
          .blur()
          .then(() => {
            cy.findByText(updateButtonText)
              .should('be.enabled')
              .click()
              .then(() => {
                // Validate
                cy.findAllByText(successMessage)
                  .should('exist')
                  .then(() => {
                    expect($name.attr('value')).to.contain(savedName)
                    expect(getSelectedOptionValue($qFiler)).to.contain(
                      savedQFiler
                    )
                  })
              })
          })
      })
    })
  })

  it('Can delete and create Institutions', () => {
    const institution = 'MEISSADIATESTBANK001'
    const year = '2020'

    // Delete
    cy.findByLabelText('LEI').type(`${institution}{enter}`)
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
    cy.visit(`${HOST}/hmda-help/`)
    cy.findByLabelText('LEI').type('MEISSADIATESTBANK001{enter}')
    cy.findByText(`Add ${institution} for ${year}`).click()

    cy.findByLabelText('Activity Year').select(year).should('have.value', year)
    cy.findByLabelText('Respondent Name').type('MD Bank 1')
    cy.findByLabelText('Email Domains').type('bank1.com')
    cy.findByLabelText('Tax Id').type('53-0000001')
    cy.findByLabelText(
      '9 - Consumer Financial Protection Bureau (CFPB)'
    ).click()
    cy.findByLabelText('Quarterly Filer')
      .select('true')
      .should('have.value', 'true')

    cy.findByText('Show other fields').click()
    cy.findByLabelText('RSSD').type('-1')
    cy.findByLabelText('Parent ID RSSD').type('-1')
    cy.findByLabelText('Assets').type('-1')
    cy.findByLabelText('Top Holder ID RSSD').type('-1')

    cy.findByText('Add the institution').should('be.enabled').click()

    cy.findAllByText(`The institution, ${institution}, has been added!`).should(
      'exist'
    )
  })
})

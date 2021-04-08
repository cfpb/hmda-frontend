import log from '../../../src/data-publication/ChangeLog/change-log-data.json'
const { HOST } = Cypress.env()
const EXPECTED_SELECTED_PILLS = ['release', 'documentation', 'tools']
const entries = log.log

describe('Change Log', () => {
  describe('Filter Bar', () => {
    it('Loads config from query string', () => {
      cy.visit(`${HOST}/data-publication/updates?type=release&product=documentation,tools&keywords=2020,tool`)
      
      cy.log(">> Validate pills get set on load")
      EXPECTED_SELECTED_PILLS.forEach(pillClass => {
        cy.get(`#filter-bar .pill.selected.${pillClass}`)
      })

      cy.log(">> Check keyword filter works")
      cy.get('.change-row').should('have.length', 2)
      cy.get('.result-count .body').should('contain', 'Showing ' + 1 + ' out of')
      cy.get('.change-row').find('.highlighted').its('length').should('be.gte', 2)

      cy.get('.reset-filters').click()
      cy.get('.change-row').should('have.length', entries.length + 1)
      cy.get('.result-count').should('not.exist')

      cy.log(">> Changing filters should update the URL")
      cy.get('#filter-bar').findByText('correction').click()
      cy.url().should('contain', '?type=correction')
      cy.get('.change-row:not(.header)').should('exist')
      cy.get('.result-count .body').should('contain', 'Showing ' + 4 + ' out of')

      cy.get('#filter-bar').findByText('update').click()
      cy.get('#filter-bar').findByText('HMDA Tools').click()
      cy.url().should('contain', '?type=correction,update&product=tools')
      cy.get('.change-row:not(.header)').should('have.length', 5)
      cy.get('.result-count .body').should('contain', 'Showing ' + 5 + ' out of')
      
      cy.log(">> Search by Keyword")
      cy.findByLabelText('by Change Description').type('2018')
      cy.url().should('contain', '?type=correction,update&product=tools&keywords=2018')
      cy.get('.change-row').should('have.length', 2)
      cy.get('.result-count .body').should('contain', 'Showing ' + 1 + ' out of')
      cy.log(">> Highlight keywords")
      cy.get('.change-row .highlighted').should('have.length', 1)

      cy.log(">> Clear keyword search with button")
      cy.get('.clear-text').click()
      cy.get('.change-row:not(.header)').should('have.length', 5)
      cy.get('.result-count .body').should('contain', 'Showing ' + 5 + ' out of')
      
      // TODO: Test that entries are sorted by date
      // TODO: Only show entries for the past year
    })
  })
})
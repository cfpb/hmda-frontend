import log from '../../../src/data-publication/constants/publicationChangeLog.json'

const { HOST } = Cypress.env()
const EXPECTED_SELECTED_PILLS = ['release', 'notice', 'documentation', 'apps']
const entries = log.log

describe('Change Log', () => {
  describe('Filter Bar', () => {
    it('Loads config from query string', () => {
      cy.visit(`${HOST}/data-publication/updates?type=release,notice&product=documentation,apps&keywords=2020,tool`)
      // Validate pills get set on load
      EXPECTED_SELECTED_PILLS.forEach(pillClass => {
        cy.get(`#filter-bar .pill.selected.${pillClass}`)
      })

      // Check keyword filter works
      cy.get('.pub-change-day > .pub-change-item').should('have.length', 1)
      cy.get('.pub-change-day > .pub-change-item').find('.highlighted').its('length').should('be.gte', 2)

      cy.get('.reset-filters').click()
      cy.get('.pub-change-day > .pub-change-item').should('have.length', entries.length)

      // Changing filters should update the URL
      cy.get('#filter-bar').findByText('notice').click()
      cy.url().should('contain', '?type=notice')
      cy.get('.pub-change-day > .pub-change-item').should('not.exist')

      cy.get('#filter-bar').findByText('update').click()
      cy.get('#filter-bar').findByText('HMDA Apps').click()
      cy.url().should('contain', '?type=notice,update&product=apps')
      cy.get('.pub-change-day > .pub-change-item').should('have.length', 4)
      
      // Search by Keyword
      cy.findByLabelText('by Change Description').type('2018')
      cy.url().should('contain', '?type=notice,update&product=apps&keywords=2018')
      cy.get('.pub-change-day > .pub-change-item').should('have.length', 1)
      cy.get('.pub-change-day > .pub-change-item .highlighted').should('have.length', 1)

      // Clear keyword search with button
      cy.get('.clear-text').click()
      cy.get('.pub-change-day > .pub-change-item').should('have.length', 4)
      
      // TODO: Test that entries are sorted by date
      // TODO: Only show entries for the past year
    })
  })
})
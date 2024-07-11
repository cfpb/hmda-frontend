import log from '../../../src/updates-notes/change-log-data.json'
import { isBeta } from '../../support/helpers'
import { onlyOn } from '@cypress/skip-test'
const { HOST } = Cypress.env()
const EXPECTED_SELECTED_PILLS = ['release', 'documentation', 'tools']
const entries = log.log

onlyOn(isBeta(HOST), () => {
  describe('Change Log', function () {
    it('Does not run in Beta environments', () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('Change Log', () => {
    describe('Filter Bar', () => {
      it('Sets Type and Product filters from URL query string', () => {
        cy.visit(
          `${HOST}/updates-notes/updates?type=release&product=documentation,tools`,
        )
        EXPECTED_SELECTED_PILLS.forEach((pillClass) => {
          cy.get(`#filter-bar .pill.selected.${pillClass}`)
        })
      })

      it('Applies keyword filter from URL query string', () => {
        cy.visit(`${HOST}/updates-notes/updates?keywords=2020,tool`)
        cy.get('.change-row').should('have.length', 2)
        cy.get('.result-count .body').should(
          'contain',
          'Showing ' + 2 + ' out of',
        )
        cy.get('.change-row')
          .find('.highlighted')
          .its('length')
          .should('be.gte', 2)

        cy.get('.reset-filters').click()
        cy.get('.change-row').should('have.length.gte', entries.length)
        cy.get('.result-count').should('not.exist')
      })

      it('Adds filters to URL', () => {
        cy.visit(`${HOST}/updates-notes/updates`)
        cy.get('#filter-bar').findByText('correction').click()
        cy.url().should('contain', '?type=correction')
        cy.get('.change-row:not(.header)').should('exist')

        cy.get('#filter-bar').findByText('update').click()
        cy.get('#filter-bar').findByText('HMDA Tools').click()
        cy.url().should('contain', '?type=correction,update&product=tools')
        cy.get('.change-row:not(.header)').should('have.length.gte', 5)
      })

      it('Filters by keyword', () => {
        cy.visit(`${HOST}/updates-notes/updates?product=tools`)
        cy.findByLabelText('Description').type(
          'The 2017 File Format Verification Tool',
        )
        cy.url().should(
          'contain',
          'keywords=The,2017,File,Format,Verification,Tool',
        )
        cy.get('.change-row').should('have.length', 1)
        cy.get('.result-count .body').should(
          'contain',
          'Showing ' + 1 + ' out of',
        )
        cy.log('>> Highlight keywords')
        cy.get('.change-row .highlighted').should('have.length', 7)

        cy.log('>> Clear keyword search with button')
        cy.get('.clear-text').click()
        cy.get('.change-row:not(.header)').should('have.length.gte', 7)
      })
    })
  })
})

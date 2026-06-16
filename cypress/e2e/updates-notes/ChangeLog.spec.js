import { onlyOn } from '@cypress/skip-test'
import { isBeta } from '../../support/helpers'
const { HOST } = Cypress.env()
const EXPECTED_SELECTED_PILLS = ['release', 'documentation', 'tools']

const REALLY_LONG_MOCK_DATA = `
---
date: 03/01/99
type: announcement
product: tools
---
This is a super long announcement and it is very cool.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
`

const SHORT_MOCK_DATA = `
---
date: 03/01/99
type: announcement
product: tools
---
This is a normal length announcement and it is also very cool.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
`

const MARKDOWN_MOCK_DATA = `
---
date: 03/01/99
type: announcement
product: tools
---
**Did you know?** Markdown is now supported!

- Lists
- **Bold** and *italic* text
- [Links](https://consumerfinance.gov)

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
`

const HASH_TARGET_SLUG =
  '01-01-00-release-this-announcement-has-a-hash-for-deep-linking-testing-purposes'

const HASH_DEEP_LINK_MOCK_DATA = `
---
date: 01/01/00
type: release
product: tools
---
This announcement has a hash for deep linking testing purposes. It is amazing.
`

onlyOn(isBeta(HOST), () => {
  describe('Change Log', function () {
    it('Does not run in Beta environments', () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('Change Log', { tags: ['@localhost'] }, () => {
    describe('Announcements that contain markdown', () => {
      it('Markdown is properly processed', () => {
        cy.intercept('**/raw.githubusercontent.com/**/change-log.md', { body: MARKDOWN_MOCK_DATA })
        cy.visit(`${HOST}/updates-notes/updates`)

        cy.get('.expandable-description-wrapper')
          .first()
          .within(() => {
            // Bolding
            cy.get('.expandable-description-content strong').should('contain', 'Did you know?')

            // Italics
            cy.get('.expandable-description-content em').should('contain', 'italic')

            // Links
            cy.get('.expandable-description-content a').should('have.length', 1)
            cy.get('.expandable-description-content a').should('have.attr', 'href', 'https://consumerfinance.gov')

            // Lists
            cy.get('.expandable-description-content ul').should('exist')
            cy.get('.expandable-description-content li').should('have.length.gte', 3)
          })
      })
    })
    describe('Really long announcements that have an expandable', () => {
      it('Shows a "read more" button for long descriptions and expands when clicked', () => {
        cy.intercept('**/raw.githubusercontent.com/**/change-log.md', { body: REALLY_LONG_MOCK_DATA })
        cy.visit(`${HOST}/updates-notes/updates`)

        cy.get('.expandable-description-wrapper')
          .first()
          .within(() => {
            cy.get('.read-more-button').should('exist').should('contain', 'Read more')

            cy.get('.read-more-button').click()
            cy.get('.expandable-description-content').should('have.class', 'expanded')
            cy.get('.read-more-button').should('contain', 'Read less')

            cy.get('.read-more-button').click()
            cy.get('.expandable-description-content').should('have.class', 'collapsed')
            cy.get('.read-more-button').should('contain', 'Read more')
          })
      })

      it('Does not show "Read more" button for short descriptions', () => {
        cy.intercept('**/raw.githubusercontent.com/**/change-log.md', { body: SHORT_MOCK_DATA })
        cy.visit(`${HOST}/updates-notes/updates`)

        cy.get('.expandable-description-wrapper')
          .first()
          .within(() => {
            cy.get('.read-more-button').should('not.exist')
          })
      })
    })

    describe('Announcements permalink', () => {
      it('Jumps to the correct announcement when a hash is present in the URL', () => {
        cy.intercept('**/raw.githubusercontent.com/**/change-log.md', {
          body: HASH_DEEP_LINK_MOCK_DATA,
        })
        cy.visit(`${HOST}/updates-notes/updates#${HASH_TARGET_SLUG}`)

        cy.hash().should('eq', `#${HASH_TARGET_SLUG}`)
        cy.window().its('scrollY').should('be.greaterThan', 200)

        cy.get(`[id="${HASH_TARGET_SLUG}"]`).should('be.visible')
        cy.get(`[id="${HASH_TARGET_SLUG}"]`)
          .find('.column.date a')
          .should('have.attr', 'href', `#${HASH_TARGET_SLUG}`)
      })
    })

    describe('Filter Bar', () => {
      it('Sets Type and Product filters from URL query string', () => {
        cy.visit(
          `${HOST}/updates-notes/updates?type=release&product=documentation,tools`,
        )
        EXPECTED_SELECTED_PILLS.forEach((pillClass) => {
          cy.get(`#filter-bar .pill.selected.${pillClass}`)
        })
      })

      it('Applies keyword filter from URL query string', { tags: ['@smoke'] }, () => {
        cy.visit(`${HOST}/updates-notes/updates?keywords=2020,tool`)
        const NUM_FILTERED_ITEMS = 2
        cy.get('.change-row').should('have.length', NUM_FILTERED_ITEMS)
        cy.get('.result-count .body').should(
          'contain',
          'Showing ' + NUM_FILTERED_ITEMS + ' out of',
        )
        cy.get('.change-row')
          .find('.highlighted')
          .its('length')
          .should('be.gte', NUM_FILTERED_ITEMS)

        cy.get('.reset-filters').click()
        cy.get('.change-row').should('have.length.gt', NUM_FILTERED_ITEMS)
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

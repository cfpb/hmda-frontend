import { onlyOn } from '@cypress/skip-test'
import { isBeta } from '../../support/helpers'

const { HOST } = Cypress.env()

// setting this to something in the 2025 data publication for now to match data that will be shared
// between staging and prod
const INSTITUTION = '549300I4IUWMEMGLST06'
const MSA_MD = '19124'

const ALL_ZERO_REPORT = `${HOST}/data-publication/disclosure-reports/2025/${INSTITUTION}/${MSA_MD}/2`
const REPORT_WITH_DATA = `${HOST}/data-publication/disclosure-reports/2025/${INSTITUTION}/${MSA_MD}/1`

onlyOn(isBeta(HOST), () => {
  describe('Zero Value Report Notice', function () {
    it('Does not run in Beta environments', () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('Zero Value Report Notice', { defaultCommandTimeout: 45000 }, () => {
    it('Shows the notice when a report contains only zeros', () => {
      cy.get({ HOST }).logEnv()
      cy.viewport(1680, 916)
      cy.visit(ALL_ZERO_REPORT)

      cy.get('.all-zero-data-notice')
        .should('be.visible')
        .should('contain', 'All values in the table below are 0')
    })

    it('Does not show the notice when a report contains any data', () => {
      cy.get({ HOST }).logEnv()
      cy.viewport(1680, 916)
      cy.visit(REPORT_WITH_DATA)

      cy.get('.Report table').should('exist')
      cy.get('.all-zero-data-notice').should('not.exist')
    })
  })
})

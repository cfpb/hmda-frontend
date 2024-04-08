import { isBeta } from '../../support/helpers'
import { onlyOn } from '@cypress/skip-test'

const { HOST } = Cypress.env()

onlyOn(isBeta(HOST), () => {
  describe('National Aggregate Reports', function () {
    it('Does not run in Beta environments', () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('National Aggregate Report - Not Generated', () => {
    ;['2021', '2020', '2019', '2018'].forEach((year) => {
      it(`${year} does not have Reports`, () => {
        cy.get({ HOST }).logEnv()
        cy.viewport(1000, 867)
        cy.visit(`${HOST}/data-publication/national-aggregate-reports/${year}`)
        cy.get('#main-content h3')
          .last()
          .should(
            'have.text',
            `National Aggregate reports are not produced for data collected in or after 2018.`,
          )
      })
    })
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('National Aggregate Report 2017', () => {
    it('Loans Sold by Purchaser Type', () => {
      cy.get({ HOST }).logEnv()
      cy.viewport(1680, 867)
      cy.visit(`${HOST}/data-publication/national-aggregate-reports/2017`)

      // Select Report
      cy.get('#react-select-2-option-0-1').click()

      // Confirm Report Selections
      cy.get('.ProgressCards > :nth-child(1)').should('contain.text', '2017')
      cy.get('.ProgressCards > :nth-child(2)').should(
        'contain.text',
        'Loans Sold by Purchaser Type - 3-2',
      )

      // Validate a row of report data
      cy.get('.Report table:first-of-type > tbody > tr:first-of-type').within(
        () => {
          cy.get(':nth-child(1)').should(
            'have.text',
            'No reported pricing data',
          )
          cy.get(':nth-child(2)').should('have.text', '1348626')
          cy.get(':nth-child(3)').should('have.text', '437')
          cy.get(':nth-child(4)').should('have.text', '874594')
          cy.get(':nth-child(5)').should('have.text', '51')
          cy.get(':nth-child(6)').should('have.text', '895110')
          cy.get(':nth-child(7)').should('have.text', '127')
          cy.get(':nth-child(8)').should('have.text', '1184')
          cy.get(':nth-child(9)').should('have.text', '16')
          cy.get(':nth-child(10)').should('have.text', '38017')
          cy.get(':nth-child(11)').should('have.text', '828')
          cy.get(':nth-child(12)').should('have.text', '680187')
          cy.get(':nth-child(13)').should('have.text', '8543')
          cy.get(':nth-child(14)').should('have.text', '710460')
          cy.get(':nth-child(15)').should('have.text', '14291')
          cy.get(':nth-child(16)').should('have.text', '73583')
          cy.get(':nth-child(17)').should('have.text', '548')
          cy.get(':nth-child(18)').should('have.text', '309291')
          cy.get(':nth-child(19)').should('have.text', '35227')
        },
      )
    })
  })
})

import { isBeta } from '../../support/helpers'
import { onlyOn } from '@cypress/skip-test'

const { HOST } = Cypress.env()

onlyOn(isBeta(HOST), () => {
  describe('Combined MLAR', function () {
    it('Does not run in Beta environments', () => {})
  })
})

const years = [2023, 2022]
onlyOn(!isBeta(HOST), () => {
  describe('Combined MLAR', () => {
    years.forEach((year) => {
      it(`Verify Files Exist ${year}`, () => {
        cy.visit(`${HOST}/data-publication/modified-lar/${year}`)
        cy.request({
          method: 'HEAD',
          url: `https://s3.amazonaws.com/cfpb-hmda-public/prod/dynamic-data/combined-mlar/${year}/header/${year}_combined_mlar_header.zip`,
        })
          .its('status')
          .should('equal', 200)
        cy.request({
          method: 'HEAD',
          url: `https://s3.amazonaws.com/cfpb-hmda-public/prod/dynamic-data/combined-mlar/${year}/${year}_combined_mlar.zip`,
        })
          .its('status')
          .should('equal', 200)
      })
    })
  })
})

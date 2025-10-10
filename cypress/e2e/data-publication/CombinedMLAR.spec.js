import { onlyOn } from '@cypress/skip-test'
import { getDefaultConfig } from '../../../src/common/configUtils'
import { isBeta } from '../../support/helpers'

const { HOST } = Cypress.env()
const { fileServerDomain } = getDefaultConfig(HOST)

onlyOn(isBeta(HOST), () => {
  describe('Combined MLAR', function () {
    it('Does not run in Beta environments', () => {})
  })
})

const years = [2024, 2023, 2022]
onlyOn(!isBeta(HOST), () => {
  describe('Combined MLAR', () => {
    years.forEach((year) => {
      it(`Verify Files Exist ${year}`, () => {
        cy.visit(`${HOST}/data-publication/modified-lar/${year}`)
        cy.request({
          method: 'HEAD',
          url: `${fileServerDomain}/prod/dynamic-data/combined-mlar/${year}/header/${year}_combined_mlar_header.zip`,
        })
          .its('status')
          .should('equal', 200)
        cy.request({
          method: 'HEAD',
          url: `${fileServerDomain}/prod/dynamic-data/combined-mlar/${year}/${year}_combined_mlar.zip`,
        })
          .its('status')
          .should('equal', 200)
      })
    })
  })
})

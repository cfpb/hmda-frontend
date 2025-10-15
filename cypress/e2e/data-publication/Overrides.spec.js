const { HOST, TEST_DELAY } = Cypress.env()
import { onlyOn } from '@cypress/skip-test'
import { isBeta } from '../../support/helpers'

const years = [2024]
const overrideUrls = [
  {
    name: 'Snapshot Dataset',
    url: '/data-publication/snapshot-national-loan-level-dataset/',
    yearOffset: '0',
  },
  {
    name: 'One Year Dataset',
    url: '/data-publication/one-year-national-loan-level-dataset/',
    yearOffset: '1',
  },
  {
    name: 'Three Year Dataset',
    url: '/data-publication/three-year-national-loan-level-dataset/',
    yearOffset: '3',
  },
]

onlyOn(isBeta(HOST), () => {
  describe('Overrides for Unreleased HMDA Panel Data Publication Warnings', function () {
    it('Does not run in Beta environments', () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('Overrides for Unreleased HMDA Panel Data Publication Warnings', () => {
    years.forEach((year) => {
      describe(year + ' HMDA Panel Overrides', () => {
        overrideUrls.forEach((overrideUrl) => {
          it(`${overrideUrl.name} has unreleased HMDA Panel banner and dataset warning`, () => {
            const yearOfDatasetToBeTested = year - overrideUrl.yearOffset
            cy.visit(`${HOST}${overrideUrl.url}${yearOfDatasetToBeTested}`)

            // ensure warning banner appears
            cy.get('.alert-heading').contains(
              `The HMDA Reporter Panel is Unavailable for the ${yearOfDatasetToBeTested} ${overrideUrl.name}`,
            )

            // ensure warning in the dataset list appears
            cy.get('.dataset-items').contains(
              'Reporter Panel is not available for this dataset. For institution information refer to the Transmittal Sheet.',
            )
            cy.wait(TEST_DELAY)
          })
        })
      })
    })
  })
})

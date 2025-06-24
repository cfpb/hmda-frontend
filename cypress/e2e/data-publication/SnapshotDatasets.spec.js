import { isBeta } from '../../support/helpers'
import { onlyOn } from '@cypress/skip-test'

const { HOST, ACTION_DELAY, TEST_DELAY } = Cypress.env()

const sectionMap = {
  'Loan/Application Records (LAR)': 1,
  'Transmittal Sheet Records (TS)': 2,
  'Report Panel': 3,
  'MSA/MD Description': 4,
}

onlyOn(isBeta(HOST), () => {
  describe('Snapshot National Loan-Level Dataset', function () {
    it('Does not run in Beta environments', () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('Snapshot National Loan-Level Dataset', () => {
    const years = ['2023', '2022', '2021', '2020', '2019', '2018', '2017']
    const datasetUrl = '/data-publication/snapshot-national-loan-level-dataset/'
    const basePath = '.grid > :nth-child(1) > :nth-child(2)'

    years.forEach((year) => {
      describe(year + ' Datasets', () => {
        it('has valid Dataset links', () => {
          cy.get({ HOST, ACTION_DELAY, TEST_DELAY }).logEnv()
          cy.viewport(1440, 798)
          cy.visit(`${HOST}${datasetUrl}${year}`)

          // Test validity of each link in the Datasets list
          Object.keys(sectionMap).forEach((key) => {
            cy.get(`${basePath} > :nth-child(${sectionMap[key]}) a`).each(
              (link) => {
                cy.get(link)
                  .hasValidHref()
                  .then(({ status }) => {
                    assert.isTrue(
                      status,
                      `${key} - ${link.text()} is a valid link`,
                    )
                  })
                cy.wait(ACTION_DELAY)
              },
            )
          })

          cy.wait(TEST_DELAY)
        })
      })
    })
  })
})

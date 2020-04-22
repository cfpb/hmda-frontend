const { HOST, ACTION_DELAY, TEST_DELAY } = Cypress.env()

const sectionMap = {
  "Loan/Application Records (LAR)": 1,
  "Transmittal Sheet Records (TS)": 2,
  "Report Panel": 3,
  "MSA/MD Description": 4,
}

describe('Snapshot National Loan-Level Dataset', function () {
  const years = ['2017', '2018']
  const datasetUrl = '/data-publication/snapshot-national-loan-level-dataset/'
  const basePath = '.grid > :nth-child(1) > :nth-child(2)'
  
  years.forEach((year) => {
    describe(year + ' Datasets', function () {
      it('has valid Dataset links', function () {
        cy.viewport(1440, 798)
        cy.visit(`${HOST}${datasetUrl}${year}`)

        // Test validity of each link in the Datasets list
        Object.keys(sectionMap).forEach(key => {
          cy.get(`${basePath} > :nth-child(${sectionMap[key]}) a`).each(link => {
            cy.get(link).hasValidHref().then(({ status }) => {
              assert.isTrue(status, `${key} - ${link.text()} is a valid link`)
            })
            cy.wait(ACTION_DELAY)
          })
        })        
        
        cy.wait(TEST_DELAY)
      })
    })
  })
})
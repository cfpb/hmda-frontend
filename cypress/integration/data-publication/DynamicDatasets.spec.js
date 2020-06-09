const { HOST, TEST_DELAY, ACTION_DELAY } = Cypress.env()

describe('Dynamic National Loan-Level Dataset', function () {
  const years = ['2019', '2018', '2017']
  const datasetUrl = '/data-publication/dynamic-national-loan-level-dataset/'
  const linksPath = '#main-content > .grid > :nth-child(1) > ul > li > a'

  years.forEach((year) => {
    describe(year + ' Dynamic Datasets', function () {
      it('has valid Dataset links', function () {
        cy.viewport(1440, 798)
        cy.visit(`${HOST}${datasetUrl}${year}`)
        
        // Test validity of each link in the Datasets list
        cy.get(linksPath).each(link => {
          cy.get(link).hasValidHref().then(({ status }) => {
            assert.isTrue(status, `${link.text()} is a valid link`)
          })
          cy.wait(ACTION_DELAY)
        })
        
        cy.wait(TEST_DELAY)
      })
    })
  })
})
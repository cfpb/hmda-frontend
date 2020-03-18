const { HOST, ACTION_DELAY, TEST_DELAY } = Cypress.env()

describe("Snapshot National Loan Level Dataset", function() {
  it.skip("(TODO) 2017 has live links", function() {
    cy.viewport(1680, 916)

    cy.visit(
      `${HOST}/data-publication/snapshot-national-loan-level-dataset`
    )

    cy.get(
      "#root > .App > #main-content > .YearSelector > a:nth-child(3)"
    ).click()

    cy.get("#main-content > .grid > .item:nth-child(1) > .heading > h4").click()

    cy.get("#main-content > .grid > .item:nth-child(2) > .heading > h4").click()

    cy.wait(TEST_DELAY)
  })

  it.skip("(TODO) 2018 has live links", function() {
    cy.viewport(1680, 916)

    cy.visit(
      `${HOST}/data-publication/snapshot-national-loan-level-dataset`
    )

    // Select 2018
    cy.get(
      "#root > .App > #main-content > .YearSelector > a:nth-child(2)"
    ).click()

    cy.wait(ACTION_DELAY)

    // Get Dataset Links
    // cy.get("#main-content > .grid > :nth-child(1) a").each(el => {
    //   cy.hasValidHref(el).then($result => {
    //     expect($result).to.equal("Valid")
    //   })
    //   cy.wait(ACTION_DELAY)
    // })

    cy.wait(TEST_DELAY)
  })
})

import { withFormData, isProd } from "../../support/helpers"

const { HOST, TEST_DELAY } = Cypress.env()

describe("Rate Spread Tool", function() {
  beforeEach(() => {
    cy.viewport(1680, 916)
    cy.visit(`${HOST}/tools/rate-spread`)
  })

  it("Generates Fixed Rate", function() {
    cy.get({ HOST, TEST_DELAY }).logEnv()
    cy.get(".item > div > .Form > div > #rateSetDate").click()
    cy.get(".item > div > .Form > div > #rateSetDate").type("12/16/2019")
    cy.get(".item > div > .Form > div > #APR").type("3.2")
    cy.get(".item > div > .Form > div > #loanTerm").click()
    cy.get(".item > div > .Form > div > #loanTerm").type("45")
    cy.get(".grid > .item > div > .Form > input").click()

    // Validate
    cy.get(":nth-child(2) > .alert").contains("-0.590")

    cy.wait(TEST_DELAY)
  })

  it("Generates Variable Rate", function() {
    cy.get({ HOST, TEST_DELAY }).logEnv()
    cy.get(".Form > fieldset > .unstyled-list > li > #actionTaken1").click()
    cy.get(
      ".Form > fieldset > .unstyled-list > li > #amortizationVariable"
    ).click()
    cy.get(
      ".Form > fieldset > .unstyled-list > li > #amortizationVariable"
    ).type("Variable")
    cy.get(".item > div > .Form > div > #rateSetDate").click()
    cy.get(".item > div > .Form > div > #rateSetDate").type("01/22/2018")
    cy.get(".item > div > .Form > div > #APR").type("2.5")
    cy.get(".item > div > .Form > div > #loanTerm").click()
    cy.get(".item > div > .Form > div > #loanTerm").type("30")
    cy.get(".grid > .item > div > .Form > input").click()

    // Validate
    cy.get(":nth-child(2) > .alert").contains("-1.500")

    cy.wait(TEST_DELAY)
  })
})

describe("Rate Spread API", () => {
  
  if(!isProd(HOST)) it("Only runs in Production", () => cy.get({ HOST, TEST_DELAY }).logEnv())
  else {
    it("Generates rates from file", () => {
      cy.get({ HOST, TEST_DELAY }).logEnv()
      let response
      const fileName = "RateSpread_Generate.csv"
      const method = "POST"
      const url = `${HOST}/public/rateSpread/csv`
      const fileType = "application/json"
      const expectedAnswer =
        "action_taken_type,loan_term,amortization_type,apr,lock_in_date,reverse_mortgage,rate_spread\n" +
        "1,30,FixedRate,6.0,2017-11-20,2,2.010\n" +
        "1,30,VariableRate,6.0,2017-11-20,2,2.150\n"

      // Get file from fixtures as binary
      cy.fixture(fileName, "binary").then(excelBin => {
        // File in binary format gets converted to blob so it can be sent as Form data
        const blob = Cypress.Blob.binaryStringToBlob(excelBin, fileType)

        // Build up the form
        const formData = new FormData()
        formData.set("file", blob, fileName) //adding a file to the form
        
        // Perform the request
        withFormData(method, url, formData, function(res) {
          response = res
        })

        cy.wrap(null).should(() => {
          expect(response.status).to.eq(200)
          expect(expectedAnswer).to.equal(response.response)
        })

        cy.wait(TEST_DELAY)
      })
    })
  }
})

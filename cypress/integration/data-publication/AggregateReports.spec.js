import { openSelector } from '../../support/helpers'
const { HOST } = Cypress.env()

// TODO: Test CSV Download
describe("Aggregate Reports", function() {
  it('2019', function() {
    cy.get({ HOST }).logEnv()
    // Report: Applications by Ethnicity and Sex
    cy.viewport(1680, 867)
    cy.visit(`${HOST}/data-publication/aggregate-reports`)
    cy.get('#root > .App > #main-content > .YearSelector > a')
      .contains('2019')
      .click()
    
    cy.findByText("Select a state...").type("Arizona{enter}")
    cy.findByText("Select MSA/MD...").type("Phoenix{enter}")
    cy.findByText("Select report...").type("Applications by Ethnicity and Sex{enter}")

    // Report Content
    cy.get("tbody > :nth-child(3) > :nth-child(2)").should("have.text", "13409")
    cy.get("tbody > :nth-child(3) > :nth-child(3)").should("have.text", "2710055000")
    cy.get("tbody > :nth-child(3) > :nth-child(4)").should("have.text", "608")
    cy.get("tbody > :nth-child(3) > :nth-child(5)").should("have.text", "108090000")
    cy.get("tbody > :nth-child(3) > :nth-child(6)").should("have.text", "4384")
    cy.get("tbody > :nth-child(3) > :nth-child(7)").should("have.text", "610090000")
    cy.get("tbody > :nth-child(3) > :nth-child(8)").should("have.text", "3634")
    cy.get("tbody > :nth-child(3) > :nth-child(9)").should("have.text", "734050000")
    cy.get("tbody > :nth-child(3) > :nth-child(10)").should("have.text", "1210")
    cy.get("tbody > :nth-child(3) > :nth-child(11)").should("have.text", "235550000")
    cy.get("tbody > :nth-child(3) > :nth-child(12)").should("have.text", "2089")
    cy.get("tbody > :nth-child(3) > :nth-child(13)").should("have.text", "462355000")
  })

  it("2018", function() {
    cy.get({ HOST }).logEnv()
    // Report: Applications by Income, Race, and Ethnicity

    cy.viewport(1680, 867)

    cy.visit(`${HOST}/data-publication/aggregate-reports`)

    cy.get('#root > .App > #main-content > .YearSelector > a')
      .contains('2018')
      .click()

    openSelector('#StateSelector')
    cy.get('#react-select-2-option-4').click()
    cy.get('#react-select-3-option-14').click()
    cy.get('#react-select-4-option-4').click()

    /* 
        Check Report Params 
    */

    // Year
    cy.get(".ProgressCards > :nth-child(1)").should('contain.text', '2018')
    
    // Institution
    cy.get(".ProgressCards > :nth-child(2)").should(
      "contain.text",
      "California - CA"
    )

    // MSA/MD
    cy.get(".ProgressCards > :nth-child(3)").should(
      "contain.text",
      "RIVERSIDE-SAN BERNARDINO-ONTARIO - 40140"
    )

    // Report Type
    cy.get(".ProgressCards > :nth-child(4)").should(
      "contain.text",
      "Applications by Income, Race, and Ethnicity"
    )

    /* 
        Check Report Content
    */
    
    // Verify a row of the report content
    // These values can probably still change, so need more resiliant test?
    cy.get("tbody > :nth-child(9) > :nth-child(2)").should("have.text", "171")
    cy.get("tbody > :nth-child(9) > :nth-child(3)").should("have.text", "47085000")
    cy.get("tbody > :nth-child(9) > :nth-child(4)").should("have.text", "79")
    cy.get("tbody > :nth-child(9) > :nth-child(5)").should("have.text", "23805000")
    cy.get("tbody > :nth-child(9) > :nth-child(6)").should("have.text", "5")
    cy.get("tbody > :nth-child(9) > :nth-child(7)").should("have.text", "1805000")
    cy.get("tbody > :nth-child(9) > :nth-child(8)").should("have.text", "51")
    cy.get("tbody > :nth-child(9) > :nth-child(9)").should("have.text", "11105000")
    cy.get("tbody > :nth-child(9) > :nth-child(10)").should("have.text", "20")
    cy.get("tbody > :nth-child(9) > :nth-child(11)").should("have.text", "5960000")
    cy.get("tbody > :nth-child(9) > :nth-child(12)").should("have.text", "16")
    cy.get("tbody > :nth-child(9) > :nth-child(13)").should("have.text", "4410000")
    cy.get("tbody > :nth-child(9) > :nth-child(14)").should("have.text", "2")
    cy.get("tbody > :nth-child(9) > :nth-child(15)").should("have.text", "310000")
  })
  

  it("2017", function() {
    cy.get({ HOST }).logEnv()
    // Report: Disposition of loan applications, by location of property and type of loan, 2017

    cy.viewport(1680, 867)

    cy.visit(`${HOST}/data-publication/aggregate-reports`)

    cy.get('#root > .App > #main-content > .YearSelector > a')
      .contains('2017')
      .click()

    openSelector('#StateSelector')
    cy.get('#react-select-2-option-5').click()
    cy.get('#react-select-3-option-0').click()
    cy.get('#react-select-4-option-1').click()

    /*
        Check Report Content
    */
    
    // Verify the 1st "Loans Originated" row of the report contains expected data
    cy.get("tbody > :nth-child(2) > :nth-child(2)").should("have.text", "1")
    cy.get("tbody > :nth-child(2) > :nth-child(3)").should("have.text", "701")
    cy.get("tbody > :nth-child(2) > :nth-child(4)").should("have.text", "65")
    cy.get("tbody > :nth-child(2) > :nth-child(5)").should("have.text", "64768")
    cy.get("tbody > :nth-child(2) > :nth-child(6)").should("have.text", "74")
    cy.get("tbody > :nth-child(2) > :nth-child(7)").should("have.text", "48941")
    cy.get("tbody > :nth-child(2) > :nth-child(8)").should("have.text", "13")
    cy.get("tbody > :nth-child(2) > :nth-child(9)").should("have.text", "9897")
    cy.get("tbody > :nth-child(2) > :nth-child(10)").should("have.text", "0")
    cy.get("tbody > :nth-child(2) > :nth-child(11)").should("have.text", "0")
    cy.get("tbody > :nth-child(2) > :nth-child(12)").should("have.text", "26")
    cy.get("tbody > :nth-child(2) > :nth-child(13)").should("have.text", "21442")
    cy.get("tbody > :nth-child(2) > :nth-child(14)").should("have.text", "0")
    cy.get("tbody > :nth-child(2) > :nth-child(15)").should("have.text", "0")
  })
})

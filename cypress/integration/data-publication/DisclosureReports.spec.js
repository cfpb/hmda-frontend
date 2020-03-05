const { HOST, ACTION_DELAY, TEST_DELAY } = Cypress.env()

describe("Disclosure Reports", function() {
  it("Fetches a 2018 Applications by Tract Report", function() {
    cy.viewport(1680, 867)

    cy.visit(`${HOST}/data-publication/disclosure-reports/`)

    cy.get(
      "#root > .App > #main-content > .YearSelector > a:nth-child(2)"
    ).click()
    cy.wait(ACTION_DELAY)

    cy.get(
      "#main-content > .SearchList > form > div > #institution-name"
    ).click()

    cy.get("#main-content > .SearchList > form > div > #institution-name").type(
      "cypress"
    )
    cy.wait(ACTION_DELAY)

    cy.get("#main-content > .SearchList > .Results > li > .button-link").click()
    cy.wait(ACTION_DELAY)

    cy.get(
      "#main-content > .css-2b097c-container > .css-26l3qy-menu > .css-11unzgr > #react-select-2-option-3"
    ).click()
    cy.wait(ACTION_DELAY)

    cy.get(
      "#main-content > .css-2b097c-container > .css-26l3qy-menu > .css-11unzgr > #react-select-3-option-0"
    ).click()
    cy.wait(ACTION_DELAY)

    /* 
      Check Report Params 
    */

    // Year
    cy.get(".ProgressCards > :nth-child(1)").should('contain.text', '2018')
    
    // Institution
    cy.get(".ProgressCards > :nth-child(2)").should(
      "contain.text",
      "CYPRESS BANK, STATE SAVINGS BANK - 549300I4IUWMEMGLST06"
    )

    // MSA/MD
    cy.get(".ProgressCards > :nth-child(3)").should(
      "contain.text",
      "TAMPA-ST. PETERSBURG-CLEARWATER,FL - 45300"
    )

    // Report Type
    cy.get(".ProgressCards > :nth-child(4)").should(
      "contain.text",
      "Applications by Tract"
    )

    /* 
      Check Report Content 
    */

    // County
    cy.get("tbody > :nth-child(1) > th").should(
      "have.text",
      "Pinellas County/Florida/027606"
      )
      
    // Verify the Applications Received row of the report content contains expected data
    cy.get("tbody > :nth-child(7) > :nth-child(2)").should('have.text', '0')
    cy.get("tbody > :nth-child(7) > :nth-child(3)").should('have.text', '0')
    cy.get("tbody > :nth-child(7) > :nth-child(4)").should('have.text', '1')
    cy.get("tbody > :nth-child(7) > :nth-child(5)").should('have.text', '455000')
    cy.get("tbody > :nth-child(7) > :nth-child(6)").should('have.text', '0')
    cy.get("tbody > :nth-child(7) > :nth-child(7)").should('have.text', '0')
    cy.get("tbody > :nth-child(7) > :nth-child(8)").should('have.text', '0')
    cy.get("tbody > :nth-child(7) > :nth-child(9)").should('have.text', '0')
    cy.get("tbody > :nth-child(7) > :nth-child(10)").should('have.text', '0')
    cy.get("tbody > :nth-child(7) > :nth-child(11)").should('have.text', '0')
    cy.get("tbody > :nth-child(7) > :nth-child(12)").should('have.text', '1')
    cy.get("tbody > :nth-child(7) > :nth-child(13)").should('have.text', '455000')
    cy.get("tbody > :nth-child(7) > :nth-child(14)").should('have.text', '0')
    cy.get("tbody > :nth-child(7) > :nth-child(15)").should('have.text', '0')

    cy.wait(TEST_DELAY)

    // TODO: Test 'Save as CSV' button
    /* Test CSV Download */
    // Possible method
    //  https://github.com/cypress-io/cypress/issues/949
    //  Just clicking the button brings up a 'save' dialogue, which is not helpful
    // cy.get(".heading > button").click()
  })

  it("Fetches a 2017 Conv Price Info Nationwide report", () => {
    cy.viewport(1680, 916)

    cy.visit(`${HOST}/data-publication/disclosure-reports`)

    cy.get(
      "#root > .App > #main-content > .YearSelector > a:nth-child(3)"
    ).click()
    cy.wait(ACTION_DELAY)

    cy.get(
      "#main-content > .SearchList > form > div > #institution-name"
    ).click()

    cy.get("#main-content > .SearchList > form > div > #institution-name").type(
      "cypress"
    )
    cy.wait(ACTION_DELAY)

    cy.get("#main-content > .SearchList > .Results > li > .button-link").click()
    
    cy.wait(ACTION_DELAY)

    cy.get(
      "#main-content > .css-2b097c-container > .css-26l3qy-menu > .css-11unzgr > #react-select-2-option-5"
    ).click()

    cy.wait(ACTION_DELAY)

    cy.get(
      "#main-content > .css-2b097c-container > .css-26l3qy-menu > .css-11unzgr > #react-select-3-option-1"
    ).click()

    /* 
      Check Report Params 
    */

    // Year
    cy.get(".ProgressCards > :nth-child(1)").should("contain.text", "2017")

    // Institution
    cy.get(".ProgressCards > :nth-child(2)").should(
      "contain.text",
      "CYPRESS BANK, SSB - 31905"
    )

    // MSA/MD
    cy.get(".ProgressCards > :nth-child(3)").should(
      "contain.text",
      "nationwide"
    )

    // Report Type
    cy.get(".ProgressCards > :nth-child(4)").should(
      "contain.text",
      "Conv Price Info by Incidence and Level - Nationwide - BW"
    )

    /* 
      Check Report Content 
    */

    // County
    cy.get("tbody > :nth-child(1) > th").should(
      "have.text",
      "1- TO 4-FAMILY OWNER OCCUPIED DWELLINGS (EXCLUDES MANUFACTURED HOMES)"
    )

    // Verify the Applications Received row of the report contains expected data
    cy.get("tbody > :nth-child(6) > :nth-child(2)").should("have.text", "1.77")
    cy.get("tbody > :nth-child(6) > :nth-child(3)").should("have.text", "0")
    cy.get("tbody > :nth-child(6) > :nth-child(4)").should("have.text", "0")
    cy.get("tbody > :nth-child(6) > :nth-child(5)").should("have.text", "1.95")
    cy.get("tbody > :nth-child(6) > :nth-child(6)").should("have.text", "0")
    cy.get("tbody > :nth-child(6) > :nth-child(7)").should("have.text", "0")
    cy.get("tbody > :nth-child(6) > :nth-child(8)").should("have.text", "1.98")
    cy.get("tbody > :nth-child(6) > :nth-child(9)").should("have.text", "6.85")
    cy.get("tbody > :nth-child(6) > :nth-child(10)").should("have.text", "0")

    // TODO: Test 'Save as CSV' button
    cy.wait(TEST_DELAY)
  })
})

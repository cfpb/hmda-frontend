import { WARN_LOST_UNSAVED } from '../../../src/tools/larft/config/messages'
import { isCI, isBeta } from '../../support/helpers'
import { onlyOn } from '@cypress/skip-test'

const { HOST, ENVIRONMENT } = Cypress.env()

let baseURLToVisit = isCI(ENVIRONMENT) ? 'http://localhost:3000' : HOST

let urlForTesting = baseURLToVisit + '/tools/online-lar-formatting'

// Command used to grab ID from input fields and drop-down menus.
// Workaround as the IDs have a space in them i.e -> Calendar Year
Cypress.Commands.add('getID', (value) => cy.get(`[id="${value}"]`))

onlyOn(isBeta(HOST), () => {
  describe('Online LAR Formatting Tool', function () {
    it('Does not run in Beta environments', () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('General OLART Tests', () => {
    it("Tests 'Filter by label' functionality", () => {
      cy.visit(urlForTesting)
      cy.get('#filter').click().type('Federal Agency')
      cy.get('#accordion-button-11').should('have.text', 'Federal Agency')
      cy.get('.search-box > .clear').click()
      cy.get('#accordion-button-0').should('have.text', 'Record Identifier')
    })

    it("Test TS 'Filter columns' and 'Search TS' functionality", () => {
      cy.visit(urlForTesting)
      // Generate TS
      cy.getID('Calendar Year').select('2019')
      cy.getID('Calendar Quarter').select('1 - Q1')
      cy.getID('Legal Entity Identifier (LEI)').type('1071FAKELEI')
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()
      // "Filter columns" functionality
      cy.get('.filters > :nth-child(2) > input').click().type('calendar')
      cy.get('#header-calendar-year > .custom-cell-content').should(
        'have.text',
        'Calendar Year',
      )
      // Clear "Filer columns" via "Clear Filter" button
      cy.get('.filters > :nth-child(2) > .clear').click()
      // Now testing "Search TS" functionality
      cy.get('.filters > :nth-child(1) > input').click().type('2019')
      cy.get('.row-container > :nth-child(2) > .custom-cell-content').should(
        'have.text',
        '2019',
      )
    })

    it("Tests LAR 'Search LAR' and 'Filter columns' functionality", () => {
      cy.visit(urlForTesting)
      // Need to generate TS first before a LAR record can be created
      cy.getID('Calendar Year').select('2019')
      cy.getID('Calendar Quarter').select('1 - Q1')
      cy.getID('Legal Entity Identifier (LEI)').type('1071FAKELEI')
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()
      // Generate LAR
      cy.getID('Loan Type').select(
        '1 - Conventional (not insured or guaranteed by FHA, VA, RHS, or FSA)',
      )
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()
      // "Search LAR" functionality
      cy.get('#saved-lars > h3.clickable > .filters > :nth-child(1) > input')
        .click()
        .type('1')
      cy.get('#saved-lars .row-container #row-1').should('have.text', '1')
      // Clear "Search LAR" input
      cy.get(':nth-child(1) > .clear').click()
      // "Filter columns" functionality
      cy.get('#saved-lars > h3.clickable > .filters > :nth-child(2) > input')
        .click()
        .type('Loan Type')
      cy.get('#header-loan-type > .custom-cell-content').should(
        'have.text',
        'Loan Type',
      )
    })

    it("Generate TS and LAR records then clear the records by clicking 'Clear Saved' button", () => {
      cy.visit(urlForTesting).contains('(LAR) Formatting Tool')
      // Generate TS Record with calendar year, quarter and LEI
      cy.getID('Calendar Year').select('2019')
      cy.getID('Calendar Quarter').select('1 - Q1')
      cy.getID('Legal Entity Identifier (LEI)').type('1071FAKELEI')
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()
      // Generate LAR Record
      cy.getID('Loan Type').select(
        '1 - Conventional (not insured or guaranteed by FHA, VA, RHS, or FSA)',
      )
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()
      // Clear Records
      cy.get('.reset').click()
      // Ensuring TS and LAR records have no saved records
      cy.get('#saved-ts > .no-records').should('have.text', 'No Records Saved')
      cy.get('#saved-lars > .no-records').should(
        'have.text',
        'No Records Saved',
      )
    })

    it('Prompts user that data will be lost when navigating away from page', () => {
      cy.visit(urlForTesting)
      // Generates TS Record
      cy.getID('Calendar Year').select('2019')
      cy.getID('Calendar Quarter').select('1 - Q1')
      cy.getID('Legal Entity Identifier (LEI)').type('1071FAKELEI')
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()
      cy.get('.nav-link').first().click()
      // Checks Cypress confirm message
      cy.on('window:confirm', (text) => {
        expect(text).to.contains(WARN_LOST_UNSAVED)
      })
    })

    it('Verifies downloaded filename includes Calendar Year, quarter and user inputted LEI otherwise filename defaults to LarFile', () => {
      cy.visit(urlForTesting)
      // Generates TS Record
      cy.getID('Calendar Year').select('2019')
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()
      // Filename attribute check - defaults to "LarFile" if calendar year, quarter and LEI isn't in the TS record
      cy.get('.export').invoke('attr', 'data-filename').should('eq', 'LarFile')

      cy.get('.reset').click()

      cy.getID('Calendar Year').select('2019')
      cy.getID('Calendar Quarter').select('1 - Q1')
      cy.getID('Legal Entity Identifier (LEI)').type('1071FAKELEI')
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()
      // Checks Download Button filename attribute
      cy.get('.export')
        .invoke('attr', 'data-filename')
        .should('eq', '2019-1-1071FAKELEI')
    })

    it('File upload feature', () => {
      cy.visit(urlForTesting)
      // File contains TS and one LAR record
      const FILENAME = '2022-FRONTENDTESTBANK9999.txt'

      cy.fixture(FILENAME).then((fileContent) => {
        cy.get('#file-upload').click({ force: true }).attachFile({
          fileContent,
          fileName: FILENAME,
          mimeType: 'text/plain',
        })
      })

      // Checks that TS and LAR record are visible in the UI
      cy.get('#saved-ts > h3.clickable > .count').should(
        'have.text',
        'Transmittal Sheet (1)',
      )

      cy.get('#saved-lars > h3.clickable > .count').should(
        'have.text',
        'Loan Application Register (10)',
      )
    })
  })

  describe('Record specific tests', () => {
    it("TS Record is generated. Check that 'Column 1' disabled drop-down changes to LAR", () => {
      cy.visit(urlForTesting)
      // Generates TS Record
      cy.getID('Calendar Year').select('2019')
      cy.getID('Calendar Quarter').select('1 - Q1')
      cy.getID('Legal Entity Identifier (LEI)').type('1071FAKELEI')
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()
      cy.getID('Record Identifier').contains('2 - LAR')
    })

    it("TS Record generated and LAR record generated. Ensure 'Column 1' still says '2 - LAR' in the disabled drop-down", () => {
      cy.visit(urlForTesting)
      // Generate TS - TS is required to be able to generate LAR records
      cy.getID('Calendar Year').select('2019')
      cy.getID('Legal Entity Identifier (LEI)').type('1071FAKELEI')
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()

      // Generate LAR record - with drop-down, input field and button entries
      // Input field
      cy.getID('Loan Amount').type('110500')
      // Drop-down
      cy.getID('State').select('WA - Washington')
      // Zip Code enums -> click "NA" button option
      cy.get(
        ':nth-child(16) > .fieldValue > .enum-entry > .enums > :nth-child(1)',
      ).click()
      // Save LAR Record
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()
      cy.getID('Record Identifier').contains('2 - LAR')
    })

    it('TS Record tests: functionality with drop-downs, input fields, update record and delete record', () => {
      cy.visit(urlForTesting)
      // Generate TS
      cy.getID('Calendar Year').select('2019')
      cy.getID('Legal Entity Identifier (LEI)').type('1071FAKELEI')
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()
      // Drop-down check
      cy.get('.filters > :nth-child(1) > input').click().type('2019')
      cy.get('#saved-ts #row-1').should('have.text', '2019')
      // Clear "Search TS" filter
      cy.get(':nth-child(1) > .clear').click()
      // Input field check
      cy.get('.filters > :nth-child(1) > input').click().type('fake')
      cy.get('#saved-ts #row-1').should('have.text', '1071FAKELEI')
      // Clear "Search TS" filter
      cy.get(':nth-child(1) > .clear').click()
      // Update "Calendar Year" drop-down and "LEI" input field and check they were updated
      cy.get('.filters > :nth-child(2) > input').click().type('Calendar Year')
      cy.get('#saved-ts #row-1').click()
      // Clear "Search column" filter
      cy.get('.filters > :nth-child(2) > .clear').click()
      // Update "Calendar Year drop-down menu and "LEI" input field
      cy.getID('Calendar Year').select('2020')
      cy.getID('Legal Entity Identifier (LEI)')
        .clear()
        .type('1071FAKELEIUPDATED')
      // Click "Update Row" button
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()
      // Check "Calendar Year" drop-down was updated
      cy.get('.filters > :nth-child(1) > input').click().type('2020')
      cy.get('#saved-ts #row-1').should('have.text', '2020')
      // Clear "Search TS" filter
      cy.get(':nth-child(1) > .clear').click()
      // Check "LEI" input field was updated
      cy.get('.filters > :nth-child(1) > input')
        .click()
        .type('1071FAKELEIUPDATED')
      cy.get('#saved-ts #row-1').should('have.text', '1071FAKELEIUPDATED')
      // Click a row to have "Delete Row" button appear
      cy.get('#saved-ts #row-1').click()
      // Delete TS Record
      cy.get(
        '#parsed-row > .action-wrapper > .row-actions > .delete-row',
      ).click()
      // Checks Cypress confirm message on "Delete Row" button
      cy.on('window:confirm', (text) => {
        expect(text).to.contains('Are you sure you want to delete this row?')
      })
      // Checks that TS doesn't have any records
      cy.get('#saved-ts > .no-records').should('have.text', 'No Records Saved')
    })

    it('LAR Record tests: functionality with drop-downs, input fields, buttons, update LAR record and delete LAR record', () => {
      cy.visit(urlForTesting)
      // Generate TS - TS is required to be able to generate LAR records
      cy.getID('Calendar Year').select('2019')
      cy.getID('Legal Entity Identifier (LEI)').type('1071FAKELEI')
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()
      // Generate LAR record - with drop-down, input field and button entries
      // Input field
      cy.getID('Loan Amount').type('110500')
      // Drop-down
      cy.getID('State').select('WA - Washington')
      // Zip Code enums -> click "NA" button option
      cy.get(
        ':nth-child(16) > .fieldValue > .enum-entry > .enums > :nth-child(1)',
      ).click()
      // Save LAR Record
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()
      // Look up and check that "Loan Amount", "State" and "Zip Code" entries were saved in LAR record
      cy.get('#saved-lars > h3.clickable > .filters > :nth-child(2) > input')
        .click()
        .type('Loan Amount')
      cy.get('#saved-lars #row-1').should('have.text', '110500')
      // Clear "Filter column" functionality
      cy.get('.filters > :nth-child(2) > .clear').click()
      // Search for "State" column
      cy.get('#saved-lars > h3.clickable > .filters > :nth-child(2) > input')
        .click()
        .type('State')
      // Check "State" column contains "WA"
      cy.get('#saved-lars #row-1').should('have.text', 'WA')
      // Clear "Filter column" functionality
      cy.get('.filters > :nth-child(2) > .clear').click()
      // Search for "Zip Code" column
      cy.get('#saved-lars > h3.clickable > .filters > :nth-child(2) > input')
        .click()
        .type('Zip Code')
      // Check "Zip Code" column contains "NA"
      cy.get('#saved-lars #row-1').should('have.text', 'NA')
      // click LAR record - allow cypress to work on updating record
      cy.get('#saved-lars #row-1').click()
      // Update "Zip Code" to "Exempt" by clicking second button
      cy.get(
        'tr.highlight > .fieldValue > .enum-entry > .enums > :nth-child(2)',
      ).click()
      // Update "State" to "NY"
      cy.getID('State').select('NY - New York')
      // Update "Loan Amount" to "110501"
      cy.getID('Loan Amount').clear().type('110501')
      // Update LAR Record
      cy.get('#parsed-row > .action-wrapper > .row-actions > .save-row').click()
      // Clear "Filter column" functionality
      cy.get('.filters > :nth-child(2) > .clear').click()
      // Look up and check that "Loan Amount", "State" and "Zip Code" entries were saved in LAR record
      cy.get('#saved-lars > h3.clickable > .filters > :nth-child(2) > input')
        .click()
        .type('Loan Amount')
      cy.get('#saved-lars #row-1').should('have.text', '110501')
      // Clear "Filter column" functionality
      cy.get('.filters > :nth-child(2) > .clear').click()
      // Search for "State" column
      cy.get('#saved-lars > h3.clickable > .filters > :nth-child(2) > input')
        .click()
        .type('State')
      // Check "State" column contains "NY"
      cy.get('#saved-lars #row-1').should('have.text', 'NY')
      // Clear "Filter column" functionality
      cy.get('.filters > :nth-child(2) > .clear').click()
      // Search for "Zip Code" column
      cy.get('#saved-lars > h3.clickable > .filters > :nth-child(2) > input')
        .click()
        .type('Zip Code')
      // Check "Zip Code" column contains "Exempt"
      cy.get('#saved-lars #row-1').should('have.text', 'Exempt')
      // Click on LAR Record to have "Delete Row" button appear
      cy.get('#saved-lars #row-1').click()
      // Delete LAR Record
      cy.get(
        '#parsed-row > .action-wrapper > .row-actions > .delete-row',
      ).click()
      // LAR should have no records
      cy.get('.no-records').should('have.text', 'No Records Saved')
    })
  })
})

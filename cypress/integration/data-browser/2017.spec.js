import { openSelector, MAX_WAIT_SUMMARY, dbURL } from '../../support/helpers'

const { HOST } = Cypress.env()
const dbUrl = dbURL.bind(null, HOST)

describe('Data Browser 2017', function () {
  it('State/Institution/PropertyType', function () {
    cy.viewport(1000, 940)
    cy.visit(dbUrl('2017?category=states'))

    // Select Geography
    openSelector('#ItemSelector')
    cy.get('#react-select-3-option-0').click()
    openSelector('#ItemSelector')
    cy.get('#react-select-3-option-0').click()
    cy.url().should('include', '?category=states&items=01,02')

    // Select Institutions
    openSelector('#lei-item-select')
    cy.get('#react-select-4-option-1').click()
    openSelector('#lei-item-select')
    cy.get('#react-select-4-option-2').click()
    cy.url().should('include', 'arids=7383365241,7202053401')

    // Variables
    openSelector('#VariableSelector')
    cy.get('.SelectWrapper #react-select-5-option-1').click()
    cy.get('.QuerySummary > .CheckboxContainer > .border > .CheckboxWrapper > #property_types3').check('on')
    cy.url().should('include', '&property_types=3')

    // View Summary Table
    cy.get('body > #root > .DataBrowser > .Geography > .secondary').click()
    cy.get('.Aggregations', { timeout: MAX_WAIT_SUMMARY }).should('exist')
    cy.get('.Aggregations :nth-child(1) > .sublist > li').should('have.text', 'ALABAMA, ALASKA')
    cy.get('.Aggregations :nth-child(2) > .sublist > li').should('have.text', '.Huron Valley Financial, Inc., 1ST ALLIANCE LENDING, LLC')
    cy.get('.Aggregations :nth-child(3) > .sublist > li').should('have.text', '3 - Multifamily')
    cy.get('.Error').should('not.exist')

    // TODO: Test if "Download Dataset" points to a valid file
    //  Possible to test without triggering download dialogue? 
    //  Download link gets dynamically added and immediately deleted.
    // cy.get('.QueryButton').click()
  })

  it('Nationwide/Institution/LienStatus', function () {
    cy.viewport(1000, 940)
    cy.visit(dbUrl('2017?category=nationwide'))

    // Select Institutions
    openSelector('#lei-item-select')
    cy.get('#react-select-4-option-1').click()
    openSelector('#lei-item-select')
    cy.get('#react-select-4-option-2').click()
    cy.url().should('include', 'arids=7383365241,561605')

    // Variables
    openSelector('#VariableSelector')
    cy.get('.SelectWrapper #react-select-5-option-0').click()
    cy.get('.QuerySummary > .CheckboxContainer > .border > .CheckboxWrapper > #lien_statuses3').check('on')
    cy.url().should('include', '&lien_statuses=3')

    // View Summary Table
    cy.get('body > #root > .DataBrowser > .Geography > .secondary').click()
    cy.get('.Aggregations', { timeout: MAX_WAIT_SUMMARY }).should('exist')
    cy.get('.Aggregations :nth-child(1) > .sublist > li').should('have.text', '.Huron Valley Financial, Inc., 121 FINANCIAL CREDIT UNION')
    cy.get('.Aggregations :nth-child(2) > .sublist > li').should('have.text', '3 - Not secured by a lien')
    cy.get('.Error').should('not.exist')

    // TODO: Test if "Download Dataset" points to a valid file
  })

  it('County/Institution/Action&Purpose', function () {
    cy.viewport(1000, 940)
    cy.visit(dbUrl('2017?category=counties'))

    // Select Geography
    openSelector('#ItemSelector')
    cy.get('#react-select-3-option-0').click()
    openSelector('#ItemSelector')
    cy.get('#react-select-3-option-0').click()
    cy.url().should('include', '?category=counties&items=01001,01003')

    // Select Institutions
    openSelector('#lei-item-select')
    cy.get('#react-select-4-option-1').click()
    openSelector('#lei-item-select')
    cy.get('#react-select-4-option-2').click()
    cy.url().should('include', 'arids=7383365241,7202053401')

    // Variables
    openSelector('#VariableSelector')
    cy.get('.SelectWrapper #react-select-5-option-0').click()
    cy.get('.QuerySummary > .CheckboxContainer > .border > .CheckboxWrapper > #lien_statuses3').check('on')
    cy.url().should('include', '&lien_statuses=3')

    // View Summary Table
    cy.get('body > #root > .DataBrowser > .Geography > .secondary').click()
    cy.get('.Aggregations', { timeout: MAX_WAIT_SUMMARY }).should('exist')
    cy.get('.Aggregations :nth-child(1) > .sublist > li').should('have.text', '.Huron Valley Financial, Inc., 1ST ALLIANCE LENDING, LLC')
    cy.get('.Aggregations :nth-child(2) > .sublist > li').should('have.text', '3 - Not secured by a lien')
    cy.get('.Error').should('not.exist')

    // TODO: Test if "Download Dataset" points to a valid file
  })

  it('MSA/Institution/PropertyType', function () {
    cy.viewport(1000, 940)
    cy.visit(dbUrl('2017?category=msamds'))

    // Select Geography
    openSelector('#ItemSelector')
    cy.get('#react-select-3-option-0').click()
    openSelector('#ItemSelector')
    cy.get('#react-select-3-option-0').click()
    cy.url().should('include', '?category=msamds&items=11500,12220')

    // Select Institutions
    openSelector('#lei-item-select')
    cy.get('#react-select-4-option-1').click()
    openSelector('#lei-item-select')
    cy.get('#react-select-4-option-2').click()
    cy.url().should('include', 'arids=7202053401,7580521233')

    // Variables
    openSelector('#VariableSelector')
    cy.get('.SelectWrapper #react-select-5-option-3').click()
    cy.get('.QuerySummary > .CheckboxContainer > .border > .CheckboxWrapper > #loan_types3').check('on')
    cy.url().should('include', '&loan_types=3')

    // View Summary Table
    cy.get('body > #root > .DataBrowser > .Geography > .secondary').click()
    cy.get('.Aggregations', { timeout: MAX_WAIT_SUMMARY }).should('exist')
    cy.get('.Aggregations :nth-child(1) > .sublist > li').should('have.text',"11500\u00A0-\u00A0ANNISTON-OXFORD-JACKSONVILLE, 12220\u00A0-\u00A0AUBURN-OPELIKA")
    cy.get('.Aggregations :nth-child(3) > .sublist > li').should('have.text', '3 - VA')
    cy.get('.Error').should('not.exist')

    // TODO: Test if "Download Dataset" points to a valid file
  })
})
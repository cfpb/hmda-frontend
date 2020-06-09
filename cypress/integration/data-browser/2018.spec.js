import { openSelector, dbURL, isBeta, isProd } from '../../support/helpers'

const { HOST } = Cypress.env()
const dbUrl = dbURL.bind(null, HOST)

describe('Data Browser 2018', function () {
  it('State/Institution/PropertyType', function () {
    cy.viewport(1000, 940)
    cy.visit(dbUrl('2018?category=states'))

    // Select Geography
    openSelector('#ItemSelector')
    cy.get('#react-select-3-option-0').click()
    openSelector('#ItemSelector')
    cy.get('#react-select-3-option-0').click()
    cy.url().should('include', '?category=states&items=AL,AK')

    // Select Institutions
    openSelector('#lei-item-select')
    cy.contains('1ST ALLIANCE LENDING, LLC' ).click()
    openSelector('#lei-item-select')
    cy.contains('21ST MORTGAGE CORPORATION' ).click()
    cy.url().should('include', 'leis=549300X973YPKT8V0H73,549300XQVJ1XBNFA5536')

    // Variables
    openSelector('#VariableSelector')
    cy.get('.SelectWrapper #react-select-5-option-10').click()
    cy.get('.border > :nth-child(2) :checkbox').check('on')
    cy.url().should('include', '&dwelling_categories=Single%20Family%20(1-4%20Units)%3ASite-Built')

    // View Summary Table
    cy.get('body > #root > .DataBrowser > .Geography > .secondary').click()
    cy.get('.Aggregations').should('exist')
    cy.get('.Aggregations :nth-child(1) > .sublist > li').should('have.text', 'ALABAMA, ALASKA')
    cy.get('.Aggregations :nth-child(2) > .sublist > li').should('have.text', '1ST ALLIANCE LENDING, LLC, 21st Mortgage Corporation')
    cy.get('.Aggregations :nth-child(3) > .sublist > li').should('have.text', 'Single Family (1-4 Units):Site-Built')
    cy.get('.Error').should('not.exist')

    // Test validity of download link
    if(isProd(HOST) || isBeta(HOST)){
      cy.get('.QueryButton:first').dataUrl().then(({ status }) => {
        assert.isTrue(status, 'Has valid download link.')
      })
    }
  })

  it('Nationwide/Institution/LienStatus', function () {
    cy.viewport(1000, 940)
    cy.visit(dbUrl('2018?category=nationwide'))

    // Select Institutions
    openSelector('#lei-item-select')
    cy.contains('1ST ALLIANCE LENDING, LLC' ).click()
    openSelector('#lei-item-select')
    cy.contains('121 FINANCIAL' ).click()
    cy.url().should('include', 'leis=549300X973YPKT8V0H73,549300XCP8KCUTKGF379')

    // Variables
    openSelector('#VariableSelector')
    cy.get('.SelectWrapper #react-select-5-option-6').click()
    cy.get('#lien_statuses1').check('on')
    cy.url().should('include', '&lien_statuses=1')

    // View Summary Table
    cy.get('body > #root > .DataBrowser > .Geography > .secondary').click()
    cy.get('.Aggregations').should('exist')
    cy.get('.Aggregations :nth-child(1) > .sublist > li').should('have.text', '1ST ALLIANCE LENDING, LLC, 121 FINANCIAL')
    cy.get('.Aggregations :nth-child(2) > .sublist > li').should('have.text', '1 - Secured By First Lien')
    cy.get('.Error').should('not.exist')

    // Test validity of download link
    if(isProd(HOST) || isBeta(HOST)){
      cy.get('.QueryButton:first').dataUrl().then(({ status }) => {
        assert.isTrue(status, 'Has valid download link.')
      })
    }
  })

  it('County/Institution/Action&Purpose', function () {
    cy.viewport(1000, 940)
    cy.visit(dbUrl('2018?category=counties'))

    // Select Geography
    openSelector('#ItemSelector')
    cy.get('#react-select-3-option-0').click()
    openSelector('#ItemSelector')
    cy.get('#react-select-3-option-0').click()
    cy.url().should('include', '?category=counties&items=01001,01003')

    // Select Institutions
    openSelector('#lei-item-select')
    cy.contains('1ST ALLIANCE LENDING, LLC' ).click()
    openSelector('#lei-item-select')
    cy.contains('1ST FRANKLIN FINANCIAL CORPORATION' ).click()
    cy.url().should('include', 'leis=549300X973YPKT8V0H73,25490092DWDTDJ002J62')

    // Variables
    openSelector('#VariableSelector')
    cy.get('.SelectWrapper #react-select-5-option-8').click()
    cy.get('#total_units25-49').check('on')
    cy.url().should('include', '&total_units=25-49')

    // View Summary Table
    cy.get('body > #root > .DataBrowser > .Geography > .secondary').click()
    cy.get('.Aggregations').should('exist')
    cy.get('.Aggregations :nth-child(1) > .sublist > li').should('have.text', 'AUTAUGA COUNTY, BALDWIN COUNTY')
    cy.get('.Aggregations :nth-child(2) > .sublist > li').should('have.text', '1ST ALLIANCE LENDING, LLC, 1st Franklin Financial Corporation')
    cy.get('.Aggregations :nth-child(3) > .sublist > li').should('have.text', '25-49')
    cy.get('.Error').should('not.exist')

    // Test validity of download link
    if(isProd(HOST) || isBeta(HOST)){
      cy.get('.QueryButton:first').dataUrl().then(({ status }) => {
        assert.isTrue(status, 'Has valid download link.')
      })
    }
  })

  it('MSA/Institution/PropertyType', function () {
    cy.viewport(1000, 940)
    cy.visit(dbUrl('2018?category=msamds'))

    // Select Geography
    openSelector('#ItemSelector')
    cy.get('#react-select-3-option-0').click()
    openSelector('#ItemSelector')
    cy.get('#react-select-3-option-0').click()
    cy.url().should('include', '?category=msamds&items=11500,12220')

    // Select Institutions
    openSelector('#lei-item-select')
    cy.contains('1ST ALLIANCE LENDING, LLC' ).click()
    openSelector('#lei-item-select')
    cy.contains('21ST MORTGAGE CORPORATION' ).click()
    cy.url().should('include', 'leis=549300X973YPKT8V0H73,549300XQVJ1XBNFA5536')

    // Variables
    openSelector('#VariableSelector')
    cy.get('.SelectWrapper #react-select-5-option-1').click()
    cy.get('#loan_types1').check('on')
    cy.url().should('include', '&loan_types=1')

    // View Summary Table
    cy.get('body > #root > .DataBrowser > .Geography > .secondary').click()
    cy.get('.Aggregations').should('exist')
    cy.get('.Aggregations :nth-child(1) > .sublist > li').should('have.text',"11500\u00A0-\u00A0ANNISTON-OXFORD-JACKSONVILLE, 12220\u00A0-\u00A0AUBURN-OPELIKA")
    cy.get('.Aggregations :nth-child(3) > .sublist > li').should('have.text', '1 - Conventional')
    cy.get('.Error').should('not.exist')

    // Test validity of download link
    if(isProd(HOST) || isBeta(HOST)){
      cy.get('.QueryButton:first').dataUrl().then(({ status }) => {
        assert.isTrue(status, 'Has valid download link.')
      })
    }
  })
})
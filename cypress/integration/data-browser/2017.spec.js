import { openSelector, MAX_WAIT_SUMMARY, dbURL, isBeta, isProd } from '../../support/helpers'

const { HOST } = Cypress.env()
const dbUrl = dbURL.bind(null, HOST)

describe('Data Browser 2017', function () {
  if(!isProd(HOST) && isBeta(HOST)){
    it('State/Institution/PropertyType', function () {
      cy.viewport(1000, 940)
      cy.visit(dbUrl('2017?category=states'))

      // Select Geography
      cy.get('#ItemSelector').type('alabama{enter}')
      cy.get('#ItemSelector').type('alaska{enter}')
      cy.url().should('include', '?category=states&items=01,02')

      // Select Institutions
      openSelector('#lei-item-select')
      cy.get('#lei-item-select').type('bank of america{enter}')
      cy.get('#lei-item-select').type('chase bank{enter}')
      cy.url().should('include', 'arids=9480228,9852218')

      // Variables
      openSelector('#VariableSelector')
      cy.get('.SelectWrapper #react-select-5-option-1').click()
      cy.get('.QuerySummary > .CheckboxContainer > .border > .CheckboxWrapper > #property_types3').check('on')
      cy.url().should('include', '&property_types=3')

      // View Summary Table
      cy.get('body > #root > .DataBrowser > .Geography > .secondary').click()
      cy.get('.Aggregations', { timeout: MAX_WAIT_SUMMARY }).should('exist')
      cy.get('.Aggregations :nth-child(1) > .sublist > li').should('have.text', 'ALABAMA, ALASKA')
      cy.get('.Aggregations :nth-child(2) > .sublist > li').then($li => {
        let text = $li.text().toLowerCase()
        cy.wrap(text).should('contain', 'bank of america')
        cy.wrap(text).should('contain', 'chase bank')
      })
      cy.get('.Aggregations :nth-child(3) > .sublist > li').should('have.text', '3 - Multifamily')
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
      cy.visit(dbUrl('2017?category=nationwide'))

      // Select Institutions
      openSelector('#lei-item-select')
      cy.get('#lei-item-select').type('bank of america{enter}')
      cy.get('#lei-item-select').type('chase bank{enter}')
      cy.url().should('include', 'arids=9480228,9852218')

      // Variables
      openSelector('#VariableSelector')
      cy.get('.SelectWrapper #react-select-5-option-0').click()
      cy.get('.QuerySummary > .CheckboxContainer > .border > .CheckboxWrapper > #lien_statuses3').check('on')
      cy.url().should('include', '&lien_statuses=3')

      // View Summary Table
      cy.get('body > #root > .DataBrowser > .Geography > .secondary').click()
      cy.get('.Aggregations', { timeout: MAX_WAIT_SUMMARY }).should('exist')
      cy.get('.Aggregations :nth-child(1) > .sublist > li').then($li => {
        let text = $li.text().toLowerCase()
        cy.wrap(text).should('contain', 'bank of america')
        cy.wrap(text).should('contain', 'chase bank')
      })
      cy.get('.Aggregations :nth-child(2) > .sublist > li').should('have.text', '3 - Not secured by a lien')
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
      cy.visit(dbUrl('2017?category=counties'))

      // Select Geography
      openSelector('#ItemSelector')
      cy.get('#react-select-3-option-0').click()
      openSelector('#ItemSelector')
      cy.get('#react-select-3-option-0').click()
      cy.url().should('include', '?category=counties&items=01001,01003')

      // Select Institutions
      cy.get('#lei-item-select').type('bank of america{enter}')
      cy.get('#lei-item-select').type('chase bank{enter}')
      cy.url().should('include', 'arids=9480228,9852218')

      // Variables
      openSelector('#VariableSelector')
      cy.get('.SelectWrapper #react-select-5-option-0').click()
      cy.get('.QuerySummary > .CheckboxContainer > .border > .CheckboxWrapper > #lien_statuses3').check('on')
      cy.url().should('include', '&lien_statuses=3')

      // View Summary Table
      cy.get('body > #root > .DataBrowser > .Geography > .secondary').click()
      cy.get('.Aggregations', { timeout: MAX_WAIT_SUMMARY }).should('exist')
      cy.get('.Aggregations :nth-child(1) > .sublist > li').then($li => {
        let text = $li.text().toLowerCase()
        cy.wrap(text).should('contain', 'bank of america')
        cy.wrap(text).should('contain', 'chase bank')
      })
      cy.get('.Aggregations :nth-child(2) > .sublist > li').should('have.text', '3 - Not secured by a lien')
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
      cy.visit(dbUrl('2017?category=msamds'))

      // Select Geography
      openSelector('#ItemSelector')
      cy.get('#react-select-3-option-0').click()
      openSelector('#ItemSelector')
      cy.get('#react-select-3-option-0').click()
      cy.url().should('include', '?category=msamds&items=11500,12220')

      // Select Institutions
      cy.get('#lei-item-select').type('bank of america{enter}')
      cy.get('#lei-item-select').type('chase bank{enter}')
      cy.url().should('include', 'arids=9480228,9852218')

      // Variables
      openSelector('#VariableSelector')
      cy.get('.SelectWrapper #react-select-5-option-3').click()
      cy.get('.QuerySummary > .CheckboxContainer > .border > .CheckboxWrapper > #loan_types3').check('on')
      cy.url().should('include', '&loan_types=3')

      // View Summary Table
      cy.get('body > #root > .DataBrowser > .Geography > .secondary').click()
      cy.get('.Aggregations', { timeout: MAX_WAIT_SUMMARY }).should('exist')
      cy.get('.Aggregations :nth-child(1) > .sublist > li').should('have.text',"11500\u00A0-\u00A0ANNISTON-OXFORD-JACKSONVILLE, 12220\u00A0-\u00A0AUBURN-OPELIKA")
      cy.get('.Aggregations :nth-child(2) > .sublist > li').then($li => {
        let text = $li.text().toLowerCase()
        cy.wrap(text).should('contain', 'bank of america')
        cy.wrap(text).should('contain', 'chase bank')
      })    
      cy.get('.Aggregations :nth-child(3) > .sublist > li').should('have.text', '3 - VA')
      cy.get('.Error').should('not.exist')

      // Test validity of download link
      if(isProd(HOST) || isBeta(HOST)){
        cy.get('.QueryButton:first').dataUrl().then(({ status }) => {
          assert.isTrue(status, 'Has valid download link.')
        })
      }
    })
  } else {
    it(`does not run on host: ${HOST}`)
  }
})
import { openSelector, dbURL, isBeta, isProd, isCI } from '../../support/helpers'

const { HOST, ENVIRONMENT } = Cypress.env()
const dbUrl = dbURL.bind(null, HOST)

describe('Data Browser 2018', function () {
  if(isCI(ENVIRONMENT)) it("Does not run on CI")
  else if((!isBeta(HOST) || (isBeta(HOST) && !isProd(HOST)))){
    it('State/Institution/PropertyType', function () {
      cy.viewport(1000, 940)
      cy.visit(dbUrl('2018?category=states'))

      // Wait for the Institutions selector to load because it can steal focus when trying to enter data in another input field.
      openSelector('#lei-item-select')

      // Select Geography
      cy.get('#ItemSelector').type('alabama{enter}')
      cy.get('#ItemSelector').type('alaska{enter}')
      cy.url().should('include', '?category=states&items=AL,AK')

      // Select Institutions
      openSelector('#lei-item-select')
      cy.get('#lei-item-select').type('bank of america{enter}')
      cy.get('#lei-item-select').type('chase bank{enter}')
      cy.url().should('include', 'leis=B4TYDEB6GKMZO031MB27,7H6GLXDRUGQFU57RNE97')

      // Variables
      cy.get('#VariableSelector').type("dwelling{enter}")
      cy.findByText('Single Family (1-4 Units):Site-Built').click()
      cy.url().should('include', '&dwelling_categories=Single%20Family%20(1-4%20Units)%3ASite-Built')

      // View Summary Table
      cy.findByText('View Summary Table').click()
      cy.get('.Aggregations').should('exist')
      cy.get('.Aggregations :nth-child(1) > .sublist > li').should('have.text', 'ALABAMA, ALASKA')
      cy.get('.Aggregations :nth-child(2) > .sublist > li').then($li => {
        let text = $li.text().toLowerCase()
        cy.wrap(text).should('contain', 'bank of america')
        cy.wrap(text).should('contain', 'chase bank')
      })
      cy.get('.Aggregations :nth-child(3) > .sublist > li').should('have.text', 'Single Family (1-4 Units):Site-Built')
      cy.get('.Error').should('not.exist')

      // Test validity of download link
      if(isProd(HOST) || isBeta(HOST)){
        cy.get('.QueryButton:first').dataUrl().then(({ status, statusCode, url }) => {
          assert.isTrue(status, `\nURL: ${url}\nStatus Code: ${statusCode}\nHas valid download link`)
        })
      }
    })

    it('Nationwide/Institution/LienStatus', function () {
      cy.viewport(1000, 940)
      cy.visit(dbUrl('2018?category=nationwide'))

      // Select Institutions
      openSelector('#lei-item-select')
      cy.get('#lei-item-select').type('bank of america{enter}')
      cy.get('#lei-item-select').type('chase bank{enter}')
      cy.url().should('include', 'leis=B4TYDEB6GKMZO031MB27,7H6GLXDRUGQFU57RNE97')

      // Variables
      cy.get('#VariableSelector').type('lien{enter}')
      cy.findByText('1 - Secured By First Lien').click()
      cy.url().should('include', '&lien_statuses=1')

      // View Summary Table
      cy.findByText('View Summary Table').click()
      cy.get('.Aggregations').should('exist')
      cy.get('.Aggregations :nth-child(1) > .sublist > li').then($li => {
        let text = $li.text().toLowerCase()
        cy.wrap(text).should('contain', 'bank of america')
        cy.wrap(text).should('contain', 'chase bank')
      })
      cy.get('.Aggregations :nth-child(2) > .sublist > li').should('have.text', '1 - Secured By First Lien')
      cy.get('.Error').should('not.exist')

      // Test validity of download link
      if(isProd(HOST) || isBeta(HOST)){
        cy.get('.QueryButton:first').dataUrl().then(({ status, statusCode, url }) => {
          assert.isTrue(status, `\nURL: ${url}\nStatus Code: ${statusCode}\nHas valid download link`)
        })
      }
    })

    it('County/Institution/Action&Purpose', function () {
      cy.viewport(1000, 940)
      cy.visit(dbUrl('2018?category=counties'))

      // Wait for the Institutions selector to load because it can steal focus when trying to enter data in another input field.
      openSelector('#lei-item-select')          

      // Select Geography
      cy.get('#ItemSelector').type("01001{enter}")
      cy.get('#ItemSelector').type("01003{enter}")
      cy.url().should('include', '?category=counties&items=01001,01003')

      // Select Institutions
      openSelector('#lei-item-select')
      cy.get('#lei-item-select').type('bank of america{enter}')
      cy.get('#lei-item-select').type('chase bank{enter}')
      cy.url().should('include', 'leis=B4TYDEB6GKMZO031MB27,7H6GLXDRUGQFU57RNE97')

      // Variables
      openSelector('#VariableSelector')
      cy.get('#VariableSelector').type('total units{enter}')
      cy.get('#total_units25-49').check('on')
      cy.url().should('include', '&total_units=25-49')

      // View Summary Table
      cy.findByText('View Summary Table').click()
      cy.get('.Aggregations').should('exist')
      cy.get('.Aggregations :nth-child(1) > .sublist > li').should('have.text', 'AUTAUGA COUNTY, BALDWIN COUNTY')
      cy.get('.Aggregations :nth-child(2) > .sublist > li').then($li => {
        let text = $li.text().toLowerCase()
        cy.wrap(text).should('contain', 'bank of america')
        cy.wrap(text).should('contain', 'chase bank')
      })
      cy.get('.Aggregations :nth-child(3) > .sublist > li').should('have.text', '25-49')
      cy.get('.Error').should('not.exist')

      // Test validity of download link
      if(isProd(HOST) || isBeta(HOST)){
        cy.get('.QueryButton:first').dataUrl().then(({ status, statusCode, url }) => {
          assert.isTrue(status, `\nURL: ${url}\nStatus Code: ${statusCode}\nHas valid download link`)
        })
      }
    })

    it('MSA/Institution/PropertyType', function () {
      cy.viewport(1000, 940)
      cy.visit(dbUrl('2018?category=msamds'))

      // Wait for the Institutions selector to load because it can steal focus when trying to enter data in another input field.
      openSelector('#lei-item-select')         

      // Select Geography
      cy.get('#ItemSelector').type("11500{enter}")
      cy.get('#ItemSelector').type("12220{enter}")
      cy.url().should('include', '?category=msamds&items=11500,12220')

      // Select Institutions
      openSelector('#lei-item-select')
      cy.get('#lei-item-select').type('bank of america{enter}')
      cy.get('#lei-item-select').type('chase bank{enter}')
      cy.url().should('include', 'leis=B4TYDEB6GKMZO031MB27,7H6GLXDRUGQFU57RNE97')

      // Variables
      openSelector('#VariableSelector')
      cy.get('.SelectWrapper #react-select-5-option-1').click()
      cy.get('#loan_types1').check('on')
      cy.url().should('include', '&loan_types=1')

      // View Summary Table
      cy.findByText('View Summary Table').click()
      cy.get('.Aggregations').should('exist')
      cy.get('.Aggregations :nth-child(1) > .sublist > li').should('have.text',"11500\u00A0-\u00A0ANNISTON-OXFORD-JACKSONVILLE, 12220\u00A0-\u00A0AUBURN-OPELIKA")
      cy.get('.Aggregations :nth-child(2) > .sublist > li').then($li => {
        let text = $li.text().toLowerCase()
        cy.wrap(text).should('contain', 'bank of america')
        cy.wrap(text).should('contain', 'chase bank')
      })    
      cy.get('.Aggregations :nth-child(3) > .sublist > li').should('have.text', '1 - Conventional')
      cy.get('.Error').should('not.exist')

      // Test validity of download link
      if(isProd(HOST) || isBeta(HOST)){
        cy.get('.QueryButton:first').dataUrl().then(({ status, statusCode, url }) => {
          assert.isTrue(status, `\nURL: ${url}\nStatus Code: ${statusCode}\nHas valid download link`)
        })
      }
    })
  } else {
    it(`does not run on host: ${HOST}`)
  }
})
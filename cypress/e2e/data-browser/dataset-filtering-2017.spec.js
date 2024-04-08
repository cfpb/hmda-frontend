import {
  openSelector,
  MAX_WAIT_SUMMARY,
  dbURL,
  isBeta,
  isProd,
  isCI,
  isProdBeta,
  logEnv,
} from '../../support/helpers'

const { HOST, ENVIRONMENT } = Cypress.env()
const dbUrl = dbURL.bind(null, HOST)

describe('Data Browser 2017', () => {
  if (isCI(ENVIRONMENT)) it('Does not run on CI')
  else if (isProdBeta(HOST)) it('Does not run on Prod Beta')
  else if (!isProd(HOST) && isBeta(HOST)) {
    it('State/Institution/PropertyType', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.viewport(1000, 940)
      cy.visit(dbUrl('2017?category=states'))

      // Wait for the Institutions selector to load because it can steal focus when trying to enter data in another input field.
      openSelector('#lei-item-select')

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
      cy.get('#VariableSelector').type('property type{enter}')
      cy.findByText('Multifamily').click()
      cy.url().should('include', '&property_types=3')

      // View Summary Table
      cy.findByText('View Summary Table').click()
      cy.get('.Aggregations', { timeout: MAX_WAIT_SUMMARY }).should('exist')
      cy.get('.Aggregations :nth-child(1) > .sublist > li').should(
        'have.text',
        'ALABAMA, ALASKA',
      )
      cy.get('.Aggregations :nth-child(2) > .sublist > li').then(($li) => {
        let text = $li.text().toLowerCase()
        cy.wrap(text).should('contain', 'bank of america')
        cy.wrap(text).should('contain', 'chase bank')
      })
      cy.get('.Aggregations :nth-child(3) > .sublist > li').should(
        'have.text',
        '3 - Multifamily',
      )
      cy.get('.Error').should('not.exist')

      // Test validity of download link
      // if(isProd(HOST) || isBeta(HOST)){
      //   cy.get('.QueryButton:first').dataUrl().then(({ status, statusCode, url }) => {
      //     assert.isTrue(status, `\nURL: ${url}\nStatus Code: ${statusCode}\nHas valid download link`)
      //   })
      // }
    })

    it('Nationwide/Institution/LienStatus', () => {
      cy.viewport(1000, 940)
      cy.visit(dbUrl('2017?category=nationwide'))

      // Select Institutions
      openSelector('#lei-item-select')
      cy.get('#lei-item-select').type('bank of america{enter}')
      cy.get('#lei-item-select').type('chase bank{enter}')
      cy.url().should('include', 'arids=9480228,9852218')

      // Variables
      cy.get('#VariableSelector').type('lien status{enter}')
      cy.findByText('3 - Not secured by a lien').click()
      cy.url().should('include', '&lien_statuses=3')

      // View Summary Table
      cy.findByText('View Summary Table').click()
      cy.get('.Aggregations', { timeout: MAX_WAIT_SUMMARY }).should('exist')
      cy.get('.Aggregations :nth-child(1) > .sublist > li').then(($li) => {
        let text = $li.text().toLowerCase()
        cy.wrap(text).should('contain', 'bank of america')
        cy.wrap(text).should('contain', 'chase bank')
      })
      cy.get('.Aggregations :nth-child(2) > .sublist > li').should(
        'have.text',
        '3 - Not secured by a lien',
      )
      cy.get('.Error').should('not.exist')

      // Test validity of download link
      // if(isProd(HOST) || isBeta(HOST)){
      //   cy.get('.QueryButton:first').dataUrl().then(({ status, statusCode, url }) => {
      //     assert.isTrue(status, `\nURL: ${url}\nStatus Code: ${statusCode}\nHas valid download link`)
      //   })
      // }
    })

    it('County/Institution/Action&Purpose', () => {
      cy.viewport(1000, 940)
      cy.visit(dbUrl('2017?category=counties'))

      // Wait for the Institutions selector to load because it can steal focus when trying to enter data in another input field.
      openSelector('#lei-item-select')

      // Select Geography
      cy.findByText('#ItemSelector').type('01001{enter}')
      cy.findByText('#ItemSelector').type('01003{enter}')
      cy.url().should('include', '?category=counties&items=01001,01003')

      // Select Institutions
      cy.get('#lei-item-select').type('bank of america{enter}')
      cy.get('#lei-item-select').type('chase bank{enter}')
      cy.url().should('include', 'arids=9480228,9852218')

      // Variables
      cy.get('#VariableSelector').type('lien status{enter}')
      cy.findByText('3 - Not secured by a lien').click()
      cy.url().should('include', '&lien_statuses=3')

      // View Summary Table
      cy.findByText('View Summary Table').click()
      cy.get('.Aggregations', { timeout: MAX_WAIT_SUMMARY }).should('exist')
      cy.get('.Aggregations :nth-child(1) > .sublist > li').then(($li) => {
        let text = $li.text().toLowerCase()
        cy.wrap(text).should('contain', 'bank of america')
        cy.wrap(text).should('contain', 'chase bank')
      })
      cy.get('.Aggregations :nth-child(2) > .sublist > li').should(
        'have.text',
        '3 - Not secured by a lien',
      )
      cy.get('.Error').should('not.exist')

      // Test validity of download link
      // if(isProd(HOST) || isBeta(HOST)){
      //   cy.get('.QueryButton:first').dataUrl().then(({ status, statusCode, url }) => {
      //     assert.isTrue(status, `\nURL: ${url}\nStatus Code: ${statusCode}\nHas valid download link`)
      //   })
      // }
    })

    it('MSA/Institution/PropertyType', () => {
      cy.viewport(1000, 940)
      cy.visit(dbUrl('2017?category=msamds'))

      // Wait for the Institutions selector to load because it can steal focus when trying to enter data in another input field.
      openSelector('#lei-item-select')

      // Select Geography
      cy.get('#ItemSelector').type('11500{enter}')
      cy.get('#ItemSelector').type('12220{enter}')
      cy.url().should('include', '?category=msamds&items=11500,12220')

      // Select Institutions
      cy.get('#lei-item-select').type('bank of america{enter}')
      cy.get('#lei-item-select').type('chase bank{enter}')
      cy.url().should('include', 'arids=9480228,9852218')

      // Variables
      cy.get('#VariableSelector').type('lien status{enter}')
      cy.findByText('3 - Not secured by a lien').click()
      cy.url().should('include', '&lien_statuses=3')

      // View Summary Table
      cy.findByText('View Summary Table').click()
      cy.get('.Aggregations', { timeout: MAX_WAIT_SUMMARY }).should('exist')
      cy.get('.Aggregations :nth-child(1) > .sublist > li').should(
        'have.text',
        '11500\u00A0-\u00A0ANNISTON-OXFORD-JACKSONVILLE, 12220\u00A0-\u00A0AUBURN-OPELIKA',
      )
      cy.get('.Aggregations :nth-child(2) > .sublist > li').then(($li) => {
        let text = $li.text().toLowerCase()
        cy.wrap(text).should('contain', 'bank of america')
        cy.wrap(text).should('contain', 'chase bank')
      })
      cy.get('.Aggregations :nth-child(3) > .sublist > li').should(
        'have.text',
        '3 - VA',
      )
      cy.get('.Error').should('not.exist')

      // Test validity of download link
      // if(isProd(HOST) || isBeta(HOST)){
      //   cy.get('.QueryButton:first').dataUrl().then(({ status, statusCode, url }) => {
      //     assert.isTrue(status, `\nURL: ${url}\nStatus Code: ${statusCode}\nHas valid download link`)
      //   })
      // }
    })
  } else {
    it(`does not run on host: ${HOST}`)
  }
})

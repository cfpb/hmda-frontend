import {
  openSelector,
  dbURL,
  isBeta,
  isProd,
  waitUpto2Mins,
} from '../../support/helpers'

const YEARS = [2023, 2022, 2021, 2020, 2019, 2018]
const { HOST, ENVIRONMENT } = Cypress.env()
const dbUrl = dbURL.bind(null, HOST)

describe(`Data Browser - Dataset Filtering`, () => {
  if (!isProd(HOST) || isBeta(HOST)) it('Only runs in Production')
  else {
    YEARS.forEach((year) => {
      describe(`${year} Dataset Filtering`, () => {
        it('State/Institution/PropertyType', () => {
          cy.get({ HOST, ENVIRONMENT }).logEnv()
          cy.viewport(1000, 1400)
          cy.visit(dbUrl(`${year}?category=states`))

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
          cy.url().should(
            'include',
            'leis=B4TYDEB6GKMZO031MB27,7H6GLXDRUGQFU57RNE97',
          )

          // Variables
          cy.get('#VariableSelector').type('dwelling{enter}')
          cy.findByText('Single Family (1-4 Units):Site-Built').click()
          cy.url().should(
            'include',
            '&dwelling_categories=Single%20Family%20(1-4%20Units)%3ASite-Built',
          )

          // View Summary Table
          cy.findByText('View Summary Table').click()
          cy.get('.Aggregations', waitUpto2Mins).should('exist')
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
            'Single Family (1-4 Units):Site-Built',
          )
          cy.get('.Error').should('not.exist')
        })

        it('Nationwide/Institution/LienStatus', () => {
          cy.get({ HOST, ENVIRONMENT }).logEnv()
          cy.viewport(1000, 1400)
          cy.visit(dbUrl(`${year}?category=nationwide`))

          // Select Institutions
          openSelector('#lei-item-select')
          cy.get('#lei-item-select').type('bank of america{enter}')
          cy.get('#lei-item-select').type('chase bank{enter}')
          cy.url().should(
            'include',
            'leis=B4TYDEB6GKMZO031MB27,7H6GLXDRUGQFU57RNE97',
          )

          // Variables
          cy.get('#VariableSelector').type('lien status{enter}')
          cy.findByText('Secured By First Lien').click()
          cy.url().should('include', '&lien_statuses=1')

          // View Summary Table
          cy.findByText('View Summary Table').click({ force: true })
          cy.get('.Aggregations', waitUpto2Mins).should('exist')
          cy.get('.Aggregations :nth-child(1) > .sublist > li').then(($li) => {
            let text = $li.text().toLowerCase()
            cy.wrap(text).should('contain', 'bank of america')
            cy.wrap(text).should('contain', 'chase bank')
          })
          cy.get('.Aggregations :nth-child(2) > .sublist > li').should(
            'have.text',
            'Secured By First Lien',
          )
          cy.get('.Error').should('not.exist')
        })

        it('County/Institution/Action&Purpose', () => {
          cy.get({ HOST, ENVIRONMENT }).logEnv()
          cy.viewport(1000, 1400)
          cy.visit(dbUrl(`${year}?category=counties`))

          // Wait for the Institutions selector to load because it can steal focus when trying to enter data in another input field.
          openSelector('#lei-item-select')

          // Select Geography
          cy.get('#ItemSelector').type('autauga county{enter}')
          cy.get('#ItemSelector').type('baldwin county{enter}')
          cy.url().should('include', '?category=counties&items=01001,01003')

          // Select Institutions
          openSelector('#lei-item-select')
          cy.get('#lei-item-select').type('bank of america{enter}')
          cy.get('#lei-item-select').type('chase bank{enter}')
          cy.url().should(
            'include',
            'leis=B4TYDEB6GKMZO031MB27,7H6GLXDRUGQFU57RNE97',
          )

          // Variables
          cy.get('#VariableSelector').type('total units{enter}')
          cy.findByText('25-49').click()
          cy.url().should('include', '&total_units=25-49')

          // View Summary Table
          cy.findByText('View Summary Table').click()
          cy.get('.Aggregations', waitUpto2Mins).should('exist')
          cy.get('.Aggregations :nth-child(1) > .sublist > li').should(
            'have.text',
            'AUTAUGA COUNTY, BALDWIN COUNTY',
          )
          cy.get('.Aggregations :nth-child(2) > .sublist > li').then(($li) => {
            let text = $li.text().toLowerCase()
            cy.wrap(text).should('contain', 'bank of america')
            cy.wrap(text).should('contain', 'chase bank')
          })
          cy.get('.Aggregations :nth-child(3) > .sublist > li').should(
            'have.text',
            '25-49',
          )
          cy.get('.Error').should('not.exist')
        })

        it('MSA/Institution/PropertyType', () => {
          cy.get({ HOST, ENVIRONMENT }).logEnv()
          cy.viewport(1000, 1400)
          cy.visit(dbUrl(`${year}?category=msamds`))

          // Wait for the Institutions selector to load because it can steal focus when trying to enter data in another input field.
          openSelector('#lei-item-select')

          // Select Geography
          cy.get('#ItemSelector').type('11500{enter}')
          cy.get('#ItemSelector').type('12220{enter}')
          cy.url().should('include', '?category=msamds&items=11500,12220')

          // Select Institutions
          openSelector('#lei-item-select')
          cy.get('#lei-item-select').type('bank of america{enter}')
          cy.get('#lei-item-select').type('chase bank{enter}')
          cy.url().should(
            'include',
            'leis=B4TYDEB6GKMZO031MB27,7H6GLXDRUGQFU57RNE97',
          )

          // Variables
          cy.get('#VariableSelector').type('loan type{enter}')
          cy.findByText('Conventional').click({ force: true })
          cy.url().should('include', '&loan_types=1')

          // View Summary Table
          cy.findByText('View Summary Table').click({ force: true })
          cy.get('.Aggregations', waitUpto2Mins).should('exist')

          const msa_text =
            year === 2018
              ? '11500\u00A0-\u00A0ANNISTON-OXFORD-JACKSONVILLE, 12220\u00A0-\u00A0AUBURN-OPELIKA'
              : '11500\u00A0-\u00A0ANNISTON-OXFORD, 12220\u00A0-\u00A0AUBURN-OPELIKA'

          cy.get('.Aggregations :nth-child(1) > .sublist > li').should(
            'have.text',
            msa_text,
          )
          cy.get('.Aggregations :nth-child(2) > .sublist > li').then(($li) => {
            let text = $li.text().toLowerCase()
            cy.wrap(text).should('contain', 'bank of america')
            cy.wrap(text).should('contain', 'chase bank')
          })
          cy.get('.Aggregations :nth-child(3) > .sublist > li').should(
            'have.text',
            'Conventional',
          )
          cy.get('.Error').should('not.exist')
        })
      })
    })
  }
})

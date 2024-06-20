const { HOST } = Cypress.env()
import { isBeta } from '../../support/helpers'
import { onlyOn } from '@cypress/skip-test'

onlyOn(isBeta(HOST), () => {
  describe('Disclosure Reports', function () {
    it('Does not run in Beta environments', () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('Disclosure Reports', () => {
    it('Fetches a 2023 Applications by Tract Report', () => {
      cy.get({ HOST }).logEnv()
      cy.viewport(1680, 916)
      cy.visit(`${HOST}/data-publication/disclosure-reports/2023`)

      cy.get('#institution-name').click({ force: true })
      cy.get('#institution-name').type('cypress bank, ssb')
      cy.findByText('View MSA/MDs').click({ force: true })
      cy.findByText('Select MSA/MD...').type('Dallas{enter}')
      cy.findByText('Select report...').type('Applications by Tract{enter}')

      /* Check Report Params */

      // Year
      cy.get('.ProgressCards > :nth-child(1)').should('contain.text', '2023')

      // Institution
      cy.get('.ProgressCards > :nth-child(2) .heading > p').should(
        'contain.text',
        'CYPRESS BANK, SSB - 549300I4IUWMEMGLST06',
      )

      // MSA/MD
      cy.get('.ProgressCards > :nth-child(3) .heading > p').should(
        'contain.text',
        'Dallas-Plano-Irving, TX - 19124',
      )

      // Report Type
      cy.get('.ProgressCards > :nth-child(4) .heading > p').should(
        'contain.text',
        'Applications by Tract',
      )

      // Validate a row - Third row called "Applications Denied by Financial Institution"
      cy.get('tbody > :nth-child(4) > :nth-child(2)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(3)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(4)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(5)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(6)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(7)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(8)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(9)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(10)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(11)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(12)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(13)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(14)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(15)').should('have.text', '0')
    })

    it('Fetches a 2022 Applications by Tract Report', () => {
      cy.get({ HOST }).logEnv()
      cy.viewport(1680, 916)
      cy.visit(`${HOST}/data-publication/disclosure-reports/2022`)

      cy.get('#institution-name').click({ force: true })
      cy.get('#institution-name').type('cypress bank, ssb')
      cy.findByText('View MSA/MDs').click({ force: true })
      cy.findByText('Select MSA/MD...').type('Dallas{enter}')
      cy.findByText('Select report...').type('Applications by Tract{enter}')

      /* Check Report Params */

      // Year
      cy.get('.ProgressCards > :nth-child(1)').should('contain.text', '2022')

      // Institution
      cy.get('.ProgressCards > :nth-child(2) .heading > p').should(
        'contain.text',
        'CYPRESS BANK, SSB - 549300I4IUWMEMGLST06',
      )

      // MSA/MD
      cy.get('.ProgressCards > :nth-child(3) .heading > p').should(
        'contain.text',
        'Dallas-Plano-Irving, TX - 19124',
      )

      // Report Type
      cy.get('.ProgressCards > :nth-child(4) .heading > p').should(
        'contain.text',
        'Applications by Tract',
      )

      // Validate a row - Third row called "Applications Denied by Financial Institution"
      cy.get('tbody > :nth-child(4) > :nth-child(2)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(3)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(4)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(5)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(6)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(7)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(8)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(9)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(10)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(11)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(12)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(13)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(14)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(15)').should('have.text', '0')
    })

    it('Fetches a 2021 Applications by Tract Report', () => {
      cy.get({ HOST }).logEnv()
      cy.viewport(1680, 916)
      cy.visit(`${HOST}/data-publication/disclosure-reports/2021`)

      cy.get('#institution-name').click({ force: true })
      cy.get('#institution-name').type('cypress bank, ssb')
      cy.findByText('View MSA/MDs').click({ force: true })
      cy.findByText('Select MSA/MD...').type('Dallas{enter}')
      cy.findByText('Select report...').type('Applications by Tract{enter}')

      /* Check Report Params */

      // Year
      cy.get('.ProgressCards > :nth-child(1)').should('contain.text', '2021')

      // Institution
      cy.get('.ProgressCards > :nth-child(2) .heading > p').should(
        'contain.text',
        'CYPRESS BANK, SSB - 549300I4IUWMEMGLST06',
      )

      // MSA/MD
      cy.get('.ProgressCards > :nth-child(3) .heading > p').should(
        'contain.text',
        'Dallas-Plano-Irving, TX - 19124',
      )

      // Report Type
      cy.get('.ProgressCards > :nth-child(4) .heading > p').should(
        'contain.text',
        'Applications by Tract',
      )

      // Validate a row - Third row called "Applications Denied by Financial Institution"
      cy.get('tbody > :nth-child(4) > :nth-child(2)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(3)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(4)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(5)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(6)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(7)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(8)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(9)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(10)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(11)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(12)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(13)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(14)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(15)').should('have.text', '0')
    })

    it('Fetches a 2020 Applications by Tract Report', () => {
      cy.get({ HOST }).logEnv()
      cy.viewport(1680, 916)
      cy.visit(`${HOST}/data-publication/disclosure-reports/2020`)

      cy.get('#institution-name').click({ force: true })
      cy.get('#institution-name').type('cypress bank, ssb')
      cy.findByText('View MSA/MDs').click({ force: true })
      cy.findByText('Select MSA/MD...').type('Dallas{enter}')
      cy.findByText('Select report...').type('Applications by Tract{enter}')

      /* Check Report Params */

      // Year
      cy.get('.ProgressCards > :nth-child(1)').should('contain.text', '2020')

      // Institution
      cy.get('.ProgressCards > :nth-child(2) .heading > p').should(
        'contain.text',
        'CYPRESS BANK, SSB - 549300I4IUWMEMGLST06',
      )

      // MSA/MD
      cy.get('.ProgressCards > :nth-child(3) .heading > p').should(
        'contain.text',
        'Dallas-Fort Worth, TX-OK - 19124',
      )

      // Report Type
      cy.get('.ProgressCards > :nth-child(4) .heading > p').should(
        'contain.text',
        'Applications by Tract',
      )

      // Validate a row - Third row called "Applications Denied by Financial Institution"
      cy.get('tbody > :nth-child(4) > :nth-child(2)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(3)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(4)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(5)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(6)').should('have.text', '1')
      cy.get('tbody > :nth-child(4) > :nth-child(7)').should(
        'have.text',
        '55000',
      )
      cy.get('tbody > :nth-child(4) > :nth-child(8)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(9)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(10)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(11)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(12)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(13)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(14)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(15)').should('have.text', '0')
    })

    it('Fetches a 2019 Applications by Tract Report', () => {
      cy.get({ HOST }).logEnv()
      cy.viewport(1680, 916)
      cy.visit(`${HOST}/data-publication/disclosure-reports/2019`)

      cy.get('#institution-name').click({ force: true })
      cy.get('#institution-name').type('cypress bank, ssb')
      cy.findByText('View MSA/MDs').click({ force: true })
      cy.findByText('Select MSA/MD...').type('Dallas{enter}')
      cy.findByText('Select report...').type('Applications by Tract{enter}')

      /* Check Report Params */

      // Year
      cy.get('.ProgressCards > :nth-child(1)').should('contain.text', '2019')

      // Institution
      cy.get('.ProgressCards > :nth-child(2) .heading > p').should(
        'contain.text',
        'CYPRESS BANK, SSB - 549300I4IUWMEMGLST06',
      )

      // MSA/MD
      cy.get('.ProgressCards > :nth-child(3) .heading > p').should(
        'contain.text',
        'Dallas-Fort Worth, TX-OK - 19124',
      )

      // Report Type
      cy.get('.ProgressCards > :nth-child(4) .heading > p').should(
        'contain.text',
        'Applications by Tract',
      )

      // Validate a row - Third row called "Applications Denied by Financial Institution"
      cy.get('tbody > :nth-child(4) > :nth-child(2)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(3)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(4)').should('have.text', '3')
      cy.get('tbody > :nth-child(4) > :nth-child(5)').should(
        'have.text',
        '1845000',
      )
      cy.get('tbody > :nth-child(4) > :nth-child(6)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(7)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(8)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(9)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(10)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(11)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(12)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(13)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(14)').should('have.text', '0')
      cy.get('tbody > :nth-child(4) > :nth-child(15)').should('have.text', '0')
    })

    it('Fetches a 2018 Applications by Tract Report', () => {
      cy.get({ HOST }).logEnv()
      cy.viewport(1680, 867)
      cy.visit(`${HOST}/data-publication/disclosure-reports/2018`)

      cy.get('#institution-name').click({ force: true })
      cy.get('#institution-name').type('cypress bank, state savings bank')

      cy.get(
        '#main-content > .SearchList > .Results > li > .button-link',
      ).click()

      cy.get('#react-select-2-option-2').click({ force: true })
      cy.get('#react-select-3-option-0').click({ force: true })

      /* 
        Check Report Params 
      */

      // Year
      cy.get('.ProgressCards > :nth-child(1)').should('contain.text', '2018')

      // Institution
      cy.get('.ProgressCards > :nth-child(2)').should(
        'contain.text',
        'CYPRESS BANK, STATE SAVINGS BANK - 549300I4IUWMEMGLST06',
      )

      // MSA/MD
      cy.get('.ProgressCards > :nth-child(3)').should(
        'contain.text',
        'TAMPA-ST. PETERSBURG-CLEARWATER,FL - 45300',
      )

      // Report Type
      cy.get('.ProgressCards > :nth-child(4)').should(
        'contain.text',
        'Applications by Tract',
      )

      /* 
        Check Report Content 
      */

      // County
      cy.get('tbody > :nth-child(1) > th').should(
        'have.text',
        'Pinellas County/Florida/027606',
      )

      // Verify the Applications Received row of the report content contains expected data
      cy.get('tbody > :nth-child(7) > :nth-child(2)').should('have.text', '0')
      cy.get('tbody > :nth-child(7) > :nth-child(3)').should('have.text', '0')
      cy.get('tbody > :nth-child(7) > :nth-child(4)').should('have.text', '1')
      cy.get('tbody > :nth-child(7) > :nth-child(5)').should(
        'have.text',
        '455000',
      )
      cy.get('tbody > :nth-child(7) > :nth-child(6)').should('have.text', '0')
      cy.get('tbody > :nth-child(7) > :nth-child(7)').should('have.text', '0')
      cy.get('tbody > :nth-child(7) > :nth-child(8)').should('have.text', '0')
      cy.get('tbody > :nth-child(7) > :nth-child(9)').should('have.text', '0')
      cy.get('tbody > :nth-child(7) > :nth-child(10)').should('have.text', '0')
      cy.get('tbody > :nth-child(7) > :nth-child(11)').should('have.text', '0')
      cy.get('tbody > :nth-child(7) > :nth-child(12)').should('have.text', '1')
      cy.get('tbody > :nth-child(7) > :nth-child(13)').should(
        'have.text',
        '455000',
      )
      cy.get('tbody > :nth-child(7) > :nth-child(14)').should('have.text', '0')
      cy.get('tbody > :nth-child(7) > :nth-child(15)').should('have.text', '0')

      // TODO: Test 'Save as CSV' button
      /* Test CSV Download */
      // Possible method
      //  https://github.com/cypress-io/cypress/issues/949
      //  Just clicking the button brings up a 'save' dialogue, which is not helpful
      // cy.get(".heading > button").click()
    })

    it('Fetches a 2017 Conv Price Info Nationwide report', () => {
      cy.get({ HOST }).logEnv()
      cy.viewport(1680, 916)

      cy.visit(`${HOST}/data-publication/disclosure-reports/2017`)

      cy.get('#institution-name').click({ force: true })
      cy.get('#institution-name').type('cypress bank, ssb')

      cy.get(
        '#main-content > .SearchList > .Results > li > .button-link',
      ).click({ force: true })

      cy.get('#react-select-2-option-5').click({ force: true })
      cy.get('#react-select-3-option-1').click({ force: true })

      /* 
        Check Report Params 
      */

      // Year
      cy.get('.ProgressCards > :nth-child(1)').should('contain.text', '2017')

      // Institution
      cy.get('.ProgressCards > :nth-child(2)').should(
        'contain.text',
        'CYPRESS BANK, SSB - 31905',
      )

      // MSA/MD
      cy.get('.ProgressCards > :nth-child(3)').should(
        'contain.text',
        'nationwide',
      )

      // Report Type
      cy.get('.ProgressCards > :nth-child(4)').should(
        'contain.text',
        'Conv Price Info by Incidence and Level - Nationwide - BW',
      )

      /* 
        Check Report Content 
      */

      // County
      cy.get('tbody > :nth-child(1) > th').should(
        'have.text',
        '1- TO 4-FAMILY OWNER OCCUPIED DWELLINGS (EXCLUDES MANUFACTURED HOMES)',
      )

      // Verify the Applications Received row of the report contains expected data
      cy.get('tbody > :nth-child(6) > :nth-child(2)').should(
        'have.text',
        '1.77',
      )
      cy.get('tbody > :nth-child(6) > :nth-child(3)').should('have.text', '0')
      cy.get('tbody > :nth-child(6) > :nth-child(4)').should('have.text', '0')
      cy.get('tbody > :nth-child(6) > :nth-child(5)').should(
        'have.text',
        '1.95',
      )
      cy.get('tbody > :nth-child(6) > :nth-child(6)').should('have.text', '0')
      cy.get('tbody > :nth-child(6) > :nth-child(7)').should('have.text', '0')
      cy.get('tbody > :nth-child(6) > :nth-child(8)').should(
        'have.text',
        '1.98',
      )
      cy.get('tbody > :nth-child(6) > :nth-child(9)').should(
        'have.text',
        '6.85',
      )
      cy.get('tbody > :nth-child(6) > :nth-child(10)').should('have.text', '0')

      // TODO: Test 'Save as CSV' button
    })
  })
})

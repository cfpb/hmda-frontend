import { isCI, isBeta } from '../../support/helpers'
import { onlyOn } from '@cypress/skip-test'
const { HOST, ENVIRONMENT } = Cypress.env()

let baseURLToVisit = isCI(ENVIRONMENT) ? 'http://localhost:3000' : HOST

onlyOn(isBeta(HOST), () => {
  describe('HMDA Graphs', function () {
    it('API does not run in Beta environments', () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('General Tests', () => {
    it('Checks <GraphsHeader/> component if overview props was not sent to the component', () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`).contains(
        'The following graphs show current and historic quarterly HMDA data for these institutions.',
      )
    })

    it('Checks <GraphsHeader/> component if data from API succeedes then it checks if numbered financial institutions show in the header', () => {
      let institutionCountRx = '[0-9]{1,3}'
      const financialInstitutionsRx = new RegExp(
        `^${institutionCountRx} financial institutions`,
      )

      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)
      cy.wait(1000)
      cy.get('.heading > :nth-child(2)').contains(financialInstitutionsRx)
    })

    it('Share Graph button tooltip displays after clicking the button', () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)
      cy.wait(2000)
      cy.get('.CopyURLButton').click({ force: true })
      cy.get('.CopyURLButton .tooltiptext')
    })
  })

  describe('Filer Info tab tests', () => {
    it('Starts on Graph tab and then switches to filer tab', () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)
      cy.wait(1000)
      cy.get('[aria-label="Navigate to the Filer Info tab."]').click(0, 0, {
        force: true,
      })
      cy.url().should(
        'eq',
        `${baseURLToVisit}/data-browser/graphs/quarterly/info/filers`,
      )
    })

    it('Institution level data is correct for 2021-2023', () => {
      // Using Bank of America as the test institution
      const institutionDetails = {
        name: 'BANK OF AMERICA, NATIONAL ASSOCIATION',
        lei: 'B4TYDEB6GKMZO031MB27',
        agency: 'Consumer Financial Protection Bureau (CFPB)',
      }

      const yearData = [
        { year: '2023', count: '271,974' },
        { year: '2022', count: '348,961' },
        { year: '2021', count: '368,728' },
      ]

      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly/info/filers`)
      cy.wait(1000)

      // Find and verify the Bank of America row
      cy.contains('tr', institutionDetails.name).within(() => {
        // Verify institution details
        cy.get('td').eq(0).should('contain', institutionDetails.name)
        cy.get('td').eq(1).should('contain', institutionDetails.lei)
        cy.get('td').eq(2).should('contain', institutionDetails.agency)

        // Verify each year's count
        yearData.forEach(({ year, count }, index) => {
          cy.root()
            .parents('table')
            .find('thead th')
            .contains(`${year} LAR Count`)
          cy.get('td')
            .eq(index + 3)
            .should('contain', count)
        })
      })
    })

    it('Total of Quarterly Filers counts appear for 2021-2023', () => {
      // Data ordered from newest to oldest year to match table layout
      const yearData = [
        { year: '2023', count: '4,741,350' },
        { year: '2022', count: '6,242,438' },
        { year: '2021', count: '10,403,582' },
      ]

      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly/info/filers`)
      cy.wait(1000)

      // Verify the row header
      cy.get('tfoot > tr')
        .first()
        .find('th')
        .should('contain', 'Total of Quarterly Filers')

      // Verify each year's data - array order matches table order
      yearData.forEach(({ year, count }, index) => {
        cy.get('thead th').contains(`${year} LAR Count`)
        cy.get('tfoot > tr:first > td').eq(index).should('contain', count)
      })
    })

    it('Total of All Filers counts appear for 2021-2023', () => {
      // Data ordered from newest to oldest year to match table layout
      const yearData = [
        { year: '2023', count: '11,483,889' },
        { year: '2022', count: '16,099,307' },
        { year: '2021', count: '26,227,364' },
      ]

      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly/info/filers`)
      cy.wait(1000)

      // Verify the row header
      cy.get('tfoot > tr')
        .first()
        .find('th')
        .should('contain', 'Total of Quarterly Filers')

      // Verify each year's data - array order matches table order
      yearData.forEach(({ year, count }, index) => {
        cy.get('thead th').contains(`${year} LAR Count`)
        cy.get('tfoot > tr:last > td').eq(index).should('contain', count)
      })
    })
  })

  describe('Graph Specific tests', () => {
    it('Visits graph page and checks that the url contains correct query parameters', () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)
      cy.wait(2000)
      // Regex check graphName, periodLow, periodHigh and visibleSeries in the url
      cy.url().should('match', /quarterly\/([a-z]{2,}-?)+/)
      cy.url().should('match', /periodLow=20\d{2}-Q\d/)
      cy.url().should('match', /periodHigh=20\d{2}-Q\d/)
      cy.url().should(
        'match',
        /visibleSeries=([a-zA-Z-\/]+(%20)?[a-zA-Z-]*,?)+/,
      )
    })

    it('Visit graph page then selects a graph from the dropdown menu', () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)

      cy.wait(1000)

      cy.url().then((url) => {
        cy.get('.react-select__graph__control').click(0, 0, {
          force: true,
        })
        cy.get('#react-select-3-option-4-0').click(0, 0, { force: true })
        cy.url().should('not.eq', url)
      })
    })

    it('Visit graph page, change loan type, then selects a graph from the dropdown menu', () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)

      cy.wait(1000)

      cy.url().then((url) => {
        cy.get('.react-select__loan__control').click(0, 0, {
          force: true,
        })
        cy.get('#react-select-2-option-2').click(0, 0, { force: true })
        cy.get('.react-select__graph__control').click(0, 0, {
          force: true,
        })
        cy.get('#react-select-3-option-0-0').click(0, 0, { force: true })
        cy.url().should('not.eq', url)
      })
    })

    it("Visits graphs page, change periods, checks that the url updates with selected periods, clicks 'Show All Quarters' button and checks url updated with default periods", () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)

      cy.wait(2000)

      cy.url().then((url) => {
        cy.log(url)
        cy.get('.react-select__period_start__value-container').click(0, 0, {
          force: true,
        })
        cy.get('#react-select-4-option-3').click(0, 0, { force: true })
        // Check url doesn't include base graph url start quarter
        cy.url().should('not.eq', url)

        cy.get('.react-select__period_end__value-container').click(0, 0, {
          force: true,
        })
        cy.get('#react-select-5-option-6').click(0, 0, { force: true })
        // Check URL doesn't include base graph url end quarter
        cy.url().should('not.eq', url)
        // Checks url was reset to base graph url which includes start and end quarters
        cy.get('.reset').click(0, 0, { force: true })
        cy.url().should('eq', url)
      })
    })

    it('De-select and re-select a series, UI and URL updates', () => {
      // let urlUpdate
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)
      // De-select 'Conventional Conforming' from series
      cy.get('.highcharts-color-0 > text').click(0, 0, { force: true })
      cy.url().should('not.contain', 'Conventional%20Conforming')
      // Re-select 'Conventional Conforming' from series
      cy.get('.highcharts-color-0 > text').click(0, 0, { force: true })
      cy.url().should('include', 'Conventional%20Conforming')
    })

    it("URL loads with specific set of series and it's reflected in the UI", () => {
      cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)

      cy.wait(2000)

      cy.url().then((url) => {
        cy.log(url)
        cy.visit(
          `${baseURLToVisit}/data-browser/graphs/quarterly/applications?periodLow=2018-Q1&periodHigh=2021-Q4&visibleSeries=FHA,HELOC,VA`,
        )
        cy.wait(1000)
        cy.url().should('not.eq', url)
      })
    })
  })
})

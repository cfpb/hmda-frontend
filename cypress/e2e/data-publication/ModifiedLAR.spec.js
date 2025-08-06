import { onlyOn } from '@cypress/skip-test'
import { isBeta, isDev } from '../../support/helpers'
const { HOST } = Cypress.env()

const downloadsFolder = Cypress.config('downloadsFolder')

// add additional years here to test as needed
const years = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];

const testCases = 
  years.map(year => {

    // special case for 2017 on both dev and prod
    if (year === 2017) {
      return {
        year,
        name: 'cypress bank, ssb',
        institution: '729178',
      }
    }

    // special case for 2018 on prod
    if (year === 2018 && !isDev(HOST)) {
      return {
        year,
        name: 'cypress bank, state savings bank',
        institution: '549300I4IUWMEMGLST06',
      }
    }

    // default case for all other years for dev and prod
    return {
      year,
      name: isDev(HOST) ? 'FRONTEND TEST BANK' : 'cypress bank, ssb',
      institution: isDev(HOST) ? 'FRONTENDTESTBANK9999' : '549300I4IUWMEMGLST06',
    }
  })

onlyOn(isBeta(HOST), () => {
  describe('Modified LAR', function () {
    it('Does not run in Beta environments', () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('Modified LAR', function () {
    testCases.forEach(({ year, name, institution }) => {
      it(`Searches and finds correct links for ${year}`, () => {
        cy.get({ HOST }).logEnv()
        cy.visit(`${HOST}/data-publication/modified-lar/${year}`)

        // Search finds the expected Institution
        cy.get('#institution-name').click()
        cy.get('#institution-name').type(name)

        cy.get('#main-content .SearchList > h4').contains('1 results found')
        cy.get('#main-content .SearchList > .Results > li > p').contains(
          institution,
        )
        cy.get('#main-content .SearchList > .Results > li > .font-small').then(
          ($el) => {
            expect($el).to.have.text('Download Modified LAR ')
            expect($el).to.have.attr(
              'href',
              `/file/modifiedLar/year/${year}/institution/${institution}/txt`,
            )
          },
        ).click()

        const fileName = `${institution}.csv`
        // Read the downloaded file and confirm there are hella pipes in it (at least 50)
        cy.readFile(`${downloadsFolder}/${fileName}`, { timeout: 10000 }).should((content) => {
          const pipeCount = (content.match(/\|/g) || []).length
          expect(pipeCount).to.be.greaterThan(50)
        })

        // Ticking the "Include Header" option updates download link appropriately
        cy.get('#inclHeader').click()
        cy.get('#inclHeader').check('true')

        cy.get(
          '#main-content .SearchList > .Results > li > .font-small',
        ).should(($el) => {
          expect($el).to.have.text('Download Modified LAR with Header')
          expect($el).to.have.attr(
            'href',
            `/file/modifiedLar/year/${year}/institution/${institution}/txt/header`,
          )
        })

        // Documentation link points to correct place - documentation lives in Docusaurus now
        const docLink = `/documentation/publications/modified-lar/resources/supporting-resources`
        cy.get('.App > #main-content > .heading > p > a').should(($link) => {
          expect($link).to.have.attr('href', docLink)
        })
      })
    })
  })
})

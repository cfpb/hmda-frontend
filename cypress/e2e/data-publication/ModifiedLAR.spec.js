import { onlyOn } from '@cypress/skip-test'
import { isBeta } from '../../support/helpers'
const { HOST } = Cypress.env()

const testCases = [
  {
    year: 2023,
    name: 'cypress bank, ssb',
    institution: '549300I4IUWMEMGLST06',
  },
  {
    year: 2022,
    name: 'cypress bank, ssb',
    institution: '549300I4IUWMEMGLST06',
  },
  {
    year: 2021,
    name: 'cypress bank, ssb',
    institution: '549300I4IUWMEMGLST06',
  },
  {
    year: 2020,
    name: 'cypress bank, ssb',
    institution: '549300I4IUWMEMGLST06',
  },
  {
    year: 2019,
    name: 'cypress bank, ssb',
    institution: '549300I4IUWMEMGLST06',
  },
  {
    year: 2018,
    name: 'cypress bank, state savings bank',
    institution: '549300I4IUWMEMGLST06',
  },
  { year: 2017, name: 'cypress bank, ssb', institution: '729178' },
]

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
        )

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

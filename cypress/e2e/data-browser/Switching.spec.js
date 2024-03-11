import {
  dbClick2018,
  dbClick2017,
  dbURL,
  isProd,
  isBeta,
  isProdBeta,
  isCI,
} from '../../support/helpers'
const { HOST, ENVIRONMENT } = Cypress.env()
const dbUrl = dbURL.bind(null, HOST)

describe('Data Browser 2017 <=> 2018', () => {
  if (isCI(ENVIRONMENT)) it('Does not run on CI')
  else if (isProdBeta(HOST)) it('Does not run on Prod Beta')
  else if (!isProd(HOST) && isBeta(HOST)) {
    it('Maps States Codes <=> State Abbreviations', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.visit(dbUrl('2017?category=states&items=01,02'))
      dbClick2018()
      cy.url().should('include', 'items=AL,AK')
      dbClick2017()
      cy.url().should('include', 'items=01,02')
    })

    it('Filters Variable options: Lein Status 2017 <=> 2018 ', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.visit(dbUrl('2017?category=states&lien_statuses=1,2,3,4'))
      dbClick2018()
      cy.url().should('equal', dbUrl('2018?category=states&lien_statuses=1,2'))
      dbClick2017()
      cy.url().should('equal', dbUrl('2017?category=states&lien_statuses=1,2'))
    })

    it('Maps Variable names and options: Property Types 2017 <=> 2018 Dwelling Category ', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.visit(dbUrl('2017?category=states&property_types=3'))
      dbClick2018()
      cy.url().should(
        'equal',
        dbUrl(
          '2018?category=states&dwelling_categories=Multifamily%3ASite-Built,Multifamily%3AManufactured',
        ),
      )
      dbClick2017()
      cy.url().should('equal', dbUrl('2017?category=states&property_types=2,3'))
    })

    it('Filters invalid Variables 2018 => 2017', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.visit(
        dbUrl('2018?category=states&construction_methods=1&actions_taken=1'),
      )
      dbClick2017()
      cy.url().should('equal', dbUrl('2017?category=states&actions_taken=1'))
    })
  } else {
    it(`does not run on host: ${HOST}`)
  }
})

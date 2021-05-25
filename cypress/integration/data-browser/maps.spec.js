import { openSelector, mapsURL, isBeta, isProd, isCI } from '../../support/helpers'

const { HOST, ENVIRONMENT } = Cypress.env()

describe('Maps', function () {
  it('State 2019', function () {
    cy.get({ HOST, ENVIRONMENT }).logEnv()
    cy.viewport(1000, 940)
    cy.visit(mapsURL(HOST, '2019?category=states'))

    openSelector('#map-filter-1').type('denied{enter}');
    openSelector('#map-filter-2').type('age 55{enter}');

    cy.wait(500)
    cy.get('.mapboxgl-canvas').click();

    cy.get('.maps-nav-bar .left .count').should('contain', '2,688')
    cy.get('.maps-nav-bar .right .count').should('contain', '0.92')
    cy.get('.maps-nav-bar .feature').should('contain', 'KANSAS')
    
    cy.get('.summary-page .featureName > .colorTextWithBias').should('contain', 'KANSAS')
    cy.get('.summary-page .count').should('contain', '2,688')

    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)').should('contain', 'Application denied')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)').should('contain', '14,582')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)').should('contain', '12.14%')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)').should('contain', '2,688')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)').should('contain', '15.43%')
    
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)').should('contain', '55-64')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)').should('contain', '17,418')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)').should('contain', '14.50%')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)').should('contain', '2,688')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)').should('contain', '18.43%')
  })

  it('County 2018', function () {
    cy.get({ HOST, ENVIRONMENT }).logEnv()
    cy.viewport(1000, 940)
    cy.visit(mapsURL(HOST, '2018?category=state'))

    cy.findByText('County').click()

    openSelector('#map-filter-1').type('denied{enter}');
    openSelector('#map-filter-2').type('age 55{enter}');

    cy.wait(500)
    cy.get('.mapboxgl-canvas').click();

    cy.get('.maps-nav-bar .feature').should('contain', 'GREENWOOD COUNTY, KS')
    cy.get('.maps-nav-bar .left .count').should('contain', '6')
    cy.get('.maps-nav-bar .right .count').should('contain', '1')
    
    cy.get('.summary-page .featureName > .colorTextWithBias').should('contain', 'GREENWOOD COUNTY, KS')
    cy.get('.summary-page .count').should('contain', '6')

    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)').should('contain', 'Application denied')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)').should('contain', '32')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)').should('contain', '18.93%')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)').should('contain', '6')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)').should('contain', '21.43%')
    
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)').should('contain', '55-64')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)').should('contain', '28')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)').should('contain', '16.57%')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)').should('contain', '6')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)').should('contain', '18.75%')
  })

  it('Renders empty state', () => {
    cy.visit(mapsURL(HOST, "2018?geography=county&variable=actionTaken&value=1&feature=31005&mapCenter=-101.6959558503813,41.568961419127554"))
    cy.get('.maps-nav-bar .left .count').should('contain', '0')
    cy.contains("No LAR data for this region in 2018")
  })
})
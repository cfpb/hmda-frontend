import { isBeta, mapsURL, openSelector } from '../../support/helpers'

const { HOST, ENVIRONMENT } = Cypress.env()
const ACTION_DELAY = 8000 // milliseconds

describe('Maps', () => {
  it('State 2021', () => {
    cy.get({ HOST, ENVIRONMENT }).logEnv()
    cy.viewport(1000, 940)
    cy.visit(mapsURL(HOST, '2021?geography=state'))
    deleteBetaBanner(HOST)

    openSelector('#map-filter-1').type('denied{enter}');
    openSelector('#map-filter-2').type('age 55{enter}');

    cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
    cy.get('.mapboxgl-canvas').click();

    cy.get('.maps-nav-bar .left .count').should('contain', '3,030')
    cy.get('.maps-nav-bar .right .count').should('contain', '1.03')
    cy.get('.maps-nav-bar .feature').should('contain', 'KANSAS')
    
    cy.get('.summary-page .featureName > .colorTextWithBias').should('contain', 'KANSAS')
    cy.get('.summary-page .count').should('contain', '3,030')

    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)').should('contain', 'Application denied')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)').should('contain', '16,609')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)').should('contain', '9.61%')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)').should('contain', '3,030')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)').should('contain', '12.51%')
    
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)').should('contain', '55-64')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)').should('contain', '24,225')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)').should('contain', '14.02%')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)').should('contain', '3,030')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)').should('contain', '18.24%')
  })

  it('County 2020', () => {
    cy.get({ HOST, ENVIRONMENT }).logEnv()
    cy.viewport(1000, 940)
    cy.visit(mapsURL(HOST, '2020?geography=county'))
    deleteBetaBanner(HOST)

    openSelector('#map-filter-1').type('denied{enter}');
    openSelector('#map-filter-2').type('age 55{enter}');

    cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
    cy.get('.mapboxgl-canvas').click();

    cy.get('.maps-nav-bar .feature').should('contain', 'GREENWOOD COUNTY, KS')
    cy.get('.maps-nav-bar .left .count').should('contain', '10')
    cy.get('.maps-nav-bar .right .count').should('contain', '1.67')
    
    cy.get('.summary-page .featureName > .colorTextWithBias').should('contain', 'GREENWOOD COUNTY, KS')
    cy.get('.summary-page .count').should('contain', '10')

    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)').should('contain', 'Application denied')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)').should('contain', '31')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)').should('contain', '16.49%')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)').should('contain', '10')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)').should('contain', '22.22%')
    
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)').should('contain', '55-64')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)').should('contain', '45')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)').should('contain', '23.94%')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)').should('contain', '10')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)').should('contain', '32.26%')
  })
  
  it('State 2019', () => {
    cy.get({ HOST, ENVIRONMENT }).logEnv()
    cy.viewport(1000, 940)
    cy.visit(mapsURL(HOST, '2019?geography=state'))
    deleteBetaBanner(HOST)

    openSelector('#map-filter-1').type('denied{enter}');
    openSelector('#map-filter-2').type('age 55{enter}');

    cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
    cy.get('.mapboxgl-canvas').click();

    cy.get('.maps-nav-bar .left .count').should('contain', '2,686')
    cy.get('.maps-nav-bar .right .count').should('contain', '0.91')
    cy.get('.maps-nav-bar .feature').should('contain', 'KANSAS')
    
    cy.get('.summary-page .featureName > .colorTextWithBias').should('contain', 'KANSAS')
    cy.get('.summary-page .count').should('contain', '2,686')

    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)').should('contain', 'Application denied')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)').should('contain', '14,571')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)').should('contain', '12.14%')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)').should('contain', '2,686')
    cy.get('.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)').should('contain', '15.45%')
    
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)').should('contain', '55-64')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)').should('contain', '17,385')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)').should('contain', '14.48%')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)').should('contain', '2,686')
    cy.get('.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)').should('contain', '18.43%')
  })

  it('County 2018', () => {
    cy.get({ HOST, ENVIRONMENT }).logEnv()
    cy.viewport(1000, 940)
    cy.visit(mapsURL(HOST, '2018?geography=county'))
    deleteBetaBanner(HOST)

    openSelector('#map-filter-1').type('denied{enter}');
    openSelector('#map-filter-2').type('age 55{enter}');

    cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
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
    deleteBetaBanner(HOST)
    cy.get('.maps-nav-bar .left .count').should('contain', '0')
    cy.contains("No LAR data for this region in 2018")
  })
})


const deleteBetaBanner = (env) => {
  if (!isBeta(env)) return
  cy.get('div.Beta').then(el => {
    el.remove()
  })
}
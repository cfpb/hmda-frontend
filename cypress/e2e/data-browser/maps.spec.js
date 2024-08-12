import { isBeta, mapsURL, openSelector } from '../../support/helpers'
import { onlyOn } from '@cypress/skip-test'
const { HOST, ENVIRONMENT } = Cypress.env()
const ACTION_DELAY = 8000 // milliseconds

onlyOn(isBeta(HOST), () => {
  describe('Maps', function () {
    it('Does not run in Beta environments', () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('Maps', () => {
    it('State 2023', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.viewport(1000, 940)
      cy.visit(mapsURL(HOST, '2023?geography=state'))
      deleteBetaBanner(HOST)

      openSelector('#map-filter-1').type('denied{enter}')
      openSelector('#map-filter-2').type('age 55{enter}')

      cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
      cy.get('.mapboxgl-canvas').click()

      cy.get('.maps-nav-bar .left .count').should('contain', '1,975')
      cy.get('.maps-nav-bar .right .count').should('contain', '0.55')
      cy.get('.maps-nav-bar .feature').should('contain', 'KANSAS')

      cy.get('.summary-page .featureName > .colorTextWithBias').should(
        'contain',
        'KANSAS',
      )
      cy.get('.summary-page .count').should('contain', '1,975')

      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', 'Application denied')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '12,440')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '14.56%')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '1,975')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '18.32%')

      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', '55-64')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '10,779')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '12.62%')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '1,975')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '15.88%')
    })

    it('County 2023', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.viewport(1000, 940)
      cy.visit(mapsURL(HOST, '2023?geography=county'))
      deleteBetaBanner(HOST)

      openSelector('#map-filter-1').type('denied{enter}')
      openSelector('#map-filter-2').type('age 55{enter}')

      cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
      cy.get('.mapboxgl-canvas').click()

      cy.get('.maps-nav-bar .feature').should('contain', 'GREENWOOD COUNTY, KS')
      cy.get('.maps-nav-bar .left .count').should('contain', '1')
      cy.get('.maps-nav-bar .right .count').should('contain', '0.08')

      cy.get('.summary-page .featureName > .colorTextWithBias').should(
        'contain',
        'GREENWOOD COUNTY, KS',
      )
      cy.get('.summary-page .count').should('contain', '1')

      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', 'Application denied')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '14')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '10.29%')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '1')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '4.35%')

      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', '55-64')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '23')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '16.91%')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '1')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '7.14%')
    })

    it('State 2022', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.viewport(1000, 940)
      cy.visit(mapsURL(HOST, '2022?geography=state'))
      deleteBetaBanner(HOST)

      openSelector('#map-filter-1').type('denied{enter}')
      openSelector('#map-filter-2').type('age 55{enter}')

      cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
      cy.get('.mapboxgl-canvas').click()

      cy.get('.maps-nav-bar .left .count').should('contain', '2,430')
      cy.get('.maps-nav-bar .right .count').should('contain', '0.68')
      cy.get('.maps-nav-bar .feature').should('contain', 'KANSAS')

      cy.get('.summary-page .featureName > .colorTextWithBias').should(
        'contain',
        'KANSAS',
      )
      cy.get('.summary-page .count').should('contain', '2,430')

      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', 'Application denied')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '14,687')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '13.38%')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '2,430')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '16.79%')

      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', '55-64')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '14,472')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '13.19%')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '2,430')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '16.55%')
    })

    it('County 2022', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.viewport(1000, 940)
      cy.visit(mapsURL(HOST, '2022?geography=county'))
      deleteBetaBanner(HOST)

      openSelector('#map-filter-1').type('denied{enter}')
      openSelector('#map-filter-2').type('age 55{enter}')

      cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
      cy.get('.mapboxgl-canvas').click()

      cy.get('.maps-nav-bar .feature').should('contain', 'GREENWOOD COUNTY, KS')
      cy.get('.maps-nav-bar .left .count').should('contain', '3')
      cy.get('.maps-nav-bar .right .count').should('contain', '0.25')

      cy.get('.summary-page .featureName > .colorTextWithBias').should(
        'contain',
        'GREENWOOD COUNTY, KS',
      )
      cy.get('.summary-page .count').should('contain', '3')

      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', 'Application denied')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '25')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '18.25%')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '3')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '12.50%')

      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', '55-64')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '24')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '17.52%')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '3')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '12.00%')
    })

    it('State 2021', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.viewport(1000, 940)
      cy.visit(mapsURL(HOST, '2021?geography=state'))
      deleteBetaBanner(HOST)

      openSelector('#map-filter-1').type('denied{enter}')
      openSelector('#map-filter-2').type('age 55{enter}')

      cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
      cy.get('.mapboxgl-canvas').click()

      cy.get('.maps-nav-bar .left .count').should('contain', '3,032')
      cy.get('.maps-nav-bar .right .count').should('contain', '1.03')
      cy.get('.maps-nav-bar .feature').should('contain', 'KANSAS')

      cy.get('.summary-page .featureName > .colorTextWithBias').should(
        'contain',
        'KANSAS',
      )
      cy.get('.summary-page .count').should('contain', '3,032')

      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', 'Application denied')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '16,609')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '9.61%')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '3,032')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '12.46%')

      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', '55-64')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '24,225')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '14.02%')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '3,032')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '18.24%')
    })

    it('County 2021', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.viewport(1000, 940)
      cy.visit(mapsURL(HOST, '2021?geography=county'))
      deleteBetaBanner(HOST)

      openSelector('#map-filter-1').type('denied{enter}')
      openSelector('#map-filter-2').type('age 55{enter}')

      cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
      cy.get('.mapboxgl-canvas').click()

      cy.get('.maps-nav-bar .feature').should('contain', 'GREENWOOD COUNTY, KS')
      cy.get('.maps-nav-bar .left .count').should('contain', '11')
      cy.get('.maps-nav-bar .right .count').should('contain', '1.85')

      cy.get('.summary-page .featureName > .colorTextWithBias').should(
        'contain',
        'GREENWOOD COUNTY, KS',
      )
      cy.get('.summary-page .count').should('contain', '11')

      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', 'Application denied')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '27')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '15.08%')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '11')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '25.58%')

      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', '55-64')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '43')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '24.02%')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '11')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '40.74%')
    })

    it('State 2020', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.viewport(1000, 940)
      cy.visit(mapsURL(HOST, '2020?geography=state'))
      deleteBetaBanner(HOST)

      openSelector('#map-filter-1').type('denied{enter}')
      openSelector('#map-filter-2').type('age 55{enter}')

      cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
      cy.get('.mapboxgl-canvas').click()

      cy.get('.maps-nav-bar .left .count').should('contain', '2,854')
      cy.get('.maps-nav-bar .right .count').should('contain', '0.97')
      cy.get('.maps-nav-bar .feature').should('contain', 'KANSAS')

      cy.get('.summary-page .featureName > .colorTextWithBias').should(
        'contain',
        'KANSAS',
      )
      cy.get('.summary-page .count').should('contain', '2,854')

      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', 'Application denied')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '16,361')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '9.22%')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '2,854')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '12.13%')

      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', '55-64')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '23,527')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '13.26%')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '2,854')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '17.44%')
    })

    it('County 2020', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.viewport(1000, 940)
      cy.visit(mapsURL(HOST, '2020?geography=county'))
      deleteBetaBanner(HOST)

      openSelector('#map-filter-1').type('denied{enter}')
      openSelector('#map-filter-2').type('age 55{enter}')

      cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
      cy.get('.mapboxgl-canvas').click()

      cy.get('.maps-nav-bar .feature').should('contain', 'GREENWOOD COUNTY, KS')
      cy.get('.maps-nav-bar .left .count').should('contain', '10')
      cy.get('.maps-nav-bar .right .count').should('contain', '1.67')

      cy.get('.summary-page .featureName > .colorTextWithBias').should(
        'contain',
        'GREENWOOD COUNTY, KS',
      )
      cy.get('.summary-page .count').should('contain', '10')

      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', 'Application denied')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '30')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '15.96%')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '10')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '22.22%')

      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', '55-64')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '45')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '23.94%')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '10')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '33.33%')
    })

    it('State 2019', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.viewport(1000, 940)
      cy.visit(mapsURL(HOST, '2019?geography=state'))
      deleteBetaBanner(HOST)

      openSelector('#map-filter-1').type('denied{enter}')
      openSelector('#map-filter-2').type('age 55{enter}')

      cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
      cy.get('.mapboxgl-canvas').click()

      cy.get('.maps-nav-bar .left .count').should('contain', '2,686')
      cy.get('.maps-nav-bar .right .count').should('contain', '0.91')
      cy.get('.maps-nav-bar .feature').should('contain', 'KANSAS')

      cy.get('.summary-page .featureName > .colorTextWithBias').should(
        'contain',
        'KANSAS',
      )
      cy.get('.summary-page .count').should('contain', '2,686')

      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', 'Application denied')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '14,571')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '12.14%')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '2,686')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '15.45%')

      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', '55-64')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '17,385')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '14.48%')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '2,686')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '18.43%')
    })

    it('County 2019', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.viewport(1000, 940)
      cy.visit(mapsURL(HOST, '2019?geography=county'))
      deleteBetaBanner(HOST)

      openSelector('#map-filter-1').type('denied{enter}')
      openSelector('#map-filter-2').type('age 55{enter}')

      cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
      cy.get('.mapboxgl-canvas').click()

      cy.get('.maps-nav-bar .feature').should('contain', 'GREENWOOD COUNTY, KS')
      cy.get('.maps-nav-bar .left .count').should('contain', '1')
      cy.get('.maps-nav-bar .right .count').should('contain', '0.17')

      cy.get('.summary-page .featureName > .colorTextWithBias').should(
        'contain',
        'GREENWOOD COUNTY, KS',
      )
      cy.get('.summary-page .count').should('contain', '1')

      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', 'Application denied')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '21')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '15.22%')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '1')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '3.57%')

      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', '55-64')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '28')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '20.29%')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '1')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '4.76%')
    })

    it('State 2018', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.viewport(1000, 940)
      cy.visit(mapsURL(HOST, '2018?geography=state'))
      deleteBetaBanner(HOST)

      openSelector('#map-filter-1').type('denied{enter}')
      openSelector('#map-filter-2').type('age 55{enter}')

      cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
      cy.get('.mapboxgl-canvas').click()

      cy.get('.maps-nav-bar .left .count').should('contain', '2,782')
      cy.get('.maps-nav-bar .right .count').should('contain', '0.96')
      cy.get('.maps-nav-bar .feature').should('contain', 'KANSAS')

      cy.get('.summary-page .featureName > .colorTextWithBias').should(
        'contain',
        'KANSAS',
      )
      cy.get('.summary-page .count').should('contain', '2,782')

      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', 'Application denied')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '14,630')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '13.71%')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '2,782')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '17.48%')

      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', '55-64')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '15,917')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '14.92%')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '2,782')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '19.02%')
    })

    it('County 2018', () => {
      cy.get({ HOST, ENVIRONMENT }).logEnv()
      cy.viewport(1000, 940)
      cy.visit(mapsURL(HOST, '2018?geography=county'))
      deleteBetaBanner(HOST)

      openSelector('#map-filter-1').type('denied{enter}')
      openSelector('#map-filter-2').type('age 55{enter}')

      cy.wait(ACTION_DELAY) // Allow the map to complete it's initial render
      cy.get('.mapboxgl-canvas').click()

      cy.get('.maps-nav-bar .feature').should('contain', 'GREENWOOD COUNTY, KS')
      cy.get('.maps-nav-bar .left .count').should('contain', '6')
      cy.get('.maps-nav-bar .right .count').should('contain', '1')

      cy.get('.summary-page .featureName > .colorTextWithBias').should(
        'contain',
        'GREENWOOD COUNTY, KS',
      )
      cy.get('.summary-page .count').should('contain', '6')

      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', 'Application denied')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '32')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '18.93%')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '6')
      cy.get(
        '.filter-report-1 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '21.43%')

      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(1)',
      ).should('contain', '55-64')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(2)',
      ).should('contain', '28')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(3)',
      ).should('contain', '16.57%')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(4)',
      ).should('contain', '6')
      cy.get(
        '.filter-report-2 > table > tbody > tr.highlight > :nth-child(5)',
      ).should('contain', '18.75%')
    })

    it('Renders empty state', () => {
      cy.visit(
        mapsURL(
          HOST,
          '2018?geography=county&variable=actionTaken&value=1&feature=31005&mapCenter=-101.6959558503813,41.568961419127554',
        ),
      )
      deleteBetaBanner(HOST)
      cy.get('.maps-nav-bar .left .count').should('contain', '0')
      cy.contains('No LAR data for this region in 2018')
    })
  })

  const deleteBetaBanner = (env) => {
    if (!isBeta(env)) return
    cy.get('div.Beta').then((el) => {
      el.remove()
    })
  }
})

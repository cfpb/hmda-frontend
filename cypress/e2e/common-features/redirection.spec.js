import config from '../../../src/common/constants/prod-config.json'
import { isBeta } from '../../support/helpers'
import { onlyOn } from '@cypress/skip-test'
const years = config.dataPublicationYears

const { HOST } = Cypress.env()

const FromTo = [
  // Reports that will break if auto-redirect is enabled
  {
    from: '/data-publication/aggregate-reports',
    to: `/data-publication/aggregate-reports`,
    description: 'Aggregate should not auto-redirect',
  },
  {
    from: '/data-publication/disclosure-reports',
    to: `/data-publication/disclosure-reports`,
    description: 'Disclosure should not auto-redirect',
  },

  // Test redirect from base URLs
  {
    from: '/data-publication/modified-lar',
    to: `/data-publication/modified-lar/${years.mlar[0]}`,
  },
  {
    from: '/data-publication/national-aggregate-reports',
    to: `/data-publication/national-aggregate-reports/2017`,
  },
  {
    from: '/data-publication/snapshot-national-loan-level-dataset',
    to: `/data-publication/snapshot-national-loan-level-dataset/${years.shared[0]}`,
  },
  {
    from: '/data-publication/three-year-national-loan-level-dataset',
    to: `/data-publication/three-year-national-loan-level-dataset/${years.threeYear[0]}`,
  },
  {
    from: '/data-publication/one-year-national-loan-level-dataset',
    to: `/data-publication/one-year-national-loan-level-dataset/${years.oneYear[0]}`,
  },
  {
    from: '/data-publication/dynamic-national-loan-level-dataset',
    to: `/data-publication/dynamic-national-loan-level-dataset/${years.shared[0]}`,
  },
  { from: '/data-publication', to: `/data-publication/${years.shared[0]}` },
  { from: '/data-browser/maps', to: `/data-browser/maps/${years.shared[0]}` },
  { from: '/data-browser/data/', to: `/data-browser/data/${years.shared[0]}` },

  // Test redirect from invalid years
  {
    from: '/data-publication/aggregate-reports/20',
    to: `/data-publication/aggregate-reports/${years.shared[0]}`,
    description: 'Aggregate redirects from invalid year',
  },
  {
    from: '/data-publication/modified-lar/20',
    to: `/data-publication/modified-lar/${years.mlar[0]}`,
    description: 'Modified LAR redirects correctly from invalid year',
  },
  {
    from: '/data-publication/disclosure-reports/20',
    to: `/data-publication/disclosure-reports/${years.shared[0]}`,
    description: 'Disclosure redirects from invalid year',
  },
  {
    from: '/data-publication/dynamic-national-loan-level-dataset/20',
    to: `/data-publication/dynamic-national-loan-level-dataset/${years.shared[0]}`,
    description: 'Dynamic redirects correctly from invalid year',
  },
  {
    from: '/data-publication/snapshot-national-loan-level-dataset/20',
    to: `/data-publication/snapshot-national-loan-level-dataset/${years.shared[0]}`,
    description: 'Snapshot redirects correctly from invalid year',
  },
  {
    from: '/data-publication/one-year-national-loan-level-dataset/20',
    to: `/data-publication/one-year-national-loan-level-dataset/${years.oneYear[0]}`,
    description: 'One Year redirects correctly from invalid year',
  },
  {
    from: '/data-publication/three-year-national-loan-level-dataset/20',
    to: `/data-publication/three-year-national-loan-level-dataset/${years.threeYear[0]}`,
    description: 'Three Year redirects correctly from invalid year',
  },
  {
    from: '/data-browser/data/20',
    to: `/data-browser/data/${years.shared[0]}`,
    description: 'Data Browser redirects correctly from invalid year',
  },
  {
    from: '/data-browser/maps/20',
    to: `/data-browser/maps/${years.shared[0]}`,
    description: 'Maps redirects correctly from invalid year',
  },
]

onlyOn(isBeta(HOST), () => {
  describe('National Aggregate Reports', function () {
    it('Does not run in Beta environments', () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('withYearValidation', () => {
    FromTo.forEach(({ from, to, description }) => {
      const testDescription = description || `Auto-redirects from ${from}`
      it(testDescription, () => {
        cy.visit(`${HOST}${from}`)
        cy.url().should('include', to)
      })
    })
  })
})

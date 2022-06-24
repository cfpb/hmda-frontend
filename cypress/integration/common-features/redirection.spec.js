import config from '../../../src/common/constants/prod-config.json'
const latestRelease = config.publicationReleaseYear
const years = config.dataPublicationYears

const { HOST } = Cypress.env()

const FromTo = [
  {
    from: '/data-publication/modified-lar',
    to: `/data-publication/modified-lar/${years.mlar[0]}`,
  },
  {
    from: '/data-publication/modified-lar/20',
    to: `/data-publication/modified-lar/${years.mlar[0]}`,
    desc: 'From invalid year for Data pub',
  },
  {
    from: '/data-publication/disclosure-reports',
    to: `/data-publication/disclosure-reports/${years.shared[0]}`,
  },
  {
    from: '/data-publication/aggregate-reports',
    to: `/data-publication/aggregate-reports/${years.shared[0]}`,
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
  { from: '/data-publication', to: `/data-publication/${latestRelease}` },
  { from: '/data-browser/maps', to: `/data-browser/maps/${latestRelease}` },
  { from: '/data-browser/data/', to: `/data-browser/data/${latestRelease}` },
  {
    from: '/data-browser/data/20',
    to: `/data-browser/data/${latestRelease}`,
    desc: 'From invalid year for Data Browser',
  },
]

describe('withYearValidation', () => {
  FromTo.forEach(({ from, to, desc }) => {
    it(`Redirects correctly from ${desc || from}`, () => {
      cy.visit(`${HOST}${from}`)
      cy.url().should('include', to)
    }) 
  })
})

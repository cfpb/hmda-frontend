import { isBeta, isCI } from '../../support/helpers'
import { getDefaultConfig } from '../../../src/common/configUtils'
import { getFilingPeriods } from '../../../src/common/constants/configHelpers'

const {
  HOST,
  USERNAME,
  PASSWORD,
  INSTITUTION,
  ACTION_DELAY,
  TEST_DELAY,
  NAV_DELAY,
  ENVIRONMENT,
  AUTH_BASE_URL,
  AUTH_REALM,
  AUTH_CLIENT_ID,
  YEARS,
} = Cypress.env()
const config = getDefaultConfig(HOST)
const getFilename = (filingPeriod, lei) => `${filingPeriod}-${lei}.txt`
const years = (YEARS && YEARS.toString().split(',')) || getFilingPeriods(config)
const { filingPeriodStatus } = config


describe('Filing', {testIsolation: false}, function () {

  before(() => {
    cy.keycloakLogin('filing/2024/institutions/')
  })

  beforeEach(() => {

    cy.get({
      HOST,
      USERNAME,
      PASSWORD,
      INSTITUTION,
      ACTION_DELAY,
      TEST_DELAY,
      NAV_DELAY,
      ENVIRONMENT,
      AUTH_BASE_URL,
      AUTH_REALM,
      AUTH_CLIENT_ID,
    }).logEnv()

    cy.visit(`${AUTH_BASE_URL}filing/2020/institutions`)
    cy.viewport(1600, 900)
  })

  const THIS_IS_BETA = isBeta(HOST)
  const testVsOfficial = THIS_IS_BETA ? 'test' : 'official'

  years.forEach((filingPeriod, index) => {
    it(`${filingPeriod}`, function () {
      const status = filingPeriodStatus[filingPeriod]

      cy.wait(ACTION_DELAY)

      // Select the year using the filing-year
      cy.get('.filing-year-selector .filing-year__control').click()
      // For quarterly filings, we need to select just the year part
      const yearToSelect = filingPeriod.includes('-')
        ? filingPeriod.split('-')[0]
        : filingPeriod
      cy.get('.filing-year__menu').contains(yearToSelect).click()

      // Use the quarterly selector if it is a quarterly filing
      if (filingPeriod.includes('Q')) {
        // Select the quarter using the annual-or-quarter
        cy.get('.annual-or-quarter__control').click()
        cy.get('.annual-or-quarter__menu')
          .contains(filingPeriod.split('-')[1])
          .click()
      } else if (!status.isClosed) {
        // For open annual filings, select "Annual"
        cy.get('.annual-or-quarter__control').click()
        cy.get('.annual-or-quarter__menu').contains('Annual').click()
      }

      // After Close - Cannot file/refile after Filing period is passed
      if (status.isClosed && status.isPassed) {
        if (!THIS_IS_BETA) {
          cy.contains(
            `Collection of ${filingPeriod} HMDA data has ended`,
          ).should('exist')
          cy.contains(
            `Submissions of ${filingPeriod} HMDA data are no longer accepted as of ${status.endDate}.`,
          ).should('exist')
        }
        cy.contains(`Upload your ${testVsOfficial} file`).should('not.exist')
        cy.contains('Upload a new file').should('not.exist')
        cy.contains('For Review Only', { timout: 5000 }).should('exist')
        return
      }

      // Late filing - Can file after timely deadline but should see the message
      if (status.isLate && !THIS_IS_BETA) {
        cy.contains(`The ${filingPeriod} filing period is closed.`).should(
          'exist',
        )
        cy.contains(
          `The HMDA Platform remains available outside of the filing period for late submissions and resubmissions of ${filingPeriod} HMDA data until ${status.endDate}.`,
        ).should('exist')
      }

      // Filing period is open
      if (status.isOpen && !THIS_IS_BETA) {
        cy.contains(`The ${filingPeriod} filing period is open.`).should(
          'exist',
        )
        cy.contains(
          `Timely submissions of ${filingPeriod} HMDA data will be accepted until ${status.lateDate}`,
        ).should('exist')
        cy.contains(
          `Resubmissions and late submissions will be accepted until ${status.endDate}`,
        ).should('exist')
      }

      // Wait for API request to finish
      cy.get('.LoadingIcon', { timeout: 10000 }).should('not.exist')

      cy.get(`#main-content .institution`, { timeout: 20000 })
        .then(($list) => {
          // Find target institution
          let institution = $list
            .toArray()
            .filter((x) => x.innerText.indexOf(INSTITUTION) > -1)[0]

          if (!institution) throw Error(`${INSTITUTION} not found!`)

          let clicked = false
          cy.wrap(institution)
            .find('.current-status > .ViewButton')
            .then(($viewButton) => {
              const first = $viewButton[0]
              if (
                first &&
                first.innerText.indexOf(`Upload your ${testVsOfficial} file`) >
                  -1
              ) {
                /* Start a new Submission */
                first.click()
                clicked = true
              }
            })
            .then(() => {
              if (!clicked) {
                /* Start a Refile */
                cy.wrap(institution).find('.RefileButton').click()
                cy.get('.modal button:first-of-type').click()
              }
            })
        })
        .then(() => {
          /* File Upload */
          const FILENAME = getFilename(filingPeriod, INSTITUTION)

          cy.fixture(FILENAME).then((fileContent) => {
            cy.get('.UploadForm input', { force: true }).attachFile({
              fileContent,
              fileName: FILENAME,
              mimeType: 'text/plain',
            })

            // Wait up to 3 minutes for upload to complete, then start reviewing edits
            cy.get('.NavButtonContainer > .NavButton').click({
              timeout: 180000,
            })

            // Action: Review Quality Edits
            cy.get('.NavButtonContainer > .NavButton').click()
            cy.wait(NAV_DELAY)

            /* Action: Verify Quality Edits */
            cy.get('.EditsTableWrapper').then((wrapper) => {
              // Verify edits, if triggered
              if (wrapper.find('.Verifier').length)
                cy.get('#qualityVerifier').check()
              cy.wait(NAV_DELAY)
              // Move to next step in Submission process
              cy.get('.NavButtonContainer > .NavButton').click()
            })
            cy.wait(ACTION_DELAY)

            /* Action: Verify Macro Edits */
            cy.get('.EditsTableWrapper').then((wrapper) => {
              // Verify edits, if triggered
              if (wrapper.find('.Verifier').length)
                cy.get('#macroVerifier').check()
              // Move to next step in Submission process
              cy.get('.NavButtonContainer > .NavButton').click()
            })
            cy.wait(ACTION_DELAY)

            /* Action: Sign Submission */
            if (THIS_IS_BETA) {
              cy.get('.alert.alert-warning:last').should(
                'contain.text',
                '[Beta Platform] Filing Simulation Complete!',
              )
            } else {
              cy.wait(500)
              cy.get('#signature li:first > label').click({ timeout: 2000 })
              cy.get('#signatureAuth').check('signature', { timeout: 2000 })
              cy.get('#signature > button').click({ timeout: 2000 })
            }
            cy.wait(TEST_DELAY)
          })
        })
    })
  })

  // Logout of Keycloak
  it('Logout of Keycloak', function() {
    cy.visit(`${AUTH_BASE_URL}auth/realms/hmda2/protocol/openid-connect/logout`)
  })
})
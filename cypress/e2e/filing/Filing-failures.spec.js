import { getDefaultConfig } from '../../../src/common/configUtils'
import { isBeta } from '../../support/helpers'

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
} = Cypress.env()
const config = getDefaultConfig(HOST)
const { filingPeriodStatus } = config

const qualityFailureFixture = '2025-FRONTENDTESTBANK9999-quality-fail.txt'
const validityFailureFixture = '2025-FRONTENDTESTBANK9999-validity-fail.txt'
const macroFailureFixture = '2025-FRONTENDTESTBANK9999-macro-fail.txt'

const THIS_IS_BETA = isBeta(HOST)
const testVsOfficial = THIS_IS_BETA ? 'test' : 'official'

function uploadFixtureFile(fixtureFilename) {
  const filingPeriod = fixtureFilename.split('-')[0]
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
    cy.get('body').then(($body) => {
      // Check if annual-or-quarter dropdown is disabled
      const hasDisabledControl =
        $body.find('.annual-or-quarter--is-disabled').length > 0

      if (!hasDisabledControl) {
        // Only attempt to interact if not disabled
        cy.get('.annual-or-quarter__control').click()
        cy.get('.annual-or-quarter__menu')
          .contains(filingPeriod.split('-')[1])
          .click()
      }
    })
  } else if (!status.isClosed) {
    // For open annual filings, select "Annual"
    cy.get('.annual-or-quarter__control').click()
    cy.get('.annual-or-quarter__menu').contains('Annual').click()
  }

  // Wait for API request to finish
  cy.get('.LoadingIcon', { timeout: 10000 }).should('not.exist')

  cy.get(`#main-content .institution`, { timeout: 20000 })
    .then(($list) => {
      // Find target institution
      const institution = $list
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
            first.innerText.indexOf(
              `Upload your ${testVsOfficial} file`,
            ) > -1
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
      cy.fixture(`filing-failures/${fixtureFilename}`).then((fileContent) => {
        cy.get('.UploadForm input', { force: true }).attachFile({
          fileContent,
          fileName: fixtureFilename,
          mimeType: 'text/plain',
        })
      })
    })
}

describe(
  'Filing failures',
  { testIsolation: false, tags: ['@auth-required', '@smoke'] },
  function () {
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

    it('Validity edits found', function () {
      uploadFixtureFile(validityFailureFixture)

      // Wait up to 3 minutes for upload to complete, then start reviewing edits
      cy.get('.NavButton').contains('Review Edits').click({
        timeout: 180000,
      })
      
      // Validity edits found
      cy.get('.alert').contains('Your file has syntactical and/or validity edits.').should('exist')
      cy.get('h3').contains('V609 edits (100 found)').should('exist')

      // User is blocked and the refile button should appear
      cy.get('.RefileButton').contains('Upload a new file').should('exist')

      cy.wait(TEST_DELAY)
    })

    it('Quality edits found', function () {
      uploadFixtureFile(qualityFailureFixture)

      // Wait up to 3 minutes for upload to complete, then start reviewing edits
      cy.get('.NavButton').contains('Review Edits').click({
        timeout: 180000,
      })
      
      // No syntactical errors
      cy.get('.alert').contains('Your data did not trigger any syntactical or validity edits.').should('exist')
      cy.get('.NavButton').contains('Review quality Edits').click({
        timeout: 180000,
      })

      // Quality edits found
      cy.get('.alert').contains('Your file has quality edits.').should('exist')
      cy.get('h3').contains('Q303 edit (1 found)').should('exist')
      cy.get('#qualityVerifier').check()
      cy.get('.NavButton').contains('Review macro Edits').click({
        timeout: 180000,
      })

      // No macro errors
      cy.get('.alert').contains('Your data did not trigger any macro edits').should('exist')
      cy.get('.NavButton').contains('Review submission').click({
        timeout: 180000,
      })

      cy.get('.alert').contains('Your official filing is ready to be signed and submitted').should('exist')

      cy.wait(TEST_DELAY)
    })

    it('Macro edits found', function () {
      uploadFixtureFile(macroFailureFixture)

      // Wait up to 3 minutes for upload to complete, then start reviewing edits
      cy.get('.NavButton').contains('Review Edits').click({
        timeout: 180000,
      })
      
      // No syntactical errors
      cy.get('.alert').contains('Your data did not trigger any syntactical or validity edits').should('exist')
      cy.get('.NavButton').contains('Review quality Edits').click({
        timeout: 180000,
      })

      // No quality errors
      cy.get('.alert').contains('Your data did not trigger any quality edits').should('exist')
      cy.get('.NavButton').contains('Review macro Edits').click({
        timeout: 180000,
      })

      // Macro edits found
      cy.get('.alert').contains('Your file has macro quality edits.').should('exist')
      cy.get('h3').contains('Edit Q634 found').should('exist')
      cy.get('#macroVerifier').check()
      cy.get('.NavButton').contains('Review submission').click({
        timeout: 180000,
      })

      cy.get('.alert').contains('Your official filing is ready to be signed and submitted').should('exist')

      cy.wait(TEST_DELAY)
    })

    // Logout of Keycloak
    it('Logout of Keycloak', function () {
      cy.visit(
        `${AUTH_BASE_URL}auth/realms/hmda2/protocol/openid-connect/logout`,
      )
    })
  },
)

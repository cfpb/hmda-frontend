import { isBeta, isCI } from '../support/helpers'
import { getDefaultConfig } from '../../src/common/configUtils'

const {
  HOST,
  USERNAME,
  PASSWORD,
  INSTITUTION,
  ACTION_DELAY,
  TEST_DELAY,
  ENVIRONMENT,
  AUTH_BASE_URL,
  AUTH_REALM,
  AUTH_CLIENT_ID,
  YEARS,
} = Cypress.env()

const years = [2020]
const timeout3hours = 10800000

const config = getDefaultConfig(HOST)
const getFilename = (filingPeriod, lei) => `${filingPeriod}-${lei}-MAX.txt`
const { filingPeriodStatus } = config

describe('Large Filer', function () {
  // Only need to provide an Auth URL when running locally
  const authUrl = HOST.indexOf('localhost') > -1 ? AUTH_BASE_URL : HOST

  beforeEach(() => {
    cy.get({
      HOST,
      USERNAME,
      PASSWORD,
      INSTITUTION,
      ACTION_DELAY,
      TEST_DELAY,
      ENVIRONMENT,
      AUTH_BASE_URL,
      AUTH_REALM,
      AUTH_CLIENT_ID,
    }).logEnv()

    // Skip authentication on CI
    if (!isCI(ENVIRONMENT)) {
      cy.logout({ root: authUrl, realm: AUTH_REALM })
      cy.login({
        root: authUrl,
        realm: AUTH_REALM,
        client_id: AUTH_CLIENT_ID,
        redirect_uri: HOST,
        username: USERNAME,
        password: PASSWORD,
      })
    }

    cy.viewport(1600, 900)
  })

  const THIS_IS_BETA = isBeta(HOST)
  const testVsOfficial = THIS_IS_BETA ? 'test' : 'official'

  years.forEach((filingPeriod, index) => {
    it(`${filingPeriod}`, function () {
      // Action: List Institutions
      cy.visit(`${HOST}/filing/${filingPeriod}/institutions`)
      cy.wait(ACTION_DELAY)

      const status = filingPeriodStatus[filingPeriod]

      // After Close - Cannot file/refile after Filing period is passed
      if (status.isClosed && status.isPassed) return

      // Filing period is open
      if (status.isOpen || status.isLate) {
        cy.get(`#main-content .institution`, { timeout: 20000 })
          .then($list => {
            // Find target institution
            let institution = $list
              .toArray()
              .filter(x => x.innerText.indexOf(INSTITUTION) > -1)[0]

            if (!institution) throw Error(`${INSTITUTION} not found!`)

            let clicked = false
            cy.wrap(institution)
              .find('.current-status > .ViewButton')
              .then($viewButton => {
                const first = $viewButton[0]
                if (
                  first &&
                  first.innerText.indexOf(
                    `Upload your ${testVsOfficial} file`
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
            const FILENAME = getFilename(filingPeriod, INSTITUTION)

            cy.fixture(FILENAME).then(fileContent => {
              cy.get('.UploadForm input', { force: true }).attachFile({
                fileContent,
                fileName: FILENAME,
                mimeType: 'text/plain',
              })

              // Wait up to 3 hours for upload and processing to complete, then start reviewing edits
              cy.get('.NavButtonContainer > .NavButton').click({
                timeout: timeout3hours,
              })

              // Action: Review Quality Edits
              cy.get('.NavButtonContainer > .NavButton').click()
              cy.wait(ACTION_DELAY)

              /* Action: Verify Quality Edits */
              cy.get('.EditsTableWrapper').then(wrapper => {
                // Verify edits, if triggered
                if (wrapper.find('.Verifier').length)
                  cy.get('#qualityVerifier').check()
                // Move to next step in Submission process
                cy.get('.NavButtonContainer > .NavButton').click()
              })
              cy.wait(ACTION_DELAY)

              /* Action: Verify Macro Edits */
              cy.get('.EditsTableWrapper').then(wrapper => {
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
                  '[Beta Platform] Filing Simulation Complete!'
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
      }
    })
  })
})

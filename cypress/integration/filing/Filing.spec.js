import { isBeta, isCI } from '../../support/helpers'
import { getDefaultConfig } from '../../../src/common/configUtils'
import { deriveConfig } from '../../../src/deriveConfig'
import { getFilingPeriods } from '../../../src/common/constants/configHelpers'

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
  YEARS
} = Cypress.env()
const config = deriveConfig(getDefaultConfig(HOST))
const getFilename = (filingPeriod, lei) => `${filingPeriod}-${lei}.txt`
const years = (YEARS && YEARS.toString().split(',')) || getFilingPeriods(config)
const { filingPeriodStatus } = config

describe("Filing", function() {
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
      AUTH_CLIENT_ID
    }).logEnv()
    
    // Skip authentication on CI
    if(!isCI(ENVIRONMENT)) {
      cy.logout({ root: authUrl, realm: AUTH_REALM })
      cy.login({
        root: authUrl,
        realm: AUTH_REALM,
        client_id: AUTH_CLIENT_ID,
        redirect_uri: HOST,
        username: USERNAME,
        password: PASSWORD
      })
    }
    
    cy.viewport(1600, 900)
  })
  
  years.forEach((filingPeriod, index) => {
    it(`${filingPeriod}`, function() {
      // Action: List Institutions
      cy.visit(`${HOST}/filing/${filingPeriod}/institutions`)
      cy.wait(ACTION_DELAY)

      const status = filingPeriodStatus[filingPeriod]

      // Before Open - Cannot file before a period is open
      if (status.isClosed && !status.isPassed) {
        if (!isBeta(HOST)) {
          cy.contains(`The ${filingPeriod} filing period is not yet open.`).should('exist')
          cy.contains(`The Platform will be open for timely submissions from ${status.startDate} until ${status.lateDate}`).should('exist')
        }
        cy.contains('Upload your file').should('not.exist')
        cy.contains('Upload a new file').should('not.exist')
        return
      }

      // After Close - Cannot file/refile after Filing period is passed
      if (status.isClosed && status.isPassed) {
        cy.contains(`The ${filingPeriod} filing period is closed.`).should('exist')
        cy.contains(`As of ${status.endDate}, submissions of ${filingPeriod} HMDA data are no longer accepted.`).should('exist')
        cy.contains('Upload your file').should('not.exist')
        cy.contains('Upload a new file').should('not.exist')
        cy.contains('For Review Only', { timout: 5000 }).should('exist')
        return
      }

      // Late filing - Can file after timely deadline but should see the message
      if (status.isLate && !isBeta(HOST)) {
        cy.contains(`The ${filingPeriod} filing deadline has passed.`).should('exist')
        cy.contains(`Submissions of ${filingPeriod} data are no longer considered timely as of ${status.lateDate}`).should('exist')
        cy.contains(`The platform will continue to accept resubmissions and late submissions until ${status.endDate}.`).should('exist')
      }

      // Filing period is open
      if (status.isOpen) {
        cy.contains(`HMDA data will be considered timely if completed on or before ${status.lateDate}`).should('exist')
        cy.contains(`Late submissions will not be accepted after ${status.endDate}`).should('exist')
      }

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
              if (first && first.innerText.indexOf('Upload your file') > -1) {
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
              mimeType: 'text/plain'
            })

            // Wait up to 3 minutes for upload to complete, then start reviewing edits
            cy.get('.NavButtonContainer > .NavButton').click({
              timeout: 180000
            })

            // Action: Review Quality Edits
            cy.get('.NavButtonContainer > .NavButton').click()
            cy.wait(ACTION_DELAY)

            /* Action: Verify Quality Edits */
            cy.get('#qualityVerifier').check()
            cy.get('.NavButtonContainer > .NavButton').click()
            cy.get('.Verifier li:first > label').click()
            cy.wait(ACTION_DELAY)

            /* Action: Verify Macro Edits */
            cy.get('#macroVerifier').check()
            cy.get('.NavButtonContainer > .NavButton').click()
            cy.wait(ACTION_DELAY)

            /* Action: Sign Submission */
            if (isBeta(HOST)) {
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
    })
  })
  
})

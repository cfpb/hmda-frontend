import { isBeta, isCI } from '../../support/helpers'
import { getDefaultConfig } from '../../../src/common/configUtils'
import {
  getFilingPeriods,
  sortFilingYears,
} from '../../../src/common/constants/configHelpers'

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

describe('Filing', function () {
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

    // Skip authentication on CI
    if (!isCI(ENVIRONMENT)) {
      cy.hmdaLogin('filing')
      cy.url().should('contains', `${AUTH_BASE_URL}filing/`)
      cy.url().should('contains', `/institutions`)
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
})

describe('Complete Profile Page', () => {
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

    // Skip authentication on CI
    if (!isCI(ENVIRONMENT)) {
      cy.hmdaLogin('filing')
      cy.url().should('contains', `${AUTH_BASE_URL}filing/`)
      cy.url().should('contains', `/institutions`)
    }

    cy.viewport(1600, 900)
  })

  let latestFilingPeriod = sortFilingYears(years).slice(-1)[0]

  it('Navigate to the profile page and ensures the correct information is visible', () => {
    cy.log(latestFilingPeriod)
    cy.visit(`${HOST}/filing/${latestFilingPeriod}/institutions`)
    cy.wait(ACTION_DELAY)

    // Complete your profile page checks
    cy.get(
      '[style="color: black; text-decoration: none; cursor: pointer;"]',
    ).click()
    cy.get('.profile_form_container > :nth-child(1) > input').should(
      'have.value',
      'Frontend',
    )
    cy.get(':nth-child(2) > input').should('have.value', 'Testing')
    cy.get(':nth-child(3) > input').should(
      'have.value',
      'frontend.testing@mailinator.com',
    )
    cy.get('.institutions_checkbox_container').should('have.length', 1)
  })

  it('Removes associated institution, banner should popup saying that one associated institution is required to use the filing platform', () => {
    cy.visit(`${HOST}/filing/${latestFilingPeriod}/institutions`)
    cy.wait(ACTION_DELAY)

    cy.get(
      '[style="color: black; text-decoration: none; cursor: pointer;"]',
    ).click()
    cy.get('.institution_info_container > input').click({ multiple: true })
    cy.get('.profile_form_container > button').click()
    cy.wait(1000)

    cy.get('.alert-heading').contains(
      'An institution must be associated with your account.',
    )
  })

  it('User gets redirected to complete profile page due to now associated LEIs on their account', () => {
    cy.visit(`${HOST}/filing/${latestFilingPeriod}/institutions`)
    cy.wait(5000)

    cy.url().should('contains', '/filing/profile')

    cy.get('.institution_info_container > input').click({ multiple: true })
    cy.get('.profile_form_container > button').click()
    cy.wait(1000)

    // Back button verifies that the institution was re-added to the account
    cy.get('.button').contains('Back')
  })
})

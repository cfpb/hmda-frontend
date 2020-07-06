import "cypress-file-upload"
import { isBeta } from '../../support/helpers'
import { beforeFilingPeriod, afterFilingPeriod } from '../../../src/filing/utils/date'
import { isQuarterly } from '../../../src/filing/api/utils'
import { getDefaultConfig } from '../../../src/common/configUtils'

const PERIODS = ["2018", "2019", "2020-Q1", "2020-Q2"]

const {
  HOST,
  USERNAME,
  PASSWORD,
  INSTITUTION,
  ACTION_DELAY,
  TEST_DELAY
} = Cypress.env()

const config = getDefaultConfig(HOST)
const getFilename = (filingPeriod, lei) => `${filingPeriod}-${lei}.txt`

describe("Filing", function() {
  PERIODS.forEach(filingPeriod => {
    it(`${filingPeriod}`, function() {
      const filingYear = filingPeriod.split('-')[0]

      /* Sign In */
      cy.viewport(1680, 916)
      cy.visit(`${HOST}/filing/${filingPeriod}/`)
      cy.wait(2000) // Wait 2s to allow Keycloak to initialize

      // 2020 goes straight to Keycloak login, no need to click 'login'
      if(+filingYear < 2020){
        cy.get(".hero button:first-of-type").click()
      }

      cy.get("#username").type(USERNAME)
      cy.get("#password").type(PASSWORD, { log: false })
      cy.get("#kc-login").click()

      // Action: List Institutions
      cy.visit(`${HOST}/filing/${filingPeriod}/institutions`)
      cy.wait(ACTION_DELAY)

      // Cannot file before a period is open
      if(beforeFilingPeriod(filingPeriod, config.filingQuarters)){
        cy.contains(`The ${filingPeriod} filing period is not yet open.`).should('exist')
        cy.contains('Upload your file').should('not.exist')
        cy.contains('Upload a new file').should('not.exist')
        return
      }      

      if(afterFilingPeriod(filingPeriod, config.filingQuartersLate)) {
        // Cannot file/refile after a Quarterly Filing period is passed
        if(isQuarterly(filingPeriod)){
          cy.contains('Upload your file').should('not.exist')
          cy.contains('Upload a new file').should('not.exist')
          cy.contains('For Review Only', { timout: 5000 }).should('exist')
          return
        }
        // Can file after Annual period is closed but should see the message 
        else {
          cy.contains(`The ${filingPeriod} filing period is closed.`).should('exist')
        }
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
            .find(".current-status > .ViewButton")
            .then($viewButton => {
              const first = $viewButton[0]
              if (first && first.innerText.indexOf("Upload your file") > -1) {
                /* Start a new Submission */
                first.click()
                clicked = true
              }
            })
            .then(() => {
              if (!clicked) {
                /* Start a Refile */
                cy.wrap(institution)
                  .find(".RefileButton")
                  .click()
                cy.get(".modal button:first-of-type").click()
              }
            })
        })
        .then(() => {
          /* File Upload */
          const FILENAME = getFilename(filingPeriod, INSTITUTION)

          cy.fixture(FILENAME).then(fileContent => {
            cy.get(".UploadForm input", { force: true }).upload({
              fileContent,
              fileName: FILENAME,
              mimeType: "text/plain"
            })

            // Wait up to 2 minutes for upload to complete, then start reviewing edits
            cy.get(".NavButtonContainer > .NavButton").click({
              timeout: 120000
            })

            // Action: Review Quality Edits
            cy.get(".NavButtonContainer > .NavButton").click()
            cy.wait(ACTION_DELAY)

            /* Action: Verify Quality Edits */
            cy.get("#qualityVerifier").check("on")
            cy.get(".NavButtonContainer > .NavButton").click()
            cy.get(".Verifier li:first > label").click()
            cy.wait(ACTION_DELAY)

            /* Action: Verify Macro Edits */
            cy.get("#macroVerifier").check("on")
            cy.get(".NavButtonContainer > .NavButton").click()
            cy.wait(ACTION_DELAY)

            /* Action: Sign Submission */
            if(isBeta(HOST)){
              cy.get(".alert.alert-warning:last").should(
                "contain.text",
                "[Beta Platform] Filing Simulation Complete!"
              )
            } else {
              cy.wait(500)
              cy.get("#signature li:first > label").click({ timeout: 2000 })
              cy.get("#signatureAuth").check("signature", { timeout: 2000 })
              cy.get("#signature > button").click({ timeout: 2000 })
            }
            cy.wait(TEST_DELAY)
          })
        })
      

    })
  })
})

import "cypress-file-upload"
import { isBeta, isCI } from '../../support/helpers'
import { beforeFilingPeriod, afterFilingPeriod } from '../../../src/filing/utils/date'
import { isQuarterly } from '../../../src/filing/api/utils'
import { getDefaultConfig } from '../../../src/common/configUtils'

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
  AUTH_CLIENT_ID
} = Cypress.env()

const config = getDefaultConfig(HOST)
const getFilename = (filingPeriod, lei) => `${filingPeriod}-${lei}.txt`

describe("Filing", function() {
  // Only need to provide the Auth url when running locally
  const authUrl = HOST.indexOf('localhost') > -1 ? AUTH_BASE_URL : HOST

  beforeEach(() => {
    cy.logout({ root: authUrl, realm: AUTH_REALM })
    cy.login({
      root: authUrl,
      realm: AUTH_REALM,
      client_id: AUTH_CLIENT_ID,
      redirect_uri: HOST,
      username: USERNAME,
      password: PASSWORD
    })
    cy.viewport(1600, 900)
    cy.visit(HOST)
  })

  if(isCI(ENVIRONMENT)) it("Does not run on CI")
  else {
    config.filingPeriods.forEach((filingPeriod, index) => {
      if(index !== 0) return // TODO: Remove once we get a single test running
      it(`${filingPeriod}`, function() {
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
  }
})

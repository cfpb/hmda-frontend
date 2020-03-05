import "cypress-file-upload"

const PERIODS = ["2018", "2019"]
const {
  HOST,
  USERNAME,
  PASSWORD,
  INSTITUTION,
  ACTION_DELAY,
  TEST_DELAY
} = Cypress.env()

const getFilename = (filingPeriod, lei) => `${filingPeriod}-${lei}.txt`

describe("Filing", function() {
  PERIODS.forEach(filingPeriod => {
    it(`${filingPeriod}`, function() {

      /* Sign In */
      cy.viewport(1680, 916)
      cy.visit(`${HOST}/filing/${filingPeriod}/`)
      cy.wait(2000) // Wait 2s to allow Keycloak to initialize
      cy.get(".hero button:first-of-type").click()
      cy.get("#username").type(USERNAME)
      cy.get("#password").type(PASSWORD, { log: false })
      cy.get("#kc-login").click()

      // Action: List Institutions
      cy.visit(`${HOST}/filing/${filingPeriod}/institutions`)
      cy.wait(ACTION_DELAY)

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
            cy.wait(500)
            cy.get("#signature li:first > label").click({ timeout: 2000 })
            cy.get("#signatureAuth").check("signature", { timeout: 2000 })
            cy.get("#signature > button").click({ timeout: 2000 })
            cy.wait(TEST_DELAY)
          })
        })
      

    })
  })
})

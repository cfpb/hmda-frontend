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
    if(isCI(ENVIRONMENT)) {
      cy.server()
      cy.route(
        // Method
        'POST', 
        // URL
        `**/auth/realms/${AUTH_REALM}/protocol/openid-connect/auth`, 
        // Response
        `HTTP/1.1 302 Found 
        Date: Tue, 28 Jul 2020 02:57:24 GMT
        Server: envoy
        cache-control: no-store, must-revalidate, max-age=0
        p3p: CP="This is not a P3P policy!"
        x-xss-protection: 1; mode=block
        location: https://localhost/filing/2019/institutions#state=77e5c7d1-8f1c-4cad-8e8e-9cb6c983c215&session_state=d57d1dc3-7dad-44d6-b124-618cd9284b35&code=58c09b55-26bf-4d79-89b3-fb77b1f0ff0f.d57d1dc3-7dad-44d6-b124-618cd9284b35.c749d73d-de71-42fa-aff3-44456890e908
        x-frame-options: SAMEORIGIN
        content-security-policy: frame-src 'self'; frame-ancestors 'self'; object-src 'none';
        x-robots-tag: none
        strict-transport-security: max-age=31536000; includeSubDomains
        x-content-type-options: nosniff
        content-length: 0
        x-envoy-upstream-service-time: 96
        set-cookie: KEYCLOAK_LOCALE=; Version=1; Comment=Expiring cookie; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Max-Age=0; Path=/auth/realms/hmda2/; Secure; HttpOnly
        set-cookie: KC_RESTART=; Version=1; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Max-Age=0; Path=/auth/realms/hmda2/; Secure; HttpOnly
        set-cookie: KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlNTMxNzU4ZC02YTE0LTQ0NGItODM5Ny04MjczOGM0MzIyN2MifQ.eyJleHAiOjE1OTU5NDEwNDQsImlhdCI6MTU5NTkwNTA0NCwianRpIjoiODliMGVhMzYtMGE2Ni00NTkzLWE0NTAtN2EzNGY5ZTk4MjVjIiwiaXNzIjoiaHR0cHM6Ly9obWRhNC5kZW1vLmNmcGIuZ292L2F1dGgvcmVhbG1zL2htZGEyIiwic3ViIjoiMzMzNmM5MTAtY2I1Yy00ZTNiLWJjZDMtN2Q3NTI0OWVkMGM4IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiJkNTdkMWRjMy03ZGFkLTQ0ZDYtYjEyNC02MThjZDkyODRiMzUiLCJzdGF0ZV9jaGVja2VyIjoiRlIyS0ltcFpPZ1RDdGJKQ2JCckNKTE4wcGMwUUU0ak5CaTlxYUYwMTA1SSJ9.dm8JLh_dvGdHS--ZB_2x4K2Nt8UMoayv-_qocd6M0RQ; Version=1; Path=/auth/realms/hmda2/; SameSite=None; Secure; HttpOnly
        set-cookie: KEYCLOAK_IDENTITY_LEGACY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlNTMxNzU4ZC02YTE0LTQ0NGItODM5Ny04MjczOGM0MzIyN2MifQ.eyJleHAiOjE1OTU5NDEwNDQsImlhdCI6MTU5NTkwNTA0NCwianRpIjoiODliMGVhMzYtMGE2Ni00NTkzLWE0NTAtN2EzNGY5ZTk4MjVjIiwiaXNzIjoiaHR0cHM6Ly9obWRhNC5kZW1vLmNmcGIuZ292L2F1dGgvcmVhbG1zL2htZGEyIiwic3ViIjoiMzMzNmM5MTAtY2I1Yy00ZTNiLWJjZDMtN2Q3NTI0OWVkMGM4IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiJkNTdkMWRjMy03ZGFkLTQ0ZDYtYjEyNC02MThjZDkyODRiMzUiLCJzdGF0ZV9jaGVja2VyIjoiRlIyS0ltcFpPZ1RDdGJKQ2JCckNKTE4wcGMwUUU0ak5CaTlxYUYwMTA1SSJ9.dm8JLh_dvGdHS--ZB_2x4K2Nt8UMoayv-_qocd6M0RQ; Version=1; Path=/auth/realms/hmda2/; Secure; HttpOnly
        set-cookie: KEYCLOAK_SESSION=hmda2/3336c910-cb5c-4e3b-bcd3-7d75249ed0c8/d57d1dc3-7dad-44d6-b124-618cd9284b35; Version=1; Expires=Tue, 28-Jul-2020 12:57:24 GMT; Max-Age=36000; Path=/auth/realms/hmda2/; SameSite=None; Secure
        set-cookie: KEYCLOAK_SESSION_LEGACY=hmda2/3336c910-cb5c-4e3b-bcd3-7d75249ed0c8/d57d1dc3-7dad-44d6-b124-618cd9284b35; Version=1; Expires=Tue, 28-Jul-2020 12:57:24 GMT; Max-Age=36000; Path=/auth/realms/hmda2/; Secure
        set-cookie: KEYCLOAK_REMEMBER_ME=; Version=1; Comment=Expiring cookie; Expires=Thu, 01-Jan-1970 00:00:10 GMT; Max-Age=0; Path=/auth/realms/hmda2/; Secure; HttpOnly
        Via: 1.1 hm`
      )
    } else {
      cy.logout({ root: authUrl, realm: AUTH_REALM })
    }
    
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
  
})

import "cypress-file-upload"
import { isCI } from '../../support/helpers'
const { HOST, TEST_DELAY, ENVIRONMENT } = Cypress.env()

describe("FFVT", function() {
  beforeEach(() => {
    cy.viewport(1680, 916)
    cy.visit(`${HOST}/tools/file-format-verification`)
  })

  if(isCI(ENVIRONMENT)) it("Does not run on CI")
  else {
    it("Validates clean 2018+", function() {
      cy.get(
        "div > .UploadForm > .container-upload > .dropzone > .dropzone-content"
      ).click()
      cy.get("div > .UploadForm > .container-upload > .dropzone > input").click({
        force: true
      })
  
      const FILENAME = "FFVT-2018-clean.txt"
  
      cy.fixture(FILENAME).then(fileContent => {
        cy.get(
          "div > .UploadForm > .container-upload > .dropzone > input"
        ).upload({
          fileContent,
          fileName: FILENAME,
          mimeType: "text/plain"
        })
      })
  
      // Validate
      cy.get("#parseErrors .alert").contains("Congratulations")
  
      cy.wait(TEST_DELAY)
    })
  
    it("Catches error 2018+", function() {
      cy.get(
        "div > .UploadForm > .container-upload > .dropzone > .dropzone-content"
      ).click()
      cy.get("div > .UploadForm > .container-upload > .dropzone > input").click({
        force: true
      })
  
      const FILENAME = "FFVT-2018-error.txt"
  
      cy.fixture(FILENAME).then(fileContent => {
        cy.get(
          "div > .UploadForm > .container-upload > .dropzone > input"
        ).upload({
          fileContent,
          fileName: FILENAME,
          mimeType: "text/plain"
        })
      })
  
      // Validate
      cy.get("#parseErrors .alert-heading").contains("1 Formatting Error")
      cy.get("tbody > tr > :nth-child(1)").contains("1")
      cy.get("tbody > tr > :nth-child(2)").contains("Federal Agency")
      cy.get("tbody > tr > :nth-child(3)").contains("taco")
      cy.get("tbody > tr > :nth-child(4)").contains("Integer")
  
      cy.wait(TEST_DELAY)
    })
  }
})

import { isCI } from '../../support/helpers'
import { getOpenFilingYears } from '../../../src/common/constants/configHelpers'
import { getDefaultConfig } from '../../../src/common/configUtils'

const { HOST, TEST_DELAY, ENVIRONMENT } = Cypress.env()
const openYears = getOpenFilingYears(getDefaultConfig(HOST))

const CLEAN_FILE = 'FFVT-2018-clean.txt'
const CLEAN_FILE_BOM = 'FFVT-2018-clean-w-bom.txt'
const ERROR_FILE = 'FFVT-2018-error.txt'
const INVALID_FILE_1 = 'FFVT-Invalid-single-error.abc'
const INVALID_FILE_2 = 'FFVT-Invalid-multi-error.abc'
const INVALID_FILE_ENCODING = 'FFVT-Invalid-utf16.txt'

describe('FFVT', function () {
  beforeEach(() => {
    cy.viewport(1680, 916)
    cy.visit(`${HOST}/tools/file-format-verification`)
  })
 
  // Only need to test a single year since they all use the same endpoint (/v2/public/hmda/parse)
  openYears.slice(0,1).forEach((year) => {
    it(`Validates a clean file for ${year}`, function () {
      cy.get({ HOST, TEST_DELAY, ENVIRONMENT }).logEnv()
      cy.get('select').select(year)
      cy.get(
        'div > .UploadForm > .container-upload > .dropzone > .dropzone-content'
      ).click()
      cy.get('div > .UploadForm > .container-upload > .dropzone > input').click(
        {
          force: true,
        }
      )

      cy.fixture(CLEAN_FILE).then((fileContent) => {
        cy.get(
          'div > .UploadForm > .container-upload > .dropzone > input'
        ).attachFile({
          fileContent,
          fileName: CLEAN_FILE,
          mimeType: 'text/plain',
        })
      })

      // Validate
      cy.get('.alert-success').contains('Congratulations')
      cy.wait(TEST_DELAY)
    })

    it(`Validates a clean file with BOM for ${year}`, function () {
      cy.get({ HOST, TEST_DELAY, ENVIRONMENT }).logEnv()
      cy.get('select').select(year)
      cy.get(
        'div > .UploadForm > .container-upload > .dropzone > .dropzone-content'
      ).click()
      cy.get('div > .UploadForm > .container-upload > .dropzone > input').click(
        {
          force: true,
        }
      )

      cy.fixture(CLEAN_FILE_BOM).then((fileContent) => {
        cy.get(
          'div > .UploadForm > .container-upload > .dropzone > input'
        ).attachFile({
          fileContent,
          fileName: CLEAN_FILE_BOM,
          mimeType: 'text/plain',
        })
      })

      // Validate
      cy.get('.alert-success').contains('Congratulations')
      cy.wait(TEST_DELAY)
    })

    it(`Catches formatting errors in a file for ${year}`, function () {
      cy.get({ HOST, TEST_DELAY, ENVIRONMENT }).logEnv()
      cy.get('select').select(year)
      cy.get(
        'div > .UploadForm > .container-upload > .dropzone > .dropzone-content'
      ).click()
      cy.get('div > .UploadForm > .container-upload > .dropzone > input').click(
        {
          force: true,
        }
      )

      cy.fixture(ERROR_FILE).then((fileContent) => {
        cy.get(
          'div > .UploadForm > .container-upload > .dropzone > input'
        ).attachFile({
          fileContent,
          fileName: ERROR_FILE,
          mimeType: 'text/plain',
        })
      })

      // Validate
      cy.get('#parseErrors .alert-heading').contains('2 Formatting Errors')
      cy.get('tbody > tr > :nth-child(1)').contains('1')
      cy.get('tbody > tr > :nth-child(2)').contains('Federal Agency')
      cy.get('tbody > tr > :nth-child(3)').contains('taco')
      cy.get('tbody > tr > :nth-child(4)').contains('Integer')
      cy.wait(TEST_DELAY)
    })

    it('Identifies invalid file extensions', () => {
      cy.get('select').select(year)
      cy.get(
        'div > .UploadForm > .container-upload > .dropzone > .dropzone-content'
      ).click()
      cy.get('div > .UploadForm > .container-upload > .dropzone > input').click(
        {
          force: true,
        }
      )

      cy.fixture(INVALID_FILE_1).then((fileContent) => {
        cy.get(
          'div > .UploadForm > .container-upload > .dropzone > input'
        ).attachFile({
          fileContent,
          fileName: INVALID_FILE_1,
          mimeType: 'text/plain',
        })
      })

      // Validate
      cy.get('.alert-error .alert-heading').contains('Invalid File')
      cy.get('.alert-error .alert-text').contains('Please check your file and re-upload.').should('have.length', 1)
      cy.wait(TEST_DELAY)
    })

    it('Identifies invalid file encoding', () => {
      cy.get('select').select(year)
      cy.get(
        'div > .UploadForm > .container-upload > .dropzone > .dropzone-content'
      ).click()
      cy.get('div > .UploadForm > .container-upload > .dropzone > input').click(
        {
          force: true,
        }
      )

      cy.fixture(INVALID_FILE_ENCODING).then((fileContent) => {
        cy.get(
          'div > .UploadForm > .container-upload > .dropzone > input'
        ).attachFile({
          fileContent,
          fileName: INVALID_FILE_ENCODING,
          mimeType: 'text/plain',
        })
      })

      // Validate
      cy.get('.alert-error .alert-heading').contains('Invalid File')
      cy.get('.alert-error .alert-text').contains('The file you uploaded is not UTF-8 encoded. Please check your file and re-upload.').should('have.length', 1)
      cy.wait(TEST_DELAY)
    })
    
    it('Identifies multiple file validity issues', () => {
      cy.get('select').select(year)
      cy.get(
        'div > .UploadForm > .container-upload > .dropzone > .dropzone-content'
      ).click()
      cy.get('div > .UploadForm > .container-upload > .dropzone > input').click(
        {
          force: true,
        }
      )

      cy.fixture(INVALID_FILE_2).then((fileContent) => {
        cy.get(
          'div > .UploadForm > .container-upload > .dropzone > input'
        ).attachFile({
          fileContent,
          fileName: INVALID_FILE_2,
          mimeType: 'text/plain',
        })
      })

      // Validate
      cy.get('.alert-error .alert-heading').contains('Invalid File')
      cy.get('.alert-error .alert-text').contains('The file you uploaded is not UTF-8 encoded. Please check your file and re-upload.').should('have.length', 1)
      cy.get('.alert-error .alert-text').contains('The file you uploaded is not a text file (.txt). Please check your file and re-upload.').should('have.length', 1)
      cy.wait(TEST_DELAY)
    })
  })
})
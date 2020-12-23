import 'cypress-file-upload'
import { isCI } from '../../support/helpers'
import { getOpenFilingYears } from '../../../src/common/constants/configHelpers'
import { getDefaultConfig } from '../../../src/common/configUtils'

const { HOST, TEST_DELAY, ENVIRONMENT } = Cypress.env()
const openYears = getOpenFilingYears(getDefaultConfig(HOST))

const CLEAN_FILE = 'FFVT-2018-clean.txt'
const ERROR_FILE = 'FFVT-2018-error.txt'

describe('FFVT', function () {
  beforeEach(() => {
    cy.viewport(1680, 916)
    cy.visit(`${HOST}/tools/file-format-verification`)
  })

  if (isCI(ENVIRONMENT)) it('Does not run on CI')
  // For all open years
  openYears.forEach((year) => {
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
        ).upload({
          fileContent,
          fileName: CLEAN_FILE,
          mimeType: 'text/plain',
        })
      })

      // Validate
      cy.get('#parseErrors .alert').contains('Congratulations')
      cy.wait(TEST_DELAY)
    })

    it(`Catches errors in a file for ${year}`, function () {
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
        ).upload({
          fileContent,
          fileName: ERROR_FILE,
          mimeType: 'text/plain',
        })
      })

      // Validate
      cy.get('#parseErrors .alert-heading').contains('1 Formatting Error')
      cy.get('tbody > tr > :nth-child(1)').contains('1')
      cy.get('tbody > tr > :nth-child(2)').contains('Federal Agency')
      cy.get('tbody > tr > :nth-child(3)').contains('taco')
      cy.get('tbody > tr > :nth-child(4)').contains('Integer')
      cy.wait(TEST_DELAY)
    })
  })
})
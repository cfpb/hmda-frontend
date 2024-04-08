import { isBeta } from '../../support/helpers'
import { onlyOn } from '@cypress/skip-test'

const { HOST, TEST_DELAY, ENVIRONMENT } = Cypress.env()

// Test files
const CLEAN_FILE = 'FFVT-2018-clean.txt'
const CLEAN_FILE_BOM = 'FFVT-2018-clean-w-bom.txt'
const PARSE_ERROR_FILE = 'FFVT-2018-error.txt'
const INVALID_FILE_1 = 'FFVT-Invalid-single-error.abc'
const INVALID_FILE_2 = 'FFVT-Invalid-multi-error.abc'
const INVALID_FILE_ENCODING = 'FFVT-Invalid-utf16.txt'

// Helper functions
const isValid = () => cy.get('.alert-success').contains('Congratulations')

const isNotValid = () =>
  cy.get('.alert-error .alert-heading').contains('Invalid File')

const isNotTxt = () =>
  cy
    .get('.alert-error .alert-text')
    .contains(
      'The file you uploaded is not a text file (.txt). Please check your file and re-upload.',
    )
    .should('have.length', 1)

const isNotUTF8 = () =>
  cy
    .get('.alert-error .alert-text')
    .contains('Verify that your file is UTF-8 encoded.')
    .should('have.length', 1)

const uploadFile = (filename) => {
  cy.fixture(filename).then((fileContent) => {
    cy.get(
      'div > .UploadForm > .container-upload > .dropzone > input',
    ).attachFile({
      fileContent,
      fileName: filename,
      mimeType: 'text/plain',
    })
  })
}

onlyOn(isBeta(HOST), () => {
  describe('FFVT', function () {
    it('Does not run in Beta environments', () => {})
  })
})

// Spec
onlyOn(!isBeta(HOST), () => {
  describe('FFVT', () => {
    beforeEach(() => {
      cy.viewport(1680, 916)
      cy.visit(`${HOST}/tools/file-format-verification`)
      cy.get({ HOST, TEST_DELAY, ENVIRONMENT }).logEnv()
      cy.get('div > .UploadForm > .container-upload > .dropzone > input').click(
        { force: true },
      )
    })

    afterEach(() => cy.wait(TEST_DELAY))

    it(`Validates a clean file`, () => {
      uploadFile(CLEAN_FILE)
      isValid()
    })

    it(`Validates a clean file with BOM`, () => {
      uploadFile(CLEAN_FILE_BOM)
      isValid()
    })

    it(`Catches formatting errors in a file`, () => {
      uploadFile(PARSE_ERROR_FILE)
      cy.get('#parseErrors .alert-heading').contains('2 Formatting Errors')

      // TS Error
      cy.get('tbody:first > tr > :nth-child(1)').contains('1')
      cy.get('tbody:first > tr > :nth-child(2)').contains('Federal Agency')
      cy.get('tbody:first > tr > :nth-child(3)').contains('taco')
      cy.get('tbody:first > tr > :nth-child(4)').contains('Integer')

      // LAR Error
      cy.get('tbody:not(:first) > tr > :nth-child(1)').contains('11')
      cy.get('tbody:not(:first) > tr > :nth-child(2)').contains(
        'MEISSADIATESTBANK001MGJIPL5D07WUU8HO33EPNI975',
      )
      cy.get('tbody:not(:first) > tr > :nth-child(3)').contains(
        'Incorrect Number of LAR Fields',
      )
      cy.get('tbody:not(:first) > tr > :nth-child(4)').contains('109')
      cy.get('tbody:not(:first) > tr > :nth-child(5)').contains('110 Fields')
    })

    it('Catches invalid file extension', () => {
      uploadFile(INVALID_FILE_1)
      isNotValid()
      isNotTxt()
    })

    it('Catches invalid file encoding', () => {
      uploadFile(INVALID_FILE_ENCODING)
      isNotValid()
      isNotUTF8()
    })

    it('Catches multiple file validity issues', () => {
      uploadFile(INVALID_FILE_2)
      isNotValid()
      isNotUTF8()
      isNotTxt()
    })
  })
})

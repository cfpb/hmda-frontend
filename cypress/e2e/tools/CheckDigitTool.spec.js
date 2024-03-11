import { isBeta, isCI, isProd, withFormData } from '../../support/helpers'
import { onlyOn } from '@cypress/skip-test'

const { HOST, TEST_DELAY, ENVIRONMENT } = Cypress.env()

onlyOn(!isCI(ENVIRONMENT) && (isBeta(HOST) || !isProd(HOST)), () => {
  describe('Check Digit Tool UI', function () {
    it(
      isBeta(HOST)
        ? 'Does not run in Beta environments'
        : `Does not run on ${HOST}`,
      () => {},
    )
  })
})

onlyOn(isCI(ENVIRONMENT) || (isProd(HOST) && !isBeta(HOST)), () => {
  describe('Check Digit Tool UI', () => {
    beforeEach(() => {
      cy.viewport(1680, 916)
      cy.visit(`${HOST}/tools/check-digit`)
    })
    it('Generates a check digit', () => {
      cy.get({ HOST, TEST_DELAY }).logEnv()

      cy.get('.item > .Form > .unstyled-list > li > #getCheckDigit').click()

      cy.get('.grid > .item > .Form > div > #dataInput').click()

      cy.get('.grid > .item > .Form > div > #dataInput').type(
        'TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOZ',
      )

      cy.get('#main-content > .grid > .item > .Form > input').click()

      // Validate
      cy.get('.alert-heading').contains('generated!')
      cy.get('.alert-text').contains('Your check digit is 46')
      cy.get('.alert-text').contains(
        'TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOZ46',
      )

      cy.wait(TEST_DELAY)
    })

    it('Validates a check digit', () => {
      cy.get({ HOST, TEST_DELAY }).logEnv()

      cy.get(
        '.item > .Form > .unstyled-list > li > #validateCheckDigit',
      ).click()
      cy.get('.item > .Form > .unstyled-list > li > #validateCheckDigit').type(
        'validate',
      )
      cy.get('.grid > .item > .Form > div > #dataInput').click()
      cy.get('.grid > .item > .Form > div > #dataInput').type(
        'TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOZ46',
      )
      cy.get('#main-content > .grid > .item > .Form > input').click()

      // Validate
      cy.get('.alert-text').contains('The ULI is valid')

      cy.wait(TEST_DELAY)
    })
  })

  describe('Check Digit API', () => {
    it('Generates Check Digit file', function () {
      cy.get({ HOST, TEST_DELAY }).logEnv()

      // https://stackoverflow.com/questions/47533989/upload-file-with-cypress-io-via-request

      let response
      const fileName = 'CheckDigit_Generate.csv'
      const method = 'POST'
      const url = `${HOST}/v2/public/uli/checkDigit/csv`
      const fileType = 'application/json'
      const expectedAnswer =
        'loanId,checkDigit,uli\n' +
        'TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOA,24,TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOA24\n' +
        'TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOB,21,TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOB21\n' +
        'TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOC,18,TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOC18\n' +
        'TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOD,15,TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOD15\n' +
        'TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOE,12,TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOE12\n' +
        'TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOF,09,TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOF09\n'

      // Get file from fixtures as binary
      cy.fixture(fileName, 'binary').then((excelBin) => {
        // File in binary format gets converted to blob so it can be sent as Form data
        const blob = Cypress.Blob.binaryStringToBlob(excelBin, fileType)

        // Build up the form
        const formData = new FormData()
        formData.set('file', blob, fileName) //adding a file to the form
        // Perform the request
        withFormData(method, url, formData, function (res) {
          response = res
        })

        cy.wrap(null).should(() => {
          expect(response.status).to.eq(200)
          expect(expectedAnswer).to.equal(response.response)
        })

        cy.wait(TEST_DELAY)
      })
    })

    it('Validates Check Digits file', function () {
      cy.get({ HOST, TEST_DELAY }).logEnv()

      // https://stackoverflow.com/questions/47533989/upload-file-with-cypress-io-via-request

      let response
      const fileName = 'CheckDigit_Validate.csv'
      const method = 'POST'
      const url = `${HOST}/v2/public/uli/validate/csv`
      const fileType = 'application/json'
      const expectedAnswer =
        'uli,isValid\n' +
        'TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOA24,true\n' +
        'TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOB21,true\n' +
        'TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOC18,true\n' +
        'TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOD15,true\n' +
        'TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOE12,true\n' +
        'TESTBANKTESTBANK01JAJZMZSDXF8A57HP1HJZQOF09,true\n'

      // Get file from fixtures as binary
      cy.fixture(fileName, 'binary').then((excelBin) => {
        // File in binary format gets converted to blob so it can be sent as Form data
        const blob = Cypress.Blob.binaryStringToBlob(excelBin, fileType)

        // Build up the form
        const formData = new FormData()
        formData.set('file', blob, fileName) //adding a file to the form
        // Perform the request
        withFormData(method, url, formData, function (res) {
          response = res
        })

        cy.wrap(null).should(() => {
          expect(response.status).to.eq(200)
          expect(expectedAnswer).to.equal(response.response)
        })

        cy.wait(TEST_DELAY)
      })
    })
  })
})

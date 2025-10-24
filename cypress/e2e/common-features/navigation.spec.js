import { onlyOn } from '@cypress/skip-test'
import { isBeta, isCI } from '../../support/helpers'
const { HOST, ENVIRONMENT } = Cypress.env()

let baseURLToVisit = isCI(ENVIRONMENT) ? 'http://localhost:3000' : HOST

onlyOn(isBeta(HOST), () => {
  describe('Site navigation', function () {
    it('Does not run in Beta environments', () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe('HMDA homepage hero navigation', { tags: ['@smoke'] }, () => {
    // HMDA's homepage has four "quick links" leading to core pages
    const quickLinks = [
      { text: 'Rate Spread Calculator', pageHeading: 'Rate Spread Calculator' },
      { text: 'HMDA Filing Platform', pageHeading: 'File your HMDA Data' },
      { text: 'Frequently Asked Questions', pageHeading: 'Frequently Asked Questions' },
      { text: 'Filing Instructions Guide', pageHeading: 'Filing Instructions Guide' }
    ]

    quickLinks.forEach(({ text, pageHeading }) => {
      it(`Allows visitors to navigate to ${text} page`, () => {
        cy.visit(`${baseURLToVisit}/`)
        // Quick links have hardcoded `<br>` tags that need to be stripped out
        const cleanText = new RegExp(text.replace(/\s+/g, '\\s*'), 'i')
        cy.get('#quicklinks a').contains(cleanText).click()
        cy.get('h1').should('contain', pageHeading)
      })
    })
  })

})

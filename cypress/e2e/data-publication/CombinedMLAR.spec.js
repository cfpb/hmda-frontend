const { HOST } = Cypress.env()

const years = [2022]
describe('Combined MLAR', () => {
  years.forEach(year => {
    it(`Verify Files Exist ${year}`, () => {
      cy.visit(`${HOST}/data-publication/modified-lar/${year}`);
      cy.request({
        method: 'HEAD',
        url: `https://s3.amazonaws.com/cfpb-hmda-public/prod/dynamic-data/combined-mlar/${year}/header/${year}_combined_mlar_header.zip`})
        .its('status')
        .should('equal', 200)
      cy.request({
        method: 'HEAD',
        url: `https://s3.amazonaws.com/cfpb-hmda-public/prod/dynamic-data/combined-mlar/${year}/${year}_combined_mlar.zip`})
        .its('status')
        .should('equal', 200)
      });
  });
      // Assertions or further actions can be added here
    
});
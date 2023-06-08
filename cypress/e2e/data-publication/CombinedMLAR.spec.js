const { HOST } = Cypress.env()

describe('Combined MLAR', () => {
    it('should click the button with id "testbutton"', () => {
      // Visit the specific URL
      cy.visit(`${HOST}/data-publication/modified-lar/2022`);
  

  
      // Assertions or further actions can be added here
    });
  });
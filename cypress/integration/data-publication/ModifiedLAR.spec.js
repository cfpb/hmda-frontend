import { onlyOn } from '@cypress/skip-test'
import { isBeta } from "../../support/helpers"
const { HOST, ACTION_DELAY, TEST_DELAY } = Cypress.env()

onlyOn(isBeta(HOST), () => {
  describe("Modified LAR", function() {
    it("Does not run on Beta", () => {})
  })
})

onlyOn(!isBeta(HOST), () => {
  describe("Modified LAR", function() {
    it("Searches and finds correct link for 2018", function() {
      cy.viewport(1680, 867)
  
      cy.visit(`${HOST}/data-publication/modified-lar/2018`)
  
      cy.get(
        "#main-content > .SearchList > form > div > #institution-name"
      ).click()
  
      cy.get("#main-content > .SearchList > form > div > #institution-name").type(
        "cypress"
      )

      cy.wait(ACTION_DELAY)
  
      cy.get("#root > .App > #main-content > .SearchList > h4").contains(
        "1 results found"
      )
  
      cy.get("#main-content > .SearchList > .Results > li > p").contains(
        "549300I4IUWMEMGLST06"
      )
  
      cy.get("#main-content > .SearchList > .Results > li > .font-small").then(
        $el => {
          expect($el).to.have.text("Download Modified LAR ")
          expect($el).to.have.attr(
            "href",
            "https://s3.amazonaws.com/cfpb-hmda-public/prod/modified-lar/2018/549300I4IUWMEMGLST06.txt"
          )          
        }
      )
  
      cy.get(".App > #main-content > .SearchList > p > #inclHeader").click()
  
      cy.get(".App > #main-content > .SearchList > p > #inclHeader").check("true")
      
      cy.wait(ACTION_DELAY)
  
      cy.get("#main-content > .SearchList > .Results > li > .font-small").should(
        $el => {
          expect($el).to.have.text("Download Modified LAR with Header")
          expect($el).to.have.attr(
            "href",
            "https://s3.amazonaws.com/cfpb-hmda-public/prod/modified-lar/2018/header/549300I4IUWMEMGLST06_header.txt"
          )
        }
      )
    })
  
    it("Searches and finds correct link for 2017", function() {
      cy.viewport(1680, 867)

      cy.visit(`${HOST}/data-publication/modified-lar/2017`)

      cy.get(
        "#root > .App > #main-content > .YearSelector > a:nth-child(3)"
      ).click()

      cy.wait(ACTION_DELAY)

      cy.get(
        "#main-content > .SearchList > form > div > #institution-name"
      ).click()

      // cy.get(
      //   "#main-content > .SearchList > form > div > #institution-name"
      // ).click()

      cy.get(
        "#main-content > .SearchList > form > div > #institution-name"
      ).type("cypress")

      cy.wait(ACTION_DELAY)

      cy.get("#main-content > .SearchList > .Results > li > p").contains(
        "729178"
      )

      cy.get("#main-content > .SearchList > .Results > li > .font-small").then(
        $el => {
          expect($el).to.have.text("Download Modified LAR ")
          expect($el).to.have.attr(
            "href",
            "https://s3.amazonaws.com/cfpb-hmda-public/prod/modified-lar/2017/729178.txt"
          )          
        }
      )

      cy.get(".App > #main-content > .SearchList > p > #inclHeader").click()

      cy.get(".App > #main-content > .SearchList > p > #inclHeader").check(
        "true"
      )

      cy.wait(ACTION_DELAY)

      cy.get("#main-content > .SearchList > .Results > li > .font-small").then(
        $el => {
          expect($el).to.have.text("Download Modified LAR with Header")
          expect($el).to.have.attr(
            "href",
            "https://s3.amazonaws.com/cfpb-hmda-public/prod/modified-lar/2017/header/729178_header.txt"
          )             
        }
      )

      cy.wait(TEST_DELAY)
    })
  
   it("Has the right documentation link", function() {
     cy.viewport(1680, 867)
  
     cy.visit(`${HOST}/data-publication/modified-lar/2018`)
  
     cy.get(".App > #main-content > .heading > p > a").click()
  
     cy.get("#root > .App > #main-content > .DocSection > h2").contains(
       "Modified LAR"
     )

     cy.wait(TEST_DELAY)
   })  
  })
})

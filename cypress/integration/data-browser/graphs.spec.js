import {
  firstGraphURLQuery,
  firstGraphURL,
  ALL_GRAPHS_ENDPOINT,
  buildURL,
  firstGraphEndpoint,
  devURL,
} from "../../fixtures/mockGraphData-";

import { isCI } from "../../support/helpers";

const { HOST, ENVIRONMENT } = Cypress.env();

let baseURLToVisit = isCI(ENVIRONMENT) ? "http://localhost:3000" : HOST;

describe.skip("General Tests", () => {
  it("URL Re-direct which contains base period selections and series", () => {
    cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`);
    cy.get(".react-select__graph__control")
      .click(0, 0, { force: true })
      .find('[class*="-singleValue"]')
      .eq(0)
      .contains("How has the number of applications changed?")
      .click(0, 0, { force: true });
    cy.url().should("include", firstGraphURLQuery);
    cy.url().should("eq", baseURLToVisit + firstGraphURL);
  });

  it("Checks <GraphsHeader/> component if overview props was not sent to the component", () => {
    cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`);
    let overviewHeader = cy.get(".Graphs > :nth-child(2)");
    if (!ALL_GRAPHS_ENDPOINT.endpoint) {
      overviewHeader.contains(
        "The following graphs present data for the financial institutions reporting HMDA quarterly data."
      );
    }
  });

  it("Checks <GraphsHeader/> component if overview props was sent to the component", () => {
    let overviewHeader = cy.get(".Graphs > :nth-child(2)");
    if (ALL_GRAPHS_ENDPOINT.endpoint) {
      overviewHeader.contains(
        ALL_GRAPHS_ENDPOINT.overview +
          "Though the graphs provide some insight into trends for these institutions, they should not be taken to represent the behavior of all mortgage lenders during the relevant period." +
          "Use the menu below to select a graph."
      );
    }
  });

  it("Selects first graph from graph drop-down list and checks url contains query parameters", () => {
    cy.get(".react-select__graph__control")
      .click(0, 0, { force: true })
      .find('[class*="-singleValue"]')
      .eq(0)
      .contains("How has the number of applications changed?")
      .click(0, 0, { force: true });
    cy.url().should("include", firstGraphURLQuery);
    cy.url().should("eq", baseURLToVisit + firstGraphURL);
  });

  it("Link button copies URL", () => {
    cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`);
    cy.get(".CopyURLButton").click(0, 0, { force: true });
    cy.url().should("eq", baseURLToVisit + firstGraphURL);
  });
});

describe("Graph Specific tests", () => {
  it("Select first graph from API and then switch to a different graph", () => {
    cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`)
    cy.get(".react-select__graph__control")
      .click(0, 0, { force: true })
      .find('[class*="-singleValue"]')
      .eq(0)
      .click(0, 0, { force: true })
      .contains("How has the number of applications changed?")
    // Change to a different graph
    cy.get(".react-select__graph__control")
      .click(0, 0, { force: true })
      .find(".react-select__graph__menu-list")
      .find("#react-select-2-option-0-0")
      .click(0, 0, { force: true })
      .contains("How has the median CLTV changed?")
      .click(0, 0, { force: true })
  });

  // it("Selects first option from graph drop-down, changes periods, update url with selected periods, clicks 'Show All Quarters' button and update url with default periods", () => {
  //   // Choose first option from drop-down
  //   cy.get(".react-select__graph__control")
  //     .click(0, 0, { force: true })
  //     .get('[class*="-menu"]')
  //     .find('[class*="-option"]')
  //     .eq(0)
  //     .click(0, 0, { force: true })
  //     .find('[class*="-singleValue"]')
  //     .contains("How has the number of applications changed?")
  //   // Selects 2nd option from period selector start
  //   cy.get(".react-select__period_start__control")
  //     .click(0, 0, { force: true })
  //     .get('[class*="-menu"]')
  //     .find('[class*="-option"]')
  //     .eq(1)
  //     .contains("2018-Q2")
  //     .click(0, 0, { force: true });
  //   // Selects 6th option from period selector end
  //   cy.get(".react-select__period_end__control")
  //     .click(0, 0, { force: true })
  //     .get('[class*="-menu"]')
  //     .find('[class*="-option"]')
  //     .eq(5)
  //     .contains("2019-Q4")
  //     .click(0, 0, { force: true });
  //   // Update URL with period selection and series
  //   let urlUpdate = buildURL(
  //     baseURLToVisit,
  //     "applications",
  //     "2018-Q2",
  //     "2019-Q4",
  //     firstGraphEndpoint.series
  //   );
  //   cy.url("include", urlUpdate);
  //   cy.url("eq", urlUpdate);
  //   // Clicks `Show All Quarters` button
  //   cy.get(".period-wrapper").get(".reset").click();
  //   // Update URL with period selection and series
  //   urlUpdate = buildURL(
  //     baseURLToVisit,
  //     "applications",
  //     "2018-Q1",
  //     "2021-Q4",
  //     firstGraphEndpoint.series
  //   );
  //   cy.url("include", urlUpdate);
  //   cy.url("eq", urlUpdate);
  // });

  // it("De-select and re-select a series and have the URL change/update the in the UI", () => {
  //   let urlUpdate;
  //   cy.visit(`${baseURLToVisit}/data-browser/graphs/quarterly`);
  //   cy.get(".highcharts-color-0 > text").click(0, 0, { force: true });
  //   urlUpdate = buildURL(baseURLToVisit, "applications", "2018-Q1", "2021-Q4", [
  //     "Conventional Non-Conforming",
  //     "FHA",
  //     "HELOC",
  //     "RHS/FSA",
  //     "VA",
  //   ]);
  //   cy.url("include", urlUpdate);
  //   cy.url("eq", urlUpdate);
  //   cy.get(".highcharts-color-0 > text").click(0, 0, { force: true });
  //   urlUpdate = buildURL(baseURLToVisit, "applications", "2018-Q1", "2021-Q4", [
  //     "Conventional Conforming",
  //     "Conventional Non-Conforming",
  //     "FHA",
  //     "HELOC",
  //     "RHS/FSA",
  //     "VA",
  //   ]);
  //   cy.url("include", urlUpdate);
  //   cy.url("eq", urlUpdate);
  // });

  // it("URL loads with specific set of series and it's reflected in the UI", () => {
  //   let series = ["FHA", "HELOC", "VA"];
  //   cy.visit(
  //     `${baseURLToVisit}/data-browser/graphs/quarterly/applications?periodLow=2018-Q1&periodHigh=2021-Q4&visibleSeries=FHA,HELOC,VA`
  //   );
  //   cy.wait(1000);
  //   cy.url("include", series);
  // });
});

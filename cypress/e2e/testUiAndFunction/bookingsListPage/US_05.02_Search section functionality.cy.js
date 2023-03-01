/// <reference types="Cypress" />

import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import BookingsListPage from "../../../pageObjects/BookingsListPage";

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();

describe("US_05.01_Search section functionality", () => {
  const AGENT = Cypress.env("agent");

  before(() => {
    cy.visit("/");
    cy.login(AGENT.email, AGENT.password);

    //Precondition
    leftMenuPanel.clickBookingManagementIcon();
  });

  it("AT_05.02.03| Verify that the clear button is clickable and removes all inputs", () => {
    
    bookingsListPage.typeRandomWordInSearchField();
    bookingsListPage.clickClearLink();

    bookingsListPage.getSearchField().should("be.empty");
  });
});

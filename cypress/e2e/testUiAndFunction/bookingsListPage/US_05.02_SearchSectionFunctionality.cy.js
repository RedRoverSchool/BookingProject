/// <reference types="Cypress" />

import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();

describe("US_05.02_Search section functionality", () => {
  const AGENT = Cypress.env("agent");

  before(() => {
    cy.loginWithSession(AGENT.email, AGENT.password);
    cy.visit("/");

    //Precondition
    leftMenuPanel.clickBookingManagementIcon();
  });

  it("AT_05.02.03.01| Verify the Сlear anchor is clickable and removes all input data from the placeholder field Search", () => {
    bookingsListPage.typeRandomWordInSearchField();
    bookingsListPage.clickClearLink();

    bookingsListPage.getSearchField().should("be.empty");
  });
});

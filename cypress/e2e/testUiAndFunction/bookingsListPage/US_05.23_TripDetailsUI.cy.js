/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

const MANAGER = Cypress.env("manager");
const AGENT = Cypress.env("agent");
const CI = Cypress.env("CI");

function testCreatingReservationForPassengerType(passengerName) {
  createBookingPage.clickCalendarNextButton();
  createBookingPage.clickSaturdayButton();

  cy.intercept("/tools/**").as("getTrip");
  cy.wait("@getTrip");

  createBookingPage.clickFirstTripCard();
  createBookingPage.typeIntoMainPassengerNameField(passengerName);
  createBookingPage.clickReservationTicketArrow();
  createBookingPage.clickReservationTicketButton();
}

describe("US_05.23 | Trip detais UI", () => {
  beforeEach(function () {
    cy.fixture("createBookingPage").then((createBookingPage) => {
      this.createBookingPage = createBookingPage;
    });
  });

  beforeEach(function () {
    cy.cleanCiData(MANAGER.email, MANAGER.password, CI);

    cy.visit("/");
    cy.login(AGENT.email, AGENT.password);

    testCreatingReservationForPassengerType(
      this.createBookingPage.inputField.main_passenger.name
    );
  });

  it("AT_05.23.01 | Verify departure time is in 24-hour notation HH:MM", function () {
    createBookingPage.getDepartureTime().then(($span) => {
      const text = $span.text();
      expect(text).to.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);
    });
  });
});

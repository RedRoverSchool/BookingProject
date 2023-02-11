/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

const MANAGER = Cypress.env("manager");
const AGENT = Cypress.env("agent");
const CI = Cypress.env("CI");

function createReservation(passengerName) {
  createBookingPage.clickCalendarNextButton();
  createBookingPage.clickSaturdayButton();

  cy.intercept("/tools/**").as("getTrip");
  cy.wait("@getTrip");

  createBookingPage.clickFirstTripCard();
  createBookingPage.typeIntoMainPassengerNameField(passengerName);
  createBookingPage.clickReservationTicketArrow();
  createBookingPage.clickReservationTicketButton();
}

describe.skip("US_05.23 | Trip detais UI", () => {
  beforeEach(function () {
    cy.fixture("createBookingPage").then((createBookingPage) => {
      this.createBookingPage = createBookingPage;
    });
  });

  beforeEach(function () {
    cy.cleanCiData(MANAGER.email, MANAGER.password, CI);

    cy.visit("/");
    cy.login(AGENT.email, AGENT.password);

    createReservation(
      this.createBookingPage.inputField.main_passenger.name
    );
  });

  it('AT_05.23.01 | Verify departure time is in 24-hour notation HH:MM', function () {
    const timeFormat = createBookingPage.timeFormat;
    const timeFormatRegExp = new RegExp(timeFormat);

    createBookingPage.getDepartureTime().then(($span) => {
      const time = $span.text();
      expect(time).to.match(timeFormatRegExp);
    });
  });

  it('AT_05.23.02 | Verify departure date has format DD-MM-YYYY', function () {
    const dateFormat = createBookingPage.dateFormat;
    const dateFormatRegExp = new RegExp(dateFormat);

    createBookingPage.getDepartureDate().then(($span) => {
      const date = $span.text();
      expect(date).to.match(dateFormatRegExp);
    });
  });

  it('AT_05.23.03 | Verify arrival time is in 24-hour notation HH:MM', function () {
    const timeFormat = createBookingPage.timeFormat;
    const timeFormatRegExp = new RegExp(timeFormat);

    createBookingPage.getArrivalTime().then(($span) => {
      const time = $span.text();
      expect(time).to.match(timeFormatRegExp);
    });
  });
});
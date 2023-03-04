/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env("agent");


function createReservation(passengerName) {
  cy.intercept('/tools/ping/**').as('getToolsPing')
    
  createBookingPage.clickCalendarNextButton();
  createBookingPage.clickSaturdayButton();

  cy.wait('@getToolsPing')

  createBookingPage.clickFirstTripCard();
  cy.wait('@getToolsPing')
  createBookingPage.typeIntoMainPassengerNameField(passengerName);
  
  createBookingPage.clickReservationTicketArrow();
  createBookingPage.clickReservationTicketButton();
  cy.wait('@getToolsPing')
}

describe.skip("US_05.23 | Trip detais UI", () => {
  beforeEach(function () {
    cy.fixture("createBookingPage").then((createBookingPage) => {
      this.createBookingPage = createBookingPage;
    });
  });

  beforeEach(function () {
    cy.cleanData()

    cy.loginWithSession(AGENT.email, AGENT.password)
    cy.visit('/')
    
    createReservation(
      this.createBookingPage.inputField.main_passenger.name
    );
  });

  it('AT_05.23.01 | Verify departure time is in 24-hour notation HH:MM', function () {
    const timeFormat = this.createBookingPage.timeFormat;
    const timeFormatRegExp = new RegExp(timeFormat);

    createBookingPage.getDepartureTime().then(($span) => {
      const time = $span.text();
      expect(time).to.match(timeFormatRegExp);
    });
  });

  it('AT_05.23.02 | Verify departure date has format DD-MM-YYYY', function () {
    const dateFormat = this.createBookingPage.dateFormat;
    const dateFormatRegExp = new RegExp(dateFormat);

    createBookingPage.getDepartureDate().then(($span) => {
      const date = $span.text();
      expect(date).to.match(dateFormatRegExp);
    });
  });

  it('AT_05.23.03 | Verify arrival time is in 24-hour notation HH:MM', function () {
    const timeFormat = this.createBookingPage.timeFormat;
    const timeFormatRegExp = new RegExp(timeFormat);

    createBookingPage.getArrivalTime().then(($span) => {
      const time = $span.text();
      expect(time).to.match(timeFormatRegExp);
    });
  });

  it('AT_05.23.04 | Verify arrival time label is visible', function () {
    createBookingPage.getArrivalTimeLabel().should('be.visible');
  });
});

/// <reference types="Cypress" />

import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from '../../../pageObjects/BookingPopup';
import getArray from "../../../support/utilities/getArray";

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();
const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();
const AGENT = Cypress.env("agent");
const BOOKING = require('../../../fixtures/createBookingPage.json')

describe("US_05.02_Search section functionality", () => {

  beforeEach(function () {
    cy.fixture('createBookingPage').then(createBookingPage => {
        this.createBookingPage = createBookingPage;
    })

    cy.fixture('bookingsListPage').then(bookingsListPage => {
      this.bookingsListPage = bookingsListPage;
    })
  });

  before(() => {
    cy.cleanData();
    cy.loginWithSession(AGENT.email, AGENT.password);
    cy.visit("/");
    cy.intercept('/tools/ping/**').as('getPopUp')

    const bookingsDetails = BOOKING.bookingDetails
    for (const bookingDetails of bookingsDetails) {
      createBookingPage.createCustomBooking(bookingDetails)
      cy.wait('@getPopUp') 
      bookingPopup.clickCloseBtnBookingPopup()
    }
    
    leftMenuPanel.clickBookingManagementIcon();
  });

  it("AT_05.02.03.01| Verify the Сlear anchor is clickable and removes all input data from the placeholder field Search", () => {
    bookingsListPage.typeRandomWordInSearchField();
    bookingsListPage.clickClearLink();

    bookingsListPage.getSearchField().should("be.empty");
  });

  it('AT_05.02.01 | Verify that the agent is able to enter data in Search input field and find booking', function () {
    //Precondition
    leftMenuPanel.clickBookingIcon()
    createBookingPage.createCustomBooking(this.createBookingPage.bookingDetailsTest1)
    cy.intercept('/tools/ping/**').as('getPopUp')
    cy.wait('@getPopUp') 
    bookingPopup.clickCloseBtnBookingPopup()
    leftMenuPanel.clickBookingManagementIcon()
    bookingsListPage.clickDatesRangeDropdown()
    bookingsListPage.clickDrpdDatesRangeThisMonth()

    bookingsListPage.typeInSearchField(`${this.createBookingPage.bookingDetailsTest1.passengerName}\n`)
    bookingsListPage.getTableHeadersColumnsList().then(($el) => {
      let tableHeaderArray = getArray($el)
      let indexOfContact = tableHeaderArray.indexOf(this.bookingsListPage.columns.contact[1])
      
      bookingsListPage.getTableBody().then(($el) => {
        let tableDataArray = getArray($el)
        expect(tableDataArray[indexOfContact]).to.eq(this.createBookingPage.bookingDetailsTest1.passengerName)
      })
    })
  });

  it('AT_05.02.02 | Verify that the agent is able to enter data in Booking ID input field and find booking', function () {
    //Precondition
    leftMenuPanel.clickBookingIcon()
    createBookingPage.createCustomBooking(this.createBookingPage.bookingDetailsTest2)
    cy.intercept('/tools/ping/**').as('getPopUp')
    cy.wait('@getPopUp')
    bookingPopup.getBookingID().then(($id) => {
      let bookingID = $id.text()
      bookingPopup.clickCloseBtnBookingPopup()
      leftMenuPanel.clickBookingManagementIcon()
      bookingsListPage.clickDatesRangeDropdown()
      bookingsListPage.clickDrpdDatesRangeThisMonth()
      
      bookingsListPage.typeInBookingIDField(`${bookingID}\n`)
      bookingsListPage.getTableHeadersColumnsList().then(($el) => {
        let tableHeaderArray = getArray($el)
        let indexOfID = tableHeaderArray.indexOf(this.bookingsListPage.columns.id[1])
        
        bookingsListPage.getTableBody().then(($el) => {
          let tableDataArray = getArray($el)
          expect(tableDataArray[indexOfID]).to.eq(bookingID)
        })
      })
    })
  });
});

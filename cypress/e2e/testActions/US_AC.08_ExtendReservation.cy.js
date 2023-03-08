/// <reference types = "cypress" />

import CreateBookingPage from "../../pageObjects/CreateBookingPage";
import BookingPopup from "../../pageObjects/BookingPopup";

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();

const AGENT = Cypress.env('agent')

describe('US_AC.08 | ACTIONS > Extend reservation', { tags: ['regression'] }, function () {
    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
        cy.fixture('bookingPopup').then(bookingPopUp => {
            this.bookingPopUp = bookingPopUp;
        })
    })
    beforeEach(function () {
        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
    })

    it('AT_AC.08.01 | Extend one time and verify the time counter in the text field "This reservation will expire in" is updated and starts counting down from 00:15:00', function () {
        cy.clock();
        let numberOfPassengers = 1;
        let passengerName = this.createBookingPage.inputField.main_passenger.name;
        let passengerFareTypes = this.createBookingPage.fareTypeDropdown[0];
        createBookingPage.createReservation(numberOfPassengers, passengerName, passengerFareTypes);

        bookingPopup.getCountdownClock().then(() => {
            cy.tick(100 * 1000);
            bookingPopup.getCountdownClock().then($el => {
                let timer = +$el.text().replace(/[: ]/gi, "");
                cy.tick(0).invoke('restore');

                bookingPopup.clickBtnExtend();
                cy.wait(2 * 1000);
                bookingPopup.getCountdownClock().then($el => {
                    let extendTime = +$el.text().replace(/[: ]/gi, "");

                    expect(extendTime).to.above(timer);
                });
            })
        })
    })

})
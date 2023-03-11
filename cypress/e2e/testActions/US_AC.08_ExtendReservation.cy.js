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
        cy.fixture('bookingPopup').then(bookingPopUpData => {
            this.bookingPopUpData = bookingPopUpData;
        })
    })
    beforeEach(function () {
        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
    })

    it('AT_AC.08.01 | Extend one time and verify the time counter in the text field "This reservation will expire in" is updated and starts counting down from 00:15:00', function () {
        let numberOfPassengers = 1;
        let passengerName = this.createBookingPage.inputField.main_passenger.name;
        let passengerFareTypes = this.createBookingPage.fareTypeDropdown[0];
        createBookingPage.createReservation(numberOfPassengers, passengerName, passengerFareTypes);

        bookingPopup.clickBtnExtend();
  
        bookingPopup.getCountdownClock().then($el => {
            let extendTimeArray = $el.text().split(":");
            let extendTimeStr = extendTimeArray[1].trim() + "." + extendTimeArray[2].trim();
            let extendTimeNumber = +(extendTimeStr);

            expect(extendTimeNumber).to.be.below(15);
            expect(extendTimeNumber).to.be.above(14);
        })
    })
})

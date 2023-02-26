/// <reference types="Cypress" />

import CreateBookingPage from "../../pageObjects/CreateBookingPage";
import BookingPopup from "../../pageObjects/BookingPopup";
import waitForToolsPing from '../../support/utilities/waitForToolsPing'

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();

const AGENT = Cypress.env('agent');

function testCreatingReservationForPassengerType(passengerName, dropdownSelection, checkTextOnPassengerTypeLabel) {
    createBookingPage.typeIntoMainPassengerNameField(passengerName);
    createBookingPage.getMainPassengerFareTypeDropdownSelect().select(dropdownSelection, { force: true });
    createBookingPage.clickReservationTicketArrow();
    createBookingPage.clickReservationTicketButton();

    waitForToolsPing()
    bookingPopup.getConfirmTicketButton().should('be.visible');
    bookingPopup.getPassengerTitle().should('include.text', '(1)');
    bookingPopup.getPassengersList().should('have.length', 1);
    bookingPopup.getOnePassengerTypeLabel().should('have.text', checkTextOnPassengerTypeLabel);  
};

describe.skip('US_AC.05 | Create reservation for 1 passenger', () => {

    beforeEach(function () {
        cy.cleanData()

        cy.visit('/')
        cy.login(AGENT.email, AGENT.password)

        createBookingPage.clickCalendarNextButton();
        createBookingPage.clickFridayButton();

        waitForToolsPing()

        createBookingPage.clickFirstTripCard();
    });

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
    });

    it('AT_AC.05.02| Create reservation for 1 passenger - Child', function () {
        testCreatingReservationForPassengerType(this.createBookingPage.inputField.main_passenger.name, 'child', 'Child:')
    });

    it.skip('AT_AC.05.01| Create reservation for 1 passenger - Adult', function () {
        testCreatingReservationForPassengerType(this.createBookingPage.inputField.main_passenger.name,'adult', 'Adult:');
    });

    it.skip('AT_AC.05.03| Create reservation for 1 passenger - Elder', function () {
        testCreatingReservationForPassengerType(this.createBookingPage.inputField.main_passenger.name,'elder', 'Elder:');
    });
});   

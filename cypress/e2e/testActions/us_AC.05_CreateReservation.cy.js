/// <reference types="Cypress" />

import CreateBookingPage from "../../pageObjects/CreateBookingPage";
import BookingPopup from "../../pageObjects/BookingPopup";
import waitFor from "../../support/utilities/waitFor";

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();
const MANAGER = Cypress.env('manager');
const AGENT = Cypress.env('agent');
const CI = Cypress.env('CI');

describe('US_AC.05 | Create reservation for 1 passenger', () => {  

    before(function () {
        cy.cleanCiData(MANAGER.email, MANAGER.password, CI)
    })

    before(function() {
        cy.visit('/')
        cy.login(AGENT.email, AGENT.password)

        createBookingPage.clickCalendarNextButton();
        cy.wait(5000);
        createBookingPage.clickFridayButton();
        cy.wait(5000);
        createBookingPage.clickFirstTripCard();
        waitFor(createBookingPage.getMainPassengerFareTypeDropdownList, 15000);
    });

    beforeEach(function() {
        cy.fixture('createBookingPage').then(createBookingPage => {
        this.createBookingPage = createBookingPage;
        })
    });

    it('AT_AC.05.02| Create reservation for 1 passenger - Child', function () {
        createBookingPage.typeIntoMainPassengerNameField(this.createBookingPage.inputField.main_passenger.name);
        createBookingPage.getMainPassengerFareTypeDropdownList().select('child', {force: true});
        createBookingPage.clickReservationTicketArrow();
        createBookingPage.clickReservationTicketButton();

        waitFor(bookingPopup.getConfirmTicketButton, 15000);

        bookingPopup.getConfirmTicketButton().should('be.visible');
        bookingPopup.getPassengerTitle().should('include.text', '(1)');
        bookingPopup.getPassengersList().should('have.length', 1);
        bookingPopup.getOnePassengerTypeLabel().should('have.text', 'Child:');   
    });
});   
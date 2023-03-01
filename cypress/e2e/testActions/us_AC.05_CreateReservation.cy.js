/// <reference types="Cypress" />

import CreateBookingPage from "../../pageObjects/CreateBookingPage";
import BookingPopup from "../../pageObjects/BookingPopup";

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();

const AGENT = Cypress.env('agent');

function testCreatingReservationForPassengerType(passengerName, dropdownSelection, checkTextOnPassengerTypeLabel) {
    cy.intercept('/tools/ping/**').as('getToolsPing');
    cy.intercept('POST', 'orders').as('orders')

    createBookingPage.typeIntoMainPassengerNameField(passengerName);
    createBookingPage.getMainPassengerFareTypeDropdownSelect().select(dropdownSelection, { force: true });
    createBookingPage.clickReservationTicketArrow();
    cy.wait('@getToolsPing')
    createBookingPage.clickReservationTicketButton();
    cy.wait("@orders");
    cy.wait('@getToolsPing').then(() => {
        bookingPopup.getConfirmTicketButton().should('be.visible');
        bookingPopup.getPassengerTitle().should('include.text', '(1)');
        bookingPopup.getPassengersList().should('have.length', 1);
        bookingPopup.getOnePassengerTypeLabel().should('have.text', checkTextOnPassengerTypeLabel); 
    })  
}

describe.skip('US_AC.05 | Create reservation for 1 passenger', () => {
    beforeEach(function () {
        cy.intercept('/tools/ping/**').as('getToolsPing');
        cy.cleanData();

        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');

        createBookingPage.clickCalendarNextButton();
        cy.wait('@getToolsPing');
        createBookingPage.clickFridayButton();
        cy.wait('@getToolsPing');
        createBookingPage.clickFirstTripCard();
        cy.wait('@getToolsPing');
    });

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
    });

    it('AT_AC.05.02| Create reservation for 1 passenger - Child', function () {
        testCreatingReservationForPassengerType(this.createBookingPage.inputField.main_passenger.name, 'child', 'Child:')
    });

    it('AT_AC.05.01| Create reservation for 1 passenger - Adult', function () {
        testCreatingReservationForPassengerType(this.createBookingPage.inputField.main_passenger.name,'adult', 'Adult:');
    });

    it('AT_AC.05.03| Create reservation for 1 passenger - Elder', function () {
        testCreatingReservationForPassengerType(this.createBookingPage.inputField.main_passenger.name,'elder', 'Elder:');
    });
});   

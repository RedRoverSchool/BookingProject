/// <reference types="Cypress" />

import CreateBookingPage from "../../pageObjects/CreateBookingPage";
import BookingPopup from "../../pageObjects/BookingPopup";

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();

const AGENT = Cypress.env('agent');



describe('US_AC.05 | Create reservation for 1 passenger', () => {
    
    beforeEach(function() {
        cy.fixture('createBookingPage').then(createBookingPage => {
        this.createBookingPage = createBookingPage;
        })
    });

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


function waitFor(element, timeout) {
    for(let i=0; i<timeout/500; i++) {
        cy.wait(500);
        if(element()) {
            return;
        }
    }
}
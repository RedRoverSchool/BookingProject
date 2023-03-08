/// <reference types="Cypress" />

import CreateBookingPage from "../../pageObjects/CreateBookingPage";
import BookingPopup from "../../pageObjects/BookingPopup";

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();


const AGENT = Cypress.env('agent');

describe('US_AC.05 | Create reservation for 1 passenger', () => {
    beforeEach(function () {
        cy.intercept('/tools/**').as('getTrip');
        
        cy.cleanData();

        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');

        createBookingPage.clickCalendarNextButton();
        cy.wait('@getTrip');
        createBookingPage.clickFridayButton();
        cy.wait('@getTrip');
        createBookingPage.clickFirstTripCard();
        cy.wait('@getTrip');         
    });

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
    });

    it('AT_AC.05.02| Create reservation for 1 passenger - Child', function () {
        createBookingPage.testCreatingReservationForPassengerType(this.createBookingPage.inputField.main_passenger.name, 'child', 'Child:')
    });

    it('AT_AC.05.01| Create reservation for 1 passenger - Adult', function () {
        createBookingPage.testCreatingReservationForPassengerType(this.createBookingPage.inputField.main_passenger.name,'adult', 'Adult:');
    });

    it('AT_AC.05.03| Create reservation for 1 passenger - Elder', function () {
        createBookingPage.testCreatingReservationForPassengerType(this.createBookingPage.inputField.main_passenger.name,'elder', 'Elder:');
    });
});   

/// <reference types="Cypress" />

import CreateBookingPage from "../../../../pageObjects/CreateBookingPage"

const createBookingPage = new CreateBookingPage();

describe('US_04.23 | Create booking page > Passengers details default UI', () => {

    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.visit('/');

    });
    
    it('AT_04.23.01 | Verify Passenger details label is visible', () => {
        cy.login(AGENT.email, AGENT.password);

        createBookingPage.getLabelPassengerDetails().should('be.visible');
    });

});
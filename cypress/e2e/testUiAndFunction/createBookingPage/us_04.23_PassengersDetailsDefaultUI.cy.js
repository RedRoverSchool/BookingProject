/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage"

const createBookingPage = new CreateBookingPage();

describe('US_04.23 | Passengers details default UI', () => {
    const AGENT = Cypress.env('agent');

    before(() =>{
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });
    
    it('AT_04.23.01 | Verify Passenger details label is visible', () => {
       
        createBookingPage.getLabelPassengerDetails().should('be.visible');
    });

    it('AT_04.23.02 | Verify Main passenger label is visible', () =>{

        createBookingPage.getLabelMainPassenger().should('be.visible');
    });
});

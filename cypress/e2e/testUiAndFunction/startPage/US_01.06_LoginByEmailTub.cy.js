/// <reference types="Cypress" />

import CreateBookingPage from "../../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage(); 

describe('US_01.06 | Login by email tub functionality', () => {

    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.fixture('createBookingPage/headers').then(header => {
            this.header = header
        });
        cy.visit('/');    
    });

    it('AT_01.06.01 | Verify Sign In Button redirect to the Create Booking Page', function () {
        cy.login(AGENT.email, AGENT.password);
        createBookingPage.getCreateBookingHeader().should('include.text', this.header.mainHeaderPage)
    });
});
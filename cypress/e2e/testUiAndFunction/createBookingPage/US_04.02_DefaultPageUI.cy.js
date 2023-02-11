/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.02_Default page UI', () => {

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    it('AT_04.02.01 | Verify heading of the page is "Create booking" and it is visible', function ()  {
        createBookingPage.getCreateBookingHeader().should('be.visible');
    });
})
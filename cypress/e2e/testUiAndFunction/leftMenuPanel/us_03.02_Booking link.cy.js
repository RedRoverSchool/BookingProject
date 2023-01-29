/// <reference types="Cypress" />

import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const leftMenuPanel = new LeftMenuPanel();

describe('US_03.02 Booking link', () => {

    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    it('AT_03.02.01 |Verify that "Booking" icon in the left menu panel is visible', () => {
        leftMenuPanel.getBookingIcon().should('be.visible');
    });
});

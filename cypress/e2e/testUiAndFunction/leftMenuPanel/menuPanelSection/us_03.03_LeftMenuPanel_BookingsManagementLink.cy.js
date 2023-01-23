/// <reference types="Cypress" />

import LeftMenuPanel from "../../../../pageObjects/LeftMenuPanel";

const leftMenuPanel = new LeftMenuPanel();

describe('US_03.03 Left Menu Panel > Bookings management link', () => {
    
    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.visit('/');
    });

        it('AT_03.03.01 Verify the "Bookings management" icon is visible', () => {
            cy.login(AGENT.email, AGENT.password);

            leftMenuPanel.getBookingManagement().should('be.visible')
        });

        it('AT_03.03.02 Verify the Sidebar has text "Booking management" ', () => {
            cy.login(AGENT.email, AGENT.password); 

            leftMenuPanel.getBookingManagementNameLink().should('include.text', 'Bookings management')
        });
});
/// <reference types="Cypress" />

import LeftMenuPanel from "../../../../pageObjects/LeftMenuPanel";

const leftMenuPanel = new LeftMenuPanel();

describe('US_03.03 Left Menu Panel > Bookings management link', () => {
    
    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);

    });

        it('AT_03.03.01 Verify the "Bookings management" icon is visible', () => {
           
            leftMenuPanel.getBookingManagement().should('be.visible')
        });

        it('AT_03.03.02 Verify the Sidebar has text "Booking management" ', () => {
    
            leftMenuPanel.getBookingManagementNameLink().should('include.text', 'Bookings management')
        });
});
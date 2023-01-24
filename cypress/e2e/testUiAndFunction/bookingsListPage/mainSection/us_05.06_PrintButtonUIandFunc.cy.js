/// <reference types="Cypress" />

import BookingsListPage from "../../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../../pageObjects/LeftMenuPanel";

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();

describe('US_05.06 Print Button UI and functionality', () => {

    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        leftMenuPanel.clickGetBookingManagementIconLink();
    });

    it('AT_05.06.01 Verify that the "Print" button is displayed', () => {  
        bookingsListPage.getPrintButton().should('be.visible')
    });
})

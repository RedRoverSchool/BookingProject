/// <reference types="Cypress" />

import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import BookingsListPage from "../../../pageObjects/BookingsListPage";

const leftMenuPanel = new LeftMenuPanel();
const bookingListPage = new BookingsListPage();

describe('US_05.10 Excel button UI and functionality', () => {
    const AGENT = Cypress.env('agent');

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        leftMenuPanel.clickBookingManagementIcon();
    });

    it('AT_05.10.01 Verify "Excel" button is displayed', () => {
        bookingListPage.getExcelButton().should('be.visible');
    });
});
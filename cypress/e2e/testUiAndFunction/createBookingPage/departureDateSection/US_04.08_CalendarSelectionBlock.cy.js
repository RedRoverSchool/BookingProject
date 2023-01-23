/// <reference types="Cypress" />

import LeftMenuPanel from "../../../../pageObjects/LeftMenuPanel";
import BookingsListPage from "../../../../pageObjects/BookingsListPage"


const leftMenuPanel = new LeftMenuPanel();
const bookingsListPage = new BookingsListPage();

const AGENT = Cypress.env('agent');

describe('US_04.08 | Calendar-selection block UI and functionality week view', () => {
    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        leftMenuPanel.clickBookingLink();
    });

    it('AT_04.08.03 | Verify that Label is present for week view', () => {
        bookingsListPage.getCalendarLabel().should('be.visible');
    });
});
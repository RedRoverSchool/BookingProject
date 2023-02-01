/// <reference types="Cypress" />

import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();

describe('US_05.03 Date filter UI', () => {

    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.fixture('bookingsListPage').then(bookingsListPage => {
            this.bookingsListPage = bookingsListPage;
        });
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        leftMenuPanel.clickGetBookingManagementIconLink();
    });
})
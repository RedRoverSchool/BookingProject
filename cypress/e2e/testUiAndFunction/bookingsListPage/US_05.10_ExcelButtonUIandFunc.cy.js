/// <reference types="Cypress" />

import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import BookingsListPage from "../../../pageObjects/BookingsListPage";

const leftMenuPanel = new LeftMenuPanel();
const bookingListPage = new BookingsListPage();

describe('US_05.10 Excel button UI and functionality', () => {
    const AGENT = Cypress.env('agent');

    before(() => {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        leftMenuPanel.clickBookingManagementIcon();
    });

    beforeEach(function () {
        cy.fixture('bookingsListPage').then(bookingsListPage => {
            this.bookingsListPage = bookingsListPage;
        });
    });

    it('AT_05.10.01 Verify "Excel" button is displayed', () => {
        bookingListPage.getExcelButton().should('be.visible');
    });

    it('AT_05.10.02 Verify "Excel" button has "Excel" text and icon', function () {
        bookingListPage
            .getExcelButton()
            .should('have.text', this.bookingsListPage.buttons.excelButtonName);
        bookingListPage
            .getExcelButtonIcon()
            .should('have.attr', 'class', this.bookingsListPage.buttons.excelButtonIcon);    
    });
});
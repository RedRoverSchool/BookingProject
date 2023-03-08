/// <reference types="Cypress" />

import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();

describe('US_05.06 Print Button UI and functionality', { tags: ['smoke'] }, () => {

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

    it('AT_05.06.01 Verify that the "Print" button is displayed', () => {  
        bookingsListPage.getPrintButton().should('be.visible')
    });

    it('AT_05.06.02 Verify that the "Print" button has the text "Print" and an icon', function () { 
        bookingsListPage
            .getPrintButton()
            .should('have.text', this.bookingsListPage.buttons.printButtonName)
        bookingsListPage
            .getPrintButtonIcon()
            .should('have.attr', 'class', this.bookingsListPage.buttons.printButtonIcon)
    });
})

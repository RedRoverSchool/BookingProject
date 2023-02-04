/// <reference types="Cypress" />

import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();

describe('US_05.01 Booking list page >Top Section> Clear link UI', () => {

    const AGENT = Cypress.env('agent');

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        leftMenuPanel.clickBookingManagementIcon();
    });
    
    beforeEach(function () {
        cy.fixture('bookingsListPage').then(bookingsListPage => {
            this.bookingsListPage = bookingsListPage;
        })
    });

    it('AT_05.01.02 Verify that the link “Clear” displayed', function () {
        
        bookingsListPage
            .getClearLink()
            .should('be.visible')
            .and('have.text', this.bookingsListPage.links.filterClear);
    });      
})

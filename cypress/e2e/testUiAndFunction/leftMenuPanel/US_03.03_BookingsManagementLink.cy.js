/// <reference types="Cypress" />

import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import BookingsListPage from "../../../pageObjects/BookingsListPage";

const leftMenuPanel = new LeftMenuPanel();
const bookingsListPage = new BookingsListPage();
const AGENT = Cypress.env('agent');

describe('US_03.03 Bookings management link', () => {
    
    before(() => {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
    });

    beforeEach(function () {
        cy.fixture('leftMenuPanel').then(leftMenuPanel => {
            this.leftMenuPanel = leftMenuPanel;
        });
        cy.fixture('bookingsListPage').then(bookingsListPage => {
            this.bookingsListPage = bookingsListPage;
        });
    });

    it('AT_03.03.03 Verify Clicking "Booking management" opening the page with heading "Booking list"', function () {
        leftMenuPanel.clickBookingManagementIcon();
            
        bookingsListPage.getBookingListHeader()
            .should('include.text', this.bookingsListPage.headers.bookingListHeader);
    });

    it('AT_03.03.01 Verify the "Bookings management" icon is visible', () => {  
        leftMenuPanel.getBookingManagementIcon().should('be.visible');
    });

    it('AT_03.03.02 Verify the Sidebar has text "Booking management" ', function () {
        leftMenuPanel
            .getBookingManagementMenuLink()
            .should('include.text', this.leftMenuPanel.menuLinks.bookingsManagementLink);
    });
});

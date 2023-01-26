/// <reference types="Cypress" />

import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import BookingsListPage from "../../../pageObjects/BookingsListPage";

const leftMenuPanel = new LeftMenuPanel();
const bookingsListPage = new BookingsListPage();

describe('US_03.03 Bookings management link', () => {
    
    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.fixture('leftMenuPanel').then(leftMenuPanel => {
            this.leftMenuPanel = leftMenuPanel;
        });
        cy.fixture('bookingsListPage').then(bookingsListPage => {
            this.bookingsListPage = bookingsListPage;
        });
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    it('AT_03.03.01 Verify the "Bookings management" icon is visible', () => {  
        leftMenuPanel.getBookingManagement().should('be.visible')
    });

    it('AT_03.03.02 Verify the Sidebar has text "Booking management" ', function () {
        leftMenuPanel
            .getBookingManagementNameLink()
            .should('include.text', this.leftMenuPanel.menuLinks.bookingsManagementLink)
    });

    it('AT__03.03.03 Verify Clicking "Booking management" opening the page with heading "Booking list"', function () {
        leftMenuPanel.clickGetBookingManagementIconLink() 
            
        bookingsListPage.getBookingListHeader()
            .should('include.text', this.bookingsListPage.headers.bookingListHeader)
    });
});

/// <reference types="Cypress" />

import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();

function formatDate(date) {
    const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' }
    return date.toLocaleString('en-US', optionsDate)
        .replace(/(\S{3}).(\d{1,2})(.).(\d{4})/, "$2 $1$3 $4")
}

describe('US_05.03 | Date filter UI', () => {

    const AGENT = Cypress.env('agent')

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password)

        //Precondition
        leftMenuPanel.clickBookingManagementIcon()
    });

    beforeEach(function () {
        cy.fixture('bookingsListPage').then(bookingsListPage => {
            this.bookingsListPage = bookingsListPage;
        })
    });

    it('AT_05.04.01 Verify that the "filterDateType" dropdown is clickable', function() {  
        bookingsListPage.clickDateRangeType()
    });
    
});




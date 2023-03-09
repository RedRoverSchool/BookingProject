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

describe('US_05.04 | Date filter functionality', { tags: ['regression'] }, () => {

    const AGENT = Cypress.env('agent')

    before(() => {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');

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

    it('AT_05.04.03 | Verify that the Agent can switch and choose from "By purchase date" to "By departure date"', function() {
        bookingsListPage.getDateRangeTypeDefault('include.text', this.bookingsListPage.view);
    });
});




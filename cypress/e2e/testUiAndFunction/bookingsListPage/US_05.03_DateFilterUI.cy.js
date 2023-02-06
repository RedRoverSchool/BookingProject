/// <reference types="Cypress" />

import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();

describe('US_05.03 | Date filter UI', () => {

    const AGENT = Cypress.env('agent');

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password)

        //Precondition
        leftMenuPanel.clickBookingManagementIcon();
    });

    beforeEach(function () {
        cy.fixture('bookingsListPage').then(bookingsListPage => {
            this.bookingsListPage = bookingsListPage;
        })
    });

    it('AT_05.03.02 | Verify that the "calendar" dropdown has defaulted to the current date in format DD MMM, YYYY', function () {
        const today = new Date()
        const past7Date = new Date(new Date().setDate(today.getDate() - 6))
        const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' }

        const todayFormat = today
            .toLocaleString('en-US', optionsDate)
            .replace(/(\S{3}).(\d{1,2})(.).(\d{4})/, "$2 $1$3 $4");
        const past7DateFormat = past7Date
            .toLocaleString('en-US', optionsDate)
            .replace(/(\S{3}).(\d{1,2})(.).(\d{4})/, "$2 $1$3 $4");
            
        bookingsListPage.getFilterDefaultRange()
            .should('have.text', `${past7DateFormat} - ${todayFormat}`)
    })
});

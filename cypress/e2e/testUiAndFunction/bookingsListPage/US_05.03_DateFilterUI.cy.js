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

    it('AT_05.03.01 Verify that the "filterDateType" dropdown is displayed', function() {  
        bookingsListPage.getDateRangeType().should('be.visible')
    });
    
    it('AT_05.03.02 | Verify that the "calendar" dropdown has defaulted to the current date in format DD MMM, YYYY', function () {
        const today = new Date()
        const past7Date = new Date(new Date().setDate(today.getDate() - 6))

        const todayFormatted = formatDate(today)
        const past7DateFormatted = formatDate(past7Date)

        bookingsListPage.getDrdnDatesRangeDefaultValue()
            .should('have.text', `${past7DateFormatted} - ${todayFormatted}`)
    })

    it('AT_05.03.05 | Verify that the filter date range dropdown has values', function () {
        bookingsListPage.clickDatesRangeDropdown();

        bookingsListPage.getDrpdDatesRangeList().each(($li,index) => {
            expect($li.text()).eq(this.bookingsListPage.dropDown.datesRange[index])
        });
    })

    it('AT_05.03.04 | Verify that the  DateType dropdown is visible and have 2 options', function () {
        bookingsListPage.getDateRangeType().should('be.visible');
        bookingsListPage
            .getDateRangeTypeDefault()
            .should('have.text',
                this.bookingsListPage.dropDown.datesRangeType.dateRangeTypeText);

        bookingsListPage.clickDateRangeType();
        bookingsListPage.getDateRangeType()
            .should('have.length',
                this.bookingsListPage.dropDown.datesRangeType.datesRangeTypeNumber)
        bookingsListPage.getDateRangeType().each(($el, i) => {
            cy.wrap($el)
                .should('be.visible')
                .and('have.text',
                    this.bookingsListPage.dropDown.datesRangeType.datesRangeTypeName[i]);
        });
    });
});




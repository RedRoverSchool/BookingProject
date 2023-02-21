/// <reference types="Cypress" />

import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();


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
        const todayFormatted = bookingsListPage.getDateFromCurrentDDMMMYYYY(0)
        const past7DateFormatted = bookingsListPage.getDateFromCurrentDDMMMYYYY(-6)

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




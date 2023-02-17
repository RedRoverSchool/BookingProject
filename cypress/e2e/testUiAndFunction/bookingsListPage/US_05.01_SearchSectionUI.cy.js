/// <reference types="Cypress" />

import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();

describe('US_05.01 Booking list page >Top Section> Search Form UI', () => {

    const AGENT = Cypress.env('agent');

    let bodyXHR = '';

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        cy.intercept('POST', 'orders').as('orders')
        leftMenuPanel.clickBookingManagementIcon()
        cy.wait("@orders")
        cy.get("@orders").should(({ response }) => {
            bodyXHR = JSON.parse(response.body);
        });
    });    
    beforeEach(function () {
        cy.fixture('bookingsListPage').then(bookingsListPage => {
            this.bookingsListPage = bookingsListPage;
        })
    });

    it('AT_05.01.01 Verify that Search input text field with a placeholder "Search" displayed', function () {
        
        bookingsListPage.getSearchField().should('be.visible');
        bookingsListPage.getSearchField().should('have.attr', 'placeholder', this.bookingsListPage.inputFields.searchPlaceholder);

    });

    it('AT_05.01.02 Verify that the link “Clear” displayed', function () {
        
        bookingsListPage
            .getClearLink()
            .should('be.visible')
            .and('have.text', this.bookingsListPage.links.filterClear);
    });      

    it('AT_05.01.03 | Verify Status dropdown list has values', function () {
        bookingsListPage.clickStatusDropDown()
        if (bodyXHR.filters.statuses.length == 0) {
            bookingsListPage
                .getListStatusNoResults()
                .should('have.text', this.bookingsListPage.dropDown.statusNoResult)
        } else {
            bookingsListPage
                .getDrdnStatusList().each(($option, index) => {
                    expect($option.text()).eq(bookingsListPage.changeStatusesToLowerCase(bodyXHR.filters.statuses[index]))
                })
        }
    })
})

/// <reference types="Cypress" />

import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();

describe('US_05.01 Booking list page >Top Section> Search Form UI', { tags: ['smoke', 'regression'] }, () => {

    const AGENT = Cypress.env('agent');

    let bodyXHR = '';

    before(() => {
        cy.intercept('POST', 'orders').as('orders')
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
       
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
      
    it('AT_05.01.01 Verify that Booking ID text field with a placeholder "Booking ID" displayed', function () {
        
        bookingsListPage.getBookingIdField().should('be.visible');
        bookingsListPage.getBookingIdField().should('have.attr', 'placeholder', this.bookingsListPage.inputFields.bookingIdPlaceholder);

    }); 

    it('AT_05.01.01 Verify that Status text field with a placeholder "Status" displayed', function () {
        
        bookingsListPage.getStatusField().should('be.visible');
        bookingsListPage.getStatusField().should('have.attr', 'placeholder', this.bookingsListPage.inputFields.statusPlaceholder);

    }); 

    it('AT_05.01.01 Verify that Route field with a  default text "Route" displayed', function () {
        
        bookingsListPage.getRouteField().should('be.visible');
        bookingsListPage.getRouteField().should('have.text', this.bookingsListPage.inputFields.routeText);

    }); 

    it('AT_05.01.01 Verify that Vehicle field with a default text "Vehicle" displayed', function () {

        bookingsListPage.getVehicleField().should('be.visible');
        bookingsListPage.getVehicleField().should('have.text', this.bookingsListPage.inputFields.vehicleText);

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

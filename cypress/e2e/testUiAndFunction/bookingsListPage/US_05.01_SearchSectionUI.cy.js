/// <reference types="Cypress" />

import BookingsListPage from "../../../pageObjects/BookingsListPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const bookingsListPage = new BookingsListPage();
const leftMenuPanel = new LeftMenuPanel();

describe('US_05.01 Booking list page >Top Section> Search Form UI', () => {

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
   
})


   


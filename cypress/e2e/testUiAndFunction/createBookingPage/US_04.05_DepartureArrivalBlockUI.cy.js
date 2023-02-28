/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage"

const createBookingPage = new CreateBookingPage();

describe('US_04.05 | Departure / Arrival block UI', () => {

    const AGENT = Cypress.env('agent');

    before(() =>{
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    beforeEach(function() {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        });

        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
    });  

    it('AT_04.05.01 | Verify that the Departure station label is displayed, visible, and is not changeably', () => {
    
        createBookingPage.getLabelDepartureStation().should('be.visible')
    });

    it('AT_04.05.02 | Verify that the Departure station label has color - #666', function() {
        
        createBookingPage
        .getLabelDepartureStation()
        .should('have.css','color', this.colors.greyHeader)
    });

    it('AT_04.05.03 | Verify that the Departure station dropdown menu has Input select-search field', () => {
        
        createBookingPage.clickDepartureStationDropdown()
        createBookingPage.getDepartureInputSelectSearchField().should('be.visible')
    });

    it('AT_04.05.06 | Verify that the Arrival station label has color - #666', function() {

        createBookingPage.getLabelArrivalStation().should('have.css','color', this.colors.greyHeader)    
    })

    it('AT_04.05.04 | Verify that the Departure station label has font - 15px sans-serif', function() {

        createBookingPage.getLabelDepartureStation().should('have.css', 'font-size', this.createBookingPage.departureStationLabelFont)
    });

    it('AT_04.05.05 | Verify that the Departure station label has margin - 0px 0px 5px', function() {

        createBookingPage.getLabelDepartureStation().should('have.css', 'margin', this.createBookingPage.labelDepartureStationMargin)
    });
});    
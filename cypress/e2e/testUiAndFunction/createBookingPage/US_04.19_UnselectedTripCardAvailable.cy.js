/// <reference types ="cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import waitForToolsPing from "../../../support/utilities/waitForToolsPing";

const createBookingPage = new CreateBookingPage();

const AGENT = Cypress.env('agent');

describe('US_04.19 | Unselected trip card available UI', function() {

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        createBookingPage.clickCalendarNextButton(); 
        waitForToolsPing();          
    });

    beforeEach(function () {
        cy.fixture('colors').then(colors => {
            this.colors = colors;
        }) 
    });

    it('AT_04.19.01 | Verify Trips card with "Number available tickets" label is visible as unselected', function() {
        createBookingPage.getDepartureTripCardsList().each($el => {
            cy.wrap($el).should('be.visible')
                        .and('not.have.class', 'selected')  
        })
    });

    it('AT_04.19.02 | Verify Background color of Trip cards is white (#FFF)', function() {
        createBookingPage.getDepartureTripCardsList().each($el => {
            cy.wrap($el).should('have.css', 'lighting-color', this.colors.white)  
        })
    });
});
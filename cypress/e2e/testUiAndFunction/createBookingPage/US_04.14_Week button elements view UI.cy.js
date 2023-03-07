/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage"

const createBookingPage = new CreateBookingPage();

describe('US_04.14 | Week button elements view ', { tags: ['smoke'] }, () => {

    const AGENT = Cypress.env('agent');

    before(() =>{
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
    });

    beforeEach(function() {
        cy.fixture('createBookingPage').then(createBookingPage => {
           this.createBookingPage = createBookingPage;
        });

        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
    });  

    it('AT_04.14.01 | In the upper left corner of the section there is a label Departure date which has the color #666666', function() {
        createBookingPage.getLableDepartureDate().should('have.css','color', this.colors.greyHeader)
    });

    it('AT_04.14.02| The Week button is located in the upper right corner of the section Departure date, visible and have text "Week"', function () {
        createBookingPage.getWeekButton()
        .should('be.visible')
        .and('have.text', this.createBookingPage.weekButtonText)
        .and('have.css','position', 'static')
    });
});    
/// <reference types="Cypress" />

import CreateBookingPage from "../pageObjects/CreateBookingPage";


describe('Login', () => {
    const AGENT = Cypress.env('agent');

    const createBookingPage = new CreateBookingPage();

    beforeEach(function () {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage
        })
      });

    it('verify agent can login', function () {
        cy.get('div.booking-header h1').should('include.text', this.createBookingPage.headers.mainHeaderPage);
    })

    it('verify agent can login', function () {
        createBookingPage.clickCalendarNextButton();
        createBookingPage.clickFridayButton();
    })
})

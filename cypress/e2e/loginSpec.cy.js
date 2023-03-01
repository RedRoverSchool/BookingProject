/// <reference types="Cypress" />

import CreateBookingPage from "../pageObjects/CreateBookingPage";
const createBookingPage = new CreateBookingPage();

const AGENT = Cypress.env('agent');

describe('Login', () => {
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

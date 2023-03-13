/// <reference types="Cypress" />

import CreateBookingPage from "../pageObjects/CreateBookingPage";
const createBookingPage = new CreateBookingPage();

const AGENT = Cypress.env('agent');

describe('Login', () => {
    beforeEach(function () {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        
        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData
        })
      });

    it('verify agent can login', function () {
        cy.get('div.booking-header h1').should('include.text', this.bookingData.headers.mainHeaderPage);
    })

    it('verify agent can login', function () {
        createBookingPage.clickCalendarNextButton();
        createBookingPage.clickFridayButton();
    })
})

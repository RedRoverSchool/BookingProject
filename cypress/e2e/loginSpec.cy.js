/// <reference types="Cypress" />

describe('Login', () => {
    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.cleanData()
    })

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage
        })
    })

    it('verify agent can login', function () {
        cy.visit('/')
        cy.login(AGENT.email, AGENT.password);
        cy.get('div.booking-header h1').should('include.text', this.createBookingPage.headers.mainHeaderPage);
    })
})

/// <reference types="Cypress" />

describe('Login', () => {

    const MANAGER = Cypress.env('manager');
    const AGENT = Cypress.env('agent');
    const CI = Cypress.env('CI');

    beforeEach(function () {
        cy.cleanCiData(MANAGER.email, MANAGER.password, CI)
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

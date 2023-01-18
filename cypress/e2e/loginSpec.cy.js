/// <reference types="Cypress" />

describe('Login', () => {

    const MANAGER = Cypress.env('manager');
    const AGENT = Cypress.env('agent');
    const CI = Cypress.env('CI');

    beforeEach(() => {
        cy.cleanCiData(MANAGER.email, MANAGER.password, CI)
    })

    it('verify agent can login', () => {
        cy.visit('/')
        cy.login(AGENT.email, AGENT.password);
        cy.get('div.booking-header h1').should('include.text', 'Create booking');
    })
})

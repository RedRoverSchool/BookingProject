/// <reference types="Cypress" />

import Header from "../../../../pageObjects/Header";

const header = new Header();


describe('US_02.03 Header Envelope icon UI and functionality', () => {
    const AGENT = Cypress.env('agent');

    
    beforeEach(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);

    });

    it('AT_02.03.01 | Envelope icon/Helpdesk button is visible', () => {
        header.getEnvelopeIcon().should('be.visible');
    })
})

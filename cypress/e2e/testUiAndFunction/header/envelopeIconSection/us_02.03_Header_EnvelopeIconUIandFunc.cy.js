/// <reference types="Cypress" />

import Header from "../../../../pageObjects/Header";

const header = new Header();
const AGENT = Cypress.env('agent');

describe('US_02.03 Header Envelope icon UI and functionality', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    it('AT_02.03.01 | Verify Envelope icon is visible', () => {
        header.getEnvelopeIcon().should('be.visible');
    })
})
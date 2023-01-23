/// <reference types="Cypress" />

import Header from "../../../../pageObjects/Header.js";

const header = new Header();

const AGENT = Cypress.env('agent');

describe('US_02.01 | Left Logo UI and functionality', () => { 
    beforeEach(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    it('AT_02.01.01 | Verify logo is visible UI', () => {
        header.getLogoImg().should('be.visible');
    })
})

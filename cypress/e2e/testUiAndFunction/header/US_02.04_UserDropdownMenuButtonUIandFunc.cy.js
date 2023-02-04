/// <reference types="Cypress" />


import Header from "../../../pageObjects/Header.js";

const header = new Header();

describe('US_02.04 | User dropdown menu button UI and functionality', function() { 
    const AGENT = Cypress.env('agent');

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    it('AT_02.04.01 | "User dropdown menu" button contains an "Operator Image"', function() {
        header.getOperatorImage().should('be.visible');
    });
})

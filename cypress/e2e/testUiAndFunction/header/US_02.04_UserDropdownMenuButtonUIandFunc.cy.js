/// <reference types="Cypress" />


import Header from "../../../pageObjects/Header.js";

const header = new Header();

const AGENT = Cypress.env('agent');

describe('US_02.04 | User dropdown menu button UI and functionality', function() { 
    
    beforeEach(function () {
        cy.fixture('header').then(header => {
            this.header = header;
        })
    });

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    it('AT_02.04.01 | "User dropdown menu" button contains an "Operator Image"', function() {
        header.getOperatorImage().should('be.visible');
    });

    it('AT_02.04.02 |"User dropdown menu" button is clickable and opens up the dropdown menu', function() {
        header.clickUserNavBar()
        header.getUserDropdownMenu().should('be.visible')
    });
})

/// <reference types="Cypress" />

import Header from "../../../../pageObjects/Header.js";

const header = new Header();

const AGENT = Cypress.env('agent');

describe('US_02.01 | Left Logo UI and functionality', () => { 
    beforeEach(function() {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
       
        cy.fixture('url').then(url => {
            this.url = url;
        })
    });

    it('AT_02.01.01 | Verify logo is visible UI', function() {
        header.getLogoImg().should('be.visible');
    });

    it('AT_02.01.02 | Verify logo is clickable and redirects to default page', function() {
        header.clickContactUsIcon();
        header.clickLogoImg();
        cy.url().should('be.equal', this.url.logoUrl);
    });
})
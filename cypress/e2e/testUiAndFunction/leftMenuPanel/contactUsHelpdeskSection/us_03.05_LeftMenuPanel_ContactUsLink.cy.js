/// <reference types="Cypress" />

import LeftMenuPanel from "../../../../pageObjects/LeftMenuPanel";

const leftMenuPanel = new LeftMenuPanel();

describe('US_03.05 | Contact us link', () => {

    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.fixture('leftMenuPanel/menuLinks').then(link => {
            this.link = link;
        });
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    it('AT_03.05.01 | Sidebar has "Contact us" text, () =>', function () {
        leftMenuPanel
            .getContactUsNameLink()
            .should('have.text', this.link.contactUsLink) 
    })
})

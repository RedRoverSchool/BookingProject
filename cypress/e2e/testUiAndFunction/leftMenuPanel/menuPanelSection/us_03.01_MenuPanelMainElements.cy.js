/// <reference types="Cypress" />

import LeftMenuPanel from "../../../../pageObjects/LeftMenuPanel";

const leftMenuPanel = new LeftMenuPanel();

describe('US_03.01 Menu panel main elements', () => {

    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.visit('/');
    });

    it('Verify the quantity of main elements (icons) in the menu', () => {
        cy.login(AGENT.email, AGENT.password);

        leftMenuPanel.elements.getMainElements().should('have.length', 4);
    });
});
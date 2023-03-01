/// <reference types="Cypress" />

import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const leftMenuPanel = new LeftMenuPanel();

const AGENT = Cypress.env('agent');

describe('US_03.01 Menu panel main elements', () => {
    before(() => {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
    });

    beforeEach(function () {
        cy.fixture('leftMenuPanel').then(leftMenuPanel => {
            this.leftMenuPanel = leftMenuPanel;
        });
    });

    it('AT_03.01.01 | Verify the quantity of main elements (icons) in the menu', function() {
        leftMenuPanel
            .getMainElementsIcon()
            .should('have.length', this.leftMenuPanel.menuLinks.leftsideMenuPanelLinkNames.length);
    });

    it('AT_03.01.02 | Verify the names of main elements in the menu', function() {
        leftMenuPanel.getMainElementsMenuLink().then(($mainElementsNames) => {
            const mainElementsNames = $mainElementsNames.toArray().map(el => el.innerText);

            expect(mainElementsNames).to.deep.equal(this.leftMenuPanel.menuLinks.leftsideMenuPanelLinkNames);
        });
    });
});

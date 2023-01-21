/// <reference types="Cypress" />

import LeftMenuPanel from "../../../../pageObjects/LeftMenuPanel";

const leftMenuPanel = new LeftMenuPanel();

describe('US_03.01 Menu panel main elements', () => {

    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    it('AT_03.01.01 | Verify the quantity of main elements (icons) in the menu', () => {
        leftMenuPanel.elements.getMainElements().should('have.length', 4);
    });

    it('AT_03.01.02 | Verify the names of main elements in the menu', () => {
        leftMenuPanel.elements.getMainElementsNames().then(($mainElementsNames) => {
            const mainElementsNames = $mainElementsNames.toArray().map(el => el.innerText);

            expect(mainElementsNames).to.deep.equal(['Booking', 'Bookings management', 'Account management', 'Contact us']);
        });
    });
});
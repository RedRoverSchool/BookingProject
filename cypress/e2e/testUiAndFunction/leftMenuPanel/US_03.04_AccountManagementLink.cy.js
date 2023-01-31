/// <reference types="Cypress"/>

import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const leftMenuPanel = new LeftMenuPanel();

describe ('US_03.04_Left Menu Panel > Bookings management link', () => {

const AGENT = Cypress.env('agent');

beforeEach(function(){

    cy.visit('/');
    cy.login(AGENT.email, AGENT.password);
})

it('AT_03.04.01 Verify that "Account management" icon in the left menu panel is visible', function() {
    leftMenuPanel.getAccountManagementLeftIcon().should('be.visible')
})
})
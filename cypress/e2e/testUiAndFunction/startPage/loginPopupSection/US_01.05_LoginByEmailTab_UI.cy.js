/// <reference types="Cypress" />

import StartPage from "../../../../pageObjects/StartPage.js";

const startPage = new StartPage();

describe('US_01.05 | Login By Email Tab UI', () => {
    beforeEach(() => {
        cy.visit('/')
        startPage.clickLoginButton()
    });

    it('AT_01.05.01 | Insure By Email tab is visible', () => {
        startPage.loginPopupElements.getLoginByEmailTab().should('be.visible')
    })
})

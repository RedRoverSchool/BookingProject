/// <reference types="Cypress" />

import StartPage from "../../../../pageObjects/StartPage.js";

const startPage = new StartPage();

describe('Login by email tab UI', () => {
    beforeEach(() => {
        cy.visit('/')
        startPage.clickLoginButton()
    });

    it('AT_01.05.01 | Insure By Email tab is visible', () => {
        startPage.loginPopupElements.loginByEmailTab().should('be.visible')
    })
})

/// <reference types="Cypress" />

import StartPage from "../../../../pageObjects/StartPage.js";

const startPage = new StartPage();

describe('US_01.05 | Login By Email Tab UI', () => {
    beforeEach(function () {
        cy.fixture('startPage/dataStartPage').then(startPage => {
            this.startPage = startPage;
        });
        cy.visit('/');
        startPage.clickLoginButton();
    });

    it('AT_01.05.01 | Insure By Email tab is visible', () => {
        startPage.loginPopupElements.getLoginByEmailTab().should('be.visible')
    });

    it('AT_01.05.03 | Verify the agent is able to see Email input field and has text "Email"', function () {
        startPage
            .loginPopupElements
            .getEmailInput()
            .should('be.visible')
            .and('have.attr', 'placeholder', this.startPage.loginByEmailPopUp.emailInpuField);
    });
})

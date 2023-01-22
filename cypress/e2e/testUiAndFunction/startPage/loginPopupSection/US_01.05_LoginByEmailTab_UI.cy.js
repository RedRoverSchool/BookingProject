/// <reference types="Cypress" />

import {StartPage} from "../../../../pageObjects/StartPage.js";
import {LoginPopup} from "../../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();

describe('US_01.05 | Login By Email Tab UI', () => {
    beforeEach(function () {
        cy.fixture('startPage/inputField').then(inputField => {
            this.inputField = inputField;
        });
        cy.visit('/');
        startPage.clickLoginButton();
    });

    it('AT_01.05.01 | Insure By Email tab is visible', () => {
        loginPopup.getLoginByEmailTab().should('be.visible')
    });

    it('AT_01.05.03 | Verify the agent is able to see Email input field and has text "Email"', function () {
        loginPopup
            .getEmailInput()
            .should('be.visible')
            .and('have.attr', 'placeholder', this.inputField.loginPopup.emailInputField);
    });
})

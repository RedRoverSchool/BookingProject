/// <reference types="Cypress" />

import {StartPage} from "../../../pageObjects/StartPage.js";
import {LoginPopup} from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();

describe('US_01.05 | Login By Email Tab UI', () => {
    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });

        cy.visit('/');
        startPage.clickLoginButton();
    });

    it('AT_01.05.01 | Insure By Email tab is visible', () => {
        loginPopup.getLoginByEmailTab().should('be.visible')
    });

    it('AT_01.05.03 | Verify the agent is able to see Email input field and it has text "Email"', function () {
        loginPopup
            .getEmailInput()
            .should('be.visible')
            .and('have.attr', 'placeholder', this.startPage.inputField.loginPopup.emailInputField);
    });

    it('AT_01.05.04 | Insure Password label has text "Password"', function() {
        loginPopup
            .getPasswordLabel()
            .should('be.visible')
            .and('have.text', this.startPage.label.labelPassword.text)
    })

    it('AT_01.05.05 | Color of Email label', function () {
        loginPopup
            .getEmailLabel()
            .should('have.css','color', this.startPage.label.labelEmail.color)
    });
});

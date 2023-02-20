/// <reference types="Cypress" />

import {StartPage} from "../../../pageObjects/StartPage.js";
import {LoginPopup} from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();

describe('US_01.07 | Login by email tab negative', () => {
    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });
        cy.visit('/');
        startPage.clickLoginButton();
    });

    it('AT_01.07.01 | Verify error message after click SignIn with empty login fields', function () {
        loginPopup
            .getEmailInput()
            .clear()
            .should ('not.have.value');
        loginPopup
            .getPasswordInput()
            .clear()
            .should ('not.have.value');
        loginPopup
            .clickByEmailSignInButton();
        loginPopup.getMessageAlert()
            .should("be.visible")
            .and('have.text',this.startPage.alert.loginPopupMessageAlert);
        });

    it('AT_01.07.02 | Verify the error message after click Sign In with an invalid email', function () {
        loginPopup.enterEmail(this.startPage.dataInvalid.invalidEmail);
        loginPopup.enterPassword(this.startPage.dataInvalid.validPassword);
        loginPopup.clickByEmailSignInButton();
        loginPopup
            .getEmailErrorMessage()
            .should("be.visible")
            .and('include.text', this.startPage.dataInvalid.errorMessage);   
    });
});

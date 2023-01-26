/// <reference types="Cypress" />

import {StartPage} from "../../../pageObjects/StartPage.js";
import {LoginPopup} from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();

describe('US_01.07 | Login by email tab negative', () => {
    beforeEach(function () {
        cy.fixture('startPage/alert').then(alert => {
            this.alert = alert;
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
            .clickSignInButton();
        loginPopup.getMessageAlert()
            .should("be.visible")
            .and('have.text',this.alert.loginPopupMessageAlert);
        });
});

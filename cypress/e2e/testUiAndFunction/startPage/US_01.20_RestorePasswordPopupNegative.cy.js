/// <reference types="cypress"/>

import {StartPage} from "../../../pageObjects/StartPage.js";
import {LoginPopup} from "../../../pageObjects/StartPage.js";
import {RestorePopup} from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();
const restorePopup = new RestorePopup();

describe ('US_01.20 | Start Page > Restore Password Negative', function() {
    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });
        cy.visit('/');
        startPage.clickLoginButton();
        loginPopup.clickForgotYourPasswordLink();
    });

    it('AT_01.20.01 | Verify that the user is not able to restore the password with empty Email input', function() {
        restorePopup.clickRestoreButton();
        restorePopup
            .getEnterEmailAlert()
            .should('be.visible')
            .and('have.text', this.startPage.alert.restorePasswordPopup.enterEmailAlert);
    });
});
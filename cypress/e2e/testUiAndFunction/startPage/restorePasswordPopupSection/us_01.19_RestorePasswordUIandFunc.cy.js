/// <reference types="cypress"/>

import {StartPage} from "../../../../pageObjects/StartPage.js";
import {LoginPopup} from "../../../../pageObjects/StartPage.js";
import {RestorePopup} from "../../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();
const restorePopup = new RestorePopup();

describe('US_01.19 Restore password UI and functionality', () => {

    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.fixture('startPage/alert').then(alert => {
            this.alert = alert;
        });
        cy.visit('/');
        startPage.clickLoginBtn();
        loginPopup.clickForgotYourPasswordLink();
    });

    it('AT_01.19.01 Verify message after input an existing email in the "Email" input field and clicking on the "RESTORE" button', function () {
        restorePopup.enterEmail(AGENT.email);
        restorePopup.clickRestoreBtn();
        restorePopup
            .getMessageAlert()
            .should('be.visible')
            .and('have.text', this.alert.alertMessage);
    });
});
/// <reference types="cypress"/>

import {StartPage} from "../../../pageObjects/StartPage.js";
import {LoginPopup} from "../../../pageObjects/StartPage.js";
import {RestorePopup} from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();
const restorePopup = new RestorePopup();

describe('US_01.19 Restore password UI and functionality', { tags: ['smoke', 'regression'] }, () => {

    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.then(Cypress.session.clearCurrentSessionData);
        cy.visit('/');
        startPage.clickLoginButton();
        loginPopup.clickForgotYourPasswordLink();

        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });
    });

    it('AT_01.19.01 Verify message after input an existing email in the "Email" input field and clicking on the "RESTORE" button', function () {
        restorePopup.enterEmail(AGENT.email);
        restorePopup.clickRestoreButton();
        restorePopup
            .getMessageAlert()
            .should('be.visible')
            .and('have.text', this.startPage.alert.restorePasswordPopup.alertMessage);
    });
});

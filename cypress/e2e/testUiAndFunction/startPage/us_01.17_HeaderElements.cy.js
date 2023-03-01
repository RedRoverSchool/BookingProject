/// <reference types="cypress"/>

import {StartPage} from "../../../pageObjects/StartPage.js"
import {LoginPopup} from "../../../pageObjects/StartPage.js";
import {RestorePopup} from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();
const restorePopup = new RestorePopup();

describe('US_01.17 | Header elements', () => {
    beforeEach(function () {
        cy.then(Cypress.session.clearCurrentSessionData);
        cy.visit('/');
        startPage.clickLoginButton();
        loginPopup.clickForgotYourPasswordLink();

        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });
    });

    it('AT_01.17.01 | Verify `X` button is visible, clickable and closing Popup', function () {
        restorePopup.getRestorePopupCloseButton().should('be.visible');
        restorePopup.clickRestorePopupCloseButton();
        restorePopup.getRestorePopupModal().should('be.not.visible');
        startPage.getModalBackdrop().should('not.exist');
    });

    it('AT_01.17.02 | Verify an Agent/User is able to see the heading `Restore password`', function () {
        restorePopup.getRestorePopupHeader()
        .should('be.visible')
        .and('have.text', this.startPage.headers.restorePasswordHeaderText);
    });
});

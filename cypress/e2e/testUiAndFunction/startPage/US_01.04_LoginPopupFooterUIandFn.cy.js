/// <reference types="Cypress" />

import { StartPage, LoginPopup, RegisterPopup, RestorePopup } from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();
const registerPopup = new RegisterPopup();
const restorePopup = new RestorePopup();

describe('US_01.04 | Login Popup Footer UI and Functionality', { tags: ['smoke'] }, () => {
    beforeEach(function () {
        cy.then(Cypress.session.clearCurrentSessionData);
        cy.visit('/');
        startPage.clickLoginButton();

        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage
        });
    });

    it('AT_01.04.01 | Verify the link "Forgot your password?" is visible in the footer', function () {
        loginPopup.getForgotYourPasswordLink().should('be.visible')
    });

    it('AT_01.04.03 | Verify the functionality of the Register link', { tags: ['regression'] }, function() {
        loginPopup.clickRegisterLink()

        registerPopup.getRegisterPopupHeader()
            .should('have.text', this.startPage.headers.registerAgentAccount)
    });

    it('AT_01.04.02 | Verify the link Register is visible in the footer', () => {
        loginPopup.getRegisterLink().should('be.visible')
    });

    it('AT_01.04.04 | Verify the text "No account yet?" is visible in the footer', function () {
        loginPopup.getNoAccountYet().should('be.visible')
    });

    it('AT_01.04.05 | Verify the Agent is able to click on the Forgot your password link in the footer', { tags: ['regression'] }, function () {
        loginPopup.clickForgotYourPasswordLink()
        restorePopup.getRestorePopupHeader().should('have.text', this.startPage.headers.restorePasswordHeaderText)
    });
})

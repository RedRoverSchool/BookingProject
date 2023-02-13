/// <reference types="Cypress"/>

import {LoginPopup, RegisterPopup, RestorePopup, StartPage} from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();
const restorePopup = new RestorePopup();
const registerPopup = new RegisterPopup();

describe ('US 01.18 | Restore password Popup > Footer UI and functionality', () => {
    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });
        cy.visit('/');
        startPage.clickLoginButton();
        loginPopup.clickForgotYourPasswordLink();
    });

    it('AT_01.18.01 | Verify the link "Register" is clickable and redirects to the "Register agent account" popup', function () {
        restorePopup.clickRegisterLink();
        registerPopup
            .getRegisterPopupHeader()
            .should('include.text', this.startPage.headers.registerAgentAccount)
    })
})
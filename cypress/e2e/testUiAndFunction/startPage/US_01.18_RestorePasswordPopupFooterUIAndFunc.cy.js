/// <reference types="Cypress"/>

import {LoginPopup, RegisterPopup, RestorePopup, StartPage} from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();
const restorePopup = new RestorePopup();
const registerPopup = new RegisterPopup();

describe ('US 01.18 | Restore password Popup > Footer UI and functionality', { tags: ['smoke', 'regression'] }, () => {
    beforeEach(function () {
        cy.then(Cypress.session.clearCurrentSessionData);
        cy.visit('/');
        startPage.clickLoginButton();
        loginPopup.clickForgotYourPasswordLink();

        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });

        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
    });

    it('AT_01.18.01 | Verify the link "Register" is clickable and redirects to the "Register agent account" popup', function () {
        restorePopup.clickRegisterLink();
        registerPopup
            .getRegisterPopupHeader()
            .should('include.text', this.startPage.headers.registerAgentAccount)
    });

    it('AT_01.18.02 | Verify the text “No account yet?” has rgb(153, 153, 153) color and 14px font-size', function () {
        loginPopup
            .getNoAccountYet()
            .should('have.css','color', this.colors.greyLabel)
            .and('have.css', 'font-size', this.startPage.inputField.registerPopup.front_size)
    });
})
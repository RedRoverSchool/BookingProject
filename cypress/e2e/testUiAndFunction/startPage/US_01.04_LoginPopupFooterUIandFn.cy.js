/// <reference types="Cypress" />

import { StartPage } from "../../../pageObjects/StartPage.js";
import { LoginPopup } from "../../../pageObjects/StartPage.js";
import { RegisterPopup } from "../../../pageObjects/StartPage.js"

const startPage = new StartPage();
const loginPopup = new LoginPopup();
const registerPopup = new RegisterPopup()

describe('US_01.04 | Login Popup Footer UI and Functionality', () => {
    beforeEach(function () {
        cy.visit('/');
        startPage.clickLoginButton();

        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage
        });
    });

    it('AT_01.04.01 | Verify the link "Forgot your password?" is visible in the footer', function () {
        loginPopup.getForgotYourPasswordLink().should('be.visible')
    });

    it('AT_01.04.03 | Verify the functionality of the Register link', function() {
        loginPopup.clickRegisterLink()

        registerPopup.getRegisterPopupHeader()
            .should('have.text', this.startPage.headers.registerAgentAccount)
    });

    it('AT_01.04.02 | Verify the link Register is visible in the footer', () => {
        loginPopup.getRegisterLink().should('be.visible')
    });
})

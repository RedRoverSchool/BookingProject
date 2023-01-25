/// <reference types="Cypress" />

import { StartPage } from "../../../pageObjects/StartPage.js";
import { LoginPopup } from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();

describe('US_01.04 | Login Popup Footer UI and Functionality', () => {
    beforeEach(function () {
        cy.visit('/');
        startPage.clickLoginButton();
    });

    it('AT_01.04.01 | Verify the link "Forgot your password?" is visible in the footer', function () {
        loginPopup.getForgotYourPasswordLink().should('be.visible')
    });
})

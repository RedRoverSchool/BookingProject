/// <reference types="Cypress"/>

import {StartPage} from "../../../pageObjects/StartPage.js";
import {LoginPopup} from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();

describe('US_01.08 | Login by phone number tab UI', () => {
    beforeEach(() => {
        cy.visit('/');
        startPage.clickLoginButton();
        loginPopup.clickLoginByPhoneNumberTab();
    });

    it('AT_01.08.01 | Verify "Phone number" label is visible', () => {
        loginPopup.getPhoneNumberLabel().should('be.visible');
    });
});
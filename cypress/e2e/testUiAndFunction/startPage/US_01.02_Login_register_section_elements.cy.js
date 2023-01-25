/// <reference types="Cypress" />

import {StartPage} from "../../../pageObjects/StartPage.js";
import {LoginPopup} from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();

describe('US_01.02 | Login register section elements', () => {

    beforeEach(function () {
        cy.fixture('startPage/headers').then(headers => {
            this.headers = headers;
        });
        cy.visit('/')
    });

    it('AT_01.02.02 | Login button: visible / clickable / opening Login popup', function () {

        startPage.getLoginButton().should('be.visible');
        startPage.clickLoginButton();
        loginPopup.getHeaderText().should('include.text', this.headers.header_Login_Popup.text)
    });
})

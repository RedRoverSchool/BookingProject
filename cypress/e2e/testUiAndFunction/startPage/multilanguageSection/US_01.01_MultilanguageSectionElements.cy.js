/// <reference types="Cypress" />

import { StartPage } from "../../../../pageObjects/StartPage";

const startPage = new StartPage();

describe('US_01.01 | Multilanguage section elements UI and functionality', () => {
    beforeEach(function () {
        cy.fixture('startPage/buttons').then(buttons => {
            this.buttons = buttons;
        });
        cy.visit('/')
    });

    it('AT_01.01.03 | Thailand flag icon is visible', function () {
        startPage
        .getThailandFlagIcon()
        .should('be.visible');
    }); 
    
    it('AT_01.01.06 | Britain flag icon is clickable and changing language to English', function () {
        startPage.clickThailandFlagIcon();
        startPage.getLoginButton().should('not.include.text', this.buttons.loginBtnText);
        startPage.clickUKFlagIcon();
        startPage.getLoginButton().should('include.text', this.buttons.loginBtnText);
    });
})

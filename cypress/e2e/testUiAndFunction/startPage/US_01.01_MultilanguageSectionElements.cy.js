/// <reference types="Cypress" />

import { StartPage } from "../../../pageObjects/StartPage";

const startPage = new StartPage();

describe('US_01.01 | Multilanguage section elements UI and functionality', () => {
    before(() => {
        cy.visit('/');
    });
    
    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });
    });

    it('AT_01.01.01 | Verify Russia flag icon is visible', function () {
        startPage.getRussiaFlagIcon().should('be.visible');
    });

    it('AT_01.01.03 | Thailand flag icon is visible', function () {
        startPage.getThailandFlagIcon().should('be.visible');
    }); 
    
    it ('AT_01.01.05 | British flag icon is visible', () => {
        startPage.getUKFlagIcon().should('be.visible');
    });

    it('AT_01.01.06 | Britain flag icon is clickable and changing language to English', function () {
        startPage.clickThailandFlagIcon();
        startPage.getLoginButton().should('not.include.text', this.startPage.buttons.loginBtnText);
        startPage.clickUKFlagIcon();
        startPage.getLoginButton().should('include.text', this.startPage.buttons.loginBtnText);
    });

    it('AT_01.01.02 | Verify Russia flag icon: clickable / changing language to Russian', function () {
        startPage.clickRussiaFlagIcon();
        startPage.getLoginButton().should('have.text', this.startPage.buttons.rusLoginBtnText);
    });
});

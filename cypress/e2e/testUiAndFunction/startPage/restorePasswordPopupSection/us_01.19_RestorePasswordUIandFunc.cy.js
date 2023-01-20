/// <reference types="cypress"/>

import StartPage from "../../../../pageObjects/StartPage.js";

const startPage = new StartPage();

describe('US_01.19 Restore password UI and functionality', () => {

    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.fixture('startPage/dataStartPage').then(startPage => {
            this.startPage = startPage;
        });
        cy.visit('/');
    });

    it('AT_01.19.01 Verify message after input an existing email in the "Email" input field and clicking on the "RESTORE" button', function () {
        startPage.clickLoginBtn();
        startPage.clickForgotYourPasswordLink();
        startPage.enterEmail(AGENT.email);
        startPage.clickRestoreBtn();
        startPage
            .elements
            .getMessageAlert()
            .should('be.visible')
            .and('have.text', this.startPage.restorePopUp.alertMessage);
    });
});
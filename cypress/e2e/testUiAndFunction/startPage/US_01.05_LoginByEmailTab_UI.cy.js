/// <reference types="Cypress" />

import {StartPage} from "../../../pageObjects/StartPage.js";
import {LoginPopup} from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();

describe('US_01.05 | Login By Email Tab UI', { tags: ['smoke'] }, () => {
    before(() => {
        cy.then(Cypress.session.clearCurrentSessionData);
        cy.visit('/');
        startPage.clickLoginButton();
    });
   
    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });

        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
    });

    it('AT_01.05.01 | Insure By Email tab is visible', () => {
        loginPopup.getLoginByEmailTab().should('be.visible')
    });

    it('AT_01.05.03 | Verify the agent is able to see Email input field and it has text "Email"', function () {
        loginPopup
            .getEmailInput()
            .should('be.visible')
            .and('have.attr', 'placeholder', this.startPage.inputField.loginPopup.emailInputField);
    });

    it('AT_01.05.04 | Insure Password label has text "Password"', function() {
        loginPopup
            .getPasswordLabel()
            .should('be.visible')
            .and('have.text', this.startPage.label.labelPassword.text)
    })

    it('AT_01.05.05 | Color of Email label', function () {
        loginPopup
            .getEmailLabel()
            .should('have.css','color', this.colors.greyLabel)
    });

    it('AT_01.05.02 | Insure Email label text is "Email"', function () {
        loginPopup
        .getEmailLabel()
        .should('have.text', this.startPage.label.labelEmail.text)
    });

    it('AT_01.05.07 | Verify the Password input field and it has text "Password"', function ()  {
        loginPopup
            .getPasswordInput()
            .should('be.visible')
            .and('have.attr', 'placeholder', this.startPage.inputField.loginPopup.passwordInputField);
    });

    it('AT_01.05.09 | Verify SIGN IN button has text "SIGN IN"', function() {
        loginPopup
            .getByEmailSignInButton()
            .should('have.value', this.startPage.buttons.signInBtnText)
    });

    it('AT_01.05.10 | Verify SIGN IN button is visible and clickable', { tags: ['regression'] }, function() {
        loginPopup
            .clickByEmailSignInButton()

        loginPopup.getMessageAlert()
            .should('have.text', this.startPage.alert.loginPopupMessageAlert)
    });
    
    it('AT_01.05.06 | Verify SIGN IN button has color - #6CCD66', function () {
        loginPopup
            .getByEmailSignInButton()
            .should('have.css', 'color', this.colors.greenPopup);
    });

    it('AT_01.05.08 | Verify SIGN IN button has border-color - #6CCD66', function () {
        loginPopup
            .getByEmailSignInButton()
            .should('have.css', 'color', this.colors.greenPopup);
    });

    it('AT_01.05.11 | Verify Popup background color is #fff', function () {
        loginPopup
            .getLoginPopupModal()
            .should('have.css', 'background-color', this.colors.white);
    });

    it('AT_01.05.12 | Verify Password label has color - #aaa', function () {
        loginPopup
            .getPasswordInput()
            .should('have.css','color', this.colors.greyHeader)
    });
});

/// <reference types="cypress"/>

import { StartPage } from "../../../pageObjects/StartPage.js";
import { RegisterPopup } from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const registerPopup = new RegisterPopup();

describe('US_01.15 | Register Agent Negative', function () {

    beforeEach(function () {
        cy.visit('/');
        startPage.clickRegisterAccountLink();

        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage
        });
    });

    it('AT_01.15.01 | Error message is displayed when trying to register without entering name', function () {
        registerPopup.enterCompanyName(this.startPage.inputField.registrationPopup.companyName)
        registerPopup.enterEmail(this.startPage.inputField.registrationPopup.email)
        registerPopup.enterPhoneNumber(this.startPage.inputField.registrationPopup.phoneNumber)
        registerPopup.clickRegisterButton()
        registerPopup
            .getErrorMessage()
            .should('be.visible')
            .and('have.text', this.startPage.alert.registerPopupErrorMessage.emptyNameField)
    });

    it('AT_01.15.02 | Error message is displayed when trying to register without company name', function () {
        registerPopup.enterName(this.startPage.inputField.registrationPopup.yourName)
        registerPopup.enterEmail(this.startPage.inputField.registrationPopup.email)
        registerPopup.enterPhoneNumber(this.startPage.inputField.registrationPopup.phoneNumber)
        registerPopup.clickRegisterButton()
        registerPopup
            .getErrorMessage()
            .should('be.visible')
            .and('have.text', this.startPage.alert.registerPopupErrorMessage.emptyCompanyField)
    });

    it('AT_01.15.03 | Error message is displayed when trying to register without email', function() {
        registerPopup.enterName(this.startPage.inputField.registrationPopup.yourName)
        registerPopup.enterCompanyName(this.startPage.inputField.registrationPopup.companyName)
        registerPopup.enterPhoneNumber(this.startPage.inputField.registrationPopup.phoneNumber)
        registerPopup.clickRegisterButton()
        registerPopup
            .getErrorMessage()
            .should('be.visible')
            .and('have.text', this.startPage.alert.registerPopupErrorMessage.emptyEmailField)
    });

    it('AT_01.15.05 | Error message is displayed when trying to register with invalid email', function() {
        registerPopup.enterName(this.startPage.inputField.registrationPopup.yourName)
        registerPopup.enterCompanyName(this.startPage.inputField.registrationPopup.companyName)
        registerPopup.enterEmail(this.startPage.inputField.registrationPopup.invaildEmail)
        registerPopup.enterPhoneNumber(this.startPage.inputField.registrationPopup.phoneNumber)
        registerPopup.clickRegisterButton()
        registerPopup
            .getErrorMessage()
            .should('be.visible')
            .and('have.text', this.startPage.alert.registerPopupErrorMessage.emptyEmailField)
    })
})

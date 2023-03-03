/// <reference types="Cypress"/>

import {StartPage} from "../../../pageObjects/StartPage.js";
import {LoginPopup} from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();

describe('US_01.08 | Login by phone number tab UI', () => {
    before(function () {
        cy.then(Cypress.session.clearCurrentSessionData);
        cy.visit('/');
        startPage.clickLoginButton();
        loginPopup.clickLoginByPhoneNumberTab();
    });
    
    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });

        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
    })

    it('AT_01.08.01 | Verify "Phone number" label is visible', () => {
        loginPopup.getPhoneNumberLabel().should('be.visible');
    });

    it('AT_01.08.03 | Verify "Phone number" input field has placeholder `1234567`', function () {
        loginPopup
            .getPhoneNumberInput()
            .should('be.visible')
            .and('have.attr', 'placeholder', this.startPage.inputField.loginPopup.phoneNumberPlaceholder)
    });

    it('AT_01.08.02 | Verify Country code label has placeholder - "66" ', function () {
        loginPopup
            .getCountryCodeInput()
            .should('be.visible')
            .and('have.attr', 'placeholder', this.startPage.inputField.loginPopup.countryCode)
    });

    it('AT_01.08.04 | Verify "Country code" label has color - #aaa', function () {
        loginPopup
        .getCountryCodeLabel()
        .should('have.css','color', this.colors.greyPhoneLabel)
    });

    it('AT_01.08.05 | Verify "Country code" label has font-size - 10px', function () {
        loginPopup
        .getCountryCodeLabel()
        .should('have.css','font-size', this.startPage.label.labelCountryCode.font_size)
    });

    it('AT_01.08.06 | Verify "Country code" label has text Country code', function () {
        loginPopup
        .getCountryCodeLabel()
        .should('be.visible')
        .and('contain', this.startPage.label.labelCountryCode.text)
    });

    it('AT_01.08.07 | Verify the agent is able to see "Phone number" input field', function () {
        loginPopup
            .getPhoneNumberInput()
            .should('be.visible');
    });

    it('AT_01.08.08 | Verify the agent is able to see "Country code" input field', () => {
        loginPopup
            .getCountryCodeInput()
            .should('be.visible');
    });

    it('AT_01.08.09 | Verify Phone number label has text "Phone number"', function () {
        loginPopup
            .getPhoneNumberLabel()
            .should('have.text', this.startPage.label.labelPhoneNumber.text);
    });

    it('AT_01.08.10 | Verify "Phone number" label has color - #aaa', function () {
        loginPopup
        .getPhoneNumberInputLabel()
        .should('have.css','color', this.colors.greyPhoneLabel)
    });

    it('AT_01.08.11 | Verify Phone number label has text "Phone number"', function() {
        loginPopup
            .getPhoneNumberInputLabel()
            .should('have.text', this.startPage.label.labelPhoneNumber.text)
    });

    it('AT_01.08.12 | Verify the agent is able to see Country code input field', function() {
        loginPopup
            .getCountryCodeInput()
            .should('be.visible')
            .and('have.attr', 'placeholder', this.startPage.inputField.loginPopup.countryCode)

    });
    
    it('AT_01.08.14 | Insure Popup background color is #fff', function () {
        loginPopup
        .getLoginPopupModal()
        .should('have.css', 'background-color', this.colors.white)
    });

    it('AT_01.08.13 | Verify "REQUEST CODE" button is visible', function () {
        loginPopup
        .getRequestCodeButton()
        .should('be.visible')
    })

    it('AT_01.08.15 | Verify `REQUEST CODE` button has color - #6CCD66', function () {
        loginPopup
        .getRequestCodeButton()
        .should('have.css', 'color', this.colors.greenPopup)
    })

    it('AT_01.08.16 | Verify `REQUEST CODE` button has text REQUEST CODE', function () {
        loginPopup
            .getRequestCodeButton()
            .should('have.value', this.startPage.buttons.requestCodeButtonText)
    })
});
/// <reference types="Cypress"/>

import {StartPage} from "../../../pageObjects/StartPage.js";
import {LoginPopup} from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();

describe('US_01.08 | Login by phone number tab UI', () => {
    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });
    })
    before(function () {
        cy.visit('/');
        startPage.clickLoginButton();
        loginPopup.clickLoginByPhoneNumberTab();
    });

    it('AT_01.08.01 | Verify "Phone number" label is visible', () => {
        loginPopup.getPhoneNumberLabel().should('be.visible');
    });

    it('AT_01.08.03 | Verify "Phone number" input field has placeholder `1234567`', function () {
        loginPopup
            .getPhoneNumberInputField()
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
        .should('have.css','color', this.startPage.label.labelCountryCode.color)
    });
});
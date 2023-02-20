/// <reference types="Cypress"/>

import { StartPage, LoginPopup } from "../../../pageObjects/StartPage";
import { faker } from '@faker-js/faker';

const startPage = new StartPage();
const loginPopup = new LoginPopup();
const randomPhoneNumber = faker.phone.number('##########');


describe('US_01.10 | Login by phone negative', () => {
    before(() => {
        cy.visit('/');
        startPage.clickLoginButton();
        loginPopup.clickLoginByPhoneNumberTab();
    });

    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage
        });
        loginPopup.getCountryCodeInput().clear();
        loginPopup.getPhoneNumberInput().clear();
    })

    it('AT_01.10.01 | Verify that registering is not possible with empty "Country code" input', function () {
        loginPopup.enterPhoneNumber(randomPhoneNumber)
        loginPopup.clickRequestCodeButton();
        loginPopup.getMessageAlert().should('have.text', this.startPage.alert.loginPopupByPhoneMessageAlert);
    });

    it('AT_01.10.02 | Verify that registering is not possible with empty "Phone number" input', function () {
        loginPopup.enterCountryCode(this.startPage.data.phoneNumber.code)
        loginPopup.clickRequestCodeButton();
        loginPopup.getMessageAlert().should('have.text', this.startPage.alert.loginPopupByPhoneMessageAlert);
    });

    it('AT_01.10.03 | Login is not possible with any letters "Country code" input', function () {
        loginPopup.enterCountryCode(this.startPage.dataInvalid.lettersInCountryCode);
        loginPopup.enterPhoneNumber(this.startPage.data.phoneNumber.number);
        loginPopup.clickRequestCodeButton();

        loginPopup.getMessageAlert()
            .should('be.visible')
            .and('have.text', this.startPage.alert.loginPopupByPhoneMessageAlert);
    })

    it('AT_01.10.04 | Login is not possible with any letters in "Phone number" input', function() {
        loginPopup.enterCountryCode(this.startPage.data.phoneNumber.code);
        loginPopup.enterPhoneNumber(this.startPage.dataInvalid.letterInPhoneNumber);
        loginPopup.clickRequestCodeButton();

        loginPopup.getMessageAlert()
        .should('be.visible')
        .and('have.text', this.startPage.alert.loginPopupByPhoneWrongNumberAlert);
    })
})

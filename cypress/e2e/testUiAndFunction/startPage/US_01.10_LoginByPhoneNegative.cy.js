/// <reference types="Cypress"/>

import { StartPage, LoginPopup } from "../../../pageObjects/StartPage";
import { faker } from '@faker-js/faker';

const startPage = new StartPage();
const loginPopup = new LoginPopup();
const randomPhoneNumber = faker.phone.number('##########');
const randomCodeNumber =  faker.random.alphaNumeric(3);

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
    })

    it('AT_01.10.01 | Verify that registering is not possible with empty "Country code" input', function () {
        loginPopup.enterPhoneNumber(randomPhoneNumber)
        loginPopup.clickRequestCodeButton();
        loginPopup.getMessageAlert().should('have.text', this.startPage.alert.loginPopupByPhoneMessageAlert);
    });

    it('AT_01.10.02 | Verify that registering is not possible with empty Phone number input', function () {
        loginPopup.enterCountryCode(randomCodeNumber)
        loginPopup.clickRequestCodeButton();
        loginPopup.getMessageAlert().should('have.text', this.startPage.alert.loginPopupByPhoneMessageAlert);
    });
})

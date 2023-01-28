/// <reference types="cypress"/>

import { StartPage } from "../../../pageObjects/StartPage.js";
import { RegisterPopup } from "../../../pageObjects/StartPage.js";
import { faker } from '@faker-js/faker';

const startPage = new StartPage();
const registerPopup = new RegisterPopup();
const randomFirstName = faker.name.firstName();
const randomLastName = faker.name.lastName();
const randomFullName = `${randomFirstName} + ${randomLastName}`;
const randomEmail = faker.internet.email(randomFirstName, randomLastName, 'qatest.site');
const randomInvalidEmail = faker.internet.email('a-g@ent', '-@-12', '--@qatest.site');
const randomPhoneNumber = faker.phone.number('+66#########');
const randomCompanyName = faker.company.name();
const randomAlpha = faker.random.alpha();
const randomNumeric = faker.random.numeric();
const randomInvalidCompanyName = `${randomAlpha + randomNumeric}`;


describe('US_01.15 | Register Agent Negative', function () {

    beforeEach(function () {
        cy.visit('/');
        startPage.clickRegisterAccountLink();

        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage
        });
    });

    it('AT_01.15.01 | Error message is displayed when trying to register without entering name', function () {
        registerPopup.enterCompanyName(randomCompanyName)
        registerPopup.enterEmail(randomEmail)
        registerPopup.enterPhoneNumber(randomPhoneNumber)
        registerPopup.clickRegisterButton()
        registerPopup
            .getErrorMessage()
            .should('be.visible')
            .and('have.text', this.startPage.alert.registerPopupErrorMessage.emptyNameField)
    });

    it('AT_01.15.02 | Error message is displayed when trying to register without company name', function () {
        registerPopup.enterName(randomFullName)
        registerPopup.enterEmail(randomEmail)
        registerPopup.enterPhoneNumber(randomPhoneNumber)
        registerPopup.clickRegisterButton()
        registerPopup
            .getErrorMessage()
            .should('be.visible')
            .and('have.text', this.startPage.alert.registerPopupErrorMessage.emptyCompanyField)
    });

    it('AT_01.15.03 | Error message is displayed when trying to register without email', function () {
        registerPopup.enterName(randomFullName)
        registerPopup.enterCompanyName(randomCompanyName)
        registerPopup.enterPhoneNumber(randomPhoneNumber)
        registerPopup.clickRegisterButton()
        registerPopup
            .getErrorMessage()
            .should('be.visible')
            .and('have.text', this.startPage.alert.registerPopupErrorMessage.emptyEmailField)
    });

    it('AT_01.15.05 | Error message is displayed when trying to register with invalid email', function () {
        registerPopup.enterName(randomFullName)
        registerPopup.enterCompanyName(randomCompanyName)
        registerPopup.enterEmail(randomInvalidEmail)
        registerPopup.enterPhoneNumber(randomPhoneNumber)
        registerPopup.clickRegisterButton()
        registerPopup
            .getErrorMessage()
            .should('be.visible')
            .and('have.text', this.startPage.alert.registerPopupErrorMessage.emptyEmailField)
    });

    it('AT_01.15.04 | Error message is displayed when trying to register without phone number', function () {
        registerPopup.enterName(randomFullName)
        registerPopup.enterCompanyName(randomCompanyName)
        registerPopup.enterEmail(randomEmail)
        registerPopup.clickRegisterButton()
        registerPopup.getErrorMessage()
            .should('be.visible')
            .and('have.text', this.startPage.alert.registerPopupErrorMessage.emptyPhoneField)
    });

    it('AT_01.15.07 | Error message is displayed when trying to register  with previously used email', function () {
        registerPopup.enterName(randomFullName)
        registerPopup.enterCompanyName(randomCompanyName)
        registerPopup.enterEmail(this.startPage.data.previouslyUsedEmail)
        registerPopup.enterPhoneNumber(randomPhoneNumber)
        registerPopup.clickRegisterButton()
        registerPopup
            .getErrorMessage()
            .should('be.visible')
            .and('have.text', this.startPage.alert.registerPopupErrorMessage.emailIsPreviouslyUsed)
    });

    it('AT_01.15.08 | Error message is displayed when trying to register with invalid company name (1 letter and 1 number without space , example: "A1")', function () {
        registerPopup.enterName(randomFullName)
        registerPopup.enterCompanyName(randomInvalidCompanyName)
        registerPopup.enterEmail(randomEmail)
        registerPopup.enterPhoneNumber(randomPhoneNumber)
        registerPopup.clickRegisterButton()
        registerPopup
            .getErrorMessage()
            .should('be.visible')
            .and('have.text', this.startPage.alert.registerPopupErrorMessage.emptyCompanyField)
    });
    
    it('AT_01.15.06 | Error message is displayed when a user attempts to register with special characters in `Your name` field', function() {
        registerPopup.enterName(this.startPage.data.specialCharacters)
        registerPopup
            .getErrorMessage()
            .should('be.visible')
            .and('contain', this.startPage.alert.registerPopupErrorMessage.nameFieldSpecialCharacters)
    });
})

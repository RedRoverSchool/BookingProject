/// <reference types="Cypress" />

import { StartPage, RegisterPopup } from "../../../pageObjects/StartPage.js";
import { faker } from '@faker-js/faker';

const startPage = new StartPage();
const registerPopup = new RegisterPopup();
const randomName = faker.name.firstName();
const randomCompanyName = faker.company.name();
const randomEmail = faker.internet.email();
const randomPhoneNumber = faker.phone.number('+66##########')


describe('US_01.13 | Register functionality', () => {
    
    before(() => {
        cy.then(Cypress.session.clearCurrentSessionData);
        cy.visit('/')
        startPage.clickRegisterAccountLink()
    });

    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });
    });

    it('AT_01.13.01 | Register button is clickble', function () {
        registerPopup.enterName(randomName)
        registerPopup.enterCompanyName(randomCompanyName)
        registerPopup.enterEmail(randomEmail)
        registerPopup.enterPhoneNumber(randomPhoneNumber)
        registerPopup.clickRegisterButton()
       
        registerPopup
            .getRegisterCongratulationsHeader()
            .should('be.visible')
    });
});
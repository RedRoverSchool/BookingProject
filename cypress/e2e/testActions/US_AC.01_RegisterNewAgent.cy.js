/// <reference types="Cypress" />
import { StartPage, RegisterPopup, CongratulationsPopup } from "../../pageObjects/StartPage";
import { faker } from '@faker-js/faker';

const startPage = new StartPage();
const registerPopup = new RegisterPopup();
const congratulationsPopup = new CongratulationsPopup();
const randomFirstName = faker.name.firstName();
const randomLastName = faker.name.lastName();
const randomFullName = `${randomFirstName} + ${randomLastName}`;
const randomEmail = faker.internet.email(randomFirstName, randomLastName, 'qatest.site');
const randomPhoneNumber = faker.phone.number('+66#########');
const randomCompanyName = faker.company.name();


describe('US_AC_01 | Register new agent', { tags: ['regression'] }, () => {
    before(() => {
        cy.then(Cypress.session.clearCurrentSessionData);
        cy.visit('/');
    });
    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage= startPage;
        }); 
    });    
        it('AT_AC.01.02 | Register agent - action', function() {
            startPage.clickRegisterAccountLink();
            registerPopup.enterName(randomFullName);
            registerPopup.enterCompanyName(randomCompanyName);
            registerPopup.enterEmail(randomEmail);
            registerPopup.enterPhoneNumber(randomPhoneNumber);
            registerPopup.clickRegisterButton();
            congratulationsPopup.getCongratulationsPopupHeader().should('have.text', this.startPage.headers.congratulationsHeader);

        });

});
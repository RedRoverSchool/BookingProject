/// <reference types="Cypress" />

import { StartPage, LoginPopup } from "../../../pageObjects/StartPage";
import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const startPage = new StartPage();
const loginPopup = new LoginPopup();
const createBookingPage = new CreateBookingPage(); 

describe('US_01.09 | Login by phone number tab functionality', () => {
    before(() => {
        cy.then(Cypress.session.clearCurrentSessionData);
        cy.visit('/');
        startPage.clickLoginButton();
        loginPopup.clickLoginByPhoneNumberTab();
        cy.intercept('POST', 'login/').as('login');
    });
    
    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage
        });
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage
        });
    });

    it('TC_01.09.01 | Verify after clicking Sign in button be redirected to Create booking page', function () {
        loginPopup.enterCountryCode(this.startPage.data.phoneNumber.code);
        loginPopup.enterPhoneNumber(this.startPage.data.phoneNumber.number);
        loginPopup.clickRequestCodeButton();

        cy.wait('@login').then(({response}) => {
            let body = JSON.parse(response.body);
            loginPopup.enterCodeFromSms(body.sms.text.substr(11));
            loginPopup.clickByPhoneSignInButton();
        });
        
        createBookingPage
            .getCreateBookingHeader()
            .should('include.text', this.createBookingPage.headers.mainHeaderPage);
    });
});

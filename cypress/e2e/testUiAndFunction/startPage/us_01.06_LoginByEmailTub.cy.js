/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import { LoginPopup } from "../../../pageObjects/StartPage";
import { StartPage } from "../../../pageObjects/StartPage";

const createBookingPage = new CreateBookingPage(); 
const loginPopup = new LoginPopup();
const startPage = new StartPage();

describe('US_01.06 | Login by email tub functionality', () => {

    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage
        });
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage
        });
        cy.visit('/');  
    });

    it('AT_01.06.01 | Verify Sign In Button redirect to the Create Booking Page', function () {
        cy.login(AGENT.email, AGENT.password);
        createBookingPage.getCreateBookingHeader().should('include.text', this.createBookingPage.headers.mainHeaderPage)
    });

    it('AT_01.06.02 | Color of Sign In Button', function () {
        startPage.clickLoginButton();
        loginPopup.getSignInButton().should('have.css','color', this.startPage.buttons.signInBtnTextColor)
    });
});


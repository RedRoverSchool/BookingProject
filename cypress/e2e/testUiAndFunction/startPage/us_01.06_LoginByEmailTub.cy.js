/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import { LoginPopup } from "../../../pageObjects/StartPage";
import { StartPage } from "../../../pageObjects/StartPage";

const createBookingPage = new CreateBookingPage(); 
const loginPopup = new LoginPopup();
const startPage = new StartPage();

describe('US_01.06 | Login by email tub functionality', { tags: ['smoke'] }, () => {
    const AGENT = Cypress.env('agent')

    before(function () {
        cy.then(Cypress.session.clearCurrentSessionData);
        cy.visit('/');
        startPage.clickLoginButton();
    });

    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });

        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData;
        });

        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });  
    });

    it('AT_01.06.02 | Color of Sign In Button', function () {
        loginPopup.getByEmailSignInButton().should('have.css','color', this.colors.greenPopup)
    });

    it('AT_01.06.01 | Verify Sign In Button redirect to the Create Booking Page', { tags: ['regression'] }, function () {
        loginPopup.enterEmail(AGENT.email)
        loginPopup.enterPassword(AGENT.password)
        loginPopup.clickByEmailSignInButton()
        createBookingPage
            .getCreateBookingHeader()
            .should('include.text', this.bookingData.headers.mainHeaderPage)
    });
});


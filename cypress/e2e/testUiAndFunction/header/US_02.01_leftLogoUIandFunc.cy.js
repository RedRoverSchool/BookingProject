/// <reference types="Cypress" />


import CreateBookingPage from "../../../pageObjects/CreateBookingPage.js";
import Header from "../../../pageObjects/Header.js";

const header = new Header();
const createBookingPage = new CreateBookingPage();

const AGENT = Cypress.env('agent');

describe('US_02.01 | Left Logo UI and functionality', function() { 
    beforeEach(function() {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
       
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
    });

    it('AT_02.01.01 | Verify logo is visible UI', function() {
        header.getLogoImg().should('be.visible');
    });

    it('AT_02.01.02 | Verify logo is clickable and redirects to default page', function() {
        header.clickContactUsIcon();
        header.clickLogoImg();
        createBookingPage.getCreateBookingHeader().should('include.text', this.createBookingPage.headers.mainHeaderPage)
    });
})

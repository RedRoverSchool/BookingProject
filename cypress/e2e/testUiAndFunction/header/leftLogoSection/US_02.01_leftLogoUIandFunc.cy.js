/// <reference types="Cypress" />


import { CreateBookingHeader } from "../../../../pageObjects/CreateBookingPage.js";
import Header from "../../../../pageObjects/Header.js";

const header = new Header();
const createBookingHeader = new CreateBookingHeader();

const AGENT = Cypress.env('agent');

describe('US_02.01 | Left Logo UI and functionality', function() { 
    beforeEach(function() {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
       
        cy.fixture('header/url').then(url => {
            this.url = url;
        })
        cy.fixture('createBookingPage/headers').then(createBookingText => {
            this.createBookingText = createBookingText;
        })
    });

    it('AT_02.01.01 | Verify logo is visible UI', function() {
        header.getLogoImg().should('be.visible');
    });

    it('AT_02.01.02 | Verify logo is clickable and redirects to default page', function() {
        header.clickContactUsIcon();
        header.clickLogoImg();
        createBookingHeader.getCreateBookingHeader().should('include.text', this.createBookingText.mainHeaderPage)
    });
})
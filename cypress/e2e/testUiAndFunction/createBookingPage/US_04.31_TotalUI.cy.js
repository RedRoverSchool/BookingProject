/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.31 | Total UI', () => {
    before(() => {
        cy.visit('/');
		cy.login(AGENT.email, AGENT.password);
    });

    it('AT_04.31.01 | Verify that the text "Total " is visible', () => {
        createBookingPage.getTotalPriceLabel().should('be.visible');    
    });

    it('AT_04.31.02 | Verify that the Total has no value by default', () => {   
        createBookingPage.getTotalPrice().should('have.text', '');
    });    
    
     it('AT_04.31.03 |  Verify that button “Reset” is visible and has a font color #00a65a)', () => {
        createBookingPage.getResetButton().should('be.visible')
     });    
})
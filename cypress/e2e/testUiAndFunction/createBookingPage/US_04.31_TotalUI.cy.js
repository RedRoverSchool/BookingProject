/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import waitForToolsPing from "../../../support/utilities/waitForToolsPing";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.31 | Total UI', () => {
    before(() => {
        cy.visit('/');
		cy.login(AGENT.email, AGENT.password);
    });

    beforeEach(function () {
        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
	});

    it('AT_04.31.01 | Verify that the text "Total " is visible', () => {
        createBookingPage.getTotalPriceLabel().should('be.visible');    
    });

    it('AT_04.31.02 | Verify that the Total has no value by default', () => {   
        createBookingPage.getTotalPrice().should('have.text', '');
    });    
    
    it('AT_04.31.03 |  Verify that button “Reset” is visible )', () => {
        createBookingPage.getResetButton().should('be.visible')
    });
     
    it('AT_04.31.04 | Verify that button “Reset” has a font color (#00a65a)', function () {
        createBookingPage.getResetButton().should('have.css', 'color', this.colors.greenBookingPage)
    });

    it('AT_04.31.05 | Verify that the button “Book tickets” is visible', () => {
        createBookingPage.getBookTicketsButton().should('be.visible')
    });

    it('AT_04.31.06 | Verify that button “Book tickets” has a background color (#FFF) after navigating on it.', function () {
        createBookingPage.getBookTicketsButton(). should('have.css', 'color', this.colors.white)
    });

    it('AT_04.31.08 |  Verify that dropdown-toggle button is visible', () => {
        createBookingPage.getDropdownToggleButton().should('be.visible')
    });

    it('AT_04.31.07 | Verify that the dropdown-toggle button has color (#FFF', function () {
        createBookingPage.getDropdownToggleButton().should('have.css', 'color',  this.colors.white)
    });

    it.skip('AT_04.31.09 | Verify that the pop up button “Reserve tickets” is visible', () => {
        createBookingPage.clickSecondTripCard()
        createBookingPage.clickReservationTicketArrow()
        createBookingPage.getReservationTicketButton().should('be.visible')
    });
})
/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage.js";

const createBookingPage = new CreateBookingPage();

describe('US_04.13 | Create booking page > Departure date > Month dropdown UI and functionality', () => {
    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        createBookingPage.clickMonthBtn();
    })

    it('AT_04.13.01 | Month dropdown menu (to the left of the Week button) is visible and has 13 months for selection', () => {
        createBookingPage.clickMonthDropdown();
        createBookingPage.getMonthDropdownList().should('be.visible')
            .and('have.length', 13);
    })

    it('AT_04.13.02 | Verify the first option of the Month dropdown menu has the current month and the current year', function () {
        const current = new Date()
        const thailandCurrentMonthAndYear = new Date(current).toLocaleString('en-GB', { month: 'short', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' })
        createBookingPage.getMonthDropdownList()
            .eq(0)
            .invoke('text')
            .should('eq', thailandCurrentMonthAndYear)
    })
})

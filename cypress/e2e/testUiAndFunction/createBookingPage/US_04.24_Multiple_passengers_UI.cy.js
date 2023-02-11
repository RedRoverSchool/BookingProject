/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage"

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.24 | Multiple passengers UI', () => {

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        });
    });

    before(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);

        createBookingPage.clickCalendarNextButton();
        createBookingPage.clickFridayButton();
        cy.intercept('/tools/**').as('getTrip');
		cy.wait('@getTrip');
        createBookingPage.clickFirstTripCard();
    });

    it('AT_04.24.01 | Verify that Fare type dropdown menu is visible and has three options: Adult, Child and Elder', function () {
        createBookingPage.clickFareTypeDropdown();
        createBookingPage
            .getMainPassengerFareTypeDropdownList()
            .should('have.length', this.createBookingPage.dropdowns.fareType.faretypesNumber);

        createBookingPage.getMainPassengerFareTypeDropdownList().each(($el, i) => {
            cy.wrap($el)
              .should('be.visible')
              .and('have.text', this.createBookingPage.dropdowns.fareType.fareTypesNames[i]);
        });
    });

    it('AT_04.24.02 | Verify that Fare type dropdown menu by default has title Adult', function () {
        createBookingPage
            .getFareTypeDropdown()
            .should('have.attr', 'title')
            .and('equal', this.createBookingPage.dropdowns.fareType.fareTypesNames[0]);
    });
});    

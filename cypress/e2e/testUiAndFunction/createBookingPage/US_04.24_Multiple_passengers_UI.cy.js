/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage"

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.24 | Multiple passengers UI', { tags: ['smoke'] }, () => {

    beforeEach(function () {
        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData;
        });
    });

    before(function () {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');

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
            .should('have.length', this.bookingData.dropdowns.fareType.faretypesNumber);

        createBookingPage.getMainPassengerFareTypeDropdownList().each(($el, i) => {
            cy.wrap($el)
              .should('be.visible')
              .and('have.text', this.bookingData.dropdowns.fareType.fareTypesNames[i]);
        });
    });

    it('AT_04.24.02 | Verify that Fare type dropdown menu by default has title Adult', function () {
        createBookingPage
            .getFareTypeDropdown()
            .should('have.attr', 'title')
            .and('equal', this.bookingData.dropdowns.fareType.fareTypesNames[0]);
    });

    it('AT_04.24.04 | Verify Notes/Remark input field has a “Booking notes” text placeholder and is visible', function ()  {
        createBookingPage
            .getNotesInputField()
            .should('be.visible')
            .and('have.attr', 'placeholder', this.bookingData.placeholder.notes);
    });

    it('AT_04.24.05 | Verify email input field has an “Email” text placeholder.', function ()  {
        createBookingPage
            .getEmailInputField()
            .should('have.attr', 'placeholder', this.bookingData.placeholder.email);
    });

    it('AT_04.24.06 | Verify phone number input field has a “Phone number” text placeholder.', function () {
        createBookingPage
            .getPlaceholderPhoneNumber()
            .should('have.attr', 'placeholder', this.bookingData.placeholder.phone);
    });

    it('AT_04.24.07 | Verify passenger name input field has a “Passenger name” text placeholder', function () {
        createBookingPage
            .getPlaceholderPassengerName()
            .should('have.attr', 'placeholder', this.bookingData.placeholder.name);
    });
});    

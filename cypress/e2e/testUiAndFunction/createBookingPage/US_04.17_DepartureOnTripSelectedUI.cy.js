/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage.js";

const AGENT = Cypress.env('agent');
const createBookingPage = new CreateBookingPage();

describe('US_04.17 | Departure on trip selected UI', function () {

    before(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);

        createBookingPage.clickCalendarNextButton();
        cy.intercept('/tools/**').as('getTrip');
        cy.wait('@getTrip');
        createBookingPage.clickFirstTripCard();
    });

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })

        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
    });

    it('AT_04.17.01 | Verify "Selected Date" label has text color #00a65a, background-color #edf8ed, font-size: 150%', function () {
        createBookingPage.getLabelDepartureOnDate()
            .should('have.css', 'color', this.colors.greenBookingPage)
            .and('have.css', 'background-color', this.colors.lightGreenBookingPage)
            .and('have.css', 'font-size', this.createBookingPage.selectedDateLabel.front_size)
    });
});

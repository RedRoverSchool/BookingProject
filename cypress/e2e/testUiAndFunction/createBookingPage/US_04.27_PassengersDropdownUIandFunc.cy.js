/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import waitForToolsPing from "../../../support/utilities/waitForToolsPing";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe.skip('US_04.27 | Passengers dropdown UI', () => {
    
    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);

        //Precondition
        createBookingPage.clickCalendarNextButton();
        waitForToolsPing();
        createBookingPage.clickFirstTripCard();
    });

    beforeEach(function () {
        cy.fixture('createBookingPage.json').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        });
    });

    it('AT_04.27.01 | Verify the color of the text in the passengers dropdown menu', function () {
        createBookingPage.getPassengersDetailsDropdown()
            .should('be.visible')
            .and('have.css', 'color', this.createBookingPage.greenColor);
    });
});
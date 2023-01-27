/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

describe('US_04.07_Arrival Dropdown UI and functionality ', () => {

    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })

        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    it('AT_04.07.01 | Verify the Arrival station Dropdown Menu is clickable and opens up the dropdown menu', function () {
        createBookingPage.clickArrivalStationDropdown()
        createBookingPage.getArrivalStationList().should('be.visible')
    });
})

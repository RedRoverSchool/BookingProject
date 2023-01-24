/// <reference types="Cypress" />

import CreateBookingPage from "../../../../pageObjects/CreateBookingPage.js";

const createBookingPage = new CreateBookingPage();

describe('US_04.25 | Passengers details functionality - One passenger', () => {
    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.fixture('createBookingPage/inputField').then(passengers => {
            this.passengers = passengers;
        })
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    })

    it('AT_04.25.01 | Verify the opportunity to fill main passengers name in "Passenger name" input field', function () {
       createBookingPage.clickCalendarNextButton()
       cy.wait(5000)
       createBookingPage.clickFirstTripCard()
       cy.wait(3000)

       createBookingPage.typeIntoMainPassengerNameField(this.passengers.main_passenger.name)

       createBookingPage.getMainPassengerNameField().should('have.value', this.passengers.main_passenger.name)  
    });
})
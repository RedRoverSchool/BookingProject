/// <reference types="Cypress" />

import {PassengersDetailsSection} from "../../../../pageObjects/CreateBookingPage.js";
import {DepartureDateSection} from "../../../../pageObjects/CreateBookingPage.js";
import {DepartureOnSection} from "../../../../pageObjects/CreateBookingPage.js";

const passengersDetailsSection = new PassengersDetailsSection();
const departureDateSection = new DepartureDateSection();
const departureOnSection = new DepartureOnSection();

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
       departureDateSection.clickCalendarNextButton()
       cy.wait(4000)
       departureOnSection.clickFirstTripCard()
       cy.wait(2000)

        passengersDetailsSection.getMainPassengerField()
            .type(this.passengers.main_passenger.name)
            .should('have.value', this.passengers.main_passenger.name)          
    });
})

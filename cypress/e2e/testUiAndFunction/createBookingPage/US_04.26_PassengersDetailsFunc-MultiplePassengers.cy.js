/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage.js";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.26 | Passengers details functionality - Multiple passengers', () => { 

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        
        //Precondition
        createBookingPage.clickCalendarNextButton();
        cy.intercept('/tools/**').as('getTrip');
		cy.wait('@getTrip');
        createBookingPage.clickFirstTripCard();
    });

    it('AT_04.26.01 | Verify the agent is able to select the number of passengers', function() {
        let chosenAmountPassengers = 3
        createBookingPage.selectAmountPassengersDetailsDropdown(chosenAmountPassengers)

        createBookingPage.getAmountOfChosenPass().then($el => {
            const amountPassengersListDetails = $el.toArray().length

            expect(amountPassengersListDetails).to.eql(chosenAmountPassengers)
        })
    });
})
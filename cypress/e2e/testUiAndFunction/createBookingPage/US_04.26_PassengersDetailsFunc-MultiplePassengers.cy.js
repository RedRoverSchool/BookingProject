/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage.js";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.26 | Passengers details functionality - Multiple passengers', () => { 

    const chosenAmountPassengers = 4    

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        
        //Precondition
        createBookingPage.clickCalendarNextButton();
        cy.intercept('/tools/**').as('getTrip');
		cy.wait('@getTrip');
        createBookingPage.clickFirstTripCard();
        createBookingPage.selectAmountPassengersDetailsDropdown(chosenAmountPassengers)
    });

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        });
    });

    it('AT_04.26.01 | Verify the agent is able to select the number of passengers', function() {
        createBookingPage.getAmountOfChosenPass().then($el => {
            const amountPassengersListDetails = $el.toArray().length

            expect(amountPassengersListDetails).to.eql(chosenAmountPassengers)
        })
    });

    it('AT_04.26.02 | Verify the agent is able to enter the second and following passengers name', function() {
        createBookingPage.getExtraPassengerNameField().each($el => {
            cy.wrap($el).type(this.createBookingPage.inputField.main_passenger.name)

            cy.wrap($el).should('have.value', this.createBookingPage.inputField.main_passenger.name)
                .and('be.visible')
        })
    });
});
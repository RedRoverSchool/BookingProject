/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage.js";

const createBookingPage = new CreateBookingPage();

describe('US_04.25 | Passengers details functionality - One passenger', () => {
    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);

        //Precondition
        createBookingPage.clickCalendarNextButton()
        cy.wait(5000)
        createBookingPage.clickFirstTripCard()
        cy.wait(2000)
    })

    it('AT_04.25.01 | Verify the opportunity to fill main passengers name in "Passenger name" input field', function () {
        createBookingPage.typeIntoMainPassengerNameField(this.createBookingPage.inputField.main_passenger.name)

        createBookingPage.getMainPassengerNameField().should('have.value', this.createBookingPage.inputField.main_passenger.name)  
    });

    it('AT_04.25.02 | Verify the opportunity to fill main passengers phone in "Phone number" input field', function () {
        createBookingPage.typeIntoMainPassengerPhoneField(this.createBookingPage.inputField.main_passenger.phone)

        createBookingPage.getMainPassengerPhoneField().should('have.value', this.createBookingPage.inputField.main_passenger.phone)
    });
})

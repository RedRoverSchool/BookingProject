/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage.js";
import getRandomElementOfArray from "../../../support/utilities/getRandomElementOfArray";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.25 | Passengers details functionality - One passenger', { tags: ['smoke', 'regression'] }, () => {

    before(() => {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');

        //Precondition
        createBookingPage.clickCalendarNextButton();
        cy.intercept('/tools/**').as('getTrip');
		cy.wait('@getTrip');
        createBookingPage.clickFirstTripCard();
    });

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        });        
    });

    it('AT_04.25.01 | Verify the opportunity to fill main passengers name in "Passenger name" input field', function () {
        createBookingPage.typeIntoMainPassengerNameField(this.createBookingPage.inputField.main_passenger.name);

        createBookingPage
            .getMainPassengerNameField()
            .should('have.value', this.createBookingPage.inputField.main_passenger.name);
    });

    it('AT_04.25.02 | Verify the opportunity to fill main passengers phone in "Phone number" input field', function () {
        createBookingPage.typeIntoMainPassengerPhoneField(this.createBookingPage.inputField.main_passenger.phone);

        createBookingPage
            .getMainPassengerPhoneField()
            .should('have.value', this.createBookingPage.inputField.main_passenger.phone);
    });

    it('AT_04.25.03 | Verify agent is able to choose main passenger fare type from "Fare type" dropdown menu', function () {
        createBookingPage.getMainPassengerFareTypeDropdownList().then($el => {
            let passFareType = getRandomElementOfArray($el)

            createBookingPage.getMainPassengerFareTypeDropdownSelect()
                .select(passFareType, { force: true })
                .invoke('val')
                .then(selectedFareType => createBookingPage
                    .getMainPassengerFareTypeDropdownSelect()
                    .should('have.value', selectedFareType)

                )
        })
    })

    it('AT_04.25.04 | Verify email input field doesnt  accept invalid emails and system displays alert', function () {
        const expectedAlert = this.createBookingPage.alerts.invalidEmail
        const invalidEmailsArray =
            [this.createBookingPage.invalidEmail.emailWithoutAt,
            this.createBookingPage.invalidEmail.emailWithoutDot,
            this.createBookingPage.invalidEmail.emailWithWrongDomen,
            this.createBookingPage.invalidEmail.emailTooLong75Symbl
            ]

        for (let invalidEmail of invalidEmailsArray) {
            cy.wrap(null)
                .then(() => {
                    createBookingPage.clickResetButton()
                    createBookingPage.clickFirstTripCard();
                    createBookingPage.typeIntoMainPassengerNameField(this.createBookingPage.inputField.main_passenger.name)
                    createBookingPage.typeIntoMainPassengerEmailField(invalidEmail)
                    createBookingPage.clickBookTicketsBtn()
                })
                .then(() => {
                    cy.on('window:alert', (msg) => {
                        expect(msg).to.eq(expectedAlert)
                    })
                })
        }
    })

})

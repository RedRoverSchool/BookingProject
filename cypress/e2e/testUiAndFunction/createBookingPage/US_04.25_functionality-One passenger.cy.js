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

    it.only('AT_04.25.04 | Verify email input doesnt  accept invalid emails ', function () {
        const stub = cy.stub()
        cy.wrap(null)
            .then(() => {
                createBookingPage.typeIntoMainPassengerNameField(this.createBookingPage.inputField.main_passenger.name);
                createBookingPage.typeIntoMainPassengerEmailField('qweqwe.123');
                createBookingPage.clickBookTicketsBtn()
            })
        cy.on('window:alert', (stub) => {

            expect(stub).to.be.calledWith(this.createBookingPage.alerts.invalidEmail)
        })

        // expect(alert.getCall(0).getA).to.be.calledWith(this.createBookingPage.alerts.invalidEmail)

        // cy.get(alert.getCall(0)).should('be.calledWith', this.createBookingPage.alerts.invalidEmail)
        //cy.get('@alert').should('have.been.calledWithExactly', this.createBookingPage.alerts.invalidEmail)

    })
})

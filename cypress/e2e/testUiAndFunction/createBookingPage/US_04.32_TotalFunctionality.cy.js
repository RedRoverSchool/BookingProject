/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import { faker } from '@faker-js/faker';

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');
const randomFirstName = faker.name.firstName();
const randomLastName = faker.name.lastName();
const randomFullName = `${randomFirstName} ${randomLastName}`;
const randomEmail = faker.internet.email(randomFirstName, randomLastName, 'qatest.site');
const randomPhoneNumber = faker.phone.number('#########');

describe('US_04.32 | Total functionality', () => {
    before(() => {
        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        
        createBookingPage.clickCalendarNextButton()
        cy.intercept('/tools/**').as('getTrip')
        cy.wait('@getTrip')
        createBookingPage.clickOnFirstAvailableTripCard()
    });

    it('AT_04.32.01 | Verify that the "Reset" button is clickable',() => {
        createBookingPage.typeIntoMainPassengerNameField(randomFullName)
        createBookingPage.typeIntoMainPassengerEmailField(randomEmail)
        createBookingPage.typeIntoMainPassengerPhoneField(randomPhoneNumber)
        createBookingPage.clickResetButton()
        createBookingPage.getMainPassengerNameField().should('be.empty')
        createBookingPage.getMainPassengerPhoneField().should('be.empty')
        createBookingPage.getEmailInputField().should('be.empty')
    })
})

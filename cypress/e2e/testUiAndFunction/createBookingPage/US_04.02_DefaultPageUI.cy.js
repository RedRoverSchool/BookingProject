/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.02_Default page UI', () => {

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    it('AT_04.02.01 | Verify heading of the page is "Create booking" and it is visible', function ()  {
        createBookingPage.getCreateBookingHeader().should('be.visible');
    });

    it('AT_04.02.02 | Verify Departure/Arrival station section exists/is visible', function ()  {
        createBookingPage.getDepartureStationSection().should('exist');
        createBookingPage.getDepartureStationSection().should('be.visible');        
    });

    it('AT_04.02.03 | Verify section has a label "Arrival station" and it is visible', function ()  {
        createBookingPage.getLabelArrivalStation().should('exist');
        createBookingPage.getLabelArrivalStation().should('be.visible');        
    });
})
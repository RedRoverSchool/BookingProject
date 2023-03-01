/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.02_Default page UI', () => {

    before(() => {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
    });

    it('AT_04.02.01 | Verify heading of the page is "Create booking" and it is visible', function ()  {
        createBookingPage.getCreateBookingHeader().should('be.visible');
    });

    it('AT_04.02.02 | Verify Departure/Arrival station section exists/is visible', function ()  {
        createBookingPage.getDepartureStationSection().should('exist').and('be.visible');              
    });

    it('AT_04.02.03 | Verify section has a label "Arrival station" and it is visible', function ()  {
        createBookingPage.getLabelArrivalStation().should('have.text', 'Arrival station').and('be.visible');               
    });

    it('AT_04.02.04 | Verify section has a label "Departure station" and it is visible', function ()  {
        createBookingPage.getLabelDepartureStation().should('have.text', 'Departure station').and('be.visible');                
        createBookingPage.getLabelArrivalStation().should('exist').and('be.visible');               
    });

    it('AT_04.02.04 | Verify section has a label "Departure station" and it is visible', function ()  {
        createBookingPage.getLabelDepartureStation().should('exist').and('be.visible');                
    });

    it('AT_04.02.05 | Verify Departure date section exists/is visible', function ()  {
        createBookingPage.getDepartureDateSection().should('exist').and('be.visible');               
    });

    it('AT_04.02.06 | Verify section title is "Departure date" and it is visible', function ()  {
        createBookingPage.getDepartureDateLabel().should('have.text', 'Departure date').and('be.visible');                
    });

    it('AT_04.02.07 | Verify Departure on section exists/is visible', function ()  {
        createBookingPage.getDepartureOnSection().should('exist').and('be.visible');                
    });

    it('AT_04.02.08 | Verify section title is "Departure on" and it is visible', function ()  {
        createBookingPage.getDepartureOnLabel().should('include.text', 'Departure on').and('be.visible');                           
    });
})
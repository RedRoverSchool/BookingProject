/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage"

const createBookingPage = new CreateBookingPage();

describe('US_04.23 | Passengers details default UI', { tags: ['smoke'] }, () => {
    const AGENT = Cypress.env('agent');

    before(() =>{
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
    });

    beforeEach(function() {
        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData;
        });
    });  
    
    it('AT_04.23.01 | Verify Passenger details label is visible', () => {
       
        createBookingPage.getLabelPassengerDetails().should('be.visible');
    });

    it('AT_04.23.02 | Verify Main passenger label is visible', () =>{

        createBookingPage.getLabelMainPassenger().should('be.visible');
    });

    it('AT_04.23.03 | Verify passenger name input field has a “Passenger name” text placeholder', function () {
        
        createBookingPage.getPlaceholderPassengerName().should('have.attr', 'placeholder', this.bookingData.placeholder.name);
    });

    it('AT_04.23.05 | Verify phone number input field has a “Phone number” text placeholder.', function () {

        createBookingPage.getPlaceholderPhoneNumber().should('have.attr', 'placeholder', this.bookingData.placeholder.phone);
    });

    it('AT_04.23.04 | Verify selected dial code is “+66” by default', function () {
        createBookingPage.getSelectedDialCode().should('have.text', this.bookingData.dropdowns.dialCode.byDefault);
    });

    it('AT_04.23.06 | Verify dial code selection arrow is present and visible', ()=> {
        
        createBookingPage.getDialCodeArrow().should('be.visible')
    });

    it('AT_04.23.07 | Verify email input field has an “Email” text placeholder.', function ()  {
        createBookingPage.getEmailInputField().should('have.attr', 'placeholder', this.bookingData.placeholder.email);
    });

    it('AT_04.23.10 | Verify Notes/Remark input field has a “Booking notes” text placeholder.', function ()  {
        createBookingPage
            .getNotesInputField()
            .should('have.attr', 'placeholder', this.bookingData.placeholder.notes);
    });

    it('AT_04.23.11 | Verify "Fare type" label is present and visible.', function ()  {
        createBookingPage
            .getFareTypeLabel()
            .should('be.visible')
            .and('include.text', this.bookingData.dropdowns.fareType.labelName);
    });

    it('AT_04.23.08 | Verify Passenger dropdown is visible', () => {
        
        createBookingPage.getPassengersDetailsDropdown().should('be.visible')
    });

    it('AT_04.23.09 | Verify Passenger dropdown has 1 passenger by default', function () {
        
        createBookingPage.getDropdownPassengerDefault().should('have.text', this.bookingData.numberOfPassengers.passengerDefault)
    });

    it('AT_04.23.12 | Verify "Notes/Remark" label is present and visible.', function ()  {
        createBookingPage
            .getNotesRemarkLabel()
            .should('be.visible');
    });
       
    it('AT_04.23.13 | Verify Fare type has “Adult” option displayed by default.', function ()  {
        createBookingPage
            .getFareTypeDropdown()
            .should('have.text', this.bookingData.dropdowns.fareType.fareTypesNames[0]);
    });

    it('AT_04.23.14 | Fare type selection arrow is present and visible', () =>{

        createBookingPage.getSelectionArrowFareType().should('be.visible')
    });
});

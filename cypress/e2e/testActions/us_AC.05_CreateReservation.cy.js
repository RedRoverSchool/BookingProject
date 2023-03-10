/// <reference types="Cypress" />

import CreateBookingPage from "../../pageObjects/CreateBookingPage";
import BookingPopup from "../../pageObjects/BookingPopup";

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();

const AGENT = Cypress.env('agent');

describe('US_AC.05 | Create reservation for 1 passenger', { tags: ['regression'] }, () => {
    beforeEach(function () {          
        cy.cleanData();

        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');

        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage
        })
    });
    
    it('AT_AC.05.01| Create reservation for 1 passenger - Adult', function () {
        const filteredPassengers = this.createBookingPage.passengers.filter((passenger) => passenger.fareType === 'adult');
        const passengerNames = filteredPassengers.map((passenger) => passenger.name);
        const adultFareTypes = filteredPassengers.map((passenger) => passenger.fareType);
        const passengerAmount = 1;              
               
        createBookingPage.reserveBooking(passengerNames, passengerAmount, adultFareTypes);

        bookingPopup.getConfirmTicketButton().should('be.visible');
        bookingPopup.getPassengerTitle().should('include.text', '(1)');
        bookingPopup.getPassengersList().should('have.length', 1);
        bookingPopup.getOnePassengerTypeLabel().should('contain', 'Adult'); 
    });

    it('AT_AC.05.02| Create reservation for 1 passenger - Child', function () {
        const filteredPassengers = this.createBookingPage.passengers.filter((passenger) => passenger.fareType === 'child');
        const passengerNames = filteredPassengers.map((passenger) => passenger.name);
        const childFareTypes = filteredPassengers.map((passenger) => passenger.fareType);
        const passengerAmount = 1;              
               
        createBookingPage.reserveBooking(passengerNames, passengerAmount, childFareTypes);

        bookingPopup.getConfirmTicketButton().should('be.visible');
        bookingPopup.getPassengerTitle().should('include.text', '(1)');
        bookingPopup.getPassengersList().should('have.length', 1);
        bookingPopup.getOnePassengerTypeLabel().should('contain', 'Child');                          
    });    

    it('AT_AC.05.03| Create reservation for 1 passenger - Elder', function () {
        const filteredPassengers = this.createBookingPage.passengers.filter((passenger) => passenger.fareType === 'elder');
        const passengerNames = filteredPassengers.map((passenger) => passenger.name);
        const elderFareTypes = filteredPassengers.map((passenger) => passenger.fareType);
        const passengerAmount = 1;              
               
        createBookingPage.reserveBooking(passengerNames, passengerAmount, elderFareTypes);

        bookingPopup.getConfirmTicketButton().should('be.visible');
        bookingPopup.getPassengerTitle().should('include.text', '(1)');
        bookingPopup.getPassengersList().should('have.length', 1);
        bookingPopup.getOnePassengerTypeLabel().should('contain', 'Elder'); 
    });
});   

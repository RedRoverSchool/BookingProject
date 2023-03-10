/// <reference types="Cypress" />

import CreateBookingPage from "../../pageObjects/CreateBookingPage"
import BookingPopup from "../../pageObjects/BookingPopup"

const createBookingPage = new CreateBookingPage()
const bookingPopup = new BookingPopup()

const AGENT = Cypress.env('agent')

describe('US_AC.04 | Create booking for more then 1 passenger', { tags: ['regression'] }, () => {

    before(() => {
        cy.cleanData()
    })

    beforeEach(function () {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/')

        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData
        })
    })

    it('AT_AC.04.01| Create booking for more then 1 passenger: Adult + Adult', function () {
        const filteredPassengers = this.bookingData.passengers.filter((passenger) => passenger.fareType === 'adult')
        const passengerNames = filteredPassengers.map((passenger) => passenger.name)
        const adultFareTypes = filteredPassengers.map((passenger) => passenger.fareType)
        const passengerAmount = 2

        createBookingPage.createBooking(passengerNames, passengerAmount, adultFareTypes)

        bookingPopup.getBookingDetailsTitle().should('have.text', 'Booking details')
        bookingPopup.getPassengerTitle().should('have.text', 'Passengers (2)')
        bookingPopup.getPassengerTypeLabel(1).should('contain', 'Adult')
        bookingPopup.getPassengerTypeLabel(2).should('contain', 'Adult')
    })

    it('AT_AC.04.02| Create booking for more then 1 passenger: Child + Child', function () {
        const filteredPassengers = this.bookingData.passengers.filter((passenger) => passenger.fareType === 'child')
        const passengerNames = filteredPassengers.map((passenger) => passenger.name)
        const childFareTypes = filteredPassengers.map((passenger) => passenger.fareType)
        const passengerAmount = 2

        createBookingPage.createBooking(passengerNames, passengerAmount, childFareTypes)

        bookingPopup.getBookingDetailsTitle().should('have.text', 'Booking details');
        bookingPopup.getPassengerTitle().should('have.text', 'Passengers (2)');
        bookingPopup.getPassengerTypeLabel(1).should('contain', 'Child')
        bookingPopup.getPassengerTypeLabel(2).should('contain', 'Child')
    })

    it('AT_AC.04.03 | Create booking for 2 passengers: Elder + Elder', function () {
        const filteredPassengers = this.bookingData.passengers.filter((passenger) => passenger.fareType === 'elder' );
        const passengerNames = filteredPassengers.map((passenger) => passenger.name);
        const elderFareTypes = filteredPassengers.map((passenger) => passenger.fareType);
        const passengerAmount = 2;

        createBookingPage.createBooking(passengerNames, passengerAmount, elderFareTypes)

        bookingPopup.getBookingDetailsTitle().should('have.text', 'Booking details');
        bookingPopup.getPassengerTitle().should('have.text', 'Passengers (2)');
        bookingPopup.getPassengerTypeLabel(1).should('contain', 'Elder:');
        bookingPopup.getPassengerTypeLabel(2).should('contain', 'Elder');
    });
})

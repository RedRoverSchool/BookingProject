/// <reference types="Cypress" />

import CreateBookingPage from "../../pageObjects/CreateBookingPage"
import BookingPopup from "../../pageObjects/BookingPopup"

const createBookingPage = new CreateBookingPage()
const bookingPopup = new BookingPopup()

const AGENT = Cypress.env('agent')

describe('US_AC.03 | Create booking for 1 passenger', () => {

    before(() => {
        cy.cleanData()
    })

    beforeEach(function () {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/')

        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage
        })
    })

    it('AT_AC.03.01| Create booking for 1 passenger: Adult', function () {
        const passengerName = this.createBookingPage.passengers[0].name
        const adultFareType = this.createBookingPage.passengers.find((passenger) => passenger.fareType === 'adult').fareType
        const passengerAmount = 1

        createBookingPage.createBooking(passengerName, passengerAmount, adultFareType)

        bookingPopup.getBookingDetailsTitle().contains('Booking details');
        bookingPopup.getFirstFareType().contains('Adult');
    })

    it('AT_AC.03.02| Create booking for 1 passenger: Child', function () {
        const passengerName = this.createBookingPage.passengers[0].name
        const adultFareType = this.createBookingPage.passengers.find((passenger) => passenger.fareType === 'child').fareType
        const passengerAmount = 1

        createBookingPage.createBooking(passengerName, passengerAmount, adultFareType)

        bookingPopup.getBookingDetailsTitle().contains('Booking details');
        bookingPopup.getFirstFareType().contains('Child');
    })

    it('AT_AC.03.03| Create booking for 1 passenger: Elder', function () {
        const passengerName = this.createBookingPage.passengers[0].name
        const adultFareType = this.createBookingPage.passengers.find((passenger) => passenger.fareType === 'elder').fareType
        const passengerAmount = 1

        createBookingPage.createBooking(passengerName, passengerAmount, adultFareType)

        bookingPopup.getBookingDetailsTitle().contains('Booking details');
        bookingPopup.getFirstFareType().contains('Elder');
    })
})

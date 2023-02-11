/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from "../../../pageObjects/BookingPopup";
import getRandomElementOfArray from "../../../support/utilities/getRandomElementOfArray";
import getArray from "../../../support/utilities/getArray";

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();
const AGENT = Cypress.env('agent');

const sumOfArray = (array) => {
	return array
		.map(el => el.split(" ")[1])
		.reduce((total, el) => total += +el, 0)
}

describe('US_04.30 | Summary UI', () => {

	before(() => {
		cy.visit('/')
		cy.login(AGENT.email, AGENT.password)
		createBookingPage.clickCalendarNextButton()
		createBookingPage.clickFridayButton()
		cy.intercept('/tools/**').as('getTrip')
		cy.wait('@getTrip')
		createBookingPage.clickSecondTripCard()
	});

	beforeEach(function() {
	cy.fixture('bookingPopup').then(bookingPopup => {
		this.bookingPopup = bookingPopup;
		});
	});
	
	context('AT_04.30.01 AT_04.30.03 AT_04.30.02 can be run within the same login', () => {
		it('AT_04.30.01 | Displayed seats match default seat selection from seat selection section', () => {
			createBookingPage.getPassengersDetailsDropdownList().then($el => {
				let numberOfPass = getRandomElementOfArray($el)
				createBookingPage.getPassengersDetailsDropdown().select(numberOfPass)
				createBookingPage.getSelectedSeats()
					.then(($el) => {
						let defaultSelectedSeatsArray = $el.text()

						createBookingPage.getSeatsNumberColumnSummary().then(($el) => {
							let seatsSummaryArray = $el.text()
							expect(defaultSelectedSeatsArray).to.deep.eq(seatsSummaryArray)
						})
					})
			})
		});

		it('AT_04.30.03 | Verify total number of rows equals number of chosen passengers from passenger dropdown menu', () => {
			createBookingPage.getPassengersDetailsDropdownList().then($el => {
				let numberOfPass = getRandomElementOfArray($el)
				createBookingPage.getPassengersDetailsDropdown().select(numberOfPass)
					.invoke('val')
					.then((value) => {
						let chosenNumOfPassengers = +value

						createBookingPage.getRowsSummaryList().then(($el) => {
							let numberOfRows = $el
							expect(chosenNumOfPassengers).to.eq(numberOfRows.length)

						})
					})
			})
		})

		it('AT_04.30.02 | Total price is correct', () => {
			createBookingPage.getPassengersDetailsDropdownList().then(($el) => {
				let arrayOfSeats = $el
					.toArray()
					.map($el => $el.innerText)

				let indexOfSeat = Math.floor(Math.random() * arrayOfSeats.length)
				let amountOfPass = arrayOfSeats[indexOfSeat]

				createBookingPage.getSeatSelectionDropdown().select(amountOfPass)

				createBookingPage.getPriceOfTicket().then(($el) => {

					let price = $el.text().replace(/([^0-9])+/i, "")
					let priceForTicket = price * amountOfPass.replace(/([^0-9])+/i, "")

					createBookingPage.getTotalPrice().then(($el) => {
						let totalPrice = $el
							.toArray()
							.map($el => $el.innerText)
							.join('')

						expect(totalPrice).to.be.equal('USD' + " " + priceForTicket)
					})
				})
			})
		})

		it('AT_04.30.05 | Verify total price for 6 passengers with custom fare types (2 "Adult", 2 "Child", 2 "Elder") is correct', function () {
			createBookingPage.getPassengersDetailsDropdown().select('6 passengers')
			createBookingPage.getFareTypeDropdown().each(($el, index) => {
				if (index <= 1) {
					cy.wrap($el).click()
					createBookingPage.selectAdultFare()
				} else if (index <= 3) {
					cy.wrap($el).click()
					createBookingPage.selectChildFare()
				} else {
					cy.wrap($el).click()
					createBookingPage.selectElderFare()
				}
			})
			createBookingPage.getPricesSummaryList().then(($el) => {
				const prices = getArray($el)

				const finalPrice = "USD" + " " + sumOfArray(prices)

				createBookingPage.getTotalPriceSummary().then(($el) => {
					let totalPrice = $el.text()
					expect(finalPrice).to.deep.eq(totalPrice)
				})
			})
		})
	})

	context('AT_04.30.04 | Amount of selected fare type passengers matches the amount on Booking Popup (needs new login)', () => {
		before(() => {
			cy.visit('/')
			cy.login(AGENT.email, AGENT.password)
			createBookingPage.clickCalendarNextButton()
			createBookingPage.clickFridayButton()
			cy.intercept('/tools/**').as('getTrip')
			cy.wait('@getTrip')
			createBookingPage.clickSecondTripCard()
		});
		it('AT_04.30.04 | Verify that amount of selected fare type passengers matches the amount on Booking Popup', function () {
		    createBookingPage.getPassengersDetailsDropdown().select(5)
			createBookingPage.completeMultipleNameFields()
			createBookingPage.getFareTypeDropdown().each(($el, index) => {
				if (index <= 2) {
				  cy.wrap($el).click()
				  createBookingPage.selectAdultFare()
				} else if (index <= 4) {
				  cy.wrap($el).click()
				  createBookingPage.selectChildFare()
				} else {
				  cy.wrap($el).click()
				  createBookingPage.selectElderFare()
				}
			})
			createBookingPage.clickBookTicketsBtn();

			bookingPopup.getFirstFareType().should('have.text', 3 + this.bookingPopup.passengerPrice.passengerFareTypes.adultFare)
    		bookingPopup.getSecondFareType().should('have.text', 2 + this.bookingPopup.passengerPrice.passengerFareTypes.childFare)
    		bookingPopup.getThirdFareType().should('have.text', 1 + this.bookingPopup.passengerPrice.passengerFareTypes.elderFare)
		})
	 })
});

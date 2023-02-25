/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from "../../../pageObjects/BookingPopup";
import getArray from "../../../support/utilities/getArray";
import waitForToolsPing from "../../../support/utilities/waitForToolsPing";

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
		waitForToolsPing()
		createBookingPage.clickFridayButton()
		waitForToolsPing()
		createBookingPage.clickSecondTripCard()
		waitForToolsPing()
	});

	beforeEach(function() {
		cy.fixture('bookingPopup').then(bookingPopup => {
		this.bookingPopup = bookingPopup;
		});

		cy.fixture('createBookingPage').then(createBookingPage => {
		this.createBookingPage = createBookingPage
		})
	});
	
	it('AT_04.30.01 | Displayed seats match default seat selection from seat selection section for 1, 150, 300 chosen passengers', function () {
		let numberOfPassengersArray = [this.createBookingPage.validBoundaryValues.minimum,
		                               this.createBookingPage.validBoundaryValues.nominalValue,
		                               this.createBookingPage.validBoundaryValues.maximum]
		for (let numberOfPassengers of numberOfPassengersArray) {
			createBookingPage.getPassengersDetailsDropdown().select(numberOfPassengers)

			createBookingPage.getSelectedSeats()
				.then(($el) => {
					let defaultSelectedSeatsArray = getArray($el)
					expect(defaultSelectedSeatsArray.length).to.eq(parseInt(numberOfPassengers))
				
					createBookingPage.getSeatsNumberColumnSummary().then(($el) => {
						let seatsSummaryArray = getArray($el)
						expect(defaultSelectedSeatsArray).to.deep.eq(seatsSummaryArray)
					})
				})
		}
	});

	it('AT_04.30.03 | Verify total number of rows equals number of chosen passengers (2, 150, 299) from passenger dropdown menu', function () {
		let numberOfPassengersArray = [this.createBookingPage.validBoundaryValues.aboveMinimum,
		                              this.createBookingPage.validBoundaryValues.nominalValue,
		                              this.createBookingPage.validBoundaryValues.belowMaximum]
		for (let numberOfPassengers of numberOfPassengersArray) {
			createBookingPage.getPassengersDetailsDropdown().select(numberOfPassengers)

			createBookingPage.getSelectedSeats()
				.then(($el) => {
					let defaultSelectedSeatsArray = getArray($el)
					expect(defaultSelectedSeatsArray.length).to.eq(parseInt(numberOfPassengers))

					createBookingPage.getRowsSummary().then(($el) => {
						let numberOfRows = $el
						expect(parseInt(numberOfPassengers)).to.eq(numberOfRows.length)
					})
				})
		}
	});

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
			createBookingPage.getPricesSummary().then(($el) => {
				const prices = getArray($el)

				const finalPrice = "USD" + " " + sumOfArray(prices)

				createBookingPage.getTotalPriceSummary().then(($el) => {
					let totalPrice = $el.text()
					expect(finalPrice).to.deep.eq(totalPrice)
				})
			})
		})
	
	    it('AT_04.30.08 | Verify price for ticket for one passenger for each fare type (Elder, Child, Adult) matches expected price', function () {
			createBookingPage.getPassengersDetailsDropdown().select(this.createBookingPage.numberOfPassengers.passengerDefault)
		    let fareTypesArray = this.createBookingPage.dropdowns.fareType.fareTypesNames
		
		    for (let i = 0; i < fareTypesArray.length; i++ ) {
			    createBookingPage.getMainPassengerFareTypeDropdownSelect().select(fareTypesArray[i], { force: true } )
			    createBookingPage.getMainPassengerFareTypeContainerText().should('have.text', fareTypesArray[i])
				
			createBookingPage.getPricesSummary().then(($el) => {
				let actualPrice = $el.text()
				expect(actualPrice).to.eq(this.createBookingPage.pricesForFerryAdultChildElder[i])
			})
		}
	})
	
	    it('AT_04.30.09 | Verify total price for ticket for one passenger for each fare type (Elder, Child, Adult) matches expected price', function () {
			createBookingPage.getPassengersDetailsDropdown().select(this.createBookingPage.numberOfPassengers.passengerDefault)
		    let fareTypesArray = this.createBookingPage.dropdowns.fareType.fareTypesNames

		    for (let i = 0; i < fareTypesArray.length; i++) {
				createBookingPage.getMainPassengerFareTypeDropdownSelect().select(fareTypesArray[i], { force: true })
				createBookingPage.getMainPassengerFareTypeContainerText().should('have.text', fareTypesArray[i])

			createBookingPage.getTotalPriceSummary().then(($el) => {
				let actualPrice = $el.text()
				expect(actualPrice).to.eq(this.createBookingPage.pricesForFerryAdultChildElder[i])
			})
		}
	})

context('AT_04.30.04 AT_04.30.06 AT_04.30.07| Verify that selected passenger fare type matches the amount on Booking Popup (Adult, Child, Elder)', () => {
		beforeEach(() => {
			cy.visit('/')
			cy.login(AGENT.email, AGENT.password)
			createBookingPage.clickCalendarNextButton()
			createBookingPage.clickFridayButton()
			cy.intercept('/tools/**').as('getTrip')
			cy.wait('@getTrip')
			createBookingPage.clickSecondTripCard()
		});

		it('AT_04.30.04 | Verify that selected passenger fare type "Adult" matches the amount on Booking Popup', function () {
		    createBookingPage.getPassengersDetailsDropdown().select('1 passenger')
			createBookingPage.typeIntoMainPassengerNameField(this.createBookingPage.inputField.main_passenger.name)
			createBookingPage.getFareTypeDropdown().click()
			createBookingPage.selectFareType('Adult')
			createBookingPage.clickBookTicketsBtn();
			bookingPopup.getFirstFareType().should('have.text', 1 + this.bookingPopup.passengerPrice.passengerFareTypes.adultFare)
		});

		it('AT_04.30.06 | Verify that selected passenger fare type "Child" matches the amount on Booking Popup', function () {
			createBookingPage.getPassengersDetailsDropdown().select('1 passenger')
			createBookingPage.typeIntoMainPassengerNameField(this.createBookingPage.inputField.main_passenger.name)
			createBookingPage.getFareTypeDropdown().click()
			createBookingPage.selectFareType('Child')
			createBookingPage.clickBookTicketsBtn();
			bookingPopup.getFirstFareType().should('have.text', 1 + this.bookingPopup.passengerPrice.passengerFareTypes.childFare)
		});

		it('AT_04.30.07 | Verify that selected passenger fare type "Elder" matches the amount on Booking Popup', function () {
			createBookingPage.getPassengersDetailsDropdown().select('1 passenger')
			createBookingPage.typeIntoMainPassengerNameField(this.createBookingPage.inputField.main_passenger.name)
			createBookingPage.getFareTypeDropdown().click()
			createBookingPage.selectFareType('Elder')
			createBookingPage.clickBookTicketsBtn();
			bookingPopup.getFirstFareType().should('have.text', 1 + this.bookingPopup.passengerPrice.passengerFareTypes.elderFare)
		});
	})
})
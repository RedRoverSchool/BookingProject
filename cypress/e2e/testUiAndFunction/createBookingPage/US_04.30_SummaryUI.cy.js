/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from "../../../pageObjects/BookingPopup";
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

	beforeEach(function () {
		cy.fixture('bookingPopup').then(bookingPopup => {
			this.bookingPopup = bookingPopup;
		});
		cy.fixture('createBookingPage').then(createBookingPage => {
			this.createBookingPage = createBookingPage
		});
	})

	describe('US_04.30 | Summary  section UI', () => {
		before(() => {
			cy.cleanData()
			cy.loginWithSession(AGENT.email, AGENT.password)
			cy.visit('/');
			cy.intercept('/tools/**').as('getToolsPing')
			cy.wait('@getToolsPing')
			createBookingPage.clickCalendarNextButton()
			cy.wait('@getToolsPing')
			createBookingPage.clickFridayButton()
			cy.wait('@getToolsPing')
			createBookingPage.clickOnLastAvailiableTripCard()
			
			createBookingPage.getSelectedTripCard().should('be.visible')
		});

		it('AT_04.30.01 | Displayed seats match default seat selection from seat selection section for 1 passenger', { tags: ['regression'] }, function () {
			createBookingPage.selectAmountPassengersDetailsDropdown(this.createBookingPage.validBoundaryValues.minimum)
			createBookingPage.getSelectedSeats().then(($el) => {
					let defaultSelectedSeatsArray = getArray($el)
					expect(defaultSelectedSeatsArray.length).to.eq(parseInt(this.createBookingPage.validBoundaryValues.minimum))

					createBookingPage.getSeatsNumberColumnSummary().then(($el) => {
						let seatsSummaryArray = getArray($el)
						expect(defaultSelectedSeatsArray).to.deep.eq(seatsSummaryArray)
					})
				})
		});

		it('AT_04.30.11 | Displayed seats match default seat selection from seat selection section for 150 passengers', { tags: ['regression'] }, function () {
			createBookingPage.selectAmountPassengersDetailsDropdown(this.createBookingPage.validBoundaryValues.nominalValue)
			createBookingPage.getSelectedSeats().then(($el) => {
					let defaultSelectedSeatsArray = getArray($el)
					expect(defaultSelectedSeatsArray.length).to.eq(parseInt(this.createBookingPage.validBoundaryValues.nominalValue))

					createBookingPage.getSeatsNumberColumnSummary().then(($el) => {
						let seatsSummaryArray = getArray($el)
						expect(defaultSelectedSeatsArray).to.deep.eq(seatsSummaryArray)
					})
				})
		});

		it('AT_04.30.12 | Displayed seats match default seat selection from seat selection section for 300 passengers', { tags: ['regression'] }, function () {
			createBookingPage.selectAmountPassengersDetailsDropdown(this.createBookingPage.validBoundaryValues.maximum)
			createBookingPage.getSelectedSeats().then(($el) => {
					let defaultSelectedSeatsArray = getArray($el)
					expect(defaultSelectedSeatsArray.length).to.eq(parseInt(this.createBookingPage.validBoundaryValues.maximum))

					createBookingPage.getSeatsNumberColumnSummary().then(($el) => {
						let seatsSummaryArray = getArray($el)
						expect(defaultSelectedSeatsArray).to.deep.eq(seatsSummaryArray)
					})
				})
		});

		it('AT_04.30.03 | Verify total number of rows equals number of chosen passengers (2 passengers) from dropdown menu', { tags: ['regression'] }, function () {
			createBookingPage.selectAmountPassengersDetailsDropdown(this.createBookingPage.validBoundaryValues.aboveMinimum)
			createBookingPage.getSelectedSeats().then(($el) => {
					let defaultSelectedSeatsArray = getArray($el)
					expect(defaultSelectedSeatsArray.length).to.eq(parseInt(this.createBookingPage.validBoundaryValues.aboveMinimum))

					createBookingPage.getRowsSummary().then(($el) => {
						let numberOfRows = $el
						expect(parseInt(this.createBookingPage.validBoundaryValues.aboveMinimum)).to.eq(numberOfRows.length)
					})
				})
		});

		it('AT_04.30.13 | Verify total number of rows equals number of chosen passengers (150 passengers) for dropdown menu', { tags: ['regression'] }, function () {
			createBookingPage.selectAmountPassengersDetailsDropdown(this.createBookingPage.validBoundaryValues.nominalValue)
			createBookingPage.getSelectedSeats().then(($el) => {
					let defaultSelectedSeatsArray = getArray($el)
					expect(defaultSelectedSeatsArray.length).to.eq(parseInt(this.createBookingPage.validBoundaryValues.nominalValue))

					createBookingPage.getRowsSummary().then(($el) => {
						let numberOfRows = $el
						expect(parseInt(this.createBookingPage.validBoundaryValues.nominalValue)).to.eq(numberOfRows.length)
					})
				})
		});

		it('AT_04.30.14 | Verify total number of rows equals number of chosen passengers ( 299 passengers) from passenger dropdown menu', { tags: ['regression'] }, function () {
			createBookingPage.selectAmountPassengersDetailsDropdown(this.createBookingPage.validBoundaryValues.belowMaximum)
			createBookingPage.getSelectedSeats().then(($el) => {
					let defaultSelectedSeatsArray = getArray($el)
					expect(defaultSelectedSeatsArray.length).to.eq(parseInt(this.createBookingPage.validBoundaryValues.belowMaximum))

					createBookingPage.getRowsSummary().then(($el) => {
						let numberOfRows = $el
						expect(parseInt(this.createBookingPage.validBoundaryValues.belowMaximum)).to.eq(numberOfRows.length)
					})
				})
		});

		it('AT_04.30.02 | Total price is correct', { tags: ['smoke'] }, () => {
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
		});

		it('AT_04.30.05 | Verify total price for 6 passengers with custom fare types (2 "Adult", 2 "Child", 2 "Elder") is correct', { tags: ['regression'] }, function () {
			createBookingPage.selectAmountPassengersDetailsDropdown(this.createBookingPage.numberOfPassengers.sixPassengers)

			let fareTypes = [this.createBookingPage.dropdowns.fareType.fareTypesNames[0], this.createBookingPage.dropdowns.fareType.fareTypesNames[0],
			                this.createBookingPage.dropdowns.fareType.fareTypesNames[1], this.createBookingPage.dropdowns.fareType.fareTypesNames[1],
				            this.createBookingPage.dropdowns.fareType.fareTypesNames[2], this.createBookingPage.dropdowns.fareType.fareTypesNames[2]]
			
			createBookingPage.selectFareTypes(fareTypes)
			createBookingPage.getFareTypeColumnSummary().each(($el, i) => {
				expect($el.text()).to.include(fareTypes[i])
				
				createBookingPage.getPricesSummary().then(($el) => {
					const prices = getArray($el)

					const finalPrice = "USD" + " " + sumOfArray(prices)

					createBookingPage.getTotalPriceSummary().then(($el) => {
						let totalPrice = $el.text()
						expect(finalPrice).to.deep.eq(totalPrice)
					})
				})
			})
		});

		it('AT_04.30.08 | Verify price for ticket for one passenger for each fare type (Elder, Child, Adult) matches expected price', { tags: ['regression'] }, function () {
			createBookingPage.selectAmountPassengersDetailsDropdown(this.createBookingPage.numberOfPassengers.passengerDefault)
			let fareTypesArray = this.createBookingPage.dropdowns.fareType.fareTypesNames

			for (let i = 0; i < fareTypesArray.length; i++) {
				createBookingPage.selectFareTypeMainPassenger(fareTypesArray[i])
				createBookingPage.getFareTypeColumnSummary().should('include.text', fareTypesArray[i])

				createBookingPage.getPricesSummary().then(($el) => {
					let actualPrice = $el.text()
					expect(actualPrice).to.eq(this.createBookingPage.pricesForFerryAdultChildElder[i])
				})
			}
		});

		it('AT_04.30.09 | Verify total price for ticket for one passenger for each fare type (Elder, Child, Adult) matches expected price', { tags: ['regression'] }, function () {
			createBookingPage.selectAmountPassengersDetailsDropdown(this.createBookingPage.numberOfPassengers.passengerDefault)
			let fareTypesArray = this.createBookingPage.dropdowns.fareType.fareTypesNames

			for (let i = 0; i < fareTypesArray.length; i++) {
				createBookingPage.selectFareTypeMainPassenger(fareTypesArray[i])
				createBookingPage.getFareTypeColumnSummary().should('include.text', fareTypesArray[i])

				createBookingPage.getTotalPriceSummary().then(($el) => {
					let actualPrice = $el.text()
					expect(actualPrice).to.eq(this.createBookingPage.pricesForFerryAdultChildElder[i])
				})
			}
		});

		it('AT_04.30.10 | Text "Total" is displayed and visible', { tags: ['smoke'] }, function () {
			createBookingPage.getTotalSummaryLabel().should('be.visible');
		});
	});

	describe('AT_04.30.04 AT_04.30.06 AT_04.30.07| Verify that selected passenger fare type matches the amount on Booking Popup (Adult, Child, Elder)', { tags: ['regression'] }, () => {
		beforeEach(() => {
			cy.cleanData()
			cy.loginWithSession(AGENT.email, AGENT.password)
			cy.visit('/')
			cy.intercept('/tools/**').as('getToolsPing')
			cy.wait('@getToolsPing')
			createBookingPage.clickCalendarNextButton()
			cy.wait('@getToolsPing')
			createBookingPage.clickFridayButton()
			cy.wait('@getToolsPing')
			createBookingPage.clickOnLastAvailiableTripCard()
			cy.wait('@getToolsPing')
		});

		it('AT_04.30.04 | Verify that selected passenger fare type "Adult" matches the amount on Booking Popup', function () {
			createBookingPage.getPassengersDetailsDropdown().select('1 passenger')
			createBookingPage.typeIntoMainPassengerNameField(this.createBookingPage.inputField.main_passenger.name)
			createBookingPage.getFareTypeDropdown().click()
			createBookingPage.selectFareType('Adult')
			createBookingPage.clickBookTicketsBtn();
			cy.intercept('/tools/**').as('getPopUp')
			cy.wait('@getPopUp')
			bookingPopup.getFirstFareType().should('have.text', 1 + this.bookingPopup.passengerPrice.passengerFareTypes.adultFare)

		});

		it('AT_04.30.06 | Verify that selected passenger fare type "Child" matches the amount on Booking Popup', function () {
			createBookingPage.getPassengersDetailsDropdown().select('1 passenger')
			createBookingPage.typeIntoMainPassengerNameField(this.createBookingPage.inputField.main_passenger.name)
			createBookingPage.getFareTypeDropdown().click()
			createBookingPage.selectFareType('Child')
			createBookingPage.clickBookTicketsBtn();
			cy.intercept('/tools/**').as('getPopUp')
			cy.wait('@getPopUp')
			bookingPopup.getFirstFareType().should('have.text', 1 + this.bookingPopup.passengerPrice.passengerFareTypes.childFare)
		});

		it('AT_04.30.07 | Verify that selected passenger fare type "Elder" matches the amount on Booking Popup', function () {
			createBookingPage.getPassengersDetailsDropdown().select('1 passenger')
			createBookingPage.typeIntoMainPassengerNameField(this.createBookingPage.inputField.main_passenger.name)
			createBookingPage.getFareTypeDropdown().click()
			createBookingPage.selectFareType('Elder')
			createBookingPage.clickBookTicketsBtn();
			cy.intercept('/tools/**').as('getPopUp')
			cy.wait('@getPopUp')
			bookingPopup.getFirstFareType().should('have.text', 1 + this.bookingPopup.passengerPrice.passengerFareTypes.elderFare)
		});
	})
});
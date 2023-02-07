/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.30 | Summary UI', () => {

	before(() => {
		cy.visit('/')
		cy.login(AGENT.email, AGENT.password)
		createBookingPage.clickCalendarNextButton()
		createBookingPage.clickFridayButton()
		cy.intercept('/tools/**').as('getTrip')
		cy.wait('@getTrip')
		createBookingPage.clickFirstTripCard()
	});

	it('AT_04.30.01 | Displayed seats match default seat selection from seat selection section', () => {
		createBookingPage.getPassengersDetailsDropdownList().then(($el) => {
			let numberOfPassengersArray = $el
				.toArray()
				.map($el => $el.innerText)
			
			let index = Math.floor(Math.random() * numberOfPassengersArray.length)

			createBookingPage.getPassengersDetailsDropdown().select(index)
			createBookingPage.getSelectedSeats()
				.then(($el) => {
					let defaultSelectedSeatsArray = $el.text()

					createBookingPage.getColumnSeatsSummary().then(($el) => {
						let seatsSummaryArray = $el.text()
						expect(defaultSelectedSeatsArray).to.deep.eq(seatsSummaryArray)
					})
				})
		})
	});

	it('AT_04.30.03 | Verify total number of rows equals number of chosen passengers from passenger dropdown menu', () => {
		createBookingPage.getPassengersDetailsDropdownList().then(($el) => {
			let numberOfPassengersArray = $el
				.toArray()
				.map($el => $el.innerText)

			let index = Math.floor(Math.random() * numberOfPassengersArray.length)

			createBookingPage.getPassengersDetailsDropdown().select(index)
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
})
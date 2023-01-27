/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage.js";

const createBookingPage = new CreateBookingPage();

describe('US_04.12 | Calendar month functionality', () => {
	const AGENT = Cypress.env('agent');

	before(() => {
		cy.visit('/');
		cy.login(AGENT.email, AGENT.password)
	});

	beforeEach(() => {
		createBookingPage.clickMonthBtn();
	});

	it('AT_04.12.02 | Verify any available chosen date, month and year from month dropdown menu match label departure on date', function () {
		createBookingPage.getMonthDropdownList().then(($el) => {
			let arrayOfMonths = $el
				.toArray()
				.map(el => el.innerText)

			let indexOfMonths = Math.floor(Math.random() * arrayOfMonths.length)
			let chosenMonthAndYear = arrayOfMonths[indexOfMonths]

			createBookingPage.getMonthDropdown().select(chosenMonthAndYear)
			createBookingPage
				.getCalendarDays()
				.not('.unavailable')
				.not('.shaded')
				.then(($el) => {
					let arrayOfDates = $el
					let indexOfDate = Math.floor(Math.random() * arrayOfDates.length)
					createBookingPage
						.getCalendarDays()
						.not('.unavailable')
						.not('.shaded').eq(indexOfDate).click().then(($el) => {
							let dateChosen = $el.text()
							let finalDateMonthAndYear = dateChosen + " " + chosenMonthAndYear

							createBookingPage.getLabelDepartureOnDate().then(($el) => {
								let departureDate = $el.text()

								expect(departureDate).to.deep.equal(finalDateMonthAndYear)
							})
						})
				})
		})
	})
});

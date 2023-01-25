/// <reference types="Cypress" />

import CreateBookingPage from "../../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

describe('US_04.11 | Calendar week functionality', () => {

	const AGENT = Cypress.env('agent');

	beforeEach(function () {
		cy.visit('/')
		cy.login(AGENT.email, AGENT.password)
	});

	it('AT_04.11.02 | Verify chosen date, current month and year are displayed in the Departure on section', function () {
		const current = new Date()
		const thailandCurrentMonthAndYear = new Date(current).toLocaleString('en-GB', { month: 'short', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' })

		createBookingPage.getCalendarDaySelectionWrapper().not('.unavailable').first().click().then(($date) => {
			let dateChosen = $date.text()
			createBookingPage.getLabelDepartureOnDate().then(($el) => {
				let departureDateFullFormat = $el.text()

				expect(departureDateFullFormat).to.deep.equal(dateChosen + " " + thailandCurrentMonthAndYear)
			})
		})
	})
});
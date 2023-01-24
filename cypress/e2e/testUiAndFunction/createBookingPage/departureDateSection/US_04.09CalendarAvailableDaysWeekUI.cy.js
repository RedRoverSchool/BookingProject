/// <reference types="Cypress" />

import CreateBookingPage from "../../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

describe('US_04.09 | Calendar available days week UI', () => {

	const AGENT = Cypress.env('agent');

	beforeEach(function () {
		cy.visit('/')
		cy.login(AGENT.email, AGENT.password)
	});

	it('AT_04.09.01 | Verify calendar-day-selection-wrapper starts and ends with same dates as label calendar week', function () {
		createBookingPage.getLabelCalendarWeek().then(($el) => {
			let firstDayOfWeek = $el.text().split(" ")[0]
			let lastDayOfWeek = $el.text().split(" ")[3]

			createBookingPage.getCalendarDaySelectionWrapper().eq(0).then(($el) => {
				expect($el.text()).to.eq(firstDayOfWeek)
			})
			createBookingPage.getCalendarDaySelectionWrapper().eq(6).then(($el) => {
				expect($el.text()).to.eq(lastDayOfWeek)
			})
		})
	})
});
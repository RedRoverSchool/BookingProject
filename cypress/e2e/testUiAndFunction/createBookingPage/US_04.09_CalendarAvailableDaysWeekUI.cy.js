/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

describe('US_04.09 | Calendar available days week UI', () => {

	const AGENT = Cypress.env('agent');

	beforeEach(function () {
		cy.visit('/')
		cy.login(AGENT.email, AGENT.password)
		createBookingPage.getWeekButton().should('have.class', 'selected');
	});

	it('AT_04.09.01 | Verify calendar-day-selection-wrapper starts and ends with same dates as label calendar week', function () {
		createBookingPage.getLabelCalendar().then(($el) => {
			let firstDayOfWeek = $el.text().split(" ")[0]
			let lastDayOfWeek = $el.text().split(" ")[3]

			createBookingPage.getCalendarDays().eq(0).then(($el) => {
				expect($el.text()).to.eq(firstDayOfWeek)
			})
			createBookingPage.getCalendarDays().eq(6).then(($el) => {
				expect($el.text()).to.eq(lastDayOfWeek)
			})
		})
	})

	it('AT_04.09.02|Verify that the active field has background color #00a65a and text color #FFFFFF', function() {
		
		createBookingPage.getCalendarDays().each(($el) => {
			if($el.hasClass('selected')){
				
				expect($el).to.have.css('color','rgb(255, 255, 255)')
				expect($el).to.have.css('background-color','rgb(0, 166, 90)')	
			}
		
		})
	})
});

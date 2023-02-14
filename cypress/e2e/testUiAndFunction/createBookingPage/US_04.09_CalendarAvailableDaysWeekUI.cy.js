/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import getNameOfDay from "../../../support/utilities/getNameOfDay";

const createBookingPage = new CreateBookingPage();

describe('US_04.09 | Calendar available days week UI', () => {

	const AGENT = Cypress.env('agent');

	before(() => {
		cy.visit('/');
		cy.login(AGENT.email, AGENT.password)
	});

	beforeEach(function () {

		cy.fixture('createBookingPage').then(createBookingPage => {
			this.createBookingPage = createBookingPage;
		});

		cy.fixture('colors').then(colors => {
            this.colors = colors;
        });

		//Precondition
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

	it('AT_04.09.02|Verify that the active field has background color #00a65a and text color #FFFFFF', function () {

		createBookingPage.getCalendarDays().each(($el) => {
			if ($el.hasClass('selected')) {

				expect($el).to.have.css('color', this.colors.white);
				expect($el).to.have.css('background-color', this.colors.greenBookingPage);
			};
		});
	});

	it('AT_04.09.03 | In all inactive fields the number has the color #333333', function () {
		createBookingPage.getCalendarDays().each($el => {
			if (!$el.hasClass('selected')) {
				expect($el).to.have.css('color', this.colors.greyUnavailableText)
			}
		})
	});

	it('AT_04.09.05 | Seven fields are displayed for the week', function () {
		createBookingPage.getCalendarDays()
			.should('have.length', this.createBookingPage.weekDayFields.quantity)
	})

	it('AT_04.09.07 | Each field has a capital letter of the Latin alphabet', function () {

		createBookingPage.getCalendarDays().then($els => {

			for (let i = 0; i < 7; i++) {
				const win = $els[i].ownerDocument.defaultView
				const before = win.getComputedStyle($els[i], 'before')
				const contentValue = before.getPropertyValue('content')
				
				expect(contentValue).to.deep.equal(contentValue.toUpperCase())
			};
		});
	});

	it('AT_04.09.06|Verify that the uppercase letters of the Latin alphabet are in order: M, T, W, T, F, S, S',  function() {
		createBookingPage.getCalendarDays().each(($el,ind) => {
			const nameOfDay = getNameOfDay($el).slice(1, -1);

		expect(nameOfDay).to.eq(this.createBookingPage.nameOfDay[ind]);
		});
	});
});

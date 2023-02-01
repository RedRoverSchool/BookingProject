/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

describe('US_04.11 | Calendar week functionality', () => {

	const AGENT = Cypress.env('agent');

	before(() => {
		cy.visit('/');
		cy.login(AGENT.email, AGENT.password)
		
		 //Precondition
		createBookingPage.getWeekButton().should('have.class', 'selected');
	});

	beforeEach(function () {
		cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
	});

	it('AT_04.11.01|Verify that you can click on last date field if it has not expired', function() {

        createBookingPage.getCalendarDays()
            .not('unavailable')    
            .last()
            .click()
			.then(($date) => {
				let dayOfWeek = $date;

				expect(dayOfWeek).to.have.class('selected')
			});
    });

	it('AT_04.11.02 | Verify chosen date, current month and year are displayed in the Departure on section', function () {
		const current = new Date()
		const thailandCurrentMonthAndYear = current.toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' })

		createBookingPage.getCalendarDays().not('.unavailable').first().click().then(($date) => {
			let dateChosen = $date.text()
			createBookingPage.getLabelDepartureOnDate().then(($el) => {
				let departureDateFullFormat = $el.text()

				expect(departureDateFullFormat).to.deep.equal(dateChosen + " " + thailandCurrentMonthAndYear)
			})
		})
	})

	it('AT_04.11.03|Verify that if the date has expired, then the field with it is not clickable', function() {
		
		createBookingPage.clickCalendarPrevButton;
		createBookingPage.getCalendarDays().each(($el) => {
			if($el.hasClass('unavailable')){

				expect($el).to.have.css('cursor', 'not-allowed');
			}
		})
	});

	it('AT_04.11.04|Verify that when you hover the cursor over any valid date, the cursor sign appears', function() {
		
		createBookingPage.getCalendarDays().not('.unavailable').each(($el) => {
			
			expect($el).to.have.css('cursor',this.createBookingPage.validDayField.cursor);
		});
	});
});

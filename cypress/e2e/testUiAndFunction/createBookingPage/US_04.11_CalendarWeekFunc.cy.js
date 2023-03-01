/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

describe('US_04.11 | Calendar week functionality', () => {

	const AGENT = Cypress.env('agent');

	before(() => {
		cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
		
		 //Precondition
		createBookingPage.getWeekButton().should('have.class', 'selected');
	});

	beforeEach(function () {
		cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        });

		cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
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
		
		createBookingPage.clickCalendarPrevButton();
		createBookingPage.getCalendarDays().each(($el) => {
			if($el.hasClass('unavailable')){

				expect($el).to.have.css('background-color',this.colors.greyUnavailableBack);
			}
		})
	});

	it('AT_04.11.04|Verify that when you hover the cursor over any valid date, the cursor sign appears', function() {
		
		createBookingPage.getCalendarDays().not('.unavailable').each(($el) => {
			
			expect($el).to.have.css('cursor',this.createBookingPage.validDayField.cursor);
		});
	});

	it('AT_04.11.06|Verify that when you click on the first and last date, its value matches the date in the string in the Calendar-selection block', () => {

		createBookingPage.clickCalendarNextButton();

		createBookingPage.getLabelCalendar().then(($el) => {
			let firstDate = $el.text().split(" ")[0];
			let lastDate = $el.text().split(" - ")[1].split(" ")[0];
						
			createBookingPage.getCalendarDays().first().then(($date) =>{
				let firstDateOFWeek = $date.text();
				
				expect(firstDateOFWeek).to.eq(firstDate);
			});
			createBookingPage.getCalendarDays().last().then(($date) =>{
				let firstDateOFWeek = $date.text();
				
				expect(firstDateOFWeek).to.eq(lastDate);
			});
		});
	});

	it('AT_04.11.07 | Verify that When you hover the cursor over the expired date, a prohibition signs appears no_entry_sign', function() {
		
		createBookingPage.clickCalendarPrevButton();
		createBookingPage.getCalendarDays().each(($el) => {
			if($el.hasClass('unavailable')){

				expect($el).to.have.css('cursor',this.createBookingPage.unavailableDayField.cursor);
			}
		})
	});

	it('AT_04.11.05|Calendar week functionality >Verify that when you click an invalid date in the Departure on, the date does not change', function() {
		createBookingPage.clickCalendarPrevButton();
		createBookingPage.getCalendarDays().each($selDate => {
			if($selDate.hasClass('selected')){
				let selectedDay = $selDate.text();
							
				createBookingPage.getCalendarDays().each(($unDate) => {
					if($unDate.hasClass('unavailable')){
						cy.wrap($unDate).click();
						
						createBookingPage.getLabelDepartureOnDate().then(($onDate) =>{
							let onDate = $onDate.text().split(' ')[0];
					
							expect(selectedDay).to.eq(onDate);
						})
					}
				})
			}
		});
	})
});

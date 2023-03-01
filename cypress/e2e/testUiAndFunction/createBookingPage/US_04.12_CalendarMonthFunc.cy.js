/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import getCustomCalendarDay from "../../../support/utilities/getCustomCalendarDay";
import waitForToolsPing from "../../../support/utilities/waitForToolsPing";
import getArray from "../../../support/utilities/getArray";

const createBookingPage = new CreateBookingPage();

describe('US_04.12 | Calendar month functionality', () => {
	const AGENT = Cypress.env('agent');

	beforeEach(function () {
		cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })

		cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
		
		createBookingPage.clickMonthBtn()
		waitForToolsPing()
	})

	it.skip('AT_04.12.01 | Create booking page > Verify any date earlier than the current date is not available.', function () {
		let date = new Date() 
		let dateThailand = date.toLocaleString('en-GB', { day: 'numeric', timeZone: 'Asia/Bangkok' })
		let currentMonthAndYear = date.toLocaleString('en-GB', { month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok'})
		createBookingPage.getMonthDropdownSelect().select(currentMonthAndYear)
		createBookingPage.getCalendarDays().not('.shaded').each(($el) => {
            if(+$el.text() < +dateThailand){
                expect($el).to.have.class(this.createBookingPage.class.unavailableClass)
            }          
		})		
	});

	it.skip('AT_04.12.02 | Verify current Thailand date,  chosen month and year (current, 6 months from current, 12 months from current) match label departure on date', function () {
		createBookingPage.getMonthDropdownList().then(($el) => {
			let arrayofMonths = getArray($el)
			expect(arrayofMonths).to.deep.eq(createBookingPage.createArrayOfConsetutiveMonths())
		})
		
		let validBoundaryValueArrayMinNomMax = createBookingPage.validBoundaryValuesMonthDropdownMinNomMax()
		const currentDateThailand = getCustomCalendarDay(0)
		const firstAvailiableForBookingDay = getCustomCalendarDay(2)

		if (firstAvailiableForBookingDay === "1" || firstAvailiableForBookingDay === "2") {
			createBookingPage.clickCalendarPrevButton()	
		}

		for (let monthsAndYear of validBoundaryValueArrayMinNomMax) {
			createBookingPage
				.selectMonthFromMonthDropdown(monthsAndYear)
			createBookingPage
				.clickCalendarDay(currentDateThailand)
			createBookingPage
				.getCalendarDays()
				.filter('.selected').then(($el) => {
					let dateChosen = $el.text()
					expect(dateChosen).to.eq(currentDateThailand)
                       
							createBookingPage.getLabelDepartureOnDate().then(($el) => {
								let departureDate = $el.text()
								expect(departureDate).to.eq( dateChosen + " " + monthsAndYear)
							})
						})
		}
	});

	it('AT_04.12.04 | Verify tickets are not available for the current date (GMT+7)', () => {
		const currentDayThailand = getCustomCalendarDay(0)
		const availableDayThailand = getCustomCalendarDay(2)
		
		if(availableDayThailand === "1" || availableDayThailand === "2"){
			createBookingPage.clickCalendarPrevButton()
			
			createBookingPage.clickCalendarDay(currentDayThailand)
			waitForToolsPing()
			createBookingPage.getLabelDepartureOnDate()
				.should('have.text', (`${currentDayThailand} ${createBookingPage.getCurrentMonthAndYearThailand()}`))

			createBookingPage.getDepartureTripCardsList().each(($el) => {
				cy.wrap($el).should('have.class', 'disabled')
			})
		}
		createBookingPage.clickCalendarDay(currentDayThailand)
		waitForToolsPing()
		createBookingPage.getLabelDepartureOnDate()
			.should('have.text', (`${currentDayThailand} ${createBookingPage.getCurrentMonthAndYearThailand()}`))

		createBookingPage.getDepartureTripCardsList().each(($el) => {
			cy.wrap($el).should('have.class', 'disabled')
		})
	});

	it('AT_04.12.05 | Tickets are not available for tomorrow (the current date by GMT+7)', () => {
		const tomorrowDayThailand = getCustomCalendarDay(1)
		const availableDayThailand = getCustomCalendarDay(2)
		
		if(availableDayThailand === "1") {
			createBookingPage.clickCalendarPrevButton()
			
			createBookingPage.clickCalendarDay(tomorrowDayThailand)
			waitForToolsPing()
			createBookingPage.getLabelDepartureOnDate()
				.should('have.text', (`${tomorrowDayThailand} ${createBookingPage.getCurrentMonthAndYearThailand()}`))

			createBookingPage.getDepartureTripCardsList().each(($el) => {
				cy.wrap($el).should('have.class', 'disabled')
			})
		} else if(availableDayThailand === "2") {
			createBookingPage.clickCalendarDay(tomorrowDayThailand)
			waitForToolsPing()
			createBookingPage.getLabelDepartureOnDate()
				.should('have.text', (`${tomorrowDayThailand} ${createBookingPage.getNextMonthAndCurrentYear()}`))

			createBookingPage.getDepartureTripCardsList().each(($el) => {
				cy.wrap($el).should('have.class', 'disabled')
			})
		} else {
			createBookingPage.clickCalendarDay(tomorrowDayThailand)
			waitForToolsPing()
			createBookingPage.getLabelDepartureOnDate()
				.should('have.text', (`${tomorrowDayThailand} ${createBookingPage.getCurrentMonthAndYearThailand()}`))

			createBookingPage.getDepartureTripCardsList().each(($el) => {
				cy.wrap($el).should('have.class', 'disabled')
			})
		}
	});
})

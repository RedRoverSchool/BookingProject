/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import getCustomCalendarDay from "../../../support/utilities/getCustomCalendarDay";
import waitForToolsPing from "../../../support/utilities/waitForToolsPing";

const createBookingPage = new CreateBookingPage();

describe('US_04.12 | Calendar month functionality', () => {
	const AGENT = Cypress.env('agent');

	before(function () {
		cy.visit('/')
		cy.login(AGENT.email, AGENT.password)
		waitForToolsPing()
		createBookingPage.clickMonthBtn()
	})

	beforeEach(function () {
		cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
	})

	it('AT_04.12.01 | Create booking page > Verify any date earlier than the current date is not available.', function () {
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

	it('AT_04.12.04 | Verify tickets are not available for the current date (GMT+7)', () => {
		const currentDayThailand = getCustomCalendarDay(0)

		createBookingPage.clickCalendarDay(currentDayThailand)

		createBookingPage.getLabelDepartureOnDate().then(($el) => {
			let departureDate = $el.text()
			expect(departureDate).to.deep.equal(`${currentDayThailand} ${createBookingPage.getCurrentMonthAndYear()}`)
		})
		createBookingPage.getDepartureTripCardsList().each(($el) => {
			cy.wrap($el).should('have.class', 'disabled')
		})
	});

	it('AT_04.12.05 | Tickets are not available for tomorrow (the current date by GMT+7)', () => {
		const tomorrowDayThailand = getCustomCalendarDay(1)

		createBookingPage.clickCalendarDay(tomorrowDayThailand)

		createBookingPage.getLabelDepartureOnDate().then(($el) => {
			let departureDate = $el.text()
			expect(departureDate).to.deep.equal(`${tomorrowDayThailand} ${createBookingPage.getCurrentMonthAndYear()}`)
		})
		createBookingPage.getDepartureTripCardsList().each(($el) => {
			cy.wrap($el).should('have.class', 'disabled')
		})
	});

	it('AT_04.12.02 | Verify any available chosen date, month and year from month dropdown menu match label departure on date', function () {
		createBookingPage.getMonthDropdownList().then(($el) => {
			let arrayOfMonths = $el
				.toArray()
				.map(el => el.innerText)

			let indexOfMonths = Math.floor(Math.random() * arrayOfMonths.length)
			let chosenMonthAndYear = arrayOfMonths[indexOfMonths]

			createBookingPage.getMonthDropdownSelect().select(chosenMonthAndYear)
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
	});
})

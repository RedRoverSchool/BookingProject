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

		cy.visit('/')
		cy.login(AGENT.email, AGENT.password)
		
		createBookingPage.clickMonthBtn()
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

	it('AT_04.12.02 | Verify chosen date (two days from current Thailand date),  chosen month and year ( next from current, 6 months from current, 12 months from current) match label departure on date', function () {
		createBookingPage.getMonthDropdownList().then(($el) => {
			let arrayofMonths = getArray($el)
			expect(arrayofMonths).to.deep.eq(createBookingPage.createArrayOfConsetutiveMonths())
		})
		
		let validBoundaryValueArrayAboveMinNomMax = createBookingPage.validBoundaryValuesMonthDropdownAboveMinNomMax()

		for (let monthsAndYear of validBoundaryValueArrayAboveMinNomMax) {
			createBookingPage
				.getMonthDropdownSelect()
				.select(monthsAndYear, { force: true })
			createBookingPage
				.getCalendarDays()
				.contains(createBookingPage.getRequiredDefaulDay_DDFormat())
				.click({force: true}).then(($el) => {
					let dateChosen = $el.text()
					expect(dateChosen).to.eq(createBookingPage.getRequiredDefaulDay_DDFormat())

							let finalDateMonthAndYear = dateChosen + " " + monthsAndYear

							createBookingPage.getLabelDepartureOnDate().then(($el) => {
								let departureDate = $el.text()
								expect(departureDate).to.eq(finalDateMonthAndYear)
							})
						})
		}
	});

	it.skip('AT_04.12.04 | Verify tickets are not available for the current date (GMT+7)', () => {
		const currentDayThailand = getCustomCalendarDay(0)

		createBookingPage.clickCalendarDay(currentDayThailand)
		waitForToolsPing()
		createBookingPage.getLabelDepartureOnDate()
			.should('have.text', (`${currentDayThailand} ${createBookingPage.getCurrentMonthAndYear()}`))

		createBookingPage.getDepartureTripCardsList().each(($el) => {
			cy.wrap($el).should('have.class', 'disabled')
		})
	});

	it.skip('AT_04.12.05 | Tickets are not available for tomorrow (the current date by GMT+7)', () => {
		const tomorrowDayThailand = getCustomCalendarDay(1)

		createBookingPage.clickCalendarDay(tomorrowDayThailand)
		waitForToolsPing()
		createBookingPage.getLabelDepartureOnDate()
			.should('have.text', (`${tomorrowDayThailand} ${createBookingPage.getCurrentMonthAndYear()}`))

		createBookingPage.getDepartureTripCardsList().each(($el) => {
			cy.wrap($el).should('have.class', 'disabled')
		})
	});
})

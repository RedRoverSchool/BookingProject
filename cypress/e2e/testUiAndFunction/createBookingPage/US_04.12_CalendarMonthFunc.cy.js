/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

describe('US_04.12 | Calendar month functionality', () => {
	const AGENT = Cypress.env('agent');

	before(() => {
		cy.visit('/');
		cy.login(AGENT.email, AGENT.password)
		createBookingPage.clickMonthBtn()
	});

	beforeEach(function () {
		
		cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
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

	it('AT_04.12.01 | Create booking page > Verify any date earlier than the current date is not available.', function () {
		let date = new Date() 
        let fullDateThailand = date.toLocaleString('en-GB', { day: 'numeric' , month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok' })
        let currentDateThailand = +fullDateThailand.slice(0, 2)
		let currentMonthAndYear = fullDateThailand.slice(3)
		createBookingPage.getMonthDropdown().select(currentMonthAndYear)
		createBookingPage.getCalendarDays().not('.shaded').each(($el) => {
            if($el.text() < currentDateThailand){
                expect($el).to.have.class(this.createBookingPage.class.unavailableClass)
            }          
		})		
	})
})

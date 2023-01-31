/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage"

const createBookingPage = new CreateBookingPage()

describe('US_04.04 | Credit balance button UI and functionality', () => {

    const AGENT = Cypress.env('agent')

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
        cy.visit('/')
        cy.login(AGENT.email, AGENT.password)
    })

    xit('AT_04.04.01 | Create booking page > Verify that week/month format lable', function () {
        let current = new Date()
        current.setDate(current.getDate() - current.getDay() + 1)
	    let mondayDate = current.toLocaleString('en-GB', { month: 'short', day: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' })
        current.setDate(current.getDate() - current.getDay() + 7)
        let sundayDate = current.toLocaleString('en-GB', { month: 'short', day: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' })
        let weekFormat = mondayDate + " " + "-" + " " + sundayDate
        createBookingPage.getLabelCalendar().then(($el) => {
            let labelWeekFormat = $el.text()
            expect(weekFormat).to.eq(labelWeekFormat)
        })
        createBookingPage.clickMonthBtn()
        let dateForBooking = new Date(Date.now() + 172800000)
        let monthForBooking = dateForBooking.toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok' })
        createBookingPage.getLabelCalendar().then(($el) => {
            let labelMonthFormat = $el.text()
            expect(monthForBooking).to.eq(labelMonthFormat)
        })
    })
})
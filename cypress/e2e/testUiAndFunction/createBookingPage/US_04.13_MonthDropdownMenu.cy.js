/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage.js";

const createBookingPage = new CreateBookingPage();

describe('US_04.13 | Create booking page > Departure date > Month dropdown UI and functionality', () => {
    const AGENT = Cypress.env('agent');

    before(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        createBookingPage.clickMonthBtn();
    })

    it('AT_04.13.01 | Month dropdown menu (to the left of the Week button) is visible and has 13 months for selection', () => {
        createBookingPage.getMonthDropdownList().should('be.visible')
            .and('have.length', 13);
    })

    it('AT_04.13.02 | Verify the first option of the Month dropdown menu has the current month and the current year', function () {
        const current = new Date()
        const thailandCurrentMonthAndYear = new Date(current).toLocaleString('en-GB', { month: 'short', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' })
        createBookingPage.getMonthDropdownList()
            .eq(0)
            .invoke('text')
            .should('eq', thailandCurrentMonthAndYear)
    })

    it('AT_04.13.03 | Verify that the label of the Month dropdown displays the month selected from the Month dropdown menu', function () {
        createBookingPage.getMonthDropdownSelect()
            .select(2)
            .invoke('val')
            .then(
                selectedMonth => createBookingPage.getMonthDropdownSelect()
                    .should('have.value', selectedMonth)
            )
    })

    it('AT_04.13.04 | Verify month dropdown menu has 13 consecutive months and year options starting from current month and year', function () {
        let arrayOfConsecutiveMonths = []
        let count = 0
        let i = 0
        while (i <= 12) {
            const current = new Date()
            const month = new Date(current.setMonth(current.getMonth() + `${count}`))
                .toLocaleString('en-GB', { month: 'short', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' })
            arrayOfConsecutiveMonths.push(month)
            count++
            i++
        }

        let arrayOfConsecutiveMonthsShortMonthsNames = arrayOfConsecutiveMonths.map(el => el.split(" ")[0].slice(0, 3) + " " + el.split(" ")[1])

        createBookingPage.getMonthDropdownList().each(($el, i) => {
            expect($el.text()).to.deep.eq(arrayOfConsecutiveMonthsShortMonthsNames[i])
        })
    })
})

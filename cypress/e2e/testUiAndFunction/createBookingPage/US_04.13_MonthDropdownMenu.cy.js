/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage.js";
import arrayOfConsetutiveMonths from "../../../support/utilities/createArrayOfMonths.js";

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

    it.skip('AT_04.13.02 | Verify the first option of the Month dropdown menu has the current month and the current year', function () {
        const current = new Date()
        const thailandCurrentMonthAndYear = current.toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' })
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

    it('AT_04.13.05 | Verify that the calendar label (between arrows) displays the month selected from the dropdown menu', function () {
        createBookingPage.getMonthDropdownList()
            .eq(3)
            .invoke('text')
            .then(($el) => {
                const selectedMonthAndYear = $el;
                createBookingPage.getMonthDropdownSelect().select(3);

                createBookingPage.getLabelCalendar().should('have.text', selectedMonthAndYear)
            })
    })

    it('AT_04.13.04 | Verify month dropdown menu has 13 consecutive months and year options starting from current month and year', function () {
        createBookingPage.getMonthDropdownList().each(($el, i) => {
            expect($el.text()).to.deep.eq(arrayOfConsetutiveMonths()[i])
        })
    })

    it('AT_04.13.06 | Verify that the month that is shown in the "Departure on" section displays the month selected from the dropdown menu', function () {
        
        createBookingPage.getRandomIndexOfMonth().then($el => {
            let indexOfMonth = $el;
            createBookingPage.getMonthDropdownSelect().select(indexOfMonth);

            createBookingPage.getMonthDropdownList().eq(indexOfMonth).then($el => {
                let selectedMonthAndYear = $el.text();

                createBookingPage.getLabelDepartureOnDate()
                    .should('contain.text', selectedMonthAndYear);
            })
        })
    })
})    

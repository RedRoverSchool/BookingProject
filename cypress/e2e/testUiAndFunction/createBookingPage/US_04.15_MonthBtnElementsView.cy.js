/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');
describe('US_04.15 | Create booking page > Month button elements view', { tags: ['smoke'] }, () => {

    before(function () {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        createBookingPage.clickMonthBtn();
    })

    beforeEach(function () {
        cy.fixture('createBookingPage.json').then(bookingData => {
            this.bookingData = bookingData;
        });

        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
    });

    it('AT_04.15.01 Month button is visible, has the attribute "selected" and its background color is #00a65a( rgb(0, 166, 90) )', function () {
        createBookingPage.getMonthBtn()
            .should('be.visible')
            .and('have.class', 'selected')
            .and('have.css', 'background-color', this.colors.greenBookingPage);
    })

    it('AT_04.15.02 | While selected Month button, the Week button does not have the attribute "selected" and its background color is rgb(255, 255, 255)', function () {
        createBookingPage.getWeekButton()
            .should('not.have.class', 'selected')
            .and('have.css', 'background-color', this.colors.white);
    })

    it('AT_04.15.03 | Month dropdown menu (to the left of the Week button) is visible and available only after the Month button is chosen', function () {
        createBookingPage.getMonthDropdownSelect()
            .should('be.visible');

        createBookingPage.clickWeekBtn();

        createBookingPage.getMonthDropdownSelect()
            .should('not.be.visible');
    })

    it('AT_04.15.05 | Calendar label (between arrows) is visible and its format has the name of the current month and year (e.g. Jan 2023)', function () {
        createBookingPage.clickMonthBtn();

        createBookingPage.getLabelCalendar()
            .should('be.visible')
            .and('have.text', createBookingPage.getFirstAvailableForBookingDefaultMonthYear());
    })

    it('AT_04.15.06 | Calendar-day-selection block (under the calendar label) is visible and has at least 28 days', { tags: ['regression'] }, function () {
        createBookingPage.getCalendarDays().each($el => {
            cy.wrap($el).should('be.visible');
        });

        createBookingPage.getCalendarDays().then($el => {
            let quantityOfDays = $el.length;
            expect(quantityOfDays).to.be.at.least(28);
        })
    })

    it('AT_04.15.04| Departure date section has the label "Departure date"', function () {
        createBookingPage.getLableDepartureDate().should('have.text', this.bookingData.departureDate);
    });

    it('AT_04.15.07 | Selected day by default is according to requirements (current date by (GMT+7) + 2 days)', { tags: ['regression'] }, function () {
        let requiredDay = createBookingPage.getFirstAvailableForBookingDefaultDay()
        createBookingPage.getDaySelected()
            .invoke('text')
            .should('eq', requiredDay);
    })

})

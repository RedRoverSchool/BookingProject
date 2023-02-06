/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');
describe('US_04.15 | Create booking page > Month button elements view', () => {

    before(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        createBookingPage.clickMonthBtn();
    })

    beforeEach(function () {
        cy.fixture('createBookingPage.json').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
    })

    it('AT_04.15.01 Month button is visible, has the attribute "selected" and its background color is #00a65a( rgb(0, 166, 90) )', function () {
        createBookingPage.getMonthBtn()
            .should('be.visible')
            .and('have.class', 'selected')
            .and('have.css', 'background-color', this.createBookingPage.selectedMonthBtnBackgroundColor);
    })

    it('AT_04.15.02 | While selected Month button, the Week button does not have the attribute "selected" and its background color is rgb(255, 255, 255)', function () {
        createBookingPage.getWeekButton()
            .should('not.have.class', 'selected')
            .and('have.css', 'background-color', this.createBookingPage.notSelectedWeekBtnBackgroundColor);
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

        createBookingPage.getLabelCalendar().should('be.visible');

        let date = new Date();
        const currentMonthAndYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

        createBookingPage.getLabelCalendar().should('have.text', currentMonthAndYear);
    })
})

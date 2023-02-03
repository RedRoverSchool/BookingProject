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
});
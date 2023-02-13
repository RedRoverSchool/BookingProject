/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const AGENT = Cypress.env('agent');
const createBookingPage = new CreateBookingPage();

describe('US_04.16 | Departure On UI by default', () => {

    before(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    })

    beforeEach(function () {
        cy.fixture('createBookingPage.json').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
    })

    it('AT_04.16.01 | "Selected Date" label in "Departure on" section is visible and its text color is green (color: #00a65a - rgb(0, 166, 90))', function () {
        createBookingPage.getLabelDepartureOnDate()
            .should('be.visible')
            .and('have.css', 'color', this.createBookingPage.greenColor);
    })

    it('AT_04.16.02 | Selected date label near "Departure on" section name has format DD MM YYYY (for example, 14 Jan 2023)', () => {
        createBookingPage.getLabelDepartureOnDate()
            .should('have.text', createBookingPage.getDefaultDayMonthYear());
    })

    it('AT_04.16.03 | "Earliest" button is selected, visible and has green background color (#00a65a - rgb(0, 166, 90))', function () {
        createBookingPage.getBtnErliest()
            .should('be.visible')
            .and('have.class', 'selected')
            .and('have.css', 'background-color', this.createBookingPage.greenColor);
    })

    it('AT_04.16.04 | "Earliest" button has text "Earliest" in white color rgb(255, 255, 255)', function() {
        createBookingPage.getBtnErliest()
        .should('have.text', this.createBookingPage.earliestBtnText)
        .and('have.css', 'color', this.createBookingPage.whiteColor);
    })

    it('AT_04.16.05 | "Latest" button is visible, unselected, and has white (#FFF) background color', function() {
        createBookingPage.getDepartureLatestButton()
        .should('be.visible')
        .and('not.be.selected')
        .and('have.css', 'background-color', this.createBookingPage.whiteColor);
    })

});
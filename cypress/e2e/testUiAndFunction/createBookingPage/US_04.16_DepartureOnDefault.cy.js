/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const AGENT = Cypress.env('agent');
const createBookingPage = new CreateBookingPage();

describe('US_04.16 | Departure On UI by default', () => {

    before(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    })

    beforeEach(function() {
        cy.fixture('createBookingPage.json').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
    })

    it('AT_04.16.01 | Date label in "Departure on" section is visible and contains date which format is DD MM YYYY (for example, 14 Jan 2023) in green color (color: #00a65a)', function() {    
        createBookingPage.getLabelDepartureOnDate()
            .should('be.visible')
            .and('have.text', createBookingPage.getDefaultDayMonthYear())
            .and('have.css', 'color', this.createBookingPage.dateLabelDepartureOnSectionColor);        
    })

});
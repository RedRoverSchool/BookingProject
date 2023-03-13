/// <reference types ="cypress" />
import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

describe('US_04.18 | Create booking page > Selected trip card UI', { tags: ['smoke'] }, () => {
    const AGENT = Cypress.env('agent');

    before(() => {
        cy.intercept('/tools/ping/**').as('getToolsPing');
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        createBookingPage.clickCalendarNextButton(); 
        cy.wait('@getToolsPing');     
        createBookingPage.clickSecondTripCard();      
    })
    beforeEach(function () {
        cy.fixture('colors').then(colors => {
            this.colors = colors;
        })

        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData;
        });
    })

    it('AT_04.18.01 | "Number available tickets" trip card is visible, selected, and background color is green(#00a65a - rgb(0, 166, 90))', function () {
        createBookingPage.getSecondTripCard()
            .should('be.visible')
            .and('have.class', 'selected')
            .and('have.css', 'background-color', this.colors.greenBookingPage);
    })

    it('AT_04.18.02 | "Number available tickets" label contains the Number and "available tickets" text with color rgb(0, 166, 90) / background-color rgb(237, 248, 237)rgb(237, 248, 237)', function () {
        createBookingPage.getNumberTicketsAvailableSecondTripCard().then($el => {
            let number = $el.text();           
            let labelText = number + this.bookingData.labelTicketsAvailableText;            

            createBookingPage.getLabelTicketsAvailableSecondTripCard()
                .should('have.css', 'color', this.colors.greenBookingPage)
                .and('have.css', 'background-color', this.colors.lightGreenBookingPage)
                .and('have.text', labelText);
        })
    })
})
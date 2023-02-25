/// <reference types ="cypress" />
import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

describe.skip('US_04.18 | Create booking page > Selected trip card UI', () => {
    const AGENT = Cypress.env('agent');

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        createBookingPage.clickCalendarNextButton();
        createBookingPage.clickSecondTripCard();
    })
    beforeEach(function () {
        cy.fixture('colors').then(colors => {
            this.colors = colors;
        })
    })

        it('AT_04.18.01 | "Number available tickets" trip card is visible, selected, and background color is green(#00a65a - rgb(0, 166, 90))', function () {
            createBookingPage.getSecondTripCard()
                .should('be.visible')
                .and('have.class', 'selected')
                .and('have.css', 'background-color', this.colors.greenBookingPage)
        })
    })
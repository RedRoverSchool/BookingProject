/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import { sortAsc } from  "../../../support/utilities/sortArrayByDigit";

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
        });

        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
    });

    it('AT_04.16.01 | "Selected Date" label in "Departure on" section is visible and its text color is green (color: #00a65a - rgb(0, 166, 90))', function () {
        createBookingPage.getLabelDepartureOnDate()
            .should('be.visible')
            .and('have.css', 'color', this.colors.greenBookingPage);
    })

    it('AT_04.16.02 | Selected date label near "Departure on" section name has format DD MM YYYY (for example, 14 Jan 2023)', () => {
        createBookingPage.getLabelDepartureOnDate()
            .should('have.text', createBookingPage.getDefaultDayMonthYear());
    })

    it('AT_04.16.03 | "Earliest" button is selected, visible and has green background color (#00a65a - rgb(0, 166, 90))', function () {
        createBookingPage.getBtnErliest()
            .should('be.visible')
            .and('have.class', 'selected')
            .and('have.css', 'background-color', this.colors.greenBookingPage);
    })

    it('AT_04.16.04 | "Earliest" button has text "Earliest" in white color rgb(255, 255, 255)', function() {
        createBookingPage.getBtnErliest()
        .should('have.text', this.createBookingPage.earliestBtnText)
        .and('have.css', 'color', this.colors.white);
    })

    it('AT_04.16.05 | "Latest" button is visible, unselected, and has white (#FFF) background color', function() {
        createBookingPage.getDepartureLatestButton()
        .should('be.visible')
        .and('not.be.selected')
        .and('have.css', 'background-color', this.colors.white);
    })

    it('AT_04.16.06 | "Latest" button has text "Latest" in green color (#00a65a)', function() {
        createBookingPage.getDepartureLatestButton()
        .should('have.text', this.createBookingPage.latestBtnText)
        .and('have.css', 'color', this.colors.greenBookingPage);
    })

    it('AT_04.16.07 | Trip cards are sorted by time of departure from earliest to latest by default', () => {
        const ordersSequence = []
        createBookingPage.getDepartureTripCardsList().each(($el, i) => {
            cy.wrap($el)
                .invoke('attr', 'style')
                .then((orders) => {
                    ordersSequence.push(orders)

                    let ordersSortedAsc = sortAsc([...ordersSequence])

                    expect(ordersSequence[i]).to.eq(ordersSortedAsc[i])
                })
        })
    })
});
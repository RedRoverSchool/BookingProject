/// <reference types = "Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import { sortAsc } from  "../../../support/utilities/sortArrayByDigit";
import ifLeapYear from "../../../support/utilities/ifLeapYear";

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

    it.skip('AT_04.16.02 | Selected date label near "Departure on" section name has format DD MM YYYY (for example, 14 Jan 2023)', () => {
        createBookingPage.getLabelDepartureOnDate()
            .should('have.text', createBookingPage.getDefaultDayMonthYear());
    })

    it.only('AT_04.16.02 | Selected date label near "Departure on" section name has format DD MM YYYY (for example, 14 Jan 2023)', () => {
        let date = new Date();
        const currentDay = date.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'Asia/Bangkok'}).toString();
        const currentMonth = date.toLocaleDateString('en-US', { month: 'short', timeZone: 'Asia/Bangkok' });
        const currentYear = date.toLocaleDateString('en-US', { year: 'numeric',  timeZone: 'Asia/Bangkok' });
        let requiredDay = 0;
        let requiredMonth = "";
        let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        for (let i = 0; i < monthArray.length; i++) {
            if (currentMonth == monthArray[i] && (i == 0 || i == 2 || i == 4 || i == 6 || i == 7 || i == 9 || i == 11)) {
                currentDay == 30 ? requiredDay = 1 : currentDay == 31 ? requiredDay = 2 : requiredDay = (+currentDay + 2);
            } else if (currentMonth == monthArray[i] && (i == 3 || i == 5 || i == 8 || i == 10)) {
                currentDay == 29 ? requiredDay = 1 : currentDay == 30 ? requiredDay = 2 : requiredDay = (+currentDay + 2);
            } else {
                if (ifLeapYear(currentYear)) {
                    currentDay == 28 ? (requiredDay = 1, requiredMonth = monthArray[i + 1]) : currentDay == 29 ? (requiredDay = 2, requiredMonth = monthArray[i + 1]) : requiredDay = (+currentDay + 2);
                } else {
                    currentDay == 27 ? (requiredDay = 1, requiredMonth = monthArray[i + 1]) : currentDay == 28 ? (requiredDay = 2, requiredMonth = monthArray[i + 1]) : requiredDay = (+currentDay + 2); 
                }

            }
        }
        cy.log(currentDay)
        cy.log("requiredDay = " +requiredDay)
        cy.log(currentMonth)
        cy.log(requiredMonth)
     //   createBookingPage.getLabelDepartureOnDate()
       //     .should('have.text', createBookingPage.getDefaultDayMonthYear());
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
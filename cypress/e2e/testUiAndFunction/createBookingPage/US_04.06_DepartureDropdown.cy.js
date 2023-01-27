/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();


describe('US_04.06 | Departure dropdown UI and functionality', () => {

    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })

        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    it('AT_04.06.01 | Verify that the Departure station dropdown menu displays required list of stations', function () {
        createBookingPage.clickDepartureStationDropdown()

        createBookingPage.getListDepartureStation()
            .should('have.length', this.createBookingPage.dropdowns.departureStation.stationsNumber)            
        createBookingPage.getListDepartureStation().each(($el, i) => {
            cy.wrap($el).should('be.visible')
            expect($el.text()).to.be.equal(this.createBookingPage.dropdowns.departureStation.stationsNames[i])
        })
    });

    it('AT_04.06.02 | Verify the Departure station Dropdown Menu is clickable and opens up the dropdown menu', function () {
        createBookingPage.clickDepartureStationDropdown()

        createBookingPage.getListDepartureStation().should('be.visible')
    });
})

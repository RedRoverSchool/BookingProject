/// <reference types ="cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import waitForToolsPing from "../../../support/utilities/waitForToolsPing";

const createBookingPage = new CreateBookingPage();

const AGENT = Cypress.env('agent');

describe('US_04.19 | Unselected trip card available UI', function() {

    before(() => {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        createBookingPage.clickCalendarNextButton(); 
        waitForToolsPing();          
    });

    beforeEach(function () {
        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
        
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        });
    });

    it('AT_04.19.01 | Verify Trips card with "Number available tickets" label is visible as unselected', function() {
        createBookingPage.getDepartureTripCardsList().each($el => {
            cy.wrap($el).should('be.visible')
                        .and('not.have.class', 'selected')  
        })
    });

    it('AT_04.19.02 | Verify Background color of Trip cards is white (#FFF)', function() {
        createBookingPage.getDepartureTripCardsList().each($el => {
            cy.wrap($el).should('have.css', 'lighting-color', this.colors.white)  
        })
    });

    it('AT_04.19.03 | Verify "Class name" is bus or ferry name in a dark gray color (#4B4B4B) and visible below Departure time', function() {
        createBookingPage.getClassUnselectedTripCards().each($el => {
            let text = $el.text().match(/\D/g).join('').trim()
            let allClasses = `${this.createBookingPage.seatsTableTitle[0]} ${this.createBookingPage.seatsTableTitle[1]} ${this.createBookingPage.seatsTableTitle[2]}`

            cy.wrap($el).should('be.visible')
                        .and('have.css', 'color', this.colors.darkGray)

            expect(allClasses).to.contain(text)
        })
    });
});
/// <reference types="Cypress" />
import CreateBookingPage from "../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

describe('Booking', () => {

    const MANAGER = Cypress.env('manager');
    const AGENT = Cypress.env('agent');
    const CI = Cypress.env('CI');

    beforeEach(function () {
        cy.cleanCiData(MANAGER.email, MANAGER.password, CI)
    })

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage
        })
    })

    it('verify agent can book a ticket', function () {
        let expectedTextId;
        cy.visit('/')
        cy.login(AGENT.email, AGENT.password);
        cy.get('div.booking-header h1').should('include.text', this.createBookingPage.headers.mainHeaderPage);
        createBookingPage.clickCalendarNextButton()
		createBookingPage.clickFridayButton()
        cy.get('div.trip').should('be.visible')
        cy.intercept('/tools/**').as('getTrip')
		cy.wait('@getTrip')

        cy.get('div.trip').each(($el) => {
            const statusText = $el.text();
            if (statusText !== 'Overdue') {
                cy.wrap($el).click();
                return false;
            }
        })

        cy.get('div .passenger-wrapper div.title >label').should('be.visible').and('include.text', 'Passengers details')
        cy.get('div.layout-wrapper div.title label').should('be.visible').and('include.text', 'Seat selection')

        cy.get('div.passenger-wrapper input[name="passenger-name[]"]').type('TestUser1');
        cy.get('div.passenger-row select[name="passenger-fare[]"]').select('child', {force: true});

        cy.contains('Book tickets').click({ force: true });

        cy.get('.popup-content').should('be.visible');
        cy.get('span.booking-tracker').then(($id) => {
            expectedTextId = $id.text();
        })

        cy.get('a[href="/orders/"]').click({ force: true });
        cy.get('#reportrange').click();
        cy.get('li[data-range-key="This Month"]').click();

        cy.get('#data tbody tr td:nth-child(2) div').then(($id) => {
            expect($id.text()).to.contain(expectedTextId);
        })
    })
})

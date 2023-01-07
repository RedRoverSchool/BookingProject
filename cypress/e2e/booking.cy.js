/// <reference types="Cypress" />

describe('Booking tickets', () => {

    const MANAGER = Cypress.env('manager');
    const AGENT = Cypress.env('agent');
    const CI = Cypress.env('CI');

    beforeEach(() => {
        cy.cleanCiData(MANAGER.email, MANAGER.password, CI)
    })

    it('verify agent can book a ticket', () => {
        let expectedTextId;
        cy.visit('/')
        cy.login(AGENT.email, AGENT.password);
        cy.get('div.booking-header h1').should('include.text', 'Create booking');

        cy.get('div.trip span.availability').each(($el) => {
            const statusText = $el.text();
            if (statusText !== 'Overdue') {
                cy.wrap($el).click();
                return false;
            }
        })

        cy.get('div.passenger-wrapper input[name="passenger-name[]"]').type('TestUser1');

        cy.get('div.trip span.availability').each(($el) => {
            const statusText = $el.text();
            if (statusText !== 'Overdue') {
                cy.wrap($el).click();
                return false;
            }
        })

        cy.contains('Book tickets').click({ force: true });

        cy.get('.popup-content').should('be.visible');
        cy.get('span.booking-tracker').then(($id) => {
            expectedTextId = $id.text();
        })

        cy.get('a[href="/orders/"]').click({ force: true });
        cy.get('#reportrange').click();
        cy.get('li[data-range-key="Next 7 Days"]').click();

        cy.get('#data tbody tr td:nth-child(2) div').then(($id) => {
            expect($id.text()).to.be.equal(expectedTextId);
        })
    })
})

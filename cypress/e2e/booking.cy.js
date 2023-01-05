/// <reference types="Cypress" />

describe('Login page', () => {

    const MANAGER = Cypress.env('manager');
    const AGENT1 = Cypress.env('agent1');
    const CLEAN = Cypress.env('clean');


    before(() => {
        cy.visit('/');
        cy.login(MANAGER.email, MANAGER.password);

        cy.wait(5000);

        cy.clean(CLEAN.url, CLEAN.password);
        cy.logout();
    })

    it('verify agent can book a ticket', () => {
        let expectedTextId;

        cy.login(AGENT1.email, AGENT1.password);
        cy.get('div.booking-header h1').should('include.text', 'Create booking');

        // cy.intercept('POST', 'https://ci.qatest.site/booking/?get-layout').as('getLayout');

        cy.get('div.trip span.availability').each(($el) => {
            const statusText = $el.text();
            if(statusText !== 'Overdue'){
                cy.wrap($el).click();
            }
        })
        cy.get('div.passenger-wrapper input[name="passenger-name[]"]').type('A');
        

        // cy.wait('@getLayout')
        cy.contains('Book tickets').click({ force: true });

        cy.get('.popup-content').should('be.visible');
        cy.get('span.booking-tracker').then(($id) => {
            expectedTextId = $id.text();
        })

        cy.get('a[href="/orders/"]').click({ force: true });
        cy.get('#reportrange').click();
        cy.get('li[data-range-key="Next 7 Days"]').click();
        cy.wait(5000);

        cy.get('#data tbody tr td:nth-child(2) div').then(($id) => {
            expect($id.text()).to.be.equal(expectedTextId);
        })
    })
})

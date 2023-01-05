/// <reference types="Cypress" />

describe('Login page', () => {

    const MANAGER_EMAIL = Cypress.env('MANAGER_EMAIL');
    const MANAGER_PASSWORD = Cypress.env('MANAGER_PASSWORD');
    const AGENT_EMAIL = Cypress.env('AGENT_EMAIL');
    const AGENT_PASSWORD = Cypress.env('AGENT_PASSWORD');
    const CLEAN_ENDPOINT = Cypress.env('CLEAN_ENDPOINT');
    const CLEAN_PASSWORD = Cypress.env('CLEAN_PASSWORD');


    // before(() => {
    //     cy.visit('https://ci.qatest.site');
    //     cy.login(MANAGER_EMAIL, MANAGER_PASSWORD);

    //     cy.wait(5000);

    //     cy.clean(CLEAN_ENDPOINT, CLEAN_PASSWORD);
    //     cy.logout();
    // })

    it('verify agent can book a ticket', () => {
        let expectedTextId;
        cy.visit('/')
        cy.login(AGENT_EMAIL, AGENT_PASSWORD);
        cy.get('div.booking-header h1').should('include.text', 'Create booking');

        // cy.intercept('POST', 'https://ci.qatest.site/booking/?get-layout').as('getLayout');

        cy.get('div.trip span.availability').each(($el) => {
            const statusText = $el.text();
            if(statusText !== 'Overdue'){
                cy.wrap($el).click();
                return false;
            }
        })
        cy.get('div.passenger-wrapper input[name="passenger-name[]"]').type('TestUser1');
        

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

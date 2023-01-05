/// <reference types="Cypress" />

describe('Login page', () => {

    const MANAGER = Cypress.env('manager');
    const AGENT1 = Cypress.env('agent1');
    const CLEAN = Cypress.env('clean');
   

    before(() => {
      cy.visit('/');
      cy.login(MANAGER.email, MANAGER.password);
      
      cy.wait(5000)
      cy.visit(CLEAN.url, { force: true });
      cy.get('nav a.sidebar-toggle').click({ force: true })
      cy.get('.form-inline input[type="password"]').type(CLEAN.password);
      cy.contains('Clean TMS').click();

      cy.get('#op-dropdown a.dropdown-toggle').click();
      cy.get('div a[href="/logout/"]').click();
    })

    it('verify agent can book a ticket', () => {
        let textId

        cy.login(AGENT1.email, AGENT1.password);
        cy.get('div.booking-header h1').should('include.text', 'Create booking');

        // cy.intercept('POST', 'https://ci.qatest.site/booking/?get-layout').as('getLayout');

        cy.get('div.trip:nth-child(1)').click();
        cy.get('div.passenger-wrapper input[name="passenger-name[]"]').type('A');
        cy.get('div.trip:nth-child(1)').click();
        
        // cy.wait('@getLayout')
        cy.contains('Book tickets').click({ force: true });

        cy.get('.popup-content').should('be.visible');
        cy.get('span.booking-tracker').then(($id) => {
            textId = $id.text()
            console.log(textId)
        })

        cy.get('a[href="/orders/"]').click({ force: true });
        cy.get('#reportrange').click();
        cy.get('li[data-range-key="Next 7 Days"]').click();

        cy.get('#data tbody tr td:nth-child(2) div').then(($id) => {
            expect($id.text()).to.be.equal(textId)
        })
    })
})

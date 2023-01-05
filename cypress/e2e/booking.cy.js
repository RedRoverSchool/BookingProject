/// <reference types="Cypress" />

describe('Login page', () => {

    const MANAGER = Cypress.env('manager')
    const AGENT1 = Cypress.env('agent1')

    // before(() => {
    //   cy.visit('/');
    //   cy.get('div.inner a.login').click();
    //   cy.get('#byemail div.col-sm-6 > input[data-check="email"]').type(MANAGER.email, { force: true });
    //   cy.get('#byemail input[name="password"]').type(MANAGER.password, { force: true });
    //   cy.get('#byemail input[value="SIGN IN"]').click({ force: true });
    //   cy.wait(5000)
    //   cy.visit('/clean', { force: true });
    //   // cy.get('nav a.sidebar-toggle').click({ force: true })
    //   // cy.get('.form-inline input[type="password"]').type('2vG37863lb55');
    //   // cy.contains('Clean TMS').click();
    //   cy.get('#op-dropdown a.dropdown-toggle').click();
    //   cy.get('div a[href="/logout/"]').click();
    // })

    before(() => {
        cy.visit('/');
        cy.get('div.inner a.login').click();
        cy.get('#byemail div.col-sm-6 > input[data-check="email"]').type(AGENT1.email, { force: true });
        cy.get('#byemail input[name="password"]').type(AGENT1.password, { force: true });
        cy.get('#byemail input[value="SIGN IN"]').click();
        // cy.intercept('POST', 'https://ci.qatest.site/booking/?get-layout').as('getLayout');
    })

    it('verify user can book a ticket', () => {
        cy.get('div.trip:nth-child(1)').click()
        cy.get('div.passenger-wrapper input[name="passenger-name[]"]').type('A')
        cy.get('div.trip:nth-child(1)').click()
        cy.wait(5000)
        // cy.wait('@getLayout')
        cy.contains('Book tickets').click({ force: true });

        cy.get('a[href="/orders/"]').click();
        cy.get('#reportrange').click();
        cy.get('li[data-range-key="Next 7 Days"]').click();

        cy.get('#data tbody tr td:nth-child(2)').then((arr) => {
            expect(arr).to.have.length.of.at.least(1);
        })
    })
})

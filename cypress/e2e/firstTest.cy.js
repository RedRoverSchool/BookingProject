/// <reference types="cypress"/>

describe('Verify Register account and login', () => {

    it('Verify text link "Register account now', () => {
        cy.visit("/");
        cy.get('div > a:nth-child(5)')
        .should('be.visible')
        .should('have.text', 'Register account now');
    });
});

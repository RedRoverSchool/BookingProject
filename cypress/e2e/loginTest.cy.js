/// <reference types="cypress"/>

describe('Verify Register account and login', () => {

    it('Verify text link "Register account now', () => {
        cy.visit("/");
        cy.get('div.inner a.login').click();
        cy.get('#byemail div.col-sm-6 > input[data-check="email"]').type(Cypress.env('login'), {force: true});
        cy.get('#byemail input[name="password"]').type("12345678", {force: true});
        
        cy.get('#byemail input[value="SIGN IN"]').click();
    });
});

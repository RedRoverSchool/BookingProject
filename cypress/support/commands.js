// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (email, password) => {
    cy.get('div.inner a.login').click();
    cy.get('#byemail div.col-sm-6 > input[data-check="email"]').type(email, { force: true });
    cy.get('#byemail input[name="password"]').type(password, { force: true });
    cy.get('#byemail input[value="SIGN IN"]').click({ force: true });
})

Cypress.Commands.add('clean', (endpoint, password) => {
    cy.visit(endpoint, { force: true });
    cy.get('nav a.sidebar-toggle').click({ force: true })
    cy.get('.form-inline input[type="password"]').type(password);
    cy.contains('Clean TMS').click();
})

Cypress.Commands.add('logout', () => {
    cy.get('#op-dropdown a.dropdown-toggle').click();
    cy.get('div a[href="/logout/"]').click();
})

Cypress.Commands.add('cleanCiData', (emailManager, passwordManager, urlClean, passwordClean, statusCi) => {
    if (statusCi) {
        cy.visit('https://ci.qatest.site');
        cy.login(emailManager, passwordManager);

        cy.wait(3000);

        cy.clean(urlClean, passwordClean);
        cy.logout();
    }
})

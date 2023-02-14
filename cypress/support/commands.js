import waitForToolsPing from '../support/utilities/waitForToolsPing.js'

const CLEAN = Cypress.env('clean');


Cypress.Commands.add('login', (email, password) => {
    cy.get('div.inner a.login').click();
    cy.get('#byemail div.col-sm-6 > input[data-check="email"]').type(email, { force: true });
    cy.get('#byemail input[name="password"]').type(password, { force: true });
    cy.get('#byemail input[value="SIGN IN"]').click({ force: true });
})

Cypress.Commands.add('clean', () => {
    cy.visit(CLEAN.url, { force: true });
    waitForToolsPing()
   
    cy.get('.form-inline input[type="password"]').type(CLEAN.password, { force: true });
    cy.contains('Clean TMS').click();
})

Cypress.Commands.add('logout', () => {
    cy.get('#op-dropdown a.dropdown-toggle').click();
    cy.get('div a[href="/logout/"]').click();
})

Cypress.Commands.add('cleanCiData', (emailManager, passwordManager, statusCi) => {
    if (statusCi) {
        cy.visit('/');
        cy.login(emailManager, passwordManager);
        waitForToolsPing()

        cy.clean();
        waitForToolsPing()

        cy.logout();
    }
})


const CLEAN = Cypress.env('clean');
const MANAGER_CI = Cypress.env('managerCI');
const MANAGER = Cypress.env('manager');
const STATUS_CI = Cypress.env('CI');

Cypress.Commands.add('loginWithSession', (email, password) => {
    cy.session([email, password], () => {
        cy.intercept('POST', 'login').as('login');
        cy.visit('/');
        cy.get('div.inner a.login').click();
        cy.get('#byemail div.col-sm-6 > input[data-check="email"]').type(email, {force: true});
        cy.get('#byemail input[name="password"]').type(password, {force: true});
        cy.get('#byemail input[value="SIGN IN"]').click({force: true});
        cy.wait('@login');
    });
});

Cypress.Commands.add('login', (email, password) => {
    cy.get('div.inner a.login').click();
    cy.get('#byemail div.col-sm-6 > input[data-check="email"]').type(email, { force: true });
    cy.get('#byemail input[name="password"]').type(password, { force: true });
    cy.get('#byemail input[value="SIGN IN"]').click({ force: true });
})

Cypress.Commands.add('clean', () => {
    cy.visit(CLEAN.url, { force: true });
    cy.intercept('/tools/ping/**').as('getToolsPing')
   
    cy.get('.form-inline input[type="password"]').type(CLEAN.password, { force: true });
    cy.contains('Clean TMS').click();
    cy.wait('@getToolsPing')
})

Cypress.Commands.add('logout', () => {
    cy.get('#op-dropdown a.dropdown-toggle').click();
    cy.get('div a[href="/logout/"]').click();
})

Cypress.Commands.add('cleanData', () => {
    let email;
    let password;

    if (STATUS_CI) {
        email = MANAGER_CI.email
        password = MANAGER_CI.password
    } else {
        email = MANAGER.email
        password = MANAGER.password
    }

    cy.loginWithSession(email, password);
    cy.visit('/');
    
    cy.clean();
})

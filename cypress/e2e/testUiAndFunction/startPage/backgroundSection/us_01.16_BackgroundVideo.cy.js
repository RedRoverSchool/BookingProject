/// <reference types="cypress"/>

describe('Start Page', () => {

    beforeEach(function () {
        /*cy.fixture('url').then(url => {
            this.url = url;
        });
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });*/
        cy.visit('/');
    });


it ('AT_01.16.02 | Start Page > Background > Verify the Start Page has video', function() {
    
  cy.get('video')
        .should('have.prop', 'ended', false)
})
})
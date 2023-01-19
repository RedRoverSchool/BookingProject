/// <reference types="cypress"/>

describe('Start Page', () => {

    beforeEach(function () {
        
        cy.visit('/');
    });


it ('AT_01.16.02 | Start Page > Background > Verify the Start Page has video', function() {
    
  cy.get('video')
        .should('have.prop', 'ended', false)
})
})
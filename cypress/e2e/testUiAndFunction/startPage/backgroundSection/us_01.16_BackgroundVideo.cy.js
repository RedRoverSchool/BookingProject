/// <reference types="cypress"/>

import { StartPage } from "../../../../pageObjects/StartPage";

const startPage = new StartPage();

describe('US_01.16 Background Video', () => {
    beforeEach(function () {
        cy.visit('/');
    });

it('AT_01.16.02 | Verify the Start Page has video', function() {
cy.get('video').should('have.prop', 'ended', false)
})

    it ('AT_01.16.01 Background video is visible', function() {
    startPage.getBackgroungVideo().should('be.visible');
    })
})
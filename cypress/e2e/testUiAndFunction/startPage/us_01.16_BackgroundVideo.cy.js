/// <reference types="cypress"/>

import { StartPage } from "../../../pageObjects/StartPage";

const startPage = new StartPage();

describe('US_01.16 Background Video', () => {
    before (function () {
        cy.visit('/');
    });

    it ('AT_01.16.01 Background video is visible', function() {
        startPage.getBackgroundVideo().should('be.visible');
    })

    it('AT_01.16.02 | Verify the Start Page has video', function() {
        startPage.getBackgroundVideo().should('have.prop', 'ended', false)
    })
})

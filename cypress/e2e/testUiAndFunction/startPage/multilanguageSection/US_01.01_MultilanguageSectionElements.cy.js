/// <reference types="Cypress" />

import { StartPage } from "../../../../pageObjects/StartPage";

const startPage = new StartPage();

describe('US_01.01 | Start page > Multilanguage section elements UI and functionality', () => {
    beforeEach(function () {
        cy.visit('/')        
    });

    it('AT_01.01.03 | Start page > Multilanguage Section > Thailand flag icon is visible', function () {
        startPage
        .getThailandFlagIcon()
        .should('be.visible');
    });    
})

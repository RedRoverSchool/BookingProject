/// <reference types="Cypress" />

const FIX_START_PAGE_BTN = require('../../../../fixtures/startPage/button.json');

import {StartPage} from '../../../../pageObjects/StartPage.js';

const startPage = new StartPage();

describe('US_01.01 | Multilanguage section elements UI and functionality', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('AT_01.01.04 | Verify Thailand flag icon: clickable / changing language to Thai', () => {
        startPage.clickThaiFlagIcon()

        startPage.getLoginButton().should('have.text', FIX_START_PAGE_BTN.loginButtonThaiLang)
    })
})



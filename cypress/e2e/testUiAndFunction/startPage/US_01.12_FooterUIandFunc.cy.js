/// <reference types="Cypress" />

import {StartPage} from "../../../pageObjects/StartPage";
import {RegisterPopup} from "../../../pageObjects/StartPage";
import {RestorePopup} from "../../../pageObjects/StartPage";

const startPage = new StartPage();
const registerPopup = new RegisterPopup();
const restorePopup = new RestorePopup();

describe('US_01.12 | Footer UI and functionality', { tags: ['smoke'] }, () => {
    before(() => {
        cy.then(Cypress.session.clearCurrentSessionData);
        cy.visit('/')
        startPage.clickRegisterAccountLink()
    });

    beforeEach(function () {
		cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
	});

    it('AT_01.12.02 | Verify Footer elements are visible', function () {
        registerPopup.getForgotYourPasswordLink().should('be.visible').should('have.css','color', this.colors.blue);
    })

    it('AT_01.12.01 | After clicking "Forgot your password?" link the Registered Agent Account Popup window is closed and "Restore password" popup window appears', { tags: ['regression'] }, () => {
        registerPopup.clickForgotYourPasswordLink()
        registerPopup.getRegisterPopupHeader().should('not.be.visible')
        restorePopup.getRestorePopupHeader().should('be.visible')
    })
})
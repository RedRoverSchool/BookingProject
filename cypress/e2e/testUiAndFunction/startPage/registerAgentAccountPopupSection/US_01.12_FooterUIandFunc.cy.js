/// <reference types="Cypress" />

import {StartPage} from "../../../../pageObjects/StartPage";
import {LoginPopup} from "../../../../pageObjects/StartPage";
import {RegisterPopup} from "../../../../pageObjects/StartPage";
import {RestorePopup} from "../../../../pageObjects/StartPage";

const startPage = new StartPage();
const loginPopup = new LoginPopup();
const registerPopup = new RegisterPopup();
const restorePopup = new RestorePopup();

describe('US_01.12 | Footer UI and functionality', () => {

    beforeEach(function () {
		cy.visit('/')
	});

    it('AT_01.12.01 | After clicking "Forgot your password?" link the Registered Agent Account Popup window is closed and "Restore password" popup window appears', () => {
        startPage.getRegisterAccountLink()
        loginPopup.clickForgotYourPasswordLink()
        registerPopup.getRegisterAgentAccountHeader().should('not.be.visible')
        restorePopup.getRestorePasswordHeader().should('be.visible')
    })

    it('AT_01.12.02 | Verify Footer elements are visible' , () => {
        //startPage.getRegisterAccountLink();
        startPage.clickRegisterAccountLink();
        registerPopup.getForgotYourPasswordLink().should('be.visible').should('have.css','color', 'rgb(66, 139, 202)');
    })
})
/// <reference types="Cypress" />

import { StartPage } from "../../../../pageObjects/StartPage";

const startPage = new StartPage();

describe('US_01.02 | Login-register section elements UI and functionality', () => {

    beforeEach(function () {
        cy.fixture('startPage/links').then(links => {
            this.links = links;
        });

        cy.fixture('startPage/buttons').then(buttons => {
            this.buttons = buttons;
        });

		cy.visit('/')
	});

    it('AT_01.02.01 | Verify Link "Register account now": visible and have text "Register account now"', function () {
        startPage
        .getRegisterAccountLink()
        .should('be.visible')
        .and('have.text', this.links.registerAccountNowEnglishText);
    });

    it('AT.01.02.03 | Login button has text “Login“', function () {
        startPage.getLoginButton().should('have.text', this.buttons.loginBtnText)
    })
})
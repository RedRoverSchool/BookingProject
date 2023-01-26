/// <reference types="Cypress" />

import { StartPage } from "../../../pageObjects/StartPage";

const startPage = new StartPage();

describe('US_01.02 | Login-register section elements UI and functionality', () => {

    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage= startPage;
        }); 
		cy.visit('/')
	});

    it('AT_01.02.01 | Verify Link "Register account now": visible and have text "Register account now"', function () {
        startPage
        .getRegisterAccountLink()
        .should('be.visible')
        .and('have.text', this.startPage.links.registerAccountNowEnglishText);
    });

    it('AT.01.02.03 | Login button has text “Login“', function () {
        startPage.getLoginButton().should('have.text', this.startPage.buttons.loginBtnText)
    })

    it('AT_01.02.04 | Logo exists and visible', function () {
        startPage.getLogo()
            .should('be.visible')
            .and('have.attr', 'src')
            .and('include', this.startPage.img.logoFileName)
    });  

    it('AT_01.02.06 | Login button: text color green #008000', function () {
        startPage.getLoginButton()
        .should('have.css', 'color', this.startPage.buttons.loginBtnTextColor)
    });
})

/// <reference types="Cypress" />

import {StartPage} from "../../../pageObjects/StartPage.js";
import {LoginPopup} from "../../../pageObjects/StartPage.js";
import Header from "../../../pageObjects/Header.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();
const header = new Header();


describe('US_01.03 |  Header elements', () => {

    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });

        cy.visit('/')
        startPage.clickLoginButton()
    });


    it('AT_01.03.02 | Verify there is a heading text element', function () {
        loginPopup.getHeaderTextElement()
            .should('be.visible')
            .and('include.text', this.startPage.headers.header_Login_Popup.text)
            .and('have.css', 'color', this.startPage.headers.header_Login_Popup.color)
            .and('have.css', 'font-size', this.startPage.headers.header_Login_Popup.font_size)
    })

    it('AT_01.03.01 | After clicking on the X button in the right top corner the login popup page is closed and the main page appears', function () {

        loginPopup.getHeaderText().should('include.text', this.startPage.headers.header_Login_Popup.text);
        header.clickCloseBtn();
        loginPopup.getHeaderText().should('not.be.visible');
    });
})

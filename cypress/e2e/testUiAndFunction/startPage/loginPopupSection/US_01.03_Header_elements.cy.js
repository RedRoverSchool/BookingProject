/// <reference types="Cypress" />

import {StartPage} from "../../../../pageObjects/StartPage.js";
import {LoginPopup} from "../../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();

describe('US_01.03 |  Header elements', () => {

    beforeEach(function () {
        cy.fixture('startPage/headers').then(headers => {
            this.headers = headers;
        });

        cy.visit('/')
        startPage.clickLoginButton()
    });


    it('AT_01.03.02 | Verify there is a heading text element', function () {
        loginPopup.getHeaderTextElement()
            .should('be.visible')
            .and('include.text', this.headers.header_Login_Popup.text)
            .and('have.css', 'color', this.headers.header_Login_Popup.color)
            .and('have.css', 'font-size', this.headers.header_Login_Popup.font_size)
    })
})

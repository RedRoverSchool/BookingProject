/// <reference types="Cypress" />

import { StartPage, LoginPopup } from "../../../pageObjects/StartPage.js";

const startPage = new StartPage();
const loginPopup = new LoginPopup();

describe('US_01.03 |  Header elements', () => {

    before(() => {
        cy.then(Cypress.session.clearCurrentSessionData);
        cy.visit('/')
        startPage.clickLoginButton()
    });

    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });

        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
    });


    it('AT_01.03.02 | Verify there is a heading text element', function () {
        loginPopup
            .getLoginPopupHeader()
            .should('be.visible')
            .and('include.text', this.startPage.headers.header_Login_Popup.text)
            .and('have.css', 'color', this.colors.greyHeader)
            .and('have.css', 'font-size', this.startPage.headers.header_Login_Popup.font_size)
    });

    it('AT_01.03.01 | After clicking on the X button in the right top corner the login popup page is closed and the main page appears', function () {

        loginPopup
            .getLoginPopupHeader()
            .should('include.text', this.startPage.headers.header_Login_Popup.text);
        loginPopup.clickLoginPopupCloseButton();
        loginPopup.getLoginPopupHeader().should('not.be.visible');
    });
})

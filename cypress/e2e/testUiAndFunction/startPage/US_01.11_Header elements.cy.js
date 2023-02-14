/// <reference types="Cypress" />

import {StartPage} from "../../../pageObjects/StartPage";
import {RegisterPopup} from "../../../pageObjects/StartPage";

const startPage = new StartPage();
const registerPopup = new RegisterPopup();

describe('US_01.11 | Header elements', () => {

    before(function () {
	    cy.visit('/');
        startPage.clickRegisterAccountLink();
	});

    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });
    });

    it('AT_01.11.01 | Verify the title `Register agent account` are visible in the header', function () {
        registerPopup
            .getRegisterPopupHeader()
            .should('be.visible')
            .and('have.text', this.startPage.headers.registerAgentAccount);
    });

    it('AT_01.11.02 | Verify the title `Register agent account` has rgb(102, 102, 102) color, and 30px font-size', function () {
        registerPopup
            .getRegisterPopupHeader()
            .should('have.css','color', this.startPage.headers.header_Register_Popup.color);
        registerPopup
            .getRegisterPopupHeader()
            .should('have.css','font-size', this.startPage.headers.header_Register_Popup.front_size);
    });

    it('AT_01.11.03 | Verify that the X button is visible in the top right corner of the header', function () {
        registerPopup
            .getRegisterPopupCloseButton()
            .should('be.visible')
            .and('have.css','position', 'static')
    });

    it('AT_01.11.04 | Verify the functionality of the close button', () => {
        registerPopup
            .getRegisterPopupModal()
            .should('have.attr', 'aria-hidden', 'false')
        registerPopup
            .clickRegisterPopupCloseButton()

        registerPopup
            .getRegisterPopupModal()
            .should('have.attr', 'aria-hidden', 'true')
    });
});

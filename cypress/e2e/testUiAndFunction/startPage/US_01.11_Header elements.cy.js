/// <reference types="Cypress" />

import {StartPage} from "../../../pageObjects/StartPage";
import {RegisterPopup} from "../../../pageObjects/StartPage";

const startPage = new StartPage();
const registerPopup = new RegisterPopup();

describe('US_01.11 | Header elements', () => {

    beforeEach(function () {
	    cy.visit('/');
        startPage.clickRegisterAccountLink();
	});

    it('AT_01.11.01 | Verify the title `Register agent account` are visible in the header', () => {
        registerPopup.getRegisterAgentAccountHeader().should('be.visible');
    });

    it('AT_01.11.02 | Verify the title `Register agent account` has rgb(102, 102, 102) color, and 30px font-size‌', () => {
        registerPopup.getRegisterAgentAccountHeader().should('have.css','color', 'rgb(102, 102, 102)');
        registerPopup.getRegisterAgentAccountHeader().should('have.css','font-size', '30px');
    });

    it('AT_01.11.04 | Verify the functionality of the close button', () => {
        registerPopup
            .getRegisterModalPopup()
            .should('have.attr', 'aria-hidden', 'false')
        registerPopup
            .clickRegisterPopupCloseButton()

        registerPopup
            .getRegisterModalPopup()
            .should('have.attr', 'aria-hidden', 'true')
    });
});

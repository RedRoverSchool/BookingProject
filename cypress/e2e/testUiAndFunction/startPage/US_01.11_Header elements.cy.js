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

});

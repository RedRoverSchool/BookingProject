/// <reference types="Cypress" />

import {StartPage, RegisterPopup} from "../../../pageObjects/StartPage";

const startPage = new StartPage();
const registerPopup = new RegisterPopup();

describe('US_01.14 | Register UI', () => {

    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });
        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
	});

    before(() => {
        cy.visit('/')
        startPage.clickRegisterAccountLink()
    });

    it('AT_01.14.01 | Verify that the label "Your name" is visible in the modal body, has the #666 color and font size: 14px' , function () {
        registerPopup
            .getYourNameLabel()
            .should('be.visible')
            .and('include.text', this.startPage.label.labelYourName.text)
            .and('have.css', 'color', this.colors.greyLabel)
            .and('have.css', 'font-size', this.startPage.label.labelsModalBody.front_size)
    })

})
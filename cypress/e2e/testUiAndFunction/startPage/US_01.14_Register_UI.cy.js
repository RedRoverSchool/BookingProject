/// <reference types="Cypress" />

import {StartPage, RegisterPopup} from "../../../pageObjects/StartPage";

const startPage = new StartPage();
const registerPopup = new RegisterPopup();

describe('US_01.14 | Register UI', { tags: ['smoke'] }, () => {
    before(() => {
        cy.then(Cypress.session.clearCurrentSessionData);
        cy.visit('/')
        startPage.clickRegisterAccountLink()
    });

    beforeEach(function () {
        cy.fixture('startPage').then(startPage => {
            this.startPage = startPage;
        });
        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
	});

    it('AT_01.14.01 | Verify that the label "Your name" is visible in the modal body, has the #999 color and font size: 14px' , function () {
        registerPopup
            .getYourNameLabel()
            .should('be.visible')
            .and('include.text', this.startPage.label.labelYourName.text)
            .and('have.css', 'color', this.colors.greyLabel)
            .and('have.css', 'font-size', this.startPage.label.labelsModalBody.front_size)
    })

    it('AT_01.14.02 | Verify that the example(placeholder) "John Doe" is visible in the name field, has the #666 color, and font size: 14px' , function () {
        registerPopup
            .getNameInput()
            .should('be.visible')
            .and('have.attr', 'placeholder', this.startPage.inputField.registerPopup.yourNameInputField)
            .and('have.css', 'color', this.colors.greyHeader)
            .and('have.css', 'font-size', this.startPage.label.labelsModalBody.front_size)
    })

    it('AT_01.14.03 | Verify that the label "Company name" is visible in the modal body, has the #999 color and font size: 14px' , function () {
        registerPopup
            .getCompanyNameLabel()
            .should('be.visible')
            .and('include.text', this.startPage.label.labelCompanyName.text)
            .and('have.css', 'color', this.colors.greyLabel)
            .and('have.css', 'font-size', this.startPage.label.labelsModalBody.front_size)
    })
    
    it('AT_01.14.04 | Verify that the example(placeholder) "Transportation Co" is visible in the company name field, has the #666 color, and font size: 14px' , function () {
        registerPopup
            .getCompanyInput()
            .should('be.visible')
            .and('have.attr', 'placeholder', this.startPage.inputField.registerPopup.companyNameInputField)
            .and('have.css', 'color', this.colors.greyHeader)
            .and('have.css', 'font-size', this.startPage.label.labelsModalBody.front_size)
    })
    
    it('AT_01.14.05 | Verify that the label "Email" is visible in the modal body, has the #999 color and font size: 14px' , function () {
        registerPopup
            .getEmailLabel()
            .should('be.visible')
            .and('include.text', this.startPage.label.labelEmail.text)
            .and('have.css', 'color', this.colors.greyLabel)
            .and('have.css', 'font-size', this.startPage.label.labelsModalBody.front_size)
    }) 
     
    it('AT_01.14.06 | Verify that the example(placeholder) "You will get your password by email" is visible in the email field, has the #666 color, and font size: 14px' , function () {
        registerPopup
            .getEmailInput()
            .should('be.visible')
            .and('have.attr', 'placeholder', this.startPage.inputField.registerPopup.emailInputField)
            .and('have.css', 'color', this.colors.greyHeader)
            .and('have.css', 'font-size', this.startPage.label.labelsModalBody.front_size)
    })
    
    it('AT_01.14.07 | Verify that the label "Phone number" is visible in the modal body, has the #999 color and font size: 14px' , function () {
        registerPopup
            .getPhoneLabel()
            .should('be.visible')
            .and('include.text', this.startPage.label.labelPhoneNumber.text)
            .and('have.css', 'color', this.colors.greyLabel)
            .and('have.css', 'font-size', this.startPage.label.labelsModalBody.front_size)
    }) 

    it('AT_01.14.08 | Verify that the example(placeholder) "Country code and phone number" is visible in the email field, has the #666 color, and font size: 14px' , function () {
        registerPopup
            .getPhoneInput()
            .should('be.visible')
            .and('have.attr', 'placeholder', this.startPage.inputField.registerPopup.phoneNumberInputField)
            .and('have.css', 'color', this.colors.greyHeader)
            .and('have.css', 'font-size', this.startPage.label.labelsModalBody.front_size)
    })
    
})
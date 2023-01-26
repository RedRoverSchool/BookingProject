/// <reference types="Cypress" />

import Header from "../../../pageObjects/Header";

const header = new Header();

describe('US_02.05 | User dropdown menu UI and functionality', () => {

	const AGENT = Cypress.env('agent');

	beforeEach(function () {
		cy.fixture('header').then(header => {
			this.header = header
		})
		cy.visit('/')
		cy.login(AGENT.email, AGENT.password)
	});

	it('AT_02.05.01 | Verify the User dropdown menu displays selection of 8 language icons', function () {
		header.clickUserDropDownMenu()
		header.getLanguageIcons()
			.should('have.length', this.header.hyperLinks.languageIconQuantity)		
	})
	
	it('AT_02.05.02 |Verify UK flag" icon is displayed', function () {
		header.clickUserDropDownMenu()
		header.getFlagIconEn()
			.should('be.visible')		
	})
});

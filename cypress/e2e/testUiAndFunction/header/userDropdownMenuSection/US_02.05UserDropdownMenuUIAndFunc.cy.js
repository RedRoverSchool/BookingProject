/// <reference types="Cypress" />

import Header from "../../../../pageObjects/Header";

const header = new Header();

describe('US_02.05 | User dropdown menu UI and functionality', () => {

	const AGENT = Cypress.env('agent');

	beforeEach(function () {
		cy.fixture('header/hyperLinks').then(hyperLinks => {
			this.hyperLinks = hyperLinks
		})
		cy.visit('/')
		cy.login(AGENT.email, AGENT.password)
	});

	it('AT_02.05.01 | Verify the User dropdown menu displays selection of 8 language icons', function () {
		header.clickUserDropDownMenu()
		header.getLanguageIcons()
			.should('have.length', this.hyperLinks.languageIconQuantity)		
	})
	it('AT_02.05.02 |Verify UK flag" icon is displayed and clickable', function () {
		header.clickUserDropDownMenu()
		header.getFlagIconEn()
			.should('be.visible')		
	})
});

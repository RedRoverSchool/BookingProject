/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import Header from "../../../pageObjects/Header";

const header = new Header();
const createBookingPage = new CreateBookingPage();

describe('US_02.05 | User dropdown menu UI and functionality', () => {
	const AGENT = Cypress.env('agent');

	beforeEach(function () {
		cy.fixture('header').then(header => {
			this.header = header
		})
		cy.fixture('createBookingPage').then(createBookingPage => {
			this.createBookingPage = createBookingPage
		})
		cy.visit('/')
		cy.login(AGENT.email, AGENT.password)
		header.clickUserDropDownMenu()
	});

	it('AT_02.05.01 | Verify the User dropdown menu displays selection of 8 language icons', function () {
		header.getLanguageIcons()
			.should('have.length', this.header.hyperLinks.languageIconQuantity)		
	})
	
	it('AT_02.05.02 |Verify UK flag" icon is displayed', function () {
		header.getFlagIconEn()
		.should('be.visible')		
	})

	it('AT_02.05.04 |Verify UK flag  icon is clickable', function () {
		header.clickFlagIconTh()
		createBookingPage.getPhoneNumberInputFild().should('have.attr', 'placeholder', this.createBookingPage.inputField.main_passenger.placeholderPhoneNumberTh)
		header.clickUserDropDownMenu()
		header.clickFlagIconEn()
		createBookingPage.getPhoneNumberInputFild().should('have.attr', 'placeholder', this.createBookingPage.inputField.main_passenger.placeholderPhoneNumberEn)
	})
});

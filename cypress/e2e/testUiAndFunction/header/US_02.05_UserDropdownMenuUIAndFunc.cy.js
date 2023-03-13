/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import Header from "../../../pageObjects/Header";
import { StartPage } from "../../../pageObjects/StartPage";

const header = new Header();
const createBookingPage = new CreateBookingPage();
const startPage = new StartPage();

describe('US_02.05 | User dropdown menu UI and functionality', { tags: ['smoke', 'regression'] }, () => {
	const AGENT = Cypress.env('agent');

	beforeEach(function () {
		cy.fixture('header').then(header => {
			this.header = header
		});
		cy.fixture('createBookingPage').then(bookingData => {
			this.bookingData = bookingData
		});
	});

	describe('Verify user dropdown menu UI', () => {
		before(() => {
			cy.loginWithSession(AGENT.email, AGENT.password);
        	cy.visit('/');
			header.clickUserDropDownMenu()
		});

		it('AT_02.05.01 | Verify the User dropdown menu displays selection of 8 language icons', function () {
			header.getLanguageIcons().should('have.length', this.header.images.imageIconLength)
		});

		it('AT_02.05.02 |Verify UK flag" icon is displayed', function () {
			header.getFlagIconEn().should('be.visible')
		});

		it('AT_02.05.09 |Verify FR flag" icon is displayed', function () {
			header.getFlagIconFr().should('be.visible')
		});

		it('AT_02.05.05 | Verify TH flag icon is displayed', function () {
			header.getFlagIconTh().should('be.visible')
		});

		it('AT_02.05.14 | Verify the "Vietnamese flag" icon is displayed', function () {
			header.getFlagIconViet().should('be.visible')
		});

		it('AT_02.05.07 | Verify "User dropdown menu" has "Sign out" button', function () {
			header
				.getSignOutBtn()
				.should('be.visible')
				.and('have.text', this.header.userDropDownMenu.signOutBtn)
		});

		it('AT_02.05.10 |Verify De flag" icon is displayed', function () {
			header.getFlagIconDe().should('be.visible')
		});

		it('AT_02.05.10 |Verify Es flag" icon is displayed', function () {
			header.getFlagIconEs().should('be.visible')
		});

		it('AT_02.05.10 |Verify Ru flag" icon is displayed', function () {
			header.getFlagIconRu().should('be.visible')
		});

		it('AT_02.05.10 |Verify Cn flag" icon is displayed', function () {
			header.getFlagIconCn().should('be.visible')
		});

		it('AT_02.05.17 | Verify "User dropdown menu" displays the "Operator Logo"', function () {
			header.getLogoDropdownMenu().should('be.visible')
		});

		it('AT_02.05.18 | Verify "User dropdown menu" displays the "User Role"', function () {
			header.getUserRole().should('be.visible')
		});
	});

	describe('Verify user dropdown menu functionality', () => {
		beforeEach(function () {
			cy.loginWithSession(AGENT.email, AGENT.password);
        	cy.visit('/');
			header.clickUserDropDownMenu()
		});

		it('AT_02.05.06 | Verify TH flag icon is clickable', function () {
			header.clickFlagIconTh()
			createBookingPage
				.getPhoneNumberInputFild()
				.should('have.attr', 'placeholder', this.bookingData.inputField.main_passenger.placeholderPhoneNumberTh)
		});

		it('AT_02.05.04 |Verify UK flag  icon is clickable', function () {
			header.clickFlagIconTh()
			createBookingPage
				.getPhoneNumberInputFild()
				.should('have.attr', 'placeholder', this.bookingData.inputField.main_passenger.placeholderPhoneNumberTh)
			
			header.clickUserDropDownMenu()
			header.clickFlagIconEn()
			createBookingPage
				.getPhoneNumberInputFild()
				.should('have.attr', 'placeholder', this.bookingData.inputField.main_passenger.placeholderPhoneNumberEn)
		});

		it('AT_02.05.15 | Verify the "Vietnamese flag" icon is clickable', function () {
			header.clickFlagIconViet()
			createBookingPage
				.getEmailInputField()
				.should('have.attr', 'placeholder', this.bookingData.inputField.main_passenger.placeholderEmailViet)
		});

		it('AT_02.05.03 | Clicking "Sign out" button gets user signed out', function () {
			header.clickSignOutBtn()
			startPage.getLoginButton().should('be.visible')
		});

		it.skip('AT_02.05.08 | Verify that Clicking "Sign out" button redirects user to the "Start" page', function () {
			header.clickSignOutBtn()
			startPage.getLoginButton().should('be.visible')
		});
	});
});
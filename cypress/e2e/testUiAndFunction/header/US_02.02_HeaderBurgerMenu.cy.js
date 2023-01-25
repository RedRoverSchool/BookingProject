/// <reference types="Cypress" />

import Header from "../../../pageObjects/Header";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const header = new Header();
const leftMenuPanel = new LeftMenuPanel();

describe('US_02.02 header burger menu functionality', () => {
    const AGENT = Cypress.env('agent');

    beforeEach(function () {
        cy.fixture('leftMenuPanel/headers').then(headers => {
            this.headers = headers;
        })
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    })

    it('AT_02.02.01 Link names on the left side panel revealed after clicking on the burger menu', function () {
        leftMenuPanel.getBookingNameLink().should('not.be.visible')
        leftMenuPanel.getBookingManagementNameLink().should('not.be.visible');
        leftMenuPanel.getAccountManagementNameLink().should('not.be.visible');
        leftMenuPanel.getContactUsNameLink().should('not.be.visible');
        header.clickBurgerMenu();

        leftMenuPanel.getBookingNameLink().should('be.visible')
            .and('have.text', this.headers.leftsideMenuPanelLinkNames[0]);
        leftMenuPanel.getBookingManagementNameLink().should('be.visible')
            .and('have.text', this.headers.leftsideMenuPanelLinkNames[1]);
        leftMenuPanel.getAccountManagementNameLink().should('be.visible')
            .and('have.text', this.headers.leftsideMenuPanelLinkNames[2]);
        leftMenuPanel.getContactUsNameLink().should('be.visible')
            .and('have.text', this.headers.leftsideMenuPanelLinkNames[3]);
    })

    it('AT_02.02.02 Link names on the left side panel are closed after the second click on the burger menu', function () {
        header.clickBurgerMenu();
        leftMenuPanel.getBookingNameLink().should('be.visible')
            .and('have.text', this.headers.leftsideMenuPanelLinkNames[0]);
        leftMenuPanel.getBookingManagementNameLink().should('be.visible')
            .and('have.text', this.headers.leftsideMenuPanelLinkNames[1]);
        leftMenuPanel.getAccountManagementNameLink().should('be.visible')
            .and('have.text', this.headers.leftsideMenuPanelLinkNames[2]);
        leftMenuPanel.getContactUsNameLink().should('be.visible')
            .and('have.text', this.headers.leftsideMenuPanelLinkNames[3]);

        header.clickBurgerMenu();

        leftMenuPanel.getBookingNameLink().should('not.be.visible')
        leftMenuPanel.getBookingManagementNameLink().should('not.be.visible');
        leftMenuPanel.getAccountManagementNameLink().should('not.be.visible');
        leftMenuPanel.getContactUsNameLink().should('not.be.visible');
    })
})

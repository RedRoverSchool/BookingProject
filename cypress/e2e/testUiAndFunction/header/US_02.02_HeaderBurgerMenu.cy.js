/// <reference types="Cypress" />

import Header from "../../../pageObjects/Header";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const header = new Header();
const leftMenuPanel = new LeftMenuPanel();

describe('US_02.02 header burger menu functionality', { tags: ['smoke', 'regression'] }, () => {
    const AGENT = Cypress.env('agent');

    before(function () {
        cy.fixture('leftMenuPanel').then(leftMenuPanel => {
            this.leftMenuPanel = leftMenuPanel;
        })
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
    })

    it('AT_02.02.01 Link names on the left side panel reveal after clicking on the burger menu, after second clicking on the burger menu the link names become hidden', function () {
        leftMenuPanel.getBookingMenuLink().should('not.be.visible');
        leftMenuPanel.getBookingManagementMenuLink().should('not.be.visible');
        leftMenuPanel.getAccountManagementMenuLink().should('not.be.visible');
        leftMenuPanel.getContactUsMenuLink().should('not.be.visible');
        header.clickBurgerMenu();

        leftMenuPanel.getBookingMenuLink().should('be.visible')
            .and('have.text', this.leftMenuPanel.menuLinks.leftsideMenuPanelLinkNames[0]);
        leftMenuPanel.getBookingManagementMenuLink().should('be.visible')
            .and('have.text', this.leftMenuPanel.menuLinks.leftsideMenuPanelLinkNames[1]);
        leftMenuPanel.getAccountManagementMenuLink().should('be.visible')
            .and('have.text', this.leftMenuPanel.menuLinks.leftsideMenuPanelLinkNames[2]);
        leftMenuPanel.getContactUsMenuLink().should('be.visible')
            .and('have.text', this.leftMenuPanel.menuLinks.leftsideMenuPanelLinkNames[3]);

        header.clickBurgerMenu();
        
        leftMenuPanel.getBookingMenuLink().should('not.be.visible')
        leftMenuPanel.getBookingManagementMenuLink().should('not.be.visible');
        leftMenuPanel.getAccountManagementMenuLink().should('not.be.visible');
        leftMenuPanel.getContactUsMenuLink().should('not.be.visible');
    })    
})

/// <reference types="Cypress"/>

import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import AccountManagementPage from "../../../pageObjects/AccountManagementPage";

const leftMenuPanel = new LeftMenuPanel();
const AGENT = Cypress.env('agent');
const accountManagementPage = new AccountManagementPage();

describe('US_03.04 Account management link', () => {

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    beforeEach(function () {
        cy.fixture('leftMenuPanel').then(leftMenuPanel => {
            this.leftMenuPanel = leftMenuPanel;
        });
        cy.fixture('accountManagementPage').then(accountManagementPage => {
            this.accountManagementPage = accountManagementPage;
        });
    });

    it('AT_03.04.03 Clicking "Account management" opening the page with heading "Account management"', function () {
        leftMenuPanel.clickAccountManagementIcon() 

        accountManagementPage 
            .getAccountManagementHeader()
            .should('include.text', this.accountManagementPage.headers.accountManagementHeader)       
    });

    it('AT_03.04.01 Verify that "Account management" icon in the left menu panel is visible', function () {
        leftMenuPanel.getAccountManagementLeftIcon().should('be.visible');
    });

    it('AT_03.04.02 Verify the Sidebar has text "Account management"', function () {
        leftMenuPanel
            .getAccountManagementMenuLink()
            .should('include.text', this.leftMenuPanel.menuLinks.accountLink);
    });
})

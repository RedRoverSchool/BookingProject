/// <reference types="Cypress" />

import Header from "../../../pageObjects/Header";
import HelpdeskPage from "../../../pageObjects/HelpdeskPage";

const header = new Header();
const helpdeskPage = new HelpdeskPage();

const AGENT = Cypress.env('agent');

describe('US_02.03 Header Envelope icon UI and functionality', () => {
    beforeEach(function () {
        cy.fixture('helpdeskPage').then(helpdeskPage => {
            this.helpdeskPage = helpdeskPage;
         })
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    it('AT_02.03.01 | Verify Envelope icon is visible', () => {
        header.getEnvelopeIcon().should('be.visible');
    })

    it('AT_02.03.02 | Verify Envelope icon is clickable and redirects to Helpdesk page; filter status is Active', function () {
        header.clickEnvelopeIcon();
        helpdeskPage.getHelpdeskHeader().should('include.text', this.helpdeskPage.headers.mainHeaderPage);
        helpdeskPage.getHelpdeskFilter().should('have.text', this.helpdeskPage.filter.selectFilterStatus);
   });
})


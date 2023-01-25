/// <reference types="Cypress" />

import LeftMenuPanel from "../../../../pageObjects/LeftMenuPanel";
import CreateBookingPage from "../../../../pageObjects/CreateBookingPage";


const leftMenuPanel = new LeftMenuPanel();
const createBookingPage = new CreateBookingPage();

const AGENT = Cypress.env('agent');

describe('US_04.08 | Calendar-selection block UI and functionality week view', () => {
    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        leftMenuPanel.clickBookingIcon();
    });

    it('AT_04.08.03 | Verify that Label is present for week view', () => {
       createBookingPage.getLabelCalendarWeek().should('be.visible');
    });
});
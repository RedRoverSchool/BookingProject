/// <reference types="Cypress" />

import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import CreateBookingPage from "../../../pageObjects/CreateBookingPage";


const leftMenuPanel = new LeftMenuPanel();
const createBookingPage = new CreateBookingPage();

const AGENT = Cypress.env('agent');

describe('US_04.08 | Calendar-selection block UI and functionality week/month view', () => {
    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        leftMenuPanel.clickBookingIcon();
    });

    it('AT_04.08.03 | Verify that Label is present for week view', () => {
       createBookingPage.getLabelCalendar().should('be.visible');
    });

    it('AT_04.08.01 | Verify that Label is present for month view', () => {
        createBookingPage.clickMonthBtn();
        createBookingPage.getLabelCalendar().should('be.visible')
    });

    it('AT_04.08.04 | Verify that Click forward arrow works and switches month in correct order', () => {
        let date = new Date()
        const options = { month: 'short', year: 'numeric' };
        for (let i = 0; i < 12; i++) {
            createBookingPage.clickCalendarNextButton();
            let nextMonth = date.getMonth() + 1;
            date.setMonth(nextMonth);

            const formattedDate = date.toLocaleDateString('en-US', options);
            createBookingPage.getLabelCalendar().then(($label) => {
                const text = $label.text();
                expect(text).to.deep.equal(formattedDate);
            });
        }
    });
 });
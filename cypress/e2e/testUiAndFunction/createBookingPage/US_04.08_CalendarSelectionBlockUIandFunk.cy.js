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

    it('AT_04.08.05 | Verify previous arrow button switches weeks in descending order from 3 weeks ahead', () => {
        createBookingPage.clickMonthBtn()

        let n = 3
        for (let i = 1; i <= n; i++) {
            createBookingPage.clickCalendarNextButton();
        }

        createBookingPage.getLabelCalendar().then(($el) => {
            let mondayWeekAhead = $el.text().split('-')[0];
            let now = new Date();
            const currentThaiYear = now.toLocaleString('en-US', { year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' });
            const mondayWeeksAhead = new Date(mondayWeekAhead + " " + currentThaiYear);
            
            for (let i = 1; i <= n; i++) {
                createBookingPage.clickCalendarPrevButton();
                mondayWeeksAhead.setDate(mondayWeeksAhead.getDate() - 7);
               
                let previousWeekMonday = mondayWeeksAhead.toLocaleString('en-US', { month: 'short', day: 'numeric' }).split(" ");
                previousWeekMonday[i] = previousWeekMonday[1] + " " + previousWeekMonday[0]

                mondayWeeksAhead.setDate(mondayWeeksAhead.getDate() + 6);
                let previousWeekSunday = mondayWeeksAhead.toLocaleString('en-US', { month: 'short', day: 'numeric' }).split(" ");
                previousWeekSunday[i] = previousWeekSunday[1] + " " + previousWeekSunday[0]

                mondayWeeksAhead.setDate(mondayWeeksAhead.getDate() - 6);
               
                createBookingPage.getLabelCalendar().then(($el) => {
                    expect($el.text()).to.eq(previousWeekMonday[i] + ' - ' + previousWeekSunday[i]);
                });
            }
        });
    });
 });
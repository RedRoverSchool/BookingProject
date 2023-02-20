/// <reference types="Cypress" />

import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import startAndEndOfWeek from "../../../support/utilities/getStartAndEndOfTheWeek";


const leftMenuPanel = new LeftMenuPanel();
const createBookingPage = new CreateBookingPage();

const AGENT = Cypress.env('agent');

const getDateAndMonth = (el) => el.text().split('-')[0]
const getPreviousWeekMonSundDays = (date) => {
    let now = new Date()
    const currentYear = now.toLocaleString('en-US', { year: 'numeric' });
    const nextWeekMonday = new Date(date + " " + currentYear)
    nextWeekMonday.setDate(nextWeekMonday.getDate() - 7)
    let previousWeekMonday = nextWeekMonday.toLocaleString('en-US', { month: 'short', day: 'numeric' }).split(" ")
    previousWeekMonday = previousWeekMonday[1] + " " + previousWeekMonday[0]

    nextWeekMonday.setDate(nextWeekMonday.getDate() + 6)
    let previousWeekSunday = nextWeekMonday.toLocaleString('en-US', { month: 'short', day: 'numeric' }).split(" ")
    previousWeekSunday = previousWeekSunday[1] + " " + previousWeekSunday[0]
    return previousWeekMonday + ' - ' + previousWeekSunday
}

describe('US_04.08 | Calendar-selection block UI  week/month view', () => {
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
});

describe('US_04.08 | Calendar-selection block functionality week/month view', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        leftMenuPanel.clickBookingIcon();
    });

    it('AT_04.08.04 | Verify that Click forward arrow works and switches month in correct order', () => {
        const date = new Date()
        createBookingPage.clickMonthBtn()
        for (let i = 0; i < 12; i++) {
            createBookingPage.clickCalendarNextButton();
            createBookingPage.getLabelCalendar().then(($label) => {
                const text = $label.text();
                expect(text).to.deep.equal(createBookingPage.getNextMonth(date));
            });
        }
    });

    it('AT_04.08.05 | Verify previous arrow button switches calendar-week label', () => {
        createBookingPage.clickCalendarNextButton();
        createBookingPage.getLabelCalendar().then(($el) => {
            let mondayWeekAhead = getDateAndMonth($el);
                createBookingPage.clickCalendarPrevButton();
               
                createBookingPage.getLabelCalendar().then(($el) => {
                    expect($el.text()).to.eq(getPreviousWeekMonSundDays(mondayWeekAhead));
                });
            })
        });
  

    it('AT_04.08.06 | Verify that Click back arrow works and switches month in correct order', () => {
        createBookingPage.clickMonthBtn();
        const date = new Date()
        date.setMonth(date.getMonth() + 12);
        for (let i = 1; i <= 12; i++) {
            createBookingPage.clickCalendarNextButton();
        }
        for (let i = 12; i > 1; i--) {
            createBookingPage.clickCalendarPrevButton();
            createBookingPage.getLabelCalendar().then(($label) => {
                const text = $label.text();
                expect(text).to.deep.equal(createBookingPage.getPreviousMonth(date));
            });
        }
    });

    xit('AT_04.08.02 | Verify that Calendar Lable  shows week range in correct format from Monday to Sunday', () => {
        const date = new Date()
        let avalableForBookingDay = date.setDate(date.getDate() + 2);
        for (let i = 0; i < 10; i++) {
            createBookingPage.getLabelCalendar().then(($label) => {
                let text = $label.text();
                expect(text).to.deep.equal(startAndEndOfWeek(avalableForBookingDay))

                avalableForBookingDay = date.setDate(date.getDate() + 7);
                createBookingPage.clickCalendarNextButton();
            });
        }
    });

    it('AT_04.08.08 | Verify that back arrow click does not show the elapsed month', function() {
        createBookingPage.clickMonthBtn();
        createBookingPage.clickCalendarPrevButton();
        createBookingPage.getLabelCalendar().then(($label) => {
            let text = $label.text();
            expect(text).to.deep.equal(createBookingPage.getCurrentMonthAndYear())
        });
    });

    it.skip('AT_04.08.07 | Verify that back arrow click does not show elapsed week', function () {
        createBookingPage.clickCalendarPrevButton();
        createBookingPage.getMondayButton().then(($monday) => {
          let openedWeekMonday = $monday.text();
    
          expect(openedWeekMonday).to.deep.equal(createBookingPage.getCurrentMonday());
        });
      });
});
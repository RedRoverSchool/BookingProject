/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import AccountManagementPage from "../../../pageObjects/AccountManagementPage";

const createBookingPage = new CreateBookingPage();
const leftMenuPanel = new LeftMenuPanel();
const accountManagementPage = new AccountManagementPage();

describe("US_04.04 | Credit balance button UI and functionality", () => {
  const AGENT = Cypress.env("agent");

  beforeEach(function () {
    cy.fixture("createBookingPage").then((createBookingPage) => {
      this.createBookingPage = createBookingPage;
    });
    cy.visit("/");
    cy.login(AGENT.email, AGENT.password);
  });

  it.skip("AT_04.04.01 | Create booking page > Verify that week/month format lable", function () {
    let current = new Date();
    current.setHours(current.getUTCHours() + 7);
    current.setDate(current.getDate() - current.getDay() + 1);
    let mondayDate = current.toLocaleString("en-GB", {
      month: "short",
      day: "numeric",
    });
    current.setDate(current.getDate() - current.getDay() + 7);
    let sundayDate = current.toLocaleString("en-GB", {
      month: "short",
      day: "numeric",
    });
    let weekFormat = mondayDate + " " + "-" + " " + sundayDate;
    createBookingPage.getLabelCalendar().then(($el) => {
      let labelWeekFormat = $el.text();
      expect(weekFormat).to.eq(labelWeekFormat);
    });
    createBookingPage.clickMonthBtn();
    let dateForBooking = new Date();
    dateForBooking.setDate(current.getDate() + 2);
    let monthForBooking = dateForBooking.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "Asia/Bangkok",
    });
    createBookingPage.getLabelCalendar().then(($el) => {
      let labelMonthFormat = $el.text();
      expect(monthForBooking).to.eq(labelMonthFormat);
    });
  });

  it('AT_04.04.02 | Create booking page> Credit balance button functionality > balance sheet amount is the same on all pages', function () {
    
    createBookingPage.getBalanceAmountOnBookingPage().should("be.visible");
    leftMenuPanel.clickAccountManagementIcon();
   
   accountManagementPage.getBalanceAmountOnAccountManagementPage().should('be.visible')

   cy.intercept('/tools/**').as('getTrip')
   cy.wait('@getTrip')
    createBookingPage.getBalanceAmountOnBookingPage().then((one) => {
    accountManagementPage.getBalanceAmountOnAccountManagementPage().then((two) => {
          expect(one.text()).to.equal(two.text())
       })
    })
  });
});
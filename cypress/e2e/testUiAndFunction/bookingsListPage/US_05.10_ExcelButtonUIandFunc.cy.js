/// <reference types="Cypress" />

import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import BookingsListPage from "../../../pageObjects/BookingsListPage";

const leftMenuPanel = new LeftMenuPanel();
const bookingListPage = new BookingsListPage();

describe('US_05.10 Excel button UI and functionality', { tags: ['smoke'] }, () => {
    const AGENT = Cypress.env('agent');

    before(() => {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        leftMenuPanel.clickBookingManagementIcon();
        cy.task('deleteFolder')
    });

    beforeEach(function () {
        cy.fixture('bookingsListPage').then(bookingsListPage => {
            this.bookingsListPage = bookingsListPage;
        });
    });


    it('AT_05.10.01 Verify "Excel" button is displayed', () => {
        bookingListPage.getExcelButton().should('be.visible');
    });

    it('AT_05.10.02 Verify "Excel" button has "Excel" text and icon', function () {
        bookingListPage
            .getExcelButton()
            .should('have.text', this.bookingsListPage.buttons.excelButtonName);
        bookingListPage
            .getExcelButtonIcon()
            .should('have.attr', 'class', this.bookingsListPage.buttons.excelButtonIcon);    
    });

    it('AT_05.10.03 | Verify the "Excel" button is clickable, downloads the file with extension ".csv" and its name contain defaullt dates range (dropdown) ', { tags: ['regression'] }, function () {
        bookingListPage.getDrdnDatesRangeValue()
            .then(($rangeDates) => {
                let expectedFormattedRrangeDates = bookingListPage.formatteddDatesRangeYYYYMMDD($rangeDates.text())
                let expectedFilePath = this.bookingsListPage.excelFile.name + expectedFormattedRrangeDates + this.bookingsListPage.excelFile.extension
                
                bookingListPage.clickExcelButton()

                cy.verifyDownload('.', { contains: true });
                cy.verifyDownload('.csv', { contains: true });
                cy.verifyDownload(expectedFilePath);
            })
    });
});
/// <reference types="Cypress" />

import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import BookingsListPage from "../../../pageObjects/BookingsListPage";

const leftMenuPanel = new LeftMenuPanel();
const bookingListPage = new BookingsListPage();

const isEqualHeaders = (cySelector, expectedTableHeaders) => {
    cySelector().then(($tr) => {
        const actualTableHeaders = $tr.toArray()[0].innerText.split('\t')
        expect(actualTableHeaders).to.deep.eq(expectedTableHeaders)
    })
}

describe('US_05.12 | Columns are filtered by selected criteria', () => {
    const AGENT = Cypress.env('agent');

    before(() => {
        cy.visit('/')
        cy.login(AGENT.email, AGENT.password)
        leftMenuPanel.clickBookingManagementIcon()
    });

    beforeEach(function () {
        cy.fixture('bookingsListPage').then(bookingsListPage => {
            this.bookingsListPage = bookingsListPage;
        })
    });

    context('AT_05.12.03 | Default columns (booking list) are displayed', () => {
        it('AT_05.12.03 | Verify that default columns (booking list) are displayed', function () {
            const expectedResult = this.bookingsListPage.columns.default;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult)
        })
    })

    context('AT_05.12.03 | Columns (booking list) are filtered by selected criteria', () => {
        beforeEach(() => {
            bookingListPage.clickColumnsSettingButton()
            bookingListPage.uncheckColumnsCheckbox()
        });

        it('Verify filtering by ID', function () {
            bookingListPage.checkColumnsCheckbox(['id'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.id;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by Booking date', function () {
            bookingListPage.checkColumnsCheckbox(['createdon'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.bookingDate;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by Route', function () {
            bookingListPage.checkColumnsCheckbox(['route'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.route;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by Departure date', function () {
            bookingListPage.checkColumnsCheckbox(['godate'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.departureDate;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by Departure time', function () {
            bookingListPage.checkColumnsCheckbox(['gotime'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.departureTime;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by Vehicle', function () {
            bookingListPage.checkColumnsCheckbox(['class'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.vehicle;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by Channel / Agent', function () {
            bookingListPage.checkColumnsCheckbox(['agent'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.channelAgent;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by Seats', function () {
            bookingListPage.checkColumnsCheckbox(['seats'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.seats;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by Numbers', function () {
            bookingListPage.checkColumnsCheckbox(['seatnums'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.numbers;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by Contact', function () {
            bookingListPage.checkColumnsCheckbox(['customer'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.contact;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by Price/USD', function () {
            bookingListPage.checkColumnsCheckbox(['total'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.priceUsd;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by Status', function () {
            bookingListPage.checkColumnsCheckbox(['status'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.status;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by Expire', function () {
            bookingListPage.checkColumnsCheckbox(['expire'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.expire;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by Notes', function () {
            bookingListPage.checkColumnsCheckbox(['notes'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.notes;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by ID + Notes', function () {
            bookingListPage.checkColumnsCheckbox(['id', 'notes'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.idNotes;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by Seats + Status', function () {
            bookingListPage.checkColumnsCheckbox(['seats', 'status'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.seatsStatus;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });

        it('Verify filtering by Route + Vehicle', function () {
            bookingListPage.checkColumnsCheckbox(['route', 'class'])
            bookingListPage.clickColumnsOkButton()

            const expectedResult = this.bookingsListPage.columns.routeVehicle;
            isEqualHeaders(bookingListPage.getTableHeaders, expectedResult);
        });
    })
})

/// <reference types="Cypress" />

const { _ } = Cypress

import CreateBookingPage from "../../../pageObjects/CreateBookingPage"
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel"
import BookingsListPage from "../../../pageObjects/BookingsListPage"
import BookingPopup from "../../../pageObjects/BookingPopup"

const createBookingPage = new CreateBookingPage()
const leftMenuPanel = new LeftMenuPanel()
const bookingListPage = new BookingsListPage()
const bookingPopup = new BookingPopup()

const getValueFromTable = (tr) => tr.toArray().map((el) => el.innerText.split('\t'))

const extractTableCellValues = () => {
    let tableHeaders

    bookingListPage.getTableHeaders()
        .then((tr) => {
            tableHeaders = getValueFromTable(tr).flat()
        })

    bookingListPage.getTableBody()
        .then(getValueFromTable)
        .then((tbody) => {
            const tableCellValues = tbody.map((elements) => {
                return {
                    ...elements.reduce((rows, value, index) => {
                        return {
                            ...rows,
                            [tableHeaders[index]]: value,
                        }
                    }, {}),
                }
            })

            cy.wrap(tableCellValues).as('tableCellValues');
        })
}

const AGENT = Cypress.env('agent');

describe('US_05.14 | Table Functionality', () => {

    before(() => {
        cy.cleanData()
        cy.viewport(1200, 720);
    })

    beforeEach(function () {
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/')

        const obj =  {
            "departureStationName" : "Rassada Pier",
            "arrivalStationName" : "Naka Island",
            "passengerName" : "Betty Hardy",
            "passengerAmount" : "1",
            "fareType" : "Adult"
        }

        for(let i = 0; i < 3; i++) {
            createBookingPage.createCustomBooking(obj)
            bookingPopup.clickCloseBtnBookingPopup()
        }

        leftMenuPanel.clickBookingManagementIcon()
    
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage
        })
    })


    it.only('Sort columns by ID | ASC', () => {
        bookingListPage.clickSortButton('ID')

        extractTableCellValues()
        cy.get('@tableCellValues').then((actualResult) => {
            const expectedResult = _.orderBy(actualResult, (obj) => obj['ID'], ['asc'])
            expect(actualResult).to.deep.equal(expectedResult)
        })
    })

    it('Sort columns by ID | DESC', () => {
        bookingListPage.clickSortButton('ID')

        extractTableCellValues()
        cy.get('@tableCellValues').then((actualResult) => {
            const expectedResult = _.orderBy(actualResult, (obj) => obj['ID'], ['desc'])
            expect(actualResult).to.deep.equal(expectedResult)
        })
    })

    it('Sort columns by Booking date | ASC', () => {
        bookingListPage.clickSortButton('Booking date')

        extractTableCellValues()
        cy.get('@tableCellValues').then((actualResult) => {
            const expectedResult = _.orderBy(actualResult, (obj) => new Date(obj['Booking date']), ['asc'])
            expect(actualResult).to.deep.equal(expectedResult)
        })
    })

    it('Sort columns by Booking date | DESC', () => {
        bookingListPage.clickSortButton('Booking date')

        extractTableCellValues()
        cy.get('@tableCellValues').then((actualResult) => {
            const expectedResult = _.orderBy(actualResult, (obj) => new Date(obj['Booking date']), ['desc'])
            expect(actualResult).to.deep.equal(expectedResult)
        })
    })

    // it('Sort columns by Route | ASC', () => {
    //     bookingListPage.clickSortButton('Route')
    //     cy.wait('@getBookingList')

    //     extractTableCellValues()
    //     cy.get('@tableCellValues').then((actualResult) => {
    //         const expectedResult = _.orderBy(actualResult, (obj) => obj['Route'], ['asc'])
    //         expect(actualResult).to.deep.equal(expectedResult)
    //     })
    // });

    // it('Sort columns by Route | DESC', () => {
    //     bookingListPage.clickSortButton('Route')
    //     cy.wait('@getBookingList')

    //     extractTableCellValues()
    //     cy.get('@tableCellValues').then((actualResult) => {
    //         const expectedResult = _.orderBy(actualResult, (obj) => obj['Route'], ['desc'])
    //         expect(actualResult).to.deep.equal(expectedResult)
    //     })
    // });

    // it('Sort columns by Price | ASC', () => {
    //     bookingListPage.clickSortButton('Price, USD')
    //     cy.wait('@getBookingList')

    //     extractTableCellValues()
    //     cy.get('@tableCellValues').then((actualResult) => {
    //         const expectedResult = _.orderBy(actualResult, (obj) => Number(obj['Price, USD']), ['asc'])
    //         expect(actualResult).to.deep.equal(expectedResult)
    //     })
    // });

    // it('Sort columns by Price | DESC', () => {
    //     bookingListPage.clickSortButton('Price, USD')
    //     cy.wait('@getBookingList')

    //     extractTableCellValues()
    //     cy.get('@tableCellValues').then((actualResult) => {
    //         const expectedResult = _.orderBy(actualResult, (obj) => Number(obj['Price, USD']), ['desc'])
    //         expect(actualResult).to.deep.equal(expectedResult)
    //     })
    // });

    // it('Sort columns by Departure date | ASC', () => {
    //     bookingListPage.clickSortButton('Departure date')
    //     cy.wait('@getBookingList')

    //     extractTableCellValues()
    //     cy.get('@tableCellValues').then((actualResult) => {

    //         const expectedResult = _.orderBy(actualResult, (value) => {
    //             const departureDate = value['Departure date']
    //             const re = departureDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");
    //             return new Date(re)
    //         }, ['asc'])

    //         expect(actualResult).to.deep.equal(expectedResult)
    //     })
    // });

    // it('Sort columns by Departure date | DESC', () => {
    //     bookingListPage.clickSortButton('Departure date')
    //     cy.wait('@getBookingList')

    //     extractTableCellValues()
    //     cy.get('@tableCellValues').then((actualResult) => {

    //         const expectedResult = _.orderBy(actualResult, (value) => {
    //             const departureDate = value['Departure date']
    //             const re = departureDate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");
    //             return new Date(re)
    //         }, ['desc'])

    //         expect(actualResult).to.deep.equal(expectedResult)
    //     })
    // });

    // it('Sort columns by Status | ASC', () => {
    //     bookingListPage.clickSortButton('Status')
    //     cy.wait('@getBookingList')

    //     extractTableCellValues()
    //     cy.get('@tableCellValues').then((actualResult) => {
    //         const expectedResult = _.orderBy(actualResult, (obj) => obj['Status'], ['asc'])
    //         expect(actualResult).to.deep.equal(expectedResult)
    //     })
    // });

    // it('Sort columns by Status | DESC', () => {
    //     bookingListPage.clickSortButton('Status')
    //     cy.wait('@getBookingList')

    //     extractTableCellValues()
    //     cy.get('@tableCellValues').then((actualResult) => {
    //         const expectedResult = _.orderBy(actualResult, (obj) => obj['Status'], ['desc'])
    //         expect(actualResult).to.deep.equal(expectedResult)
    //     })
    // });

    // it('Sort columns by Expire | ASC', () => {
    //     bookingListPage.clickSortButton('Expire')
    //     cy.wait('@getBookingList')

    //     extractTableCellValues()
    //     cy.get('@tableCellValues').then((actualResult) => {
    //         const expectedResult = _.orderBy(actualResult, (obj) => new Date(obj['Expire']), ['asc'])
    //         expect(actualResult).to.deep.equal(expectedResult)
    //     })
    // });

    // it('Sort columns by Expire | DESC', () => {
    //     bookingListPage.clickSortButton('Expire')
    //     cy.wait('@getBookingList')

    //     extractTableCellValues()
    //     cy.get('@tableCellValues').then((actualResult) => {
    //         const expectedResult = _.orderBy(actualResult, (obj) => new Date(obj['Expire']), ['desc'])
    //         expect(actualResult).to.deep.equal(expectedResult)
    //     })
    // });
});

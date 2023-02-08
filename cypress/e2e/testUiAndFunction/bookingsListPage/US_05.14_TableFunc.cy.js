/// <reference types="Cypress" />

const { _ } = Cypress
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";
import BookingsListPage from "../../../pageObjects/BookingsListPage";

const leftMenuPanel = new LeftMenuPanel();
const bookingListPage = new BookingsListPage();

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

describe('US_05.14 | Table Functionality', () => {
    const AGENT = Cypress.env('agent');

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        leftMenuPanel.clickBookingManagementIcon()
    });

    context('AT_05.14.01 | Sort columns ', () => {

        it('Sort columns by Route | ASC', () => {
            bookingListPage.clickSortButton('Route')

            extractTableCellValues()
            cy.get('@tableCellValues').then((actualResult) => {
                const expectedResult = _.orderBy(actualResult, (obj) => obj['Route'], ['asc'])
                expect(actualResult).to.deep.equal(expectedResult)
            })
        });

        it('Sort columns by Route | DESC', () => {
            bookingListPage.dblClickSortButton('Route')

            extractTableCellValues()
            cy.get('@tableCellValues').then((actualResult) => {
                const expectedResult = _.orderBy(actualResult, (obj) => obj['Route'], ['desc'])
                expect(actualResult).to.deep.equal(expectedResult)
            })
        });

        // it('Sort columns by ID | ASC', () => {
        //     bookingListPage.clickSortButton('ID')

        //     extractTableCellValues()
        //     cy.get('@tableCellValues').then((actualResult) => {
        //         const expectedResult = _.orderBy(actualResult, (obj) => obj['ID'], ['asc'])
        //         expect(actualResult).to.deep.equal(expectedResult)
        //     })
        // });

        // it('Sort columns by ID | DESC', () => {
        //     bookingListPage.dblClickSortButton('ID')

        //     extractTableCellValues()
        //     cy.get('@tableCellValues').then((actualResult) => {
        //         const expectedResult = _.orderBy(actualResult, (obj) => obj['ID'], ['desc'])
        //         expect(actualResult).to.deep.equal(expectedResult)
        //     })
        // });

        // it('Sort columns by Booking date | ASC', () => {
        //     bookingListPage.clickSortButton('Booking date')

        //     extractTableCellValues()
        //     cy.get('@tableCellValues').then((actualResult) => {
        //         const expectedResult = _.orderBy(actualResult, (obj) => new Date(obj['Booking date']), ['asc'])
        //         expect(actualResult).to.deep.equal(expectedResult)
        //     })
        // });

        // it('Sort columns by Booking date | DESC', () => {
        //     bookingListPage.dblClickSortButton('Booking date')

        //     extractTableCellValues()
        //     cy.get('@tableCellValues').then((actualResult) => {
        //         const expectedResult = _.orderBy(actualResult, (obj) => new Date(obj['Booking date']), ['desc'])
        //         expect(actualResult).to.deep.equal(expectedResult)
        //     })
        // });

        // it('Sort columns by Route | ASC', () => {
        //     bookingListPage.clickSortButton('Route')

        //     extractTableCellValues()
        //     cy.get('@tableCellValues').then((actualResult) => {
        //         const expectedResult = _.orderBy(actualResult, (obj) => obj['Route'], ['asc'])
        //         expect(actualResult).to.deep.equal(expectedResult)
        //     })
        // });

        // it('Sort columns by Route | DESC', () => {
        //     bookingListPage.dblClickSortButton('Route')

        //     extractTableCellValues()
        //     cy.get('@tableCellValues').then((actualResult) => {
        //         const expectedResult = _.orderBy(actualResult, (obj) => obj['Route'], ['desc'])
        //         expect(actualResult).to.deep.equal(expectedResult)
        //     })
        // });

        // it('Sort columns by Price | ASC', () => {
        //     bookingListPage.clickSortButton('Price, USD')

        //     extractTableCellValues()
        //     cy.get('@tableCellValues').then((actualResult) => {
        //         const expectedResult = _.orderBy(actualResult, (obj) => Number(obj['Price, USD']), ['asc'])
        //         expect(actualResult).to.deep.equal(expectedResult)
        //     })
        // });

        // it('Sort columns by Price | DESC', () => {
        //     bookingListPage.dblClickSortButton('Price, USD')

        //     extractTableCellValues()
        //     cy.get('@tableCellValues').then((actualResult) => {
        //         const expectedResult = _.orderBy(actualResult, (obj) => Number(obj['Price, USD']), ['desc'])
        //         expect(actualResult).to.deep.equal(expectedResult)
        //     })
        // });

        // it('Sort columns by Departure date | ASC', () => {
        //     bookingListPage.clickSortButton('Departure date')

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
        //     bookingListPage.dblClickSortButton('Departure date')

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

        //     extractTableCellValues()
        //     cy.get('@tableCellValues').then((actualResult) => {
        //         const expectedResult = _.orderBy(actualResult, (obj) => obj['Status'], ['asc'])
        //         expect(actualResult).to.deep.equal(expectedResult)
        //     })
        // });

        // it('Sort columns by Status | DESC', () => {
        //     bookingListPage.dblClickSortButton('Status')

        //     extractTableCellValues()
        //     cy.get('@tableCellValues').then((actualResult) => {
        //         const expectedResult = _.orderBy(actualResult, (obj) => obj['Status'], ['desc'])
        //         expect(actualResult).to.deep.equal(expectedResult)
        //     })
        // });

        // it('Sort columns by Expire | ASC', () => {
        //     bookingListPage.clickSortButton('Expire')

        //     extractTableCellValues()
        //     cy.get('@tableCellValues').then((actualResult) => {
        //         const expectedResult = _.orderBy(actualResult, (obj) => new Date(obj['Expire']), ['asc'])
        //         expect(actualResult).to.deep.equal(expectedResult)
        //     })
        // });

        // it('Sort columns by Expire | DESC', () => {
        //     bookingListPage.dblClickSortButton('Expire')

        //     extractTableCellValues()
        //     cy.get('@tableCellValues').then((actualResult) => {
        //         const expectedResult = _.orderBy(actualResult, (obj) => new Date(obj['Expire']), ['desc'])
        //         expect(actualResult).to.deep.equal(expectedResult)
        //     })
        // });

    });
});

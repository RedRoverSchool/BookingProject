/// <reference types="Cypress" />

const { _ } = Cypress

const getNumberWithRegexp = (str) => {
    const regexp = /-?\d+(\.\d+)?/g;
    const num = str.match(regexp);
    return Number(num);
}

const getValueFromTable = (tr) => tr.toArray().map((el) => el.innerText.split('\t'))
const toNumbers = (elements) => _.map(elements, getNumberWithRegexp)

describe('US_05.14 | Table Functionality', () => {
    const AGENT = Cypress.env('agent');

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        cy.get('a[href="/orders/"] i').click();
    });

    // beforeEach(function () {
    //     cy.fixture('bookingsListPage').then(bookingsListPage => {
    //         this.bookingsListPage = bookingsListPage;
    //     });
    // });

    it('AT_05.14.01 | Sort columns', () => {
        let tableHeaders
        cy
            .get('.table thead tr')
            .then(((tr) => tableHeaders = getValueFromTable(tr).flat()))

        cy
            .get('.table tbody tr')
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

                const expectedResult = _.sortBy(tableCellValues, 'Departure date')
                console.log(tableCellValues, expectedResult)
            })
    });
});

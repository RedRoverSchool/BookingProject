class BookingsListPage {
    getBookingListHeader = () => cy.get('.page-title');
    getPrintButton = () => cy.get('.row .btn-print');
    getPrintButtonIcon = () => cy.get('.row .btn-print i');
    getExcelButton = () => cy.get('.row .btn-excel');

    clickPrintButton() {
        this.clickPrintButton().click();
    };
}
export default BookingsListPage;
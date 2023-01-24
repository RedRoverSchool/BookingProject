class BookingsListPage {
    getBookingListHeader = () => cy.get('.page-title');
    getPrintButton = () => cy.get('.row .btn-print');
    getPrintButtonIcon = () => cy.get('.row .btn-print i');

    clickPrintButton() {
        this.clickPrintButton().click();
    };
}
export default BookingsListPage;
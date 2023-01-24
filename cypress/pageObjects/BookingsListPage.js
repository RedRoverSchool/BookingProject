class BookingsListPage {
    getBookingListHeader = () => cy.get('.page-title');
    getPrintButton = () => cy.get('.row .btn-print');

    clickPrintButton() {
        this.clickPrintButton().click();
    };
}
export default BookingsListPage;
class BookingsListPage {
    getPrintButton = () => cy.get('.row .btn-print');

    clickPrintButton() {
        this.clickPrintButton().click();
    };
}
export default BookingsListPage;
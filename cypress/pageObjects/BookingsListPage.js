class BookingsListPage {
    getBookingListHeader = () => cy.get('.page-title');
    getPrintButton = () => cy.get('.row .btn-print');
    getPrintButtonIcon = () => cy.get('.row .btn-print i');
    getFilterDateTypeDropdown = () => cy.get('.box #filterDateType');
    getCalendarDropdown = () => cy.get('.box #reportrange i');

    clickPrintButton() {
        this.clickPrintButton().click();
    }
    clickFilterDateTypeDropdown() {
        this.getFilterDateTypeDropdown().click()
    }
}
export default BookingsListPage;
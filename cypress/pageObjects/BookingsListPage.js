class BookingsListPage {

    getBookingListHeader = () => cy.get('.page-title');
    getPrintButton = () => cy.get('.row .btn-print');
    getPrintButtonIcon = () => cy.get('.row .btn-print i');
    getExcelButton = () => cy.get('.row .btn-excel');
    getExcelButtonIcon = () => cy.get('.row .btn-excel i');
    getSearchField = () => cy.get('.pull-left input[placeholder="Search"]');
    getBookingIdField = () => cy.get('div #filterTracker');
    getStatusField = () => cy.get('.selection [placeholder="Status"]');
    getRouteField = () => cy.get('div #select2-filterRoute-container');
    getVehicleField = () => cy.get('div #select2-filterVehicle-container');
    getClearLink = () => cy.get('div #filterClear');
    getDateRange = () => cy.get('div #filterDateType');

    clickPrintButton() {
        this.clickPrintButton().click();
    };
}
export default BookingsListPage;
class BookingsListPage {

    getBookingListHeader = () => cy.get('.page-title');

    //Print section
    getPrintButton = () => cy.get('.row .btn-print');
    getPrintButtonIcon = () => cy.get('.row .btn-print i');
    getExcelButton = () => cy.get('.row .btn-excel');
    getExcelButtonIcon = () => cy.get('.row .btn-excel i');
    
    //Search section    
    getSearchField = () => cy.get('.pull-left input[placeholder="Search"]');
    getBookingIdField = () => cy.get('div #filterTracker');
    getStatusField = () => cy.get('.selection [placeholder="Status"]');
    getRouteField = () => cy.get('div #select2-filterRoute-container');
    getVehicleField = () => cy.get('div #select2-filterVehicle-container');
    getClearLink = () => cy.get('div #filterClear');

    //Date filter section
    getDateRangeType = () => cy.get('div #filterDateType');
    getDatesRangeListDefaultValue = () => cy.get('#filterDateType ~ span');
    getDatesRangeListValues = () => cy.get('.ranges ul li');
    
    // Booking list section
    getTableHeaders = () => cy.get('.table thead tr');
    getColumnsSettingButton = () => cy.get('.table-columns-settings-link');
    getColumnsCheckbox = () => cy.get('input[type="checkbox');
    getColumnsOkButton = () => cy.get('.popup-table-columns-settings .btn-success');

    // Methods
    clickPrintButton () {
        this.clickPrintButton().click();
    };

    clickColumnsSettingButton () {
        this.getColumnsSettingButton().click();
    }

    checkColumnsCheckbox (columns) {
        this.getColumnsCheckbox().check(columns);
    }

    uncheckColumnsCheckbox () {
        this.getColumnsCheckbox().uncheck();
    }

    clickColumnsOkButton () {
        this.getColumnsOkButton().click();
    }

    clickClearLink() {
        this.clickClearLink().click();
    };

    clickDatesRangeList() {
        this.getDatesRangeListDefaultValue().click();
    };
        
}

export default BookingsListPage;
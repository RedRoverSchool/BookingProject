import { faker } from '@faker-js/faker';

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
    getDrdnStatusList = () => cy.get('#filterStatus option')
    getListStatusNoResults = () => cy.get('#select2-filterStatus-results li') 
    getDrdnStatus = () => cy.get('.selection textarea')   

    //Date filter section
    getDateRangeType = () => cy.get('div #filterDateType option');
    getDateRangeTypeDefault = () => cy.get('div #filterDateType [selected]');
    getDrdnDatesRangeDefaultValue = () => cy.get('#filterDateType ~ span');
    getDrpdDatesRangeList = () => cy.get('.ranges ul li');
    
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
        this.getClearLink().click();
    };

    clickDatesRangeDropdown() {
        this.getDrdnDatesRangeDefaultValue().click();
    };

    clickDateRangeType() {
        this.getDateRangeTypeDefault().click({force: true});
    };   

    changeStatusesToLowerCase(text){
        return text[0]+text.substring(1, text.length).toLowerCase()
    }

    clickStatusDropDown() {
        this.getDrdnStatus().click({force: true})
    }

    getDate(days) {
        const current = new Date()
        return new Date(current.setDate(current.getDate() + days))
    }
    getDateFromCurrentDDMMMYYYY(days) {
        const date = this.getDate(days)
        const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' }
        return date.toLocaleString('en-US', optionsDate)
            .replace(/(\S{3}).(\d{1,2})(.).(\d{4})/, "$2 $1$3 $4")
    }
   
    typeRandomWordInSearchField(){
        const randomWord = faker.word.adjective(5);

        return this.getSearchField().type(randomWord);
    }
    
}

export default BookingsListPage;
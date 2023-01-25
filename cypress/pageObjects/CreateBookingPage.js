class CreateBookingPage {
    //Elements
    getMainPassengerNameField = () => cy.get('.form-control[name="passenger-name[]"]');
    getMainPassengerPhoneField = () => cy.get('.iti #passenger-phone');
    getCalendarNextButton = () => cy.get('div .calendar-week-next');
    getFirstTripCard = () => cy.get('div .trip:first-child');
    getCreateBookingHeader = () => cy.get('div h1');
    getCalendarDays = () => cy.get('.col-lg-12.calendar-day-selection-wrapper > .day-wrapper');
    getLabelDepartureOnDate = () => cy.get('#label-departure-on #trips-selected-date');
    getLabelCalendar = () => cy.get('div #calendar-week');
    getLabelPassengerDetails = () => cy.get('.passenger-wrapper div.title label');
    getMonthBtn = () => cy.get('.calendar-view-wrapper .calendar-view-month');
    getMonthDropdownList = () => cy.get('.calendar-month-wrapper .form-control option');
    getMonthDropdown = () => cy.get('.col-lg-12 .calendar-month-wrapper');
    getFridayButton = () => cy.get('div .calendar-day-selection-wrapper :nth-child(5)');
    getPassengersDetailsDropdown = () => cy.get('.passenger-wrapper .title select.passengers-amount');
    getSeatSelectionDropdown = () => cy.get('.layout-wrapper .title select.passengers-amount');
    getDepartureStationDropdown = () => cy.get('#select2-departure-container');
    getListDepartureStation = () => cy.get('.select2-results .select2-results__option');
    
    // Methods
    clickCalendarNextButton() {
        this.getCalendarNextButton().click()
    };

    clickFirstTripCard() {
        this.getFirstTripCard().click()
    };

    typeIntoMainPassengerNameField(name) {
        this.getMainPassengerNameField().type(name)
    };

    typeIntoMainPassengerPhoneField(phone) {
        this.getMainPassengerPhoneField().type(phone)
    };

    clickMonthBtn() {
        this.getMonthBtn().click({ forse: true });
    }

    selectMonthDropdownList() {
        this.getMonthDropdownList().select(0);
    }

    clickMonthDropdown() {
        this.getMonthDropdown();
    }

    clickFridayButton() {
        this.getFridayButton().click();
    }

    clickDepartureStationDropdown() {
        this.getDepartureStationDropdown().click()
    };
}
export default CreateBookingPage;
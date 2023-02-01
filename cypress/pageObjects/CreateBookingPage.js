class CreateBookingPage {
    //Elements
    getMainPassengerNameField = () => cy.get('.form-control[name="passenger-name[]"]');
    getMainPassengerPhoneField = () => cy.get('.iti #passenger-phone');
    getCalendarNextButton = () => cy.get('div .calendar-week-next');
    getCalendarPrevButton = () => cy.get('button.calendar-week-prev');
    getFirstTripCard = () => cy.get('div .trip:first-child');
    getTicketsAvailableFirstTripCard = () => cy.get('.trip:first-child span.availability span.num');
    getCreateBookingHeader = () => cy.get('div h1');
    getCalendarDays = () => cy.get('.col-lg-12.calendar-day-selection-wrapper > .day-wrapper');
    getLabelDepartureOnDate = () => cy.get('#label-departure-on #trips-selected-date');
    getLabelCalendar = () => cy.get('div #calendar-week');
    getLabelPassengerDetails = () => cy.get('.passenger-wrapper div.title label');
    getMonthBtn = () => cy.get('.calendar-view-wrapper .calendar-view-month');
    getMonthDropdownList = () => cy.get('select[name="calendar_month"] option');
    getMonthDropdownSelect = () => cy.get('select[name="calendar_month"]');
    getFridayButton = () => cy.get('div .calendar-day-selection-wrapper :nth-child(5)');
    getPassengersDetailsDropdown = () => cy.get('.passenger-wrapper .title select.passengers-amount');
    getPassengersDetailsDropdownList = () => cy.get('.layout-wrapper .title select.passengers-amount option');
    getSeatSelectionDropdown = () => cy.get('.layout-wrapper .title select.passengers-amount');
    getSeatSelectionDropdownList = () => cy.get('.layout-wrapper .title select.passengers-amount option');
    getDepartureStationDropdown = () => cy.get('#select2-departure-container');
    getListDepartureStation = () => cy.get('.select2-results .select2-results__option');
    getWeekButton = () => cy.get('button.calendar-view-week');
    getArrivalStationDropdown = () => cy.get('#select2-destination-container');
    getArrivalStationList = () => cy.get('.select2-results .select2-results__options');
    getPhoneNumberInputFild = () => cy.get('input#passenger-phone');
    getSelectedSeats = () => cy.get('table.seats tr td[class="seat selected"]');    
    getFareTypeDropdown = () => cy.get('[id^=select2-passenger-fare]');
    getFareTypeDropdownList = () => cy.get('label [name="passenger-fare[]"] option');
    getRowsSeatsSeatSection = () => cy.get('.seat-chart .seats tr:not(tr:first-child)');
    getEmailInputField = () => cy.get(':nth-child(4) > .form-control');
    getRowsSeatsSeatSection = () => cy.get('.seat-chart .seats tr:not(tr:first-child)');
    getAmountOfChosenPass = () => cy.get('.box-default .passenger-wrapper .passenger-row');
    getLabelMainPassenger  = () => cy.get('div.passenger-row > label');
    getDepartureStationSelectionDropdown = () => cy.get('select[name="departure"]');
    getArrivalStationSelectionDropdown = () => cy.get('select[name="destination"]');
    getSaturdayButton = () => cy.get('div .calendar-day-selection-wrapper :nth-child(6)');
    getDriverSeat = () => cy.get('table.seats tr td[class="seat blocked"]');  
    
    // Methods
    clickCalendarNextButton() {
        this.getCalendarNextButton().click()
    };

    clickCalendarPrevButton() {
        this.getCalendarPrevButton().click()
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

    clickFridayButton() {
        this.getFridayButton().click();
    }

    clickDepartureStationDropdown() {
        this.getDepartureStationDropdown().click()
    };

    clickArrivalStationDropdown() {
        this.getArrivalStationDropdown().click()
    };    

    clickFareTypeDropdown() {
        this.getFareTypeDropdown().click()
    };

    clickSaturdayButton() {
        this.getSaturdayButton().click();
    };    
}
export default CreateBookingPage; 
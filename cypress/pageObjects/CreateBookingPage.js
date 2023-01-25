class CreateBookingPage {
    //Elements
    getMainPassengerNameField = () => cy.get('.form-control[name="passenger-name[]"]');
    getCalendarNextButton = () => cy.get('div .calendar-week-next');
    getFirstTripCard = () => cy.get('div .trip:first-child');
    getCreateBookingHeader = () => cy.get('div h1');
    getCalendarDaySelectionWrapper = () => cy.get('.col-lg-12.calendar-day-selection-wrapper .day-wrapper');
    getLabelDepartureOnDate = () => cy.get('#label-departure-on #trips-selected-date');
    getLabelCalendarWeek = () => cy.get('.calendar-week-selection-wrapper #calendar-week');
    getLabelPassengerDetails = () => cy.get('.passenger-wrapper div.title label');
    getMonthBtn = () => cy.get('.calendar-view-wrapper .calendar-view-month');
    getMonthDropdownList = () => cy.get('.calendar-month-wrapper .form-control option');
    getMonthDropdown = () => cy.get('.col-lg-12 .calendar-month-wrapper');
    
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

    clickMonthBtn() {
        this.getMonthBtn().click({ forse: true });
    }

    selectMonthDropdownList() {
        this.getMonthDropdownList().select(0);
    }

    clickMonthDropdown() {
        this.getMonthDropdown();
    }
}
export default CreateBookingPage;
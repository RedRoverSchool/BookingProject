class CreateBookingPage {
    //Header
    getCreateBookingHeader = () => cy.get('div h1');

    //Departure/Arrival station
    getDepartureStationDropdown = () => cy.get('#select2-departure-container');
    getListDepartureStation = () => cy.get('.select2-results .select2-results__option');
    getArrivalStationDropdown = () => cy.get('#select2-destination-container');
    getArrivalStationList = () => cy.get('.select2-results .select2-results__options');
    getDepartureStationSelectionDropdown = () => cy.get('select[name="departure"]');
    getArrivalStationSelectionDropdown = () => cy.get('select[name="destination"]');
    getArrivalSearchField = () => cy.get('.select2-search__field');

    //Departure date
    getCalendarNextButton = () => cy.get('div .calendar-week-next');
    getCalendarPrevButton = () => cy.get('button.calendar-week-prev');
    getCalendarDays = () => cy.get('.col-lg-12.calendar-day-selection-wrapper > .day-wrapper');
    getLabelCalendar = () => cy.get('div #calendar-week');
    getMonthBtn = () => cy.get('.calendar-view-wrapper .calendar-view-month');
    getMonthDropdownList = () => cy.get('select[name="calendar_month"] option');
    getMonthDropdownSelect = () => cy.get('select[name="calendar_month"]');
    getFridayButton = () => cy.get('div .calendar-day-selection-wrapper :nth-child(5)');
    getWeekButton = () => cy.get('button.calendar-view-week');
    getSaturdayButton = () => cy.get('div .calendar-day-selection-wrapper :nth-child(6)');

    //Departure on
    getFirstTripCard = () => cy.get('div .trip:first-child');
    getTicketsAvailableFirstTripCard = () => cy.get('.trip:first-child span.availability span.num');
    getLabelDepartureOnDate = () => cy.get('#label-departure-on #trips-selected-date');
    getNumberAllSeatsFirstTripCard = () => cy.get('div .trip:first-child .class')

    //Passengers details
    getMainPassengerNameField = () => cy.get('.form-control[name="passenger-name[]"]');
    getMainPassengerPhoneField = () => cy.get('.iti #passenger-phone');
    getLabelPassengerDetails = () => cy.get('.passenger-wrapper div.title label');
    getPassengersDetailsDropdown = () => cy.get('.passenger-wrapper .title select.passengers-amount');
    getPassengersDetailsDropdownList = () => cy.get('.layout-wrapper .title select.passengers-amount option');
    getPhoneNumberInputFild = () => cy.get('input#passenger-phone');
    getFareTypeDropdown = () => cy.get('[id^=select2-passenger-fare]');
    getMainPassengerFareTypeDropdownList = () => cy.get('div.passenger-row:not(.passenger-add) .div-fare-type select');
    getMainPassengerFareTypeDropdownListOptions = () => cy.get('div.passenger-row:not(.passenger-add) .div-fare-type select option');
    getAddedPassengersFareTypeDropdownLists = () => cy.get('div.passenger-row.passenger-add .div-fare-type select');
    getEmailInputField = () => cy.get(':nth-child(4) > .form-control');
    getAmountOfChosenPass = () => cy.get('.box-default .passenger-wrapper .passenger-row');
    getLabelMainPassenger = () => cy.get('div.passenger-row > label');
    getPlaceholderPassengerName = () => cy.get('input[placeholder="Passenger name"]')
    getPlaceholderPhoneNumber = () => cy.get('[placeholder="Phone number"]')
    getMainPassengerSelectedSeatByDefault = () => cy.get('div[class="col-lg-12 passenger-row"] span[class="seat-number"]')

    getPassengerDetailsAssignedSeats = () => cy.get('span.seat-number')
    //Seat selection
    getSeatSelectionDropdown = () => cy.get('.layout-wrapper .title select.passengers-amount');
    getSeatSelectionDropdownList = () => cy.get('.layout-wrapper .title select.passengers-amount option');
    getSelectedSeats = () => cy.get('table.seats tr td[class="seat selected"]');
    getRowsSeatsSeatSection = () => cy.get('.seat-chart .seats tr:not(tr:first-child)');
    getDriverSeat = () => cy.get('table.seats tr td[class="seat blocked"]');
    getAllSeatsSeatSelection = () => cy.get('.seat-chart .seats td');


    // Summary section 
    getColumnSeatsSummary = () => cy.get('.total-wrapper > div.total-row :nth-child(3)')
    getRowsSummaryList = () => cy.get('.total-wrapper > div.total-row')
    getAmountOfPassengersInSummary = () => cy.get('.box-default .total-wrapper  .total-row')

    //Total - Footer section                  
    getReservationTicketArrow = () => cy.get('.btn-group .caret');
    getReservationTicketButton = () => cy.get('.btn-reserve-tickets');

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

    clickReservationTicketArrow() {
        this.getReservationTicketArrow().click()
    };

    clickReservationTicketButton() {
        this.getReservationTicketButton().click()
    };

    getRandomIndexOfMonth() {

        return this.getMonthDropdownList().then($el => {
            let arrayOfMonth = $el.toArray().map(el => el.innerText);
            let indexOfMonth = Math.floor(Math.random() * arrayOfMonth.length);
            if (indexOfMonth == 0) {
                indexOfMonth++;
            }
            return indexOfMonth;
        });
    };

    selectNeedDepartureStation(nameStation) {
        this.getCreateBookingHeader().click()
        this.clickDepartureStationDropdown()
        this.getListDepartureStation().each(($el) => {
            if ($el.text() == nameStation) {
                cy.wrap($el).click()
            }
        })
    };

    getRandomPassengersAmmount() {
        return this.getPassengersDetailsDropdown().then(($el) => {
            const passengersArray = $el
                .toArray()
                .map(el => el.innerText.split('\n'))
                .join(',').split(',')
            const indexOfPassengersAmmount = Math.floor(Math.random() * passengersArray.length)
            const passengersAmount = passengersArray[indexOfPassengersAmmount]
            return passengersAmount
        })
    };

    getRandomAmountOfPassSeatSelectionDrpDwn() {

        return this.getSeatSelectionDropdownList().then($el => {
            let passengersArray = $el
                .toArray()
                .map(el => el.innerText)

            let indexArr = Math.floor(Math.random() * passengersArray.length)
            let amountOfPass = passengersArray[indexArr]

            return amountOfPass;
        })
    }

    clickWeekBtn() {
        this.getWeekButton().click();
    }
}

export default CreateBookingPage; 
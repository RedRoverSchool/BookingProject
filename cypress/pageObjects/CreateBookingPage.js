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
    getLabelDepartureStation = () => cy.get('.departure-wrapper label')

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
    getLableDepartureDate = () => cy.get('#label-departure-date');
    getDepartureDate = () => cy.get('.popup-trip div:nth-child(5) span');
    getDaySelected = () => cy.get('[class="day-wrapper selected"]');

    //Departure on
    getFirstTripCard = () => cy.get('div .trip:first-child');
    getSecondTridCard = () => cy.get('div .trip:nth-child(2)');
    getTicketsAvailableFirstTripCard = () => cy.get('.trip:first-child span.availability span.num');
    getLabelDepartureOnDate = () => cy.get('#label-departure-on #trips-selected-date');
    getNumberAllSeatsFirstTripCard = () => cy.get('div .trip:first-child .class');
    getPriceOfTicket = () => cy.get('.vehclass-ferry.selected .price');
    getTicketsAvailableFirstTripCard = () => cy.get('.trip:first-child span.availability span.num');
    getDepartureTime = () => cy.get('.popup-trip div:nth-child(6) span');
    getDepartureLatestButton = () => cy.get('button.trips-order-desc');
    getDepartureTripCardsList = () => cy.get('.trips-list-wrapper > div.trip');

    //Arrival on
    getArrivalTime = () => cy.get('.popup-trip div:nth-child(7) span');

    //Passengers details
    getMainPassengerNameField = () => cy.get('.form-control[name="passenger-name[]"]');
    getExtraPassengerNameField = () => cy.get('.form-control[name="passenger-name[]"]:not(.form-control:first-child)')
    getMainPassengerPhoneField = () => cy.get('.iti #passenger-phone');
    getLabelPassengerDetails = () => cy.get('.passenger-wrapper div.title label');
    getPassengersDetailsDropdown = () => cy.get('.passenger-wrapper .title select.passengers-amount');
    getPassengersDetailsDropdownList = () => cy.get('.passenger-wrapper .title select.passengers-amount option');
    getPhoneNumberInputFild = () => cy.get('input#passenger-phone');
    getFareTypeDropdown = () => cy.get('[id^="select2-passenger-fare"]');
    getMainPassengerFareTypeDropdownSelect = () => cy.get('div.passenger-row:not(.passenger-add) .div-fare-type select');
    getMainPassengerFareTypeDropdownList = () => cy.get('div.passenger-row:not(.passenger-add) .div-fare-type select option');
    getAddedPassengersFareTypeDropdownLists = () => cy.get('div.passenger-row.passenger-add .div-fare-type select');
    getAddedPassengerFareTypeDropdownListOptions = () => cy.get('[class="select2-results__options"] li');
    getEmailInputField = () => cy.get(':nth-child(4) > .form-control');
    getAmountOfChosenPass = () => cy.get('.box-default .passenger-wrapper .passenger-row');
    getLabelMainPassenger = () => cy.get('div.passenger-row > label');
    getPlaceholderPassengerName = () => cy.get('input[placeholder="Passenger name"]')
    getPlaceholderPhoneNumber = () => cy.get('[placeholder="Phone number"]')
    getMainPassengerSelectedSeatByDefault = () => cy.get('div[class="col-lg-12 passenger-row"] span[class="seat-number"]')
    getPassengerDetailsAssignedSeats = () => cy.get('span.seat-number')
    getSelectedDialCode = () => cy.get('.iti__selected-dial-code');
    getDialCodeArrow = () => cy.get('.iti__selected-flag')

    //Seat selection
    getSeatSelectionDropdown = () => cy.get('.layout-wrapper .title select.passengers-amount');
    getSeatSelectionDropdownList = () => cy.get('.layout-wrapper .title select.passengers-amount option');
    getSelectedSeats = () => cy.get('table.seats tr td[class="seat selected"]');
    getRowsSeatsSeatSection = () => cy.get('.seat-chart .seats tr:not(tr:first-child)');
    getDriverSeat = () => cy.get('table.seats tr td[class="seat blocked"]');
    getAllSeatsSeatSelection = () => cy.get('.seat-chart .seats td');
    getTitleOfSeatsTable = () => cy.get('.seats tbody th');
    getSeatInRow = () => cy.get('.seat-chart .seats tr:nth-child(2) td');
    getAvailableSeatsSeatSelection = () => cy.get('.seat-chart .available');

    // Summary section 
    getSeatsNumberColumnSummary = () => cy.get('.total-wrapper > div.total-row :nth-child(3)')
    getRowsSummaryList = () => cy.get('.total-wrapper > div.total-row')
    getAmountOfPassengersInSummary = () => cy.get('.box-default .total-wrapper  .total-row')
    getPricesSummaryList = () => cy.get('.total-wrapper > div.total-row span')
    getTotalPriceSummary = () => cy.get('.box-footer span.total-price.right')

    //Total - Footer section                  
    getReservationTicketArrow = () => cy.get('.btn-group .caret');
    getReservationTicketButton = () => cy.get('.btn-reserve-tickets');
    getTotalPrice = () => cy.get('.footer-book-wrapper span.total-price')
    getTotalPriceLabel = () => cy.get('.footer-book-wrapper > :first-child');
    getBookTicketsButton = () => cy.get('[class="btn btn-book"]');
    getResetButton = () => cy.get('[class="btn btn-reset-form"]');

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

    clickSecondTripCard() {
        this.getSecondTridCard().click()
    }

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

    clickDepartureLatestButton() {
        this.getDepartureLatestButton().click({ force: true })
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
                cy.wrap($el).click({ force: true })
            }
        })
    };

    hoverNeedDepartureStation(nameStation) {
        this.getCreateBookingHeader().click({ force: true })
        this.clickDepartureStationDropdown()
        this.getListDepartureStation().each(($el) => {
            if ($el.text() == nameStation) {
                cy.wrap($el).trigger('mouseover')
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

    selectChildFare() {
        this.getAddedPassengerFareTypeDropdownListOptions().each(function ($el) {
            if ($el.text() === 'Child') {
                return cy.wrap($el).click()
            }
        })
    };

    selectAdultFare() {
        this.getAddedPassengerFareTypeDropdownListOptions().each(($el) => {
            if ($el.text() === 'Adult') {
                cy.wrap($el).click()
            }
        })
    };

    selectElderFare() {
        this.getAddedPassengerFareTypeDropdownListOptions().each(function ($el) {
            if ($el.text() === 'Elder') {
                return cy.wrap($el).click()
            }
        })
    };

    completeMultipleNameFields() {
        return this.getMainPassengerNameField().each(($el, index) => {
            let defaultPassengerName = 'Passenger ' + index
            if (index <= 0) {
                cy.wrap($el).type(defaultPassengerName)
            } else if (index <= 1) {
                cy.wrap($el).type(defaultPassengerName)
            } else if (index <= 2) {
                cy.wrap($el).type(defaultPassengerName)
            } else if (index <= 3) {
                cy.wrap($el).type(defaultPassengerName)
            } else if (index <= 4) {
                cy.wrap($el).type(defaultPassengerName)
            } else {
                cy.wrap($el).type(defaultPassengerName)
            }
        })
    }
    clickBookTicketsBtn() {
        this.getBookTicketsButton().click();
    }

    getRequiredDefaulDay_DDFormat() {
        let date = new Date();
        let currentTailandDate = date.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'Asia/Bangkok' });
        let requiredDefaultDay = (+currentTailandDate + 2).toString();
        return requiredDefaultDay;
    }

    getCurrentMonthAndYear() {
        let date = new Date();
        const currentMonthAndYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        return currentMonthAndYear;
    }

    selectAmountPassengersDetailsDropdown(amount) {
        this.getPassengersDetailsDropdown().select(`${amount}`)
    }

    clickCalendarDay(customDay) {
        this.getCalendarDays().contains(customDay).click({ force: true })
    }

}

export default CreateBookingPage; 
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
    getDrdnDatesRangeValue = () => cy.get('#filterDateType ~ span');
    getDrpdDatesRangeList = () => cy.get('.ranges ul li');
    getDrpdDatesRangeThisMonth = () => cy.get('.ranges ul li[data-range-key="This Month"]');
    getDrdnDatesRangeArrow = () => cy.get('.date-box.pull-right .caret');

    // Booking list section
    getTableHeaders = () => cy.get('.table thead tr');
    getTableHeadersColumnsList = () => cy.get('.dataTables_scrollHeadInner .table thead tr th');
    getTableBodyCells = () => cy.get('#data tbody tr td');
    getTableBodyRows = () => cy.get('#data tbody tr');
    getColumnsSettingButton = () => cy.get('.table-columns-settings-link');
    getColumnsCheckbox = () => cy.get('input[type="checkbox');
    getColumnsOkButton = () => cy.get('.popup-table-columns-settings .btn-success');

    // Methods
    clickPrintButton() {
        this.clickPrintButton().click();
    };

    clickColumnsSettingButton() {
        this.getColumnsSettingButton().click();
    }

    checkColumnsCheckbox(columns) {
        this.getColumnsCheckbox().check(columns);
    }

    uncheckColumnsCheckbox() {
        this.getColumnsCheckbox().uncheck();
    }

    clickColumnsOkButton() {
        this.getColumnsOkButton().click();
    }

    clickClearLink() {
        this.getClearLink().click();
    };

    clickDatesRangeDropdown() {
        this.getDrdnDatesRangeValue().click();
    };

    clickDateRangeType() {
        this.getDateRangeTypeDefault().click({ force: true });
    };

    changeStatusesToLowerCase(text) {
        return text[0] + text.substring(1, text.length).toLowerCase()
    }

    clickStatusDropDown() {
        this.getDrdnStatus().click({ force: true })
    }

    getDate(days) {
        const current = new Date()
        return new Date(current.setDate(current.getDate() + days))
    }
    getDateFromCurrentDDMMMYYYY(days) {
        const date = this.getDate(days)
        const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' }
        return date.toLocaleDateString('en-US', optionsDate)
            .replace(/(\S{3}).(\d{1,2})(.).(\d{4})/, "$2 $1$3 $4")
    }

    clickExcelButton() {
        this.getExcelButton().click();
    }

    clickDrdnDatesRangeArrow() {
        this.getDrdnDatesRangeArrow().click()
    }

    getDateYYYYMMDD(date) {
        const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('en-US', optionsDate)
            .replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$1-$2');
    }

    formatteddDatesRangeYYYYMMDD(dates) {
        const [startDate, endDate] = dates.split(' - ');
        const formattedStartDate = this.getDateYYYYMMDD(new Date(startDate));
        const formattedEndDate = this.getDateYYYYMMDD(new Date(endDate));
        return `${formattedStartDate} - ${formattedEndDate}`;
    }

    typeInSearchField(searchWord) {
        this.getSearchField().type(searchWord)
    }

    typeInBookingIDField(searchID) {
        this.getBookingIdField().type(searchID)
    }

    clickDrpdDatesRangeThisMonth() {
        this.getDrpdDatesRangeThisMonth().click()
    }

    /**
      * @returns number days in months
      * monthIndex is index of the month which starts from 0 (January = 0, February = 1 etc..)
    */
    getNumberOfDaysInMonth = (monthIndex, year) => {
        return new Date(year, monthIndex + 1, 0).getDate();
    }

    DD_MMCommaYYYYFormat = (date) => {
        let dateToArray = date.toLocaleString("en-US", { day: 'numeric', month: 'short', year: 'numeric' }).split(' ')
        return dateToArray[1].split(',')[0] + " " + dateToArray[0] + ", " + dateToArray[2]
    }

    /**
      * @returns two given dates in format, ex '10 Mar, 2023 - 12 Mar, 2023'
    */
    formattedDatesRangeDD_MMCommaYYYY(date1, date2) {
        return `${date1} - ${date2}`;
    }

    /**
      * @returns current date in format , ex "10 Mar, 2023"
    */
    currentDD_MMCommaYYYY = () => {
        let now = new Date()
        let currentDate = this.DD_MMCommaYYYYFormat(now)
        return currentDate
    }

    /**
      * @returns current date in format, ex '10 Mar, 2023 - 10 Mar, 2023'
    */
    today = () => {
        let todayFormatted = this.formattedDatesRangeDD_MMCommaYYYY(this.currentDD_MMCommaYYYY(), this.currentDD_MMCommaYYYY())
        return todayFormatted
    }

    /**
      * @returns tommorow's date in format, ex '10 Mar, 2023 - 10 Mar, 2023'
    */
    tommorow = () => {
        let now = new Date()
        now.setDate(now.getDate() + 1)
        let tommorow = this.DD_MMCommaYYYYFormat(now)
        tommorow = this.formattedDatesRangeDD_MMCommaYYYY(tommorow ,tommorow)
        return tommorow
    }

    /**
      * @returns yesterday date in format, ex '10 Mar, 2023 - 10 Mar, 2023'
    */
    yesterday = () => {
        let now = new Date()
        now.setDate(now.getDate() - 1)
        let yesterday = this.DD_MMCommaYYYYFormat(now)
        yesterday = this.formattedDatesRangeDD_MMCommaYYYY(yesterday, yesterday)
        return yesterday
    }

    /**
      * @returns next week dates, starting from tommorow's date - 7 days from current date, in format, ex '12 Mar, 2023 - 18 Mar, 2023'
    */
    nextWeek = () => {
        let now = new Date()
        now.setDate(now.getDate() + 7)
        let nextWeekDays = this.DD_MMCommaYYYYFormat(now)
        nextWeekDays = this.tommorow(this.currentDD_MMCommaYYYY()).split('-')[0] + "- " + nextWeekDays
        return nextWeekDays
    }

    /**
    * @returns date 6 days ago - current date in format, ex '12 Mar, 2023 - 18 Mar, 2023'
    */
    lastWeekDates = () => {
        let now = new Date()
        now.setDate(now.getDate() - 6)
        let lastWeekDays = this.DD_MMCommaYYYYFormat(now)
        lastWeekDays = this.formattedDatesRangeDD_MMCommaYYYY(lastWeekDays, this.currentDD_MMCommaYYYY())
        return lastWeekDays
    }

    /**
      * @returns date 29 days ago - current date, in format, ex '10 Feb, 2023 - 11 Mar, 2023'
    */
    lastThirtyDays = () => {
        let now = new Date()
        now.setDate(now.getDate() - 29)
        let lastThirtyDays = this.DD_MMCommaYYYYFormat(now)
        lastThirtyDays = this.formattedDatesRangeDD_MMCommaYYYY(lastThirtyDays, this.currentDD_MMCommaYYYY())
        return lastThirtyDays
    }

    /**
      * @returns next month dates, starting from the 1st to the last date of the next month, in format, ex '1 Feb, 2023 - 28 Feb, 2023'
    */
    nextMonthDates = () => {
        let now = new Date()
        now.setDate(1)
        now.setMonth(now.getMonth() + 1)
        let indexOfMonth = now.getMonth()
        let nextMonthYear = now.getFullYear()
        let nextMonth = this.DD_MMCommaYYYYFormat(now)
        nextMonth = this.formattedDatesRangeDD_MMCommaYYYY(nextMonth, this.getNumberOfDaysInMonth(indexOfMonth, nextMonthYear) + " " + nextMonth.split(' ')[1] + " " + nextMonth.split(' ')[2])
        return nextMonth
    }

    /**
      * @returns current month dates, starting from the 1st to the last date of the current month, in format, ex '1 Feb, 2023 - 28 Feb, 2023'
    */
    thisMonthDates = () => {
        let now = new Date()
        now.setDate(1)
        let indexOfCurrentMonth = now.getMonth()
        let thisMonthYear = now.getFullYear()
        let thisMonth = this.DD_MMCommaYYYYFormat(now)
        thisMonth = this.formattedDatesRangeDD_MMCommaYYYY(thisMonth, this.getNumberOfDaysInMonth(indexOfCurrentMonth, thisMonthYear) + " " + thisMonth.split(' ')[1] + " " + thisMonth.split(' ')[2])
        return thisMonth
    }

    /**
      * @returns last month dates, starting from the 1st to the last date of the last month, in format, ex '1 Feb, 2023 - 28 Feb, 2023'
    */
    lastMonthDates = () => {
        let now = new Date()
        now.setDate(1)
        now.setMonth(now.getMonth() - 1)
        let indexOfLastMonth = now.getMonth()
        let lastMonthYear = now.getFullYear()
        let lastMonth = this.DD_MMCommaYYYYFormat(now)
        lastMonth = this.formattedDatesRangeDD_MMCommaYYYY(lastMonth, this.getNumberOfDaysInMonth(indexOfLastMonth, lastMonthYear) + " " + lastMonth.split(' ')[1] + " " + lastMonth.split(' ')[2])
        return lastMonth
    }
}

export default BookingsListPage;
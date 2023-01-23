export default class BookingsListPage {
    //elements
    getWeekViewButton = () => cy.get('button.calendar-view-week');
    getMonthViewButton = () => cy.get('button.calendar-view-month');
    getPrevArrow = () => cy.get('div .calendar-week-prev');
    getNextArrow = () => cy.get('div .calendar-week-next');
    getCalendarLabel = () => cy.get('div #calendar-week');

    //methods

    clickWeekViewButton() {
        this.getWeekViewButton().click();
    }
    clickMonthViewButton() {
        this.getMonthViewButton().click();
    }
};

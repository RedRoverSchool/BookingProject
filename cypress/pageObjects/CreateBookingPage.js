class CreateBookingPage {
    //Elements
    getMainPassengerNameField = () => cy.get('.form-control[name="passenger-name[]"]');
    getCalendarNextButton = () => cy.get('div .calendar-week-next');
    getFirstTripCard = () => cy.get('div .trip:first-child');
    getCreateBookingHeader = () => cy.get('div h1')
    
    // Methods
    clickCalendarNextButton() {
        this.getCalendarNextButton().click()
    };

    clickFirstTripCard() {
        this.getFirstTripCard().click()
    };

    typeIntoMainPassengerNameField(name) {
        this.getMainPassengerNameField().type(name)
    }

}
export default CreateBookingPage;
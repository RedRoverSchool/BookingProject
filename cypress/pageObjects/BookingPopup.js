class BookingPopup {
    //Elements

    getConfirmTicketButton = () => cy.get('.btn-confirm-ticket'); 
    getPassengerTitle = () => cy.get('.popup-passengers h3');
    getOnePassengerTypeLabel = () => cy.get('div.passenger-info div:first-child label');
    getPassengersList = () => cy.get('.popup .passengers-box .passenger-info');
    getCloseBtnBookingPopup = () => cy.get('.close-button');

    // methods
    clickCloseBtnBookingPopup() {
        this.getCloseBtnBookingPopup().click()
    }
}
export default BookingPopup;
export class PassengersDetailsSection {
    //Elements
    getMainPassengerField = () => cy.get('.form-control[name="passenger-name[]"]');


    // Methods
    
};


export class DepartureDateSection {
    //Elements
   getCalendarNextButton = () => cy.get('div .calendar-week-next');


    // Methods
    clickCalendarNextButton() {
        this.getCalendarNextButton().click()
    };
};


export class DepartureOnSection {
    //Elements
   getFirstTripCard = () => cy.get('div .trip:first-child');


    // Methods
    clickFirstTripCard() {
        this.getFirstTripCard().click()
    };
};
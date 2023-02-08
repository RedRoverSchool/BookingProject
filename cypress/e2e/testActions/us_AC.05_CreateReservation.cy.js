/// <reference types="Cypress" />

import CreateBookingPage from "../../pageObjects/CreateBookingPage";
import BookingPopup from "../../pageObjects/BookingPopup";

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();

const MANAGER = Cypress.env('manager');
const AGENT = Cypress.env('agent');
const CI = Cypress.env('CI');

function testCreatingReservationForPassengerType(passengerName, dropdownSelection, checkTextOnPassengerTypeLabel) {
    createBookingPage.typeIntoMainPassengerNameField(passengerName);
    createBookingPage.getMainPassengerFareTypeDropdownList().select(dropdownSelection, { force: true });
    createBookingPage.clickReservationTicketArrow();
    createBookingPage.clickReservationTicketButton();

    cy.intercept('/tools/ping/**').as('getPopUp')
    
    cy.wait('@getPopUp').then(({ response }) => {
        expect(response.statusCode).to.eq(200)
        bookingPopup.getConfirmTicketButton().should('be.visible');
        bookingPopup.getPassengerTitle().should('include.text', '(1)');
        bookingPopup.getPassengersList().should('have.length', 1);
        bookingPopup.getOnePassengerTypeLabel().should('have.text', checkTextOnPassengerTypeLabel);
    })
};

describe('US_AC.05 | Create reservation for 1 passenger', () => {

    before(function () {
        cy.cleanCiData(MANAGER.email, MANAGER.password, CI)
    })

    beforeEach(function () {
        cy.visit('/')
        cy.login(AGENT.email, AGENT.password)

        createBookingPage.clickCalendarNextButton();
        createBookingPage.clickFridayButton();

        cy.intercept('/tools/**').as('getTrip')
        cy.wait('@getTrip')

        createBookingPage.clickFirstTripCard();
    });

    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
    });

    it('AT_AC.05.02| Create reservation for 1 passenger - Child', function () {
        testCreatingReservationForPassengerType(this.createBookingPage.inputField.main_passenger.name, 'child', 'Child:')
    });


    it('AT_AC.05.01| Create reservation for 1 passenger - Adult', function () {
        testCreatingReservationForPassengerType(this.createBookingPage.inputField.main_passenger.name,'adult', 'Adult:');
    });


    it('AT_AC.05.03| Create reservation for 1 passenger - Elder', function () {
        testCreatingReservationForPassengerType(this.createBookingPage.inputField.main_passenger.name,'elder', 'Elder:');
    });
});   

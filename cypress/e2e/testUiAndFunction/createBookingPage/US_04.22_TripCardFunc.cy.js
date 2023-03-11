/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import { sortDesc, sortAsc } from "../../../support/utilities/sortArrayByDigit";
import getArray from "../../../support/utilities/getArray";

const createBookingPage = new CreateBookingPage();

describe('US_04.22 | Trip card functionality', { tags: ['smoke', 'regression'] }, () => {
    const AGENT = Cypress.env('agent');
   
    beforeEach(function () {
        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData;
        })
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        cy.intercept('/tools/**').as('getTrip')
        createBookingPage.clickCalendarNextButton()
        cy.wait('@getTrip')   
    });
    
    it('AT_04.22.01 | Verify “Passenger” section displays default selected seat number after selecting trip card', function () {
        createBookingPage.clickFirstTripCard();

        createBookingPage.getMainPassengerSelectedSeatByDefault().then((seat1) => {
            createBookingPage.getSelectedSeats().then((seat2) => {
                expect(seat1.text()).to.equal(seat2.text())
            })
        })
    });

    it('AT_04.22.02 | Verify trip cards are sorted from latest to earliest time of departure if "latest" button is clicked', function () {
        createBookingPage.clickDepartureLatestButton()
        createBookingPage.getDepartureLatestButton().should('have.class', 'selected')
        
        const ordersSequence = []
        createBookingPage.getDepartureTripCardsList().each(($el, i) => {
            cy.wrap($el)
                .invoke('attr', 'style')
                .then((orders) => {
                    ordersSequence.push(orders)

                    let ordersSortedDesc = sortDesc([...ordersSequence])

                    expect(ordersSequence[i]).to.eq(ordersSortedDesc[i])
                })
        })
    });

    it('AT_04.22.04 | Trip cards are filtered by vehicle class "VIP bus 24" selected from trip class dropdown menu (Bangkok Khao San - Phuket Town trip)', function () {
        createBookingPage.selectDepartureStation(this.bookingData.dropdowns.departureStation.stationsNames[2])
        createBookingPage.selectArrivalStation(this.bookingData.dropdowns.arrivalStation.stationsNames[3])
        cy.wait('@getTrip')
        createBookingPage.getTripClassDropdown().select(this.bookingData.tripClass.VIP_Bus)

        createBookingPage.getVehicleClassTripCards().filter(':visible').each(($el) => {
            expect($el.text()).to.eq(this.bookingData.tripClass.VIP_Bus)
        })
    });

    it('AT_04.22.06| Verify when after clicking on the "Earliest" tab, user should the earliest available trip on a left', function() {
        createBookingPage.clickDepartureErliestButton() 
        createBookingPage.clickDepartureErliestButton() 
        
        createBookingPage.getBtnErliest().should('have.class', 'selected')      
        const ordersSequence = []
        createBookingPage.getDepartureTripCardsList().each(($el, i) => {
                cy.wrap($el)
                    .invoke('attr', 'style')
                    .then((orders) => {
                        ordersSequence.push(orders)

                        let ordersSortedAsc = sortAsc([...ordersSequence])

                        expect(ordersSequence[i]).to.eq(ordersSortedAsc[i])
                    })
            })   
    });

    it('AT_04.22.07 | Verify when trip card is selected, “Summary” shows default selected seat number', function() {
        createBookingPage.selectAmountPassengersDetailsDropdown(3)
        createBookingPage.clickTripCard()
        createBookingPage.getLabelSeatSelection()
                    .should('be.visible')
                    .and('have.text', 'Seat selection')
        let seatsSeatSelection
        createBookingPage.getSelectedSeats().then($el => {
            seatsSeatSelection = getArray($el)            
        })
        createBookingPage.getSeatsNumberColumnSummary().then($el => {
            let seatsSummarySelection = getArray($el) 

            expect(seatsSummarySelection).to.deep.eq(seatsSeatSelection)
        })
    });
});

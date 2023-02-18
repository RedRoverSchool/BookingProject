/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import waitForToolsPing from "../../../support/utilities/waitForToolsPing";

const createBookingPage = new CreateBookingPage();

const sortDesc = (array) => array.sort((a, b) => +b.replace(/[^\d+]/g, '') - (+a.replace(/[^\d+]/g, '')))

describe('US_04.22 | Trip card functionality', () => {
    const AGENT = Cypress.env('agent');
   
    beforeEach(function () {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
        createBookingPage.clickCalendarNextButton()
        waitForToolsPing()
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
    });
    
    it('AT_04.22.01 | Verify “Passenger” section displays default selected seat number after selecting trip card', function() {
       
        createBookingPage.clickCalendarNextButton()
        cy.intercept('/tools/**').as('getTrip')
        cy.wait('@getTrip')
        createBookingPage.clickFirstTripCard();

        createBookingPage.getMainPassengerSelectedSeatByDefault().then((seat1) => {
        createBookingPage.getSelectedSeats().then((seat2) => {
              expect(seat1.text()).to.equal(seat2.text())
           })
        })
    })

    it('AT_04.22.02 | Verify trip cards are sorted from latest to earliest time of departure if "latest" button is clicked', function () {
       createBookingPage.clickDepartureLatestButton()
        
        const ordersSequence = []
        createBookingPage.getDepartureTripCardsList().each(($el, i) => {
                cy.wrap($el)
                    .invoke('attr', 'style')
                    .then((orders) => {
                        ordersSequence.push(orders)

                        let ordersSortedDesc = sortDesc(ordersSequence)

                        expect(ordersSequence[i]).to.eq(ordersSortedDesc[i])
                    })
            })   
    })

    it('AT_04.22.04 | Trip cards are filtered by vehicle class "VIP bus 24" selected from trip class dropdown menu', function () {
        createBookingPage.selectDepartureStation(this.createBookingPage.dropdowns.departureStation.stationsNames[2])
        createBookingPage.selectArrivalStation(this.createBookingPage.dropdowns.arrivalStation.stationsNames[3])
        waitForToolsPing()
        createBookingPage.getTripClassDropdown().select(this.createBookingPage.dropdowns.tripClass[0])

        createBookingPage.getVehicleClassTripCards().filter(':visible').each(($el) => {
            expect($el.text()).to.eq(this.createBookingPage.dropdowns.tripClass[0])
        })
    })
});

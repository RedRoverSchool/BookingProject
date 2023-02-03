/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from "../../../pageObjects/BookingPopup";

const createBookingPage = new CreateBookingPage();
const bookingPopup = new BookingPopup();
const AGENT = Cypress.env('agent');

describe('US_04.28 | Seat selection UI and functionality', () => {
    
    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
    });

    before(() => {
        cy.visit('/')
        cy.login(AGENT.email, AGENT.password)
        
        createBookingPage.clickCalendarNextButton()
        createBookingPage.clickFridayButton()
        cy.intercept('/tools/**').as('getTrip')
		cy.wait('@getTrip')
        createBookingPage.clickFirstTripCard()
    });

    it('AT_04.28.02 | "Seat selection dropdown" is visible and displays the amount of passengers, selected in the "Passengers details dropdown"', () => {
        createBookingPage.getPassengersDetailsDropdown().then(($el) => {
            const passengersArray = $el
                .toArray()
                .map(el => el.innerText.split('\n'))
                .join(',').split(',')

            const indexArr = Math.floor(Math.random() * passengersArray.length)
            const passengersAmount = passengersArray[indexArr]
             
            createBookingPage.getPassengersDetailsDropdown()
                .select(passengersAmount)
                .should('have.value', parseInt(passengersAmount))
            
            createBookingPage.getSeatSelectionDropdown()
                .should('be.visible')
                .and('have.value', parseInt(passengersAmount));
        })
    });
    
    it('AT_04.28.06 | In the "Seats table" the seats numbers in the horizontal row start with number of row in order followed by a letter in alphabetical order (1A, 1B, 1C, 2A, 2B, 2C etc.)', function () {
        createBookingPage.getRowsSeatsSeatSection().then($el => {
            const seats = $el.toArray().map(el => el.innerText.split('\t'))

            for (let i = 0; i < seats.length; i++) {
                for (let j = 0; j < seats[i].length; j++) {
                    expect(seats[i][j]).to.eq(`${[i + 1]}${this.createBookingPage.alphabet[j]}`)
                }
            }
        })
    });

    it('AT_04.28.03 | Verify number of default selected seats equals number of selected passengers from passenger details dropdown menu', () => {
        createBookingPage.getPassengersDetailsDropdownList().then(($el) => {
            let amountOfPassengersArray = $el
                .toArray()
                .map($el => $el.innerText)
            
            let index = Math.floor(Math.random() * amountOfPassengersArray.length)
            
            createBookingPage.getPassengersDetailsDropdown()
                .select(index)
                .invoke('val')
                .then((value) => {
                    let chosenNumOfPassengers = +value
                    createBookingPage.getSelectedSeats()
                        .then(($el) => {
                        let defaultNumberOfSelectedSeats = $el.length
                            expect(defaultNumberOfSelectedSeats).to.eq(chosenNumOfPassengers)
                    })
                })
        })
    });

    it('AT_04.28.08 | The total number of seats in the "Seat selection" section is equal the total number of seats in the selected trip', function() {    
        createBookingPage.getNumberAllSeatsFirstTripCard().then($el => {
            let numberAllSeats = $el.text().match(/\d/g).join('')

            createBookingPage.getAllSeatsSeatSelection().then($el => {
                let allSeatsSeatSelection = $el.toArray().length  
                
                expect(+numberAllSeats).to.eql(+allSeatsSeatSelection)
            })           
        })        
            
    });

    it('AT_04.28.07', function() {
        cy.reload()
        createBookingPage.typeIntoMainPassengerNameField(this.createBookingPage.inputField.main_passenger.name)         
        createBookingPage.clickReservationTicketArrow();
        createBookingPage.clickReservationTicketButton();   
        cy.intercept('/tools/ping/**').as('getPopUp')
        cy.wait('@getPopUp')      
        bookingPopup.clickCloseBtnBookingPopup()
        createBookingPage.clickFirstTripCard()

        let availableSeatsSeatSelection
        createBookingPage.getAvailableSeatsSeatSelection().then($el => {
            availableSeatsSeatSelection = $el.toArray().length                 
        })       

        createBookingPage.getTicketsAvailableFirstTripCard().then($el => {
            let availableSeatsSelectedTrip = $el.text()
            
            expect(availableSeatsSeatSelection).to.eq(+availableSeatsSelectedTrip)        
        })    
    });
});

//This describe for trip "Bangkok Khao San - Chonburi"

describe('US_04.28 | Seat selection UI and functionality ("Bangkok Khao San - Chonburi" trip)', () => {
    
    before(function() {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })

        cy.visit('/')
        cy.login(AGENT.email, AGENT.password)
    });

    it('AT_04.28.04 | When choosing "Bangkok Khao San - Chonburi" trip there is blocked for selecting "Driver" seat in the "Seats table", and this item has dashed border', function () {
        
        createBookingPage.getDepartureStationSelectionDropdown()
            .select('Bangkok Khao San', {force: true})
        createBookingPage.getDepartureStationDropdown()
            .should('have.text', this.createBookingPage.dropdowns.departureStation.stationsNames[2])    
        
        createBookingPage.getArrivalStationSelectionDropdown()
            .select('Chonburi', {force: true})
        createBookingPage.getArrivalStationDropdown()
            .should('have.text', this.createBookingPage.dropdowns.arrivalStation.stationsNames[2])     
        
        createBookingPage.clickCalendarNextButton()
        createBookingPage.clickSaturdayButton()
        cy.intercept('/tools/**').as('getTrip')
		cy.wait('@getTrip')
        createBookingPage.clickFirstTripCard()

        createBookingPage.getDriverSeat()
            .should('be.visible')
            .and('have.text', this.createBookingPage.seatSelectionTable.driverSeatText)
            .and('have.css', 'border')
            .and('match', /dashed/)
    });
});

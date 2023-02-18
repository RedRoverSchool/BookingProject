/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import getIntergerMinInclMaxExcl from "../../../support/utilities/getIntergerMinInclMaxExcl";
import BookingPopup from '../../../pageObjects/BookingPopup';
import getArray from "../../../support/utilities/getArray";
import getRandomElementOfArray from "../../../support/utilities/getRandomElementOfArray";
import waitForToolsPing from "../../../support/utilities/waitForToolsPing";

const bookingPopup = new BookingPopup();
const createBookingPage = new CreateBookingPage();

const AGENT = Cypress.env('agent');

describe('US_04.28 | Seat selection UI and functionality', () => {
        
    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
    });

    describe('US_04.28 | Seat selection UI', () => {

        before(() => {
            cy.visit('/')
            cy.login(AGENT.email, AGENT.password)
            
            createBookingPage.clickCalendarNextButton()
            waitForToolsPing()
            createBookingPage.clickFirstTripCard()
        });

        it('AT_04.28.02 | "Seat selection dropdown" is visible and displays the amount of passengers, selected in the "Passengers details dropdown"', () => {
            createBookingPage.getRandomPassengersAmmount().then(($el) => {
                const passengersAmount = $el
                
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

        it('AT_04.28.08 | The total number of seats in the "Seat selection" section is equal the total number of seats in the selected trip', function () {
            createBookingPage.getNumberAllSeatsFirstTripCard().then($el => {
                let numberAllSeats = $el.text().match(/\d/g).join('')
    
                createBookingPage.getAllSeatsSeatSelection().then($el => {
                    let allSeatsSeatSelection = $el.toArray().length
                    
                    expect(+numberAllSeats).to.eql(+allSeatsSeatSelection)
                })
            })
        });

        it('AT_04.28.10 | In the "Seats table" the seats numbers in the vertical row start with one and increase by 1 in each subsequent row, the digit is followed by the same letter (1A, 2A, 3A, 1B, 2B, 3B etc.).', function () {
            createBookingPage.getAllSeatsSeatSelection().then(($el) => {
                let arrayOfSeats = $el
                .toArray()
                .map($el => $el.innerText)
    
                createBookingPage.getSeatInRow().then(($el) => {
                    let lengthOfRow = $el.length
                    let newArray = []
    
                for(let i = 0; i < lengthOfRow; i++){
                    let arr = []
                    for(let j = 0 + i; j < arrayOfSeats.length; j+=lengthOfRow){
                        arr.push(arrayOfSeats[j])   
                    }
                    newArray.push(arr)
                }
                for(let i = 0; i < newArray.length; i++){
                    for(let j = 0; j < newArray[i].length; j++){
                        expect(newArray[i][j]).to.eq(`${[j + 1]}${this.createBookingPage.alphabet[i]}`)
                    }
                }
                })
            })
        });

        context('Trip "Bangkok Khao San - Chonburi"', () => {

            before(() => {
                cy.visit('/')
                cy.login(AGENT.email, AGENT.password)
        
                createBookingPage.selectDepartureStation('Bangkok Khao San')
                        
                createBookingPage.selectArrivalStation('Chonburi')
            
                createBookingPage.clickCalendarNextButton()
                createBookingPage.clickSaturdayButton()
                waitForToolsPing()
                createBookingPage.clickFirstTripCard()
            });
        
            it('AT_04.28.04 | When choosing "Bangkok Khao San - Chonburi" trip there is blocked for selecting "Driver" seat in the "Seats table", and this item has dashed border', function () {
                
                createBookingPage.getDepartureStationDropdown()
                    .should('have.text', this.createBookingPage.dropdowns.departureStation.stationsNames[2])    
                createBookingPage.getArrivalStationDropdown()
                    .should('have.text', this.createBookingPage.dropdowns.arrivalStation.stationsNames[2])     
                
                createBookingPage.getDriverSeat()
                    .should('be.visible')
                    .and('have.text', this.createBookingPage.seatSelectionTable.driverSeatText)
                    .and('have.css', 'border')
                    .and('match', /dashed/)
            });
            
            it('AT_04.28.05 | The title of "Seats table" is visible and matches to the class of the selected trip "VIP bus"', function () {
        
                createBookingPage.getDepartureStationDropdown()
                    .should('have.text', this.createBookingPage.dropdowns.departureStation.stationsNames[2]) 
                createBookingPage.getArrivalStationDropdown()
                    .should('have.text', this.createBookingPage.dropdowns.arrivalStation.stationsNames[2])
                     
                createBookingPage.getTitleOfSeatsTable()
                    .should('be.visible')
                    .and('have.text', this.createBookingPage.seatsTableTitle[0])
            });
        });
    });

    describe('US_04.28 | Seat selection functionality', () => {

        beforeEach(() => {
            cy.visit('/')
            cy.login(AGENT.email, AGENT.password)
            
            createBookingPage.clickCalendarNextButton()
            waitForToolsPing()
            createBookingPage.clickCalendarNextButton()
            waitForToolsPing()
            createBookingPage.clickFirstTripCard()
        });

        it('AT_04.28.03 | Verify number of default selected seats equals number of selected passengers from passenger details dropdown menu', () => {
            createBookingPage.getPassengersDetailsDropdownList().then($el => {
                let numberOfPass = getRandomElementOfArray($el)  
                createBookingPage.getPassengersDetailsDropdown()
                    .select(numberOfPass)
                    .invoke('val').then((value) => {
                        let chosenNumOfPassengers = +value
    
                        createBookingPage.getSelectedSeats()
                            .then(($el) => {
                            let defaultNumberOfSelectedSeats = $el.length
                                expect(defaultNumberOfSelectedSeats).to.eq(chosenNumOfPassengers)
                        })
                    })
            })
        });

        it('AT_04.28.07 | The number of available seats in the "Seat selection" section is equal the number of available seats in the selected trip', function() {      
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

        it('AT_04.28.09 | When unselecting the seat in the "Seats table" in the "Summary" section the red color text "Select seat" appears', function () {
            createBookingPage.getSeatSelectionDropdownList().then($el => {
                let amountOfPass = getRandomElementOfArray($el);
        
                createBookingPage.getSeatSelectionDropdown()
                    .select(amountOfPass)
        
                createBookingPage.getSelectedSeats().then(($el) => {
                    const selectedSeatsArr = getArray($el)
                        
                    let indexOfSeat = Math.floor(Math.random() * selectedSeatsArr.length)
                    let seatNumber = selectedSeatsArr[indexOfSeat]
        
                    createBookingPage.getSelectedSeats()
                        .contains(seatNumber)
                        .click()
                        
                    createBookingPage.getSeatsNumberColumnSummary().then(($el) => {
                        let seatsSummaryArrayAfter = getArray($el)
    
                        expect(seatsSummaryArrayAfter[indexOfSeat]).to.eq(this.createBookingPage.summarySection.seatsColumn.warningText)
                        cy.wrap($el)
                            .contains(this.createBookingPage.summarySection.seatsColumn.warningText)
                            .should('have.class', 'text-red')
    
                        createBookingPage.getAllSeatsSeatSelection()
                            .contains(seatNumber)
                            .click()
                            .should('have.class', 'selected')
                    })
                })
            })
        });

        it('AT_04.28.11 | Verify custom seat selection by window and next two ones in each row for chosen number of passengers watches assigned seats in passenger details section', () => {
            let index = getIntergerMinInclMaxExcl(2, 11)
            createBookingPage.getPassengersDetailsDropdown()
                .select(index)
                .invoke('val').then((value) => {
                    let chosenNumOfPassengers = +value

                    createBookingPage.getSelectedSeats().click({ multiple: true })
                       
                    for (let i = 1; i <= Math.ceil(chosenNumOfPassengers / 3); i++) {
                        createBookingPage.getAllSeatsSeatSelection()
                            .filter('.available')
                            .contains('A')
                            .first().click()
                            .next().click()
                            .next().click()
                    }

                    createBookingPage.getSelectedSeats().then(($el) => {
                        let arrayOfCustomSeletedSeats = $el.text()

                        createBookingPage.getPassengerDetailsAssignedSeats().then(($el) => {
                            let arrayOfAssignedSeats = $el.text()
                            expect(arrayOfAssignedSeats).to.deep.eq(arrayOfCustomSeletedSeats)
                        })
                    })
                })
        });
    
        it.skip('AT_04.28.12 | Verify, that default numbers of the selected seats in the "Seats table" and the numbers of the seats in the "Passenger details" section are equal', function () {
            createBookingPage.getRandomPassengersAmmount().then($el => {
                let passengersAmount = $el;
    
                createBookingPage.getSeatSelectionDropdown()
                    .select(passengersAmount)
    
                createBookingPage.getSelectedSeats().then(($el) => {
                    const selectedSeatsArray = getArray($el)
         
                    createBookingPage.getPassengerDetailsAssignedSeats().then(($el) => {
                    const seatsNumberArray = getArray($el)
         
                    expect(seatsNumberArray).to.deep.eq(selectedSeatsArray)
                    })
                })
            })
        });
    });
});


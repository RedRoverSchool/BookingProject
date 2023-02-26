/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from '../../../pageObjects/BookingPopup';
import getArray from "../../../support/utilities/getArray";
import waitForToolsPing from "../../../support/utilities/waitForToolsPing";

const bookingPopup = new BookingPopup();
const createBookingPage = new CreateBookingPage();

const AGENT = Cypress.env('agent');

const isSameRowSeatsA_B_C = (array) => {
    let check = true
    let expectedString = "ABC"
    for (let i = 0; i < array.length; i += 3) {
        let checkForA_B_C = array.slice(i, i + 3).map(el => el.replace(/^\d/g, '')).join("")
        let checkForSameNumber = new Set(array.slice(i, i + 3).map(el => parseInt(el)))
        check = check && (checkForSameNumber.size == 1) && (checkForA_B_C == expectedString)   
    }
    return check
}


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
            waitForToolsPing()
        });

        it('AT_04.28.01|The section name "Seat selection" is visible', function (){
            createBookingPage.getLabelSeatSelection().should('have.text', this.createBookingPage.seatSelectoinLabel)
        });

        it('AT_04.28.02 | "Seat selection dropdown" is visible and displays the amount of passengers, selected in the "Passengers details dropdown"', function() {
            let passengersAmountBoundaryArray = [this.createBookingPage.validBoundaryValues.minimum,
                                                 this.createBookingPage.validBoundaryValues.nominalValue,
                                                 this.createBookingPage.validBoundaryValues.maximum]
            for(let passengersAmount of passengersAmountBoundaryArray){
                createBookingPage.getPassengersDetailsDropdown()
                    .select(passengersAmount)
                    .should('have.value', parseInt(passengersAmount))
                
                createBookingPage.getSeatSelectionDropdown()
                    .should('be.visible')
                    .and('have.value', parseInt(passengersAmount));
            }
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

        describe('Trip "Bangkok Khao San - Chonburi"', () => {

            before(() => {
                cy.visit('/')
                cy.login(AGENT.email, AGENT.password)
        
                createBookingPage.selectDepartureStation('Bangkok Khao San')
                createBookingPage.selectArrivalStation('Chonburi')
                createBookingPage.clickCalendarNextButton()
                waitForToolsPing()
                createBookingPage.clickSaturdayButton()
                waitForToolsPing()
                createBookingPage.clickFirstTripCard()
                waitForToolsPing()
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

        describe('Testcases without booking/reservation', () => {
            beforeEach(function () {
                cy.visit('/')
                cy.login(AGENT.email, AGENT.password)
        
                createBookingPage.selectDepartureStation(this.createBookingPage.dropdowns.departureStation.stationsNames[7])
                waitForToolsPing()
                createBookingPage.clickCalendarNextButton()
                waitForToolsPing()
                createBookingPage.clickFirstTripCard()
                waitForToolsPing()

            });

            it('AT_04.28.03 | Verify number of default selected seats equals number of selected passengers (2, 150, 299) from passenger details dropdown menu', function ()  {
                let numberOfPassengersArray = [this.createBookingPage.validBoundaryValues.aboveMinimum,
                                              this.createBookingPage.validBoundaryValues.nominalValue,
                                              this.createBookingPage.validBoundaryValues.belowMaximum]
                
                for (let numberOfPassengers of numberOfPassengersArray) {

                    createBookingPage.getPassengersDetailsDropdown()
                        .select(numberOfPassengers)
                    
                        createBookingPage.getSelectedSeats().then(($el) => {
                            let defaultNumberOfSelectedSeats = getArray($el)
                            expect(defaultNumberOfSelectedSeats.length).to.eq(parseInt(numberOfPassengers))
                        })
                }
            });

            it('AT_04.28.09 | When unselecting the seat in the "Seats table" in the "Summary" section the red color text "Select seat" appears', function () {
                let passengersAmountBoundaryArray = [this.createBookingPage.validBoundaryValues.minimum,
                                                     this.createBookingPage.validBoundaryValues.nominalValue,
                                                     this.createBookingPage.validBoundaryValues.maximum]
                for(let passengersAmount of passengersAmountBoundaryArray){
                    createBookingPage.getSeatSelectionDropdown()
                        .select(passengersAmount, { force: true })
            
                    createBookingPage.getSelectedSeats().then(($el) => {
                        const selectedSeatsArr = getArray($el)
                            
                        let indexOfSeat = Math.floor(selectedSeatsArr.length / 2)
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
                            
                            //postcondition
                            createBookingPage.getAllSeatsSeatSelection()
                                .contains(seatNumber)
                                .click()
                                .should('have.class', 'selected')
                        })
                    })
                }
            });

            it('AT_04.28.11 | Verify custom seat selection by window and next two ones in 2 rows for 6 passengers watches assigned seats in passenger details section', function () {
                createBookingPage.getPassengersDetailsDropdown()
                    .select(this.createBookingPage.numberOfPassengers.sixPassengers)
                    .invoke('val').then((value) => {
                        let chosenNumOfPassengers = +value
                     
                        createBookingPage.getSelectedSeats().click({ multiple: true })
                        
                        for (let i = 1; i <= chosenNumOfPassengers / 3; i++) {
                            createBookingPage.getAllSeatsSeatSelection()
                                .filter('.available')
                                .contains('A')
                                .first().click()
                                .next().click()
                                .next().click()
                        }

                        createBookingPage.getSelectedSeats().then(($el) => {
                            let arrayOfCustomSeletedSeats = getArray($el)
                            expect(isSameRowSeatsA_B_C(arrayOfCustomSeletedSeats)).to.be.true
                            expect(arrayOfCustomSeletedSeats.length).to.eq(chosenNumOfPassengers)

                            createBookingPage.getPassengerDetailsAssignedSeats().each(($el, i) => {
                                let assignedSeat = $el.text()
                                expect(assignedSeat).to.eq(arrayOfCustomSeletedSeats[i])
                            })
                        })
                    })
            });
        
            it('AT_04.28.12 | Verify, that default numbers of the selected seats in the "Seats table" and the numbers of the seats in the "Passenger details" section are equal (for 1, 150, 300 passengers)', function () {
                let passengersAmountBoundaryArray = [this.createBookingPage.validBoundaryValues.minimum,
                                                     this.createBookingPage.validBoundaryValues.nominalValue,
                                                     this.createBookingPage.validBoundaryValues.maximum]
                for(let passengersAmount of passengersAmountBoundaryArray){
                    createBookingPage.getSeatSelectionDropdown()
                        .select(passengersAmount, { force: true })
                    createBookingPage.getSelectedSeats().then(($el) => {
                        let selectedSeatsNumbers = getArray($el)
                        expect(selectedSeatsNumbers.length).to.eq(parseInt(passengersAmount))
        
                        createBookingPage.getPassengerDetailsAssignedSeats().then(($el) => {
                            const seatsNumberArray = getArray($el)
                    
                            expect(seatsNumberArray).to.deep.eq(selectedSeatsNumbers)
                        })
                    })
                }
            });
        });

        describe('Testcases with booking/reservation', () => {
           
            beforeEach(() => {
                cy.visit('/')
                cy.login(AGENT.email, AGENT.password)
                
                createBookingPage.clickCalendarNextButton()
                waitForToolsPing()
                createBookingPage.clickCalendarNextButton()
                waitForToolsPing()
                createBookingPage.clickFirstTripCard()
                waitForToolsPing()
            });

            it.skip('AT_04.28.07 | The number of available seats in the "Seat selection" section is equal the number of available seats in the selected trip', function() {      
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
    });
});


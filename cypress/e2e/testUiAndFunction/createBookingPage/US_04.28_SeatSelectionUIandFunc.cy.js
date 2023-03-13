/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import BookingPopup from '../../../pageObjects/BookingPopup';
import getArray from "../../../support/utilities/getArray";

const bookingPopup = new BookingPopup();
const createBookingPage = new CreateBookingPage();

const AGENT = Cypress.env('agent');

describe('US_04.28 | Seat selection UI and functionality', () => {
        
    beforeEach(function () {
        cy.fixture('createBookingPage').then(bookingData => {
            this.bookingData = bookingData;
        });
    });

    describe('US_04.28 | Seat selection UI', { tags: ['smoke'] }, () => {

        before(() => {
            cy.loginWithSession(AGENT.email, AGENT.password);
            cy.visit('/');
            
            createBookingPage.clickCalendarNextButton()
            cy.intercept('/tools/**').as('getTrip')
            cy.wait('@getTrip')
            createBookingPage.clickOnFirstAvailableTripCard()
            createBookingPage.getLabelSeatSelection()
                .should('be.visible')
                .and('have.text', 'Seat selection')
        });

        it('AT_04.28.01 | The section name "Seat selection" is visible', function (){
            createBookingPage.getLabelSeatSelection().should('have.text', this.bookingData.seatSelectoinLabel)
        });

        it('AT_04.28.02 | "Seat selection dropdown" is visible and displays the amount of passengers, selected in the "Passengers details dropdown"', function() {
            let passengersAmountBoundaryArray = [this.bookingData.validBoundaryValues.minimum,
                                                 this.bookingData.validBoundaryValues.nominalValue,
                                                 this.bookingData.validBoundaryValues.maximum]
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
                        expect(seats[i][j]).to.eq(`${[i + 1]}${this.bookingData.alphabet[j]}`)
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
                        expect(newArray[i][j]).to.eq(`${[j + 1]}${this.bookingData.alphabet[i]}`)
                    }
                }
                })
            })
        });

        describe('Trip "Bangkok Khao San - Chonburi"', () => {

            before(() => {
                cy.loginWithSession(AGENT.email, AGENT.password);
                cy.visit('/');
        
                createBookingPage.selectDepartureStation('Bangkok Khao San')
                createBookingPage.selectArrivalStation('Chonburi')
                createBookingPage.clickCalendarNextButton()
                cy.intercept('/tools/**').as('getTrip')
                cy.wait('@getTrip')
                createBookingPage.clickSaturdayButton()
                cy.wait('@getTrip')
                createBookingPage.clickOnFirstAvailableTripCard()
                createBookingPage.getLabelSeatSelection()
                    .should('be.visible')
                    .and('have.text', 'Seat selection')
            });
        
            it('AT_04.28.04 | When choosing "Bangkok Khao San - Chonburi" trip there is blocked for selecting "Driver" seat in the "Seats table", and this item has dashed border', function () {
                
                createBookingPage.getDepartureStationDropdown()
                    .should('have.text', this.bookingData.dropdowns.departureStation.stationsNames[2])    
                createBookingPage.getArrivalStationDropdown()
                    .should('have.text', this.bookingData.dropdowns.arrivalStation.stationsNames[2])     
                
                createBookingPage.getDriverSeat()
                    .should('be.visible')
                    .and('have.text', this.bookingData.seatSelectionTable.driverSeatText)
                    .and('have.css', 'border')
                    .and('match', /dashed/)
            });
            
            it('AT_04.28.05 | The title of "Seats table" is visible and matches to the class of the selected trip "VIP bus"', function () {
        
                createBookingPage.getDepartureStationDropdown()
                    .should('have.text', this.bookingData.dropdowns.departureStation.stationsNames[2]) 
                createBookingPage.getArrivalStationDropdown()
                    .should('have.text', this.bookingData.dropdowns.arrivalStation.stationsNames[2])
                     
                createBookingPage.getTitleOfSeatsTable()
                    .should('be.visible')
                    .and('have.text', this.bookingData.seatsTableTitle[0])
            });
        });
    });

    describe('US_04.28 | Seat selection functionality', () => {

        describe('Testcases without booking/reservation', () => {
            beforeEach(function () {
                cy.cleanData();
                cy.loginWithSession(AGENT.email, AGENT.password);
                cy.visit('/');
        
                createBookingPage.selectDepartureStation(this.bookingData.dropdowns.departureStation.stationsNames[7])
                cy.intercept('/tools/**').as('getTrip')
                cy.wait('@getTrip')
                createBookingPage.clickCalendarNextButton()
                cy.wait('@getTrip')
                createBookingPage.clickOnFirstAvailableTripCard()
                createBookingPage.getLabelSeatSelection()
                    .should('be.visible')
                    .and('have.text', 'Seat selection')

            });

            it('AT_04.28.03 | Verify number of default selected seats equals number of selected passengers (2, 150, 299) from passenger details dropdown menu', { tags: ['smoke'] }, function ()  {
                let numberOfPassengersArray = [this.bookingData.validBoundaryValues.aboveMinimum,
                                              this.bookingData.validBoundaryValues.nominalValue,
                                              this.bookingData.validBoundaryValues.belowMaximum]
                
                for (let numberOfPassengers of numberOfPassengersArray) {

                    createBookingPage.getPassengersDetailsDropdown()
                        .select(numberOfPassengers)
                    
                        createBookingPage.getSelectedSeats().then(($el) => {
                            let defaultNumberOfSelectedSeats = getArray($el)
                            expect(defaultNumberOfSelectedSeats.length).to.eq(parseInt(numberOfPassengers))
                        })
                }
            });

            it('AT_04.28.09 | When unselecting the seat in the "Seats table" in the "Summary" section the red color text "Select seat" appears', { tags: ['smoke'] }, function () {
                let passengersAmountBoundaryArray = [this.bookingData.validBoundaryValues.minimum,
                                                     this.bookingData.validBoundaryValues.nominalValue,
                                                     this.bookingData.validBoundaryValues.maximum]
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
        
                            expect(seatsSummaryArrayAfter[indexOfSeat]).to.eq(this.bookingData.summarySection.seatsColumn.warningText)
                            cy.wrap($el)
                                .contains(this.bookingData.summarySection.seatsColumn.warningText)
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

            it('AT_04.28.11 | Verify custom seat selection by window and next two ones in 2 rows for 6 passengers watches assigned seats in passenger details section', { tags: ['regression'] }, function () {
                createBookingPage.getPassengersDetailsDropdown()
                    .select(this.bookingData.numberOfPassengers.sixPassengers)
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
                            expect(createBookingPage.isSameRowSeatsA_B_C(arrayOfCustomSeletedSeats)).to.be.true
                            expect(arrayOfCustomSeletedSeats.length).to.eq(chosenNumOfPassengers)

                            createBookingPage.getPassengerDetailsAssignedSeats().each(($el, i) => {
                                let assignedSeat = $el.text()
                                expect(assignedSeat).to.eq(arrayOfCustomSeletedSeats[i])
                            })
                        })
                    })
            });
        
            it('AT_04.28.12 | Verify, that default numbers of the selected seats in the "Seats table" and the numbers of the seats in the "Passenger details" section are equal (for 1, 150, 300 passengers)', { tags: ['regression'] }, function () {
                let passengersAmountBoundaryArray = [this.bookingData.validBoundaryValues.minimum,
                                                     this.bookingData.validBoundaryValues.nominalValue,
                                                     this.bookingData.validBoundaryValues.maximum]
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

        describe('Testcases with booking/reservation', { tags: ['smoke'] }, () => {
           
            beforeEach(() => {
                cy.cleanData();
                cy.loginWithSession(AGENT.email, AGENT.password);
                cy.visit('/');         

                cy.intercept('/tools/ping/**').as('getPopUp')
 
            });

            it('AT_04.28.07 | The number of available seats in the "Seat selection" section is equal the number of available seats in the selected trip', function() {                             
                createBookingPage.createBooking(this.bookingData.inputField.main_passenger.name, 4, this.bookingData.dropdowns.fareType.fareTypesNames[1])               
                cy.wait('@getPopUp') 
                bookingPopup.clickCloseBtnBookingPopup()             
                createBookingPage.clickTripCard()
                createBookingPage.getLabelSeatSelection()
                    .should('be.visible')
                    .and('have.text', 'Seat selection')
        
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

    describe('Trip "Bangkok Khao San - Ayutthaya" (economy)',  { tags: ['smoke'] }, () => {
       
        before(() => {
            cy.loginWithSession(AGENT.email, AGENT.password);
            cy.visit('/');
            
            createBookingPage.selectDepartureStation('Bangkok Khao San')
            createBookingPage.selectArrivalStation('Ayutthaya')
            createBookingPage.clickCalendarNextButton()
            cy.intercept('/tools/**').as('getTrip')
            cy.wait('@getTrip')
            createBookingPage.clickOnFirstAvailableTripCard()
        });

        it('AT_04.28.14 | The title of "Seats table" is visible and matches to the class of the selected trip "Economy bus"', function () {
            createBookingPage.getEconomyBusLable()
            .should('be.visible')
            .and('have.text', this.bookingData.tripClass.economBusTitle)
        });
    });
});
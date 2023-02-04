/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import getIntergerMinInclMaxExcl from "../../../support/utilities/getRandomInterger";

const createBookingPage = new CreateBookingPage();
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

    it('AT_04.28.08 | The total number of seats in the "Seat selection" section is equal the total number of seats in the selected trip', function () {
        createBookingPage.getNumberAllSeatsFirstTripCard().then($el => {
            let numberAllSeats = $el.text().match(/\d/g).join('')

            createBookingPage.getAllSeatsSeatSelection().then($el => {
                let allSeatsSeatSelection = $el.toArray().length
                
                expect(+numberAllSeats).to.eql(+allSeatsSeatSelection)
            })
        })
    })
        
        it('AT_04.28.11 | Verify custom seat selection by window and next two ones for chosen number of passengers watches assigned seats in passenger details section', () => {
            createBookingPage.getPassengersDetailsDropdownList().then(($el) => {
                let amountOfPassengersArray = $el
                    .toArray()
                    .map($el => $el.innerText)

                let index = getIntergerMinInclMaxExcl(2,11)

                createBookingPage.getPassengersDetailsDropdown()
                    .select(index)
                    .invoke('val')
                    .then((value) => {
                        let chosenNumOfPassengers = +value

                        createBookingPage.getSelectedSeats().click({ multiple: true })
                       
                        for (let i = 1; i <= Math.ceil(chosenNumOfPassengers/3); i++) {
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
        })            
    })
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

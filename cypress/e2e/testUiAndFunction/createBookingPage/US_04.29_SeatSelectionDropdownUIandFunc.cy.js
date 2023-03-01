/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";
import getArray from "../../../support/utilities/getArray";
import waitForToolsPing from "../../../support/utilities/waitForToolsPing";

const createBookingPage = new CreateBookingPage();

describe('US_04.29 | Seat selection dropdown UI and functionality', () => {

    const AGENT = Cypress.env('agent');
    
    beforeEach(function() {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        });

        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
    });

    before(function() {
        cy.cleanData();
        cy.loginWithSession(AGENT.email, AGENT.password);
        cy.visit('/');
        
        createBookingPage.clickCalendarNextButton()
        waitForToolsPing()
        createBookingPage.clickFirstTripCard()
        waitForToolsPing
    });

    it.skip('AT_04.29.01 | The amount of passengers in the "Seat selection dropdown" is equal the number of available tickets in the selected trip', function() {

        createBookingPage.getTicketsAvailableFirstTripCard().then(($tickets) => {
            const ticketsAvailable = Number($tickets.text())
            
            createBookingPage.getSeatSelectionDropdownList().then(($el) => {
                const passengersAmountArray = getArray($el)
                const passengersAmountAvailable = passengersAmountArray[passengersAmountArray.length - 1]
    
                expect(parseInt(passengersAmountAvailable)).to.equal(ticketsAvailable)
            })
        })
    });

    it('AT_04.29.02 | The list of passengers starts with "1 passenger" and each subsequent element increases by one', function() {
        
        createBookingPage.getSeatSelectionDropdownList().then(($el) => {
            const passengersArray = getArray($el)
                
            if (passengersArray[0] == this.createBookingPage.dropdowns.seatSelection.onePassenger) {
                for (let i = passengersArray.length - 1; i > 0; i--) {
                    expect(passengersArray[i])
                    .to.equal((parseInt(passengersArray[i - 1]) + 1) + ' ' + this.createBookingPage.dropdowns.seatSelection.passengers)
                }
                expect(passengersArray[0]).to.equal(this.createBookingPage.dropdowns.seatSelection.onePassenger)
            }
        })
    });

    it.skip('AT_04.29.03 | When selecting the required amount of passengers the corresponding number of seats in the "Seats table" will be rgb(157, 208, 157) color', function() {
        let passengersAmountBoundaryArray = [this.createBookingPage.validBoundaryValues.minimum,
                                             this.createBookingPage.validBoundaryValues.nominalValue,
                                             this.createBookingPage.validBoundaryValues.maximum]
            
            for(let passengersAmount of passengersAmountBoundaryArray){
                createBookingPage.getSeatSelectionDropdown()
                    .select(passengersAmount, { force: true })
                    .should('have.value', parseInt(passengersAmount))

                createBookingPage.getSelectedSeats().then(($el) => {
                    expect($el).to.have.css('background-color', this.colors.greenSeat)

                    const selectedSeatsArr = getArray($el)
                    const selectedSeats = selectedSeatsArr.length

                expect(selectedSeats).to.equal(parseInt(passengersAmount))   
                })
            }
    });

    it.skip('AT_04.29.04 | The number of passengers in "Seat selection dropdown" is equal the number of passengers is displayed in the "Passengers details dropdown".', function() {
        createBookingPage.getSeatSelectionDropdownList().then(($el) => {
           let arrayOfSeats = $el
               .toArray()
               .map(el => el.innerText.split('\n'))

           let indexOfSeat = Math.floor(Math.random() * arrayOfSeats.length)
           let amountOfPass = arrayOfSeats[indexOfSeat]

           createBookingPage.getSeatSelectionDropdown().select(amountOfPass)

           createBookingPage.getAmountOfChosenPass().then(($el) => {
            let amountOfChoosenPass = $el
                .toArray()
                .map(el => el.innerText)

            expect(parseInt(amountOfPass)).to.eq(amountOfChoosenPass.length)
           })
        }) 
    });

    it.skip('AT_04.29.05 | Verify number of passengers selected in the "Seat selection dropdown" became equal to the number of passengers in the "Summary" section', function () {
             createBookingPage.getRandomAmountOfPassSeatSelectionDrpDwn().then($el => {
                let amountOfPass = $el;

                createBookingPage.getSeatSelectionDropdown().select(amountOfPass)

                createBookingPage.getAmountOfPassengersInSummary().then($el => {
                let amountOfPassengersInSummary = $el
                    .toArray()
                    
                 expect(parseInt(amountOfPass)).to.eq(amountOfPassengersInSummary.length)
             })
         })
    })

    it.skip('AT_04.29.06 |Verify that when you select a random number of passengers in the "Seat Selection" drop down list, it is equal to the number of passengers in the "Passenger Information" drop-down list', function() {
        createBookingPage.getRandomAmountOfPassSeatSelectionDrpDwn().then(($el) => {
            let amountOfPass = $el.split(" ")[0];
            createBookingPage.getSeatSelectionDropdown().select(amountOfPass);
            createBookingPage
                .getPassengersDetailsDropdown()
                .should("have.value", amountOfPass);
        });
    });
});

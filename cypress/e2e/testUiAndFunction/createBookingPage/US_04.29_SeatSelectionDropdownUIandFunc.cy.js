/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

describe('US_04.29 | Seat selection dropdown UI and functionality', () => {

    const AGENT = Cypress.env('agent');
    
    beforeEach(function() {
        cy.visit('/')
        cy.login(AGENT.email, AGENT.password)        
    });

    it('AT_04.29.01 | The amount of passengers in the "Seat selection dropdown" is equal the number of available tickets in the selected trip', () => {
        createBookingPage.clickCalendarNextButton()
        cy.wait(5000)
        createBookingPage.clickFridayButton()
        cy.wait(2000)
        createBookingPage.clickFirstTripCard()

        createBookingPage.getTicketsAvailableFirstTripCard().then(($tickets) => {
            const ticketsAvailable = $tickets.text()

            createBookingPage.getSeatSelectionDropdownList().then(($el) => {
                const passengersArray = $el
                    .toArray()
                    .map(el => el.innerText.split('\n'))
                    .join(',').split(',')
                
                const passengersAmount = parseInt(passengersArray[passengersArray.length - 1])
    
                expect(passengersAmount.toString()).to.equal(ticketsAvailable)
            })
        })
    });
})
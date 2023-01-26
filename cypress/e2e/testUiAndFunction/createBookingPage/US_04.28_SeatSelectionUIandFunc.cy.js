/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

describe('US_04.28 | Seat selection UI and functionality', () => {

    const AGENT = Cypress.env('agent');
    
    beforeEach(function() {
        cy.visit('/')
        cy.login(AGENT.email, AGENT.password)        
    });

    it('AT_04.28.02 | "Seat selection dropdown" is visible and displays the number of passengers, selected in the "Passengers details dropdown"', () => {
        
        createBookingPage.clickCalendarNextButton()
        cy.wait(5000)
        createBookingPage.clickFridayButton()
        createBookingPage.clickFirstTripCard()

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
})

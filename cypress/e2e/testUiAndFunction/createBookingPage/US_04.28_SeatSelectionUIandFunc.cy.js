/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();

describe('US_04.28 | Seat selection UI and functionality', () => {

    const AGENT = Cypress.env('agent');
    
    beforeEach(function() {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })

        cy.visit('/')
        cy.login(AGENT.email, AGENT.password)     
        
        //Precondition                
        createBookingPage.clickCalendarNextButton()
        cy.wait(5000)
        createBookingPage.clickFridayButton()
        cy.wait(2000)
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
    
    it('AT_04.28.06 | In the "Seats table" the seats numbers in the horizontal row start with number of row in order followed by a letter in alphabetical order (1A, 1B, 1C, 2A, 2B, 2C etc.)', function() {
        createBookingPage.getRowsSetsSeatSection().then($el => {
            const seats = $el.toArray().map(el => el.innerText.split('\t'))

            for(let i = 0; i < seats.length; i++) {
                for(let j = 0; j < seats[i].length; j++){
                    expect(seats[i][j]).to.eq(`${[i + 1]}${this.createBookingPage.alphabet[j]}`)
                }
            }            
        })       
    });
})

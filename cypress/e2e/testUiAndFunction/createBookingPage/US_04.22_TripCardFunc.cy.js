/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage"

const createBookingPage = new CreateBookingPage();

describe('US_04.22 | Trip card functionality', () => {
    const AGENT = Cypress.env('agent');

    before(() =>{
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });
    
    it('AT_04.22.01 | Verify “Passenger” section displays default selected seat number after selecting trip card', () => {
        cy.wait(10000)
        createBookingPage.clickFirstTripCard()

        createBookingPage.getMainPassengerSelectedSeatByDefault().then((seat1) => {
        createBookingPage.getSelectedSeats().then((seat2) => {
              expect(seat1.text()).to.equal(seat2.text())
           })
        })
      })
});

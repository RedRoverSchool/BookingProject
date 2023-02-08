/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage"

const createBookingPage = new CreateBookingPage();

describe('US_04.23 | Passengers details default UI', () => {
    const AGENT = Cypress.env('agent');

    before(() =>{
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    beforeEach(function() {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        });
    });  
    
    it('AT_04.23.01 | Verify Passenger details label is visible', () => {
       
        createBookingPage.getLabelPassengerDetails().should('be.visible');
    });

    it('AT_04.23.02 | Verify Main passenger label is visible', () =>{

        createBookingPage.getLabelMainPassenger().should('be.visible');
    });

    it('AT_04.23.03 | Verify passenger name input field has a “Passenger name” text placeholder', function () {
        
        createBookingPage.getPlaceholderPassengerName().should('have.attr', 'placeholder', this.createBookingPage.placeholder.name);
    });

    it('AT_04.23.05 | Verify phone number input field has a “Phone number” text placeholder.', function () {

        createBookingPage.getPlaceholderPhoneNumber().should('have.attr', 'placeholder', this.createBookingPage.placeholder.phone);
    });

    it('AT_04.23.04 | Verify selected dial code is “+66” by default', function () {
        createBookingPage.getSelectedDialCode().should('have.text', this.createBookingPage.dropdowns.dialCode.byDefault);
    });

    it('AT_04.23.06 | Verify dial code selection arrow is present and visible', ()=> {
        
        createBookingPage.getDialCodeArrow().should('be.visible')
    });
});

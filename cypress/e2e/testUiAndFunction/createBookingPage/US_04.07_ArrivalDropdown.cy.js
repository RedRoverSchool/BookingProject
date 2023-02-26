/// <reference types="Cypress" />

import CreateBookingPage from "../../../pageObjects/CreateBookingPage";

const createBookingPage = new CreateBookingPage();
const AGENT = Cypress.env('agent');

describe('US_04.07_Arrival Dropdown UI and functionality ', () => {

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });
    
    beforeEach(function () {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        });
    });

    it('AT_04.07.02 | Verify that after clicking on any space outside of the opened drop-down menu, the drop-down menu will close', function () {
        createBookingPage.clickArrivalStationDropdown();
        createBookingPage.clickArrivalStationDropdown();
        createBookingPage.getArrivalSearchField().should('not.exist');
        createBookingPage.getArrivalStationList().should('not.exist');
    });

    it('AT_04.07.01 | Verify the Arrival station Dropdown Menu is clickable and opens up the dropdown menu', function () {
        createBookingPage.clickArrivalStationDropdown()
        createBookingPage.getArrivalStationList().should('be.visible')
    });

    it('AT_04.07.03 | Verify that the background of the selected item in the Dropdown Menu has gray color (#DDDDDD).', function() {
        createBookingPage.selectNeedArrivalStation(this.createBookingPage.dropdowns.arrivalStation.stationsNames[2])
        createBookingPage.hoverNeedArrivalStation(this.createBookingPage.dropdowns.arrivalStation.stationsNames[1])
        createBookingPage.getArrivalStationList().each($el => {
            if($el.text() == this.createBookingPage.dropdowns.arrivalStation.stationsNames[2]){ 
                              
                expect($el).to.have.css('background-color', this.colors.greyDropdownBack)
            }
        })
    })
})

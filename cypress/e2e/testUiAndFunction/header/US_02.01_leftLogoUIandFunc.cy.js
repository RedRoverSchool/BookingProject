/// <reference types="Cypress" />


import CreateBookingPage from "../../../pageObjects/CreateBookingPage.js";
import Header from "../../../pageObjects/Header.js";
import LeftMenuPanel from "../../../pageObjects/LeftMenuPanel";

const header = new Header();
const createBookingPage = new CreateBookingPage();
const leftMenuPanel = new LeftMenuPanel();

describe('US_02.01 | Left Logo UI and functionality', function() { 
    const AGENT = Cypress.env('agent');

    before(() => {
        cy.visit('/');
        cy.login(AGENT.email, AGENT.password);
    });

    beforeEach(function() {
        cy.fixture('createBookingPage').then(createBookingPage => {
            this.createBookingPage = createBookingPage;
        })
        
        cy.fixture('colors').then(colors => {
            this.colors = colors;
        });
    });

    it('AT_02.01.02 | Verify logo is clickable and redirects to default page', function() {
        leftMenuPanel.clickContactUsIcon();
        header.clickLogoImg();
        createBookingPage
            .getCreateBookingHeader()
            .should('include.text', this.createBookingPage.headers.mainHeaderPage);
    });

    it('AT_02.01.01 | Verify logo is visible UI', function() {
        header.getLogoImg().should('be.visible');
    });

    it('AT_02.01.03 | Verify background color is #00a65a', function() {
        header.getLogoImgBackground().should('have.css', 'background-color', this.colors.greenBookingPage);
    });
})

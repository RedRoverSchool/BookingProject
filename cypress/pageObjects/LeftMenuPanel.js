class LeftMenuPanel {
    elements = {
        getMainElements: () => cy.get('.main-sidebar i'),
        getBookingManagement: () => cy.get('section > ul > li.active > a > i')
    }
}
export default LeftMenuPanel;
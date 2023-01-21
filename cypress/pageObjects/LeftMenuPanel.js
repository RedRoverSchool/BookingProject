class LeftMenuPanel {
    elements = {
        getMainElements: () => cy.get('.main-sidebar i'),
        getBookingManagement: () => cy.get('a[href="/orders/"] i'),
        getMainElementsNames: () => cy.get('.main-sidebar span')
    }
}
export default LeftMenuPanel;
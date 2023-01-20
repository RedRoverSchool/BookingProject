class LeftMenuPanel {
    elements = {
        getMainElements: () => cy.get('.main-sidebar i'),
        getMainElementsNames: () => cy.get('.main-sidebar span')
    }
}
export default LeftMenuPanel;
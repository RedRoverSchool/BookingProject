class LeftMenuPanel {
    getMainElementsIcon = () => cy.get('.main-sidebar i');
    getMainElementsMenuLink = () => cy.get('.main-sidebar span');

    getBookingIcon = () => cy.get('[href="/booking/"] i');
    getBookingMenuLink = () => cy.get('[href="/booking/"] span');
    getBookingManagementIcon = () => cy.get('[href="/orders/"] i');
    getBookingManagementMenuLink = () => cy.get('[href="/orders/"] span');
    getAccountManagementIcon = () => cy.get('[href="/account/"] i');
    getAccountManagementMenuLink = () => cy.get('[href="/account/"] span');
    getContactUsIcon = () => cy.get('[href="/helpdesk/"] i');
    getContactUsMenuLink = () => cy.get('[href="/helpdesk/"] span');    

    //Methods  
    clickBookingManagementIcon() {
        this.getBookingManagementIcon().click()
    }

    clickContactUsIcon() {
        this.getContactUsIcon().click()
    }

    clickBookingIcon() {
        this.getBookingIcon().click()
    }
}
export default LeftMenuPanel;
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
    getAccountManagementLeftIcon = () => cy.get('i.fa.fa-fw.fa-usd');

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

    clickAccountManagementIcon() {
        this.getAccountManagementIcon().click()
    }
}
export default LeftMenuPanel;
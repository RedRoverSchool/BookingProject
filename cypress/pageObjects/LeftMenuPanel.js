class LeftMenuPanel {
    getMainElements = () => cy.get('.main-sidebar i');
    getBookingManagement = () => cy.get('a[href="/orders/"] i');
    getMainElementsNames = () => cy.get('.main-sidebar span');

    getBookingIсonLink = () => cy.get('[href="/booking/"]');
    getBookingNameLink = () => cy.get('[href="/booking/"] span');
    getBookingManagementIсonLink = () => cy.get('[href="/orders/"]');
    getBookingManagementNameLink = () => cy.get('[href="/orders/"] span');
    getAccountManagementIсonLink = () => cy.get('[href="/account/"]');
    getAccountManagementNameLink = () => cy.get('[href="/account/"] span');
    getContactUsIсonLink = () => cy.get('[href="/helpdesk/"]');
    getContactUsNameLink = () => cy.get('[href="/helpdesk/"] span');    

    //Methods  

}
export default LeftMenuPanel;
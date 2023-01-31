class HelpdeskPage {
    getHelpdeskHeader = () => cy.get('.page-title');
    getHelpdeskFilter = () => cy.get('#filterStatus option:selected');
}
export default HelpdeskPage;
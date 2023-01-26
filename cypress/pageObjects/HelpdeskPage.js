class HelpdeskPage {
    getHelpdeskHeader = () => cy.get('.page-title');
    getHelpdeskFilter = () => cy.get('.box #filterStatus');
}
export default HelpdeskPage;
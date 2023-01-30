class HelpdeskPage {
    getHelpdeskHeader = () => cy.get('.page-title');
    getHelpdeskFilter = () => cy.get('#filterStatus > option:nth-child(2)');
}
export default HelpdeskPage;
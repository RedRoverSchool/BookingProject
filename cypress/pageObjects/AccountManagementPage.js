class AccountManagementPage {
    getAccountManagementHeader = () => cy.get('h1.page-title');

    // Credit Balance
    getBalanceAmountOnAccountManagementPage = () => cy.get('span#agent-balance');
}
export default AccountManagementPage;
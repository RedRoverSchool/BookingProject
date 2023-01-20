class StartPage {
    elements = {
        getLoginBtn: () => cy.get('div.inner a.login'),
        getForgotYourPasswordLink: () => cy.get('#loginModal .pull-right a'),
        getEmailInput: () => cy.get('#restoreModal input[placeholder="Email"]'),
        getRestoreBtn: () => cy.get('#restoreModal input[type="submit"]'),
        getMessageAlert: () => cy.get('#restoreModal div.alert')
    };

    clickLoginBtn() {
        this.elements.getLoginBtn().click();
    };

    clickForgotYourPasswordLink() {
        this.elements.getForgotYourPasswordLink().click();
    };

    enterEmail(agentEmail) {
        this.elements.getEmailInput().type(agentEmail, { force: true });
    };

    clickRestoreBtn() {
        this.elements.getRestoreBtn().click();
    };
}
export default StartPage;
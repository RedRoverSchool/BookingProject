class StartPage {
    getLoginBtn = () => cy.get(".login");

    clickLoginBtn() {
        this.getLoginBtn().click()
    };
}

class LoginPopUp extends StartPage {
    getLoginByEmailTab = () => cy.get('[href="#byemail"]');
    getForgotYourPasswordLink = () => cy.get('#loginModal .pull-right a');
    getEmailInput = () => cy.get('#restoreModal input[placeholder="Email"]');
    getRestoreBtn = () => cy.get('#restoreModal input[type="submit"]');
    getMessageAlert = () => cy.get('#restoreModal div.alert');

    clickForgotYourPasswordLink() {
        this.getForgotYourPasswordLink().click();
    };

    enterEmail(agentEmail) {
        this.getEmailInput().type(agentEmail, { force: true });
    };

    clickRestoreBtn() {
        this.getRestoreBtn().click();
    };
}
export default LoginPopUp;

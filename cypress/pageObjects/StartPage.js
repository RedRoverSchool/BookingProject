class StartPage {
    startPageElements = {
        getLoginButton : () => cy.get(".login")
    }

    loginPopupElements = {
        getLoginByEmailTab : () => cy.get('[href="#byemail"]'),
        getEmailInput: () => cy.get('#byemail input[placeholder="Email"]')
    }

    clickLoginButton() {
        this.startPageElements.getLoginButton().click()
    }
}
export default StartPage;
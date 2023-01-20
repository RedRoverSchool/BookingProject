class StartPage {
    startPageElements = {
        loginButton : () => cy.get(".login")
    }

    loginPopupElements = {
        loginByEmailTab : () => cy.get('[href="#byemail"]')
    }

    clickLoginButton() {
        this.startPageElements.loginButton().click()
    }
}
export default StartPage;
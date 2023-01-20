class StartPage {
    startPageElements = {
        getLoginButton : () => cy.get(".login")
    }

    loginPopupElements = {
        getLoginByEmailTab : () => cy.get('[href="#byemail"]')
    }

    clickLoginButton() {
        this.startPageElements.getLoginButton().click()
    }
}
export default StartPage;
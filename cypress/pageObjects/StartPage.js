export class StartPage {
    //Elements

    getLoginButton = () => cy.get(".login")

    //Methods
    
    clickLoginButton() {
        this.getLoginButton().click()
    }
}

 export class LoginPopup {
    //Elements
    
    getLoginByEmailTab = () => cy.get('[href="#byemail"]')


    // Methods
 }
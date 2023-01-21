export default class StartPage {
    
    getLoginButton = () => cy.get(".login")

    //Methods
    
    clickLoginButton() {
        this.getLoginButton().click()
    }
}

 export class LoginPopup extends StartPage {
    getLoginByEmailTab = () => cy.get('[href="#byemail"]')


    // Methods
 }
export class StartPage {
    //Elements

    getLoginButton = () => cy.get(".login")

   

    getRegisterAccountLink = () => cy.get('a[title="Register as agent"]')
    getBackgroungVideo = () => cy.get('video')
    getModalBackdrop = () => cy.get('.modal-backdrop')

    //Methods
    
    clickLoginButton() {
        this.getLoginButton().click()
    }

    clickRegisterAccountLink() {
        this.getRegisterAccountLink().click()
    }
}

export class LoginPopup {
    //Elements
    
    getLoginByEmailTab = () => cy.get('[href="#byemail"]');
    getForgotYourPasswordLink = () => cy.get('#loginModal .pull-right a');
    getEmailInput = () => cy.get('#byemail input[placeholder="Email"]');
    getHeaderTextElement = () => cy.get('.text-center');
    getPasswordLabel = () => cy.get('#byemail div:nth-last-of-type(2) label');
    getHeaderText = () => cy.get('div[style*="padding: 15"] :nth-child(2)');
    getEmailLabel = () => cy.get('#loginModal .tab-content #byemail form div label').first();
    getPasswordInput = () => cy.get('#byemail input[name="password"]');
    getSignInButton = () => cy.get('#byemail input[value="SIGN IN"]');
    getMessageAlert = () => cy.get('div.alert');    


    // Methods

    clickForgotYourPasswordLink() {
        this.getForgotYourPasswordLink().click();
    };
    clickSignInButton() {
        this.getSignInButton().click();
    };    
}

export class RestorePopup {
    //Elements
    
    getEmailInput = () => cy.get('#restoreModal input[placeholder="Email"]');
    getRestoreButton = () => cy.get('#restoreModal input[type="submit"]');
    getMessageAlert = () => cy.get('#restoreModal div.alert');
    getCloseButton = () => cy.get('div#restoreModal .modal-header .close');
    getRestorePopup = () => cy.get('div#restoreModal');


    // Methods

    enterEmail(agentEmail) {
        this.getEmailInput().type(agentEmail, { force: true });
    };

    clickRestoreButton() {
        this.getRestoreButton().click();
    };

    clickCloseButton(){
        this.getCloseButton().click()
    }
}

export class RegisterPopup {
    // Elements

    getRegisterButton = () => cy.get('input[value="Register"]')
    getNameInputField = () => cy.get('input[name="name"]')
    getCompanyInputField = () => cy.get('input[name="company"]')
    getEmailInputField = () => cy.get('input[placeholder="You will get your password by email"]')
    getPhoneInputField = () => cy.get('input[name="phone"]')
    getErrorMessage = () => cy.get('#registerModal .help-block.error')

    // Methods

    clickRegisterButton() {
        this.getRegisterButton().click()
    }

    enterName(name) {
        this.getNameInputField().clear().type(name, {force:true})
    }

    enterCompanyName(companyName) {
        this.getCompanyInputField().clear().type(companyName, {force:true})
    }

    enterEmail(email) {
        this.getEmailInputField().clear().type(email, {force:true})
    }

    enterPhoneNumber(phone) {
        this.getPhoneInputField().clear().type(phone, {force:true})
    }
}
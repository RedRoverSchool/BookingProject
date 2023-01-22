export class StartPage {
    //Elements

    getLoginButton = () => cy.get(".login")
    getRegisterAccountLink = () => cy.get('a[title="Register as agent"]')

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


    // Methods

    clickForgotYourPasswordLink() {
        this.getForgotYourPasswordLink().click();
    };
}

export class RestorePopup {
    //Elements
    
    getEmailInput = () => cy.get('#restoreModal input[placeholder="Email"]');
    getRestoreButton = () => cy.get('#restoreModal input[type="submit"]');
    getMessageAlert = () => cy.get('#restoreModal div.alert');


    // Methods

    enterEmail(agentEmail) {
        this.getEmailInput().type(agentEmail, { force: true });
    };

    clickRestoreButton() {
        this.getRestoreButton().click();
    };
}

export class RegisterPopup {
    // Elements

    getRegisterButton = () => cy.get('input[value="Register"]')
    getNameInputField = () => cy.get('input[name="name"]')
    getCompanyInputField = () => cy.get('input[name="company"]')
    getEmailInputField = () => cy.get('input[placeholder="You will get your password by email"]')
    getPhoneInputField = () => cy.get('input[name="phone"]')
    getErrorMessage = () => cy.get('input~div.help-block.error')

    // Methods

    clickRegisterButton() {
        this.getRegisterButton().click()
    }

    enterName(name) {
        this.enterName().clear().type(name)
    }

    enterCompanyName(companyName) {
        this.getCompanyInputField().clear().type(companyName)
    }

    enterEmail(email) {
        this.getEmailInputField().clear().type(email)
    }

    enterPhoneNumber(phone) {
        this.getPhoneInputField().clear().type(phone)
    }
}
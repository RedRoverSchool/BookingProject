export class StartPage {
    //Elements

    getLoginButton = () => cy.get(".login")
    getRegisterAccountLink = () => cy.get('a[title="Register as agent"]')
    getBackgroundVideo = () => cy.get('video')
    getLogo = () => cy.get('.logo')
    getBackgroundLoginSection = () => cy.get('.inner')

    //Flag icons
    
    getThailandFlagIcon = () => cy.get('a[href="/th"]')
    getUKFlagIcon = () => cy.get('a[href="/en"]')
    getRussiaFlagIcon = () => cy.get('a[href="/ru"]')
    getLogo = () => cy.get('.logo')
    getModalBackdrop = () => cy.get('.modal-backdrop')

    //Methods
    
    clickLoginButton() {
        this.getLoginButton().click()
    }

    clickRegisterAccountLink() {
        this.getRegisterAccountLink().click()
    }
    
    clickThailandFlagIcon() {
        this.getThailandFlagIcon().click()
    }

    clickUKFlagIcon() {
        this.getUKFlagIcon().click()
    }

    clickRussiaFlagIcon() {
        this.getRussiaFlagIcon().click()
    }
}

export class LoginPopup {
    //Elements
    
    getLoginByEmailTab = () => cy.get('[href="#byemail"]');
    getForgotYourPasswordLink = () => cy.get('#loginModal .pull-right a');
    getEmailInput = () => cy.get('#byemail input[placeholder="Email"]');
    getPasswordLabel = () => cy.get('#byemail div:nth-last-of-type(2) label');
    getLoginPopupHeader = () => cy.get('#loginModal h2');
    getEmailLabel = () => cy.get('#byemail :nth-child(3) label');
    getPasswordInput = () => cy.get('#byemail input[name="password"]');
    getByEmailSignInButton = () => cy.get('#byemail input[value="SIGN IN"]');
    getMessageAlert = () => cy.get('div.alert');
    getLoginByPhoneNumberTab = () => cy.get('[href="#byphone"]');
    getPhoneNumberLabel = () => cy.get('#byphone :nth-child(3) .control-label');
    getCloseBtn = () => cy.get('#loginModal .close');
    getCountryCodeLabel = () => cy.get('div[class="col-sm-2 col-xs-4"] label');
    getCountryCodeInput = () => cy.get('#byphone [name="phone1"]');
    getPhoneNumberInput = () => cy.get('#byphone [name="phone2"]');
    getRequestCodeButton = () => cy.get('#byphone [value="REQUEST CODE"]');
    getCodeFromSmsInput = () => cy.get('#step2 [name="code"]');
    getByPhoneSignInButton = () => cy.get('#step2 [value="SIGN IN"]');
    getPhoneNumberInputFieldLabel = () => cy.get('div[class="col-sm-6 col-xs-8"] label')
    getModulFormEntairely =() => cy.get('#loginModal .modal-content')


    // Methods

    clickForgotYourPasswordLink() {
        this.getForgotYourPasswordLink().click({force: true});
    };

    clickByEmailSignInButton() {
        this.getByEmailSignInButton().click();
    };

    clickLoginByPhoneNumberTab() {
        this.getLoginByPhoneNumberTab().click();
    };

    clickCloseBtn() {
        this.getCloseBtn().click();
    };

    enterCountryCode(countryCode) {
        this.getCountryCodeInput().type(countryCode, { force: true });
    };

    enterPhoneNumber(phoneNumber) {
        this.getPhoneNumberInput().type(phoneNumber, { force: true });
    };

    clickRequestCodeButton() {
        this.getRequestCodeButton().click();
    };

    enterCodeFromSms(code) {
        this.getCodeFromSmsInput().type(code, { force: true });
    };

    clickByPhoneSignInButton() {
        this.getByPhoneSignInButton().click();
    };
}

export class RestorePopup {
    //Elements
    
    getEmailInput = () => cy.get('#restoreModal input[placeholder="Email"]');
    getRestoreButton = () => cy.get('#restoreModal input[type="submit"]');
    getMessageAlert = () => cy.get('#restoreModal div.alert');
    getRestorePasswordHeader = () => cy.get('#restoreModal h2');
    getCloseButton = () => cy.get('div#restoreModal .modal-header .close');
    getRestorePopup = () => cy.get('div#restoreModal');
    getRegisterLink = () => cy.get('.form-horizontal .modal-footer .pull-left a');

    // Methods

    enterEmail(agentEmail) {
        this.getEmailInput().type(agentEmail, { force: true });
    };

    clickRestoreButton() {
        this.getRestoreButton().click();
    };

    clickCloseButton(){
        this.getCloseButton().click()
    };

    clickRegisterLink(){
        this.getRegisterLink().click();
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
    getRegisterAgentAccountHeader = () => cy.get('#registerModal h2')
    getForgotYourPasswordLink = () => cy.get('#registerModal .pull-right a')
    getPopupCloseButton = () => cy.get('#registerModal .close')
    getRegisterModalPopup = () => cy.get('div#registerModal')

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

    clickForgotYourPasswordLink() {
        this.getForgotYourPasswordLink().click({force: true});
    };

    clickRegisterPopupCloseButton(){
        this.getPopupCloseButton().click({force: true})
    };
}

export class CongratulationsPopup {
        // Elements

    getCongratulationsHeader = () => cy.get('#registerModal h2')

    
}
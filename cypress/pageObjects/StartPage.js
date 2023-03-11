export class StartPage {
    //Elements

    getLoginButton = () => cy.get(".login");
    getRegisterAccountLink = () => cy.get('a[title="Register as agent"]');
    getBackgroundVideo = () => cy.get('video');
    getLogo = () => cy.get('.logo');
    getBackgroundLoginSection = () => cy.get('.inner');
    getModalBackdrop = () => cy.get('.modal-backdrop');

    //Flag icons
    
    getThailandFlagIcon = () => cy.get('a[href="/th"]');
    getUKFlagIcon = () => cy.get('a[href="/en"]');
    getRussiaFlagIcon = () => cy.get('a[href="/ru"]');

    //Methods
    
    clickLoginButton() {
        this.getLoginButton().click();
    };

    clickRegisterAccountLink() {
        this.getRegisterAccountLink().click();
    };
    
    clickThailandFlagIcon() {
        this.getThailandFlagIcon().click();
    };

    clickUKFlagIcon() {
        this.getUKFlagIcon().click();
    };

    clickRussiaFlagIcon() {
        this.getRussiaFlagIcon().click();
    };
}

export class LoginPopup {
    //Elements
    
    getLoginByEmailTab = () => cy.get('[href="#byemail"]');
    getForgotYourPasswordLink = () => cy.get('#loginModal .pull-right a');
    getRegisterLink = () => cy.get('#loginModal .pull-left a');
    getEmailInput = () => cy.get('#byemail input[placeholder="Email"]');
    getPasswordLabel = () => cy.get('#byemail div:nth-last-of-type(2) label');
    getLoginPopupHeader = () => cy.get('#loginModal h2');
    getEmailLabel = () => cy.get('#byemail :nth-child(3) label');
    getPasswordInput = () => cy.get('#byemail input[name="password"]');
    getByEmailSignInButton = () => cy.get('#byemail input[value="SIGN IN"]');
    getMessageAlert = () => cy.get('div.alert');
    getLoginByPhoneNumberTab = () => cy.get('[href="#byphone"]');
    getPhoneNumberLabel = () => cy.get('#byphone :nth-child(3) .control-label');
    getLoginPopupCloseButton = () => cy.get('#loginModal .close');
    getCountryCodeLabel = () => cy.get('div[class="col-sm-2 col-xs-4"] label');
    getCountryCodeInput = () => cy.get('#byphone [name="phone1"]');
    getPhoneNumberInput = () => cy.get('#byphone [name="phone2"]');
    getRequestCodeButton = () => cy.get('#byphone [value="REQUEST CODE"]');
    getCodeFromSmsInput = () => cy.get('#step2 [name="code"]');
    getByPhoneSignInButton = () => cy.get('#step2 [value="SIGN IN"]');
    getPhoneNumberInputLabel = () => cy.get('div[class="col-sm-6 col-xs-8"] label');
    getLoginPopupModal =() => cy.get('#loginModal .modal-content');
    getEmailErrorMessage = () => cy.get('.alert.alert-danger');
    getNoAccountYet = () => cy.get('#loginModal .pull-left');
  
     
    // Methods

    clickForgotYourPasswordLink() {
        this.getForgotYourPasswordLink().click({force: true});
    };

    clickRegisterLink() {
        this.getRegisterLink().click();
    };

    clickByEmailSignInButton() {
        this.getByEmailSignInButton().click();
    };

    clickLoginByPhoneNumberTab() {
        this.getLoginByPhoneNumberTab().click();
    };

    clickLoginPopupCloseButton() {
        this.getLoginPopupCloseButton().click();
    };

    clickRequestCodeButton() {
        this.getRequestCodeButton().click();
    };

    clickByPhoneSignInButton() {
        this.getByPhoneSignInButton().click();
    };

    enterCountryCode(countryCode) {
        this.getCountryCodeInput().type(countryCode, { force: true });
    };

    enterPhoneNumber(phoneNumber) {
        this.getPhoneNumberInput().type(phoneNumber, { force: true });
    };

    enterCodeFromSms(code) {
        this.getCodeFromSmsInput().type(code, { force: true });
    };

    enterEmail(email) {
        this.getEmailInput().clear().type(email, { force: true });
    };

    enterPassword(password) {
        this.getPasswordInput().clear().type(password, { force: true });
    };
}

export class RestorePopup {
    //Elements
    
    getEmailInput = () => cy.get('#restoreModal input[placeholder="Email"]');
    getRestoreButton = () => cy.get('#restoreModal input[type="submit"]');
    getMessageAlert = () => cy.get('#restoreModal div.alert');
    getRestorePopupHeader = () => cy.get('#restoreModal h2');
    getRestorePopupCloseButton = () => cy.get('div#restoreModal .modal-header .close');
    getRestorePopupModal = () => cy.get('div#restoreModal');
    getRegisterLink = () => cy.get('.form-horizontal .modal-footer .pull-left a');
    getEnterEmailAlert = () => cy.get('div.help-block.error');
    getLoginLink = () => cy.get('.pull-right [title="SIGN IN"]');

    // Methods

    enterEmail(agentEmail) {
        this.getEmailInput().type(agentEmail, { force: true });
    };

    clickRestoreButton() {
        this.getRestoreButton().click();
    };

    clickRestorePopupCloseButton(){
        this.getRestorePopupCloseButton().click();
    };

    clickRegisterLink(){
        this.getRegisterLink().click();
    }
}

export class RegisterPopup {
    // Elements

    getRegisterButton = () => cy.get('input[value="Register"]');
    getNameInput = () => cy.get('input[name="name"]');
    getCompanyInput = () => cy.get('input[name="company"]');
    getEmailInput = () => cy.get('input[placeholder="You will get your password by email"]');
    getPhoneInput = () => cy.get('input[name="phone"]');
    getErrorMessage = () => cy.get('#registerModal .help-block.error');
    getRegisterPopupHeader = () => cy.get('#registerModal h2');
    getForgotYourPasswordLink = () => cy.get('#registerModal .pull-right a');
    getRegisterPopupCloseButton = () => cy.get('#registerModal .close');
    getRegisterPopupModal = () => cy.get('div#registerModal');
    getYourNameLabel = () => cy.get('#registerModal .modal-body div:first-child label');
    getRegisterCongratulationsHeader = () => cy.get('#registerModal .modal-dialog .modal-header h2.text-center');
    getCompanyNameLabel = () => cy.get('#registerModal .modal-body div:nth-child(2) label');
    getEmailLabel = () => cy.get('#registerModal .modal-body div:nth-child(3) label');
    getPhoneLabel = () => cy.get('#registerModal .modal-body div:nth-child(4) label');
    
    // Methods

    clickRegisterButton() {
        this.getRegisterButton().click();
    };

    clickForgotYourPasswordLink() {
        this.getForgotYourPasswordLink().click({force: true});
    };

    clickRegisterPopupCloseButton(){
        this.getRegisterPopupCloseButton().click({force: true});
    };

    enterName(name) {
        this.getNameInput().clear().type(name, {force:true});
    };

    enterCompanyName(companyName) {
        this.getCompanyInput().clear().type(companyName, {force:true});
    };

    enterEmail(email) {
        this.getEmailInput().clear().type(email, {force:true});
    };

    enterPhoneNumber(phone) {
        this.getPhoneInput().clear().type(phone, {force:true});
    };
}

export class CongratulationsPopup {
        // Elements

    getCongratulationsPopupHeader = () => cy.get('#registerModal h2');

    
}
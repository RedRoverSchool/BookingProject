class Header {
//Elements

    getBurgerMenu = () => cy.get('.navbar > [href="#"]');
    getUserDropDownMenu = () => cy.get('.dropdown.user.user-menu');
    getLanguageIcons = () => cy.get('.user-header .user-lang-selection li');
    getLogoImg = () => cy.get('.logo-mini > img');
    getCloseBtn = () => cy.get('div[style="padding: 15px;"] .close');
    getFlagIconEn = () => cy.get('a[href="/lang?l=en"');
    getContactUsIcon = () => cy.get('.sidebar-menu > :nth-child(4) > a');
    getFlagIconEn = () => cy.get('a[href="/lang?l=en"');
    
// methods
    clickBurgerMenu() {
        this.getBurgerMenu().click();
    }

    clickUserDropDownMenu() {
        this.getUserDropDownMenu().click();
    }

    clickLogoImg() {
        this.getLogoImg().click();
    }
    
    clickCloseBtn() {
        this.getCloseBtn().click();
    }

    clickContactUsIcon() {
        this.getContactUsIcon().click();
    }
}
export default Header;
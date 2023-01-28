class Header {
//Elements

    getBurgerMenu = () => cy.get('.navbar > [href="#"]');
    getUserDropDownMenu = () => cy.get('.dropdown.user.user-menu');
    getLanguageIcons = () => cy.get('.user-header .user-lang-selection li');
    getLogoImg = () => cy.get('.logo-mini > img');
    getFlagIconEn = () => cy.get('a[href="/lang?l=en"]');
    getEnvelopeIcon = () => cy.get('[href="/helpdesk"]'); 
    getFlagIconTh = () => cy.get('a[href="/lang?l=th"]');

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

    clickFlagIconTh() {
        this.getFlagIconTh().click();
    }

    clickFlagIconEn() {
        this.getFlagIconEn().click();
    }
}
export default Header;

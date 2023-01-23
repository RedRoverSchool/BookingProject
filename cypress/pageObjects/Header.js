class Header {
//Elements

    getBurgerMenu = () => cy.get('.navbar > [href="#"]');
    getUserDropDownMenu = () => cy.get('.dropdown.user.user-menu');
    getLanguageIcons = () => cy.get('.user-header .user-lang-selection li');
    getLogoImg = () => cy.get('.logo-mini > img');
    getContactUsIcon = () => cy.get('.sidebar-menu > :nth-child(4) > a');
    
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

    clickContactUsIcon() {
        this.getContactUsIcon().click();
    }
}
export default Header;
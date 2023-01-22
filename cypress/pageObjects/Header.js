class Header {

    getBurgerMenu = () => cy.get('.navbar > [href="#"]');
    getUserDropDownMenu = () => cy.get('.dropdown.user.user-menu');
    getLanguageIcons = () => cy.get('.user-header .user-lang-selection li');
    
// methods
    clickBurgerMenu() {
        this.getBurgerMenu().click();
    }

    clickUserDropDownMenu() {
        this.getUserDropDownMenu().click();
    }
}
export default Header;
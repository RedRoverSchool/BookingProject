class Header {
//Elements

    getBurgerMenu = () => cy.get('.navbar > [href="#"]');
    getUserDropDownMenu = () => cy.get('.dropdown.user.user-menu');
    getLanguageIcons = () => cy.get('.user-header .user-lang-selection li');
    getLogoImg = () => cy.get('.logo-mini > img');
    getFlagIconEn = () => cy.get('a[href="/lang?l=en"');
    getEnvelopeIcon = () => cy.get('[href="/helpdesk"]');
    getFlagIconFr = () => cy.get('a[href="/lang?l=fr"]');
    getFlagIconDe = () => cy.get('a[href="/lang?l=de"]');
    getFlagIconEs = () => cy.get('a[href="/lang?l=es"]');
    getFlagIconRu = () => cy.get('a[href="/lang?l=ru"]');
    getFlagIconCn = () => cy.get('a[href="/lang?l=cn"]');
    getFlagIconVi = () => cy.get('a[href="/lang?l=vi"]');
    getFlagIconTh = () => cy.get('a[href="/lang?l=th"]');
    getFlagIconViet = () => cy.get('a[href="/lang?l=vi"]');


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

    clickFlagIconViet() {
        this.getFlagIconViet().click();
    }
}
export default Header;

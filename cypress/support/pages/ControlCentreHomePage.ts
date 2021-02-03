import BasePage from "./BasePage";

export default class ControlCentreHomePage extends BasePage {
    
    public clickOnDocumentManagementButton() {
        cy.wait(1000);
         cy.get(this.selectors.documentManagementButton).should('be.visible').click();
    }
}
import BasePage from "./BasePage";


export default class DocumentManagementPage extends BasePage {
    

    public clickOnUploadButton(){
        cy.wait(5000);
        cy.get(this.selectors.uploadDocumentLink).should('be.visible').click();
    }   
    public enterDocumentNameAndDescription(documentName:string,documentDescription:string) {
        cy.get('#name').should('be.visible').type(documentName);
        cy.get('#description').should('be.visible').type(documentDescription);
    }
}
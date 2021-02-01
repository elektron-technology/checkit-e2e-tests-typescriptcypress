import BasePage from './BasePage';

export default class LoginPage extends BasePage {
    /**
     * Navigates to this page object's URL.
     * 
     * @param timeout in seconds.
     */
    public navigateToThisPage(timeout: number = 10) {
        // Workaround for command timeout on first load.
        cy.visit(this.getUrl(), {
            timeout: timeout * 1000,
            onBeforeLoad: (win: any) => {
                win.sessionStorage.clear();
            }
        });
    }
    
    public enterUsername(text: string): void {
        cy.get(this.selectors.USER_NAME).type(text).should('have.value', text);
    }

    public enterPassword(text: string): void {
        cy.get(this.selectors.PASSWORD).type(text).should('have.value', text);
    }

    public clickLoginButton() {
        cy.get(this.selectors.LOGIN_BUTTON).click();
        cy.wait(2000);
        cy.get(this.selectors.CONTROL_CENTRE_HOMEPAGE).should('be.visible');
    }
}

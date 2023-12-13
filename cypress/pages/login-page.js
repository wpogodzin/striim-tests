// LoginPage(Page Object Module) for testing developer.striim.com

import { testData, urlData } from '../config/config';

class LoginPage {
  
  ///////    Methods ///////

  // Mistake handling when automatically testing(only) 
  // before checking 'https://developer.striim.com/#landing'!!!
  mistakeHandlingWhenValidateLoginWithCorrectCredentials() {
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('s.ui.password.val')) {
        console.log('!!!!!Mistake "s.ui.password.val" is passed');
        return false;
      }
      return true;
    });
  }

  visitLoginPage() {
    cy.visit(urlData.urlLoginPage);
  }

  expectLoginForm() {
    cy.get('.card-content', { timeout: testData.timeOutLoginForm})
      .should('be.visible');
  }

  isVisibleUsername() {
    cy.get('input[name="username"]').should('have.attr', 'type', 'text');
  }

  isInvisiblePassword() {
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  }

  hasLoginRecordLogin() {
    cy.get('button[type="submit"]').should('contain.text', 'Log in');
  }

  setCorrectLoginAndPassword(){
    cy.get('input[name="username"]').type(testData.correctUsername);
    cy.get('input[name="password"]').type(testData.correctPassword);
  }

  clickLogin() {
    cy.get('button[type="submit"]').click();
  }

  checkLandingPageURL() {
    cy.url().should('eq', urlData.urlLandingPage );
  }

  fillUsername(username) {
    cy.get('input[name="username"]').type(username);
  }

  fillPassword(password) {
    cy.get('input[name="password"]').type(password);
  }

  checkErrorMessage() {
    cy.contains('User does not exist, password is incorrect, or is deactivated')
      .should('be.visible');
  }

  stillLoginPage() {
    cy.url().should('eq', urlData.urlLoginPage );
  }

}
export default LoginPage;

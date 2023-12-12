// POM(Page Object Module) for testing developer.striim.com
import {testData,urlData} from '../config/config'
 
class POM {
 
  // Elements for methods

  elements = {

    // Mistake handling when automatically testing(only) 
    // before checking 'https://developer.striim.com/#landing'!!!
    mistakeHandlingWhenValidateLoginWithCorrectCredentials: () => 
      cy.on('uncaught:exception', (err, runnable) => {  
        if(err.message.includes('s.ui.password.val')){
          console.log('!!!!!Mistake "s.ui.password.val" is passed')
          return false;
        }
          return true;
        }),

    visitPage : (url) => cy.visit(url),

    expectLoginForm(timeout) {
      cy.get('.card-content',{timeout}).should('be.visible')
    },
    
    isVisibleUsername : () => cy.get('input[name="username"]')
                                .should('have.attr', 'type', 'text'),

    isInvisiblePassword : () => cy.get('input[name="password"]')
                                  .should('have.attr', 'type', 'password'),

    hasLoginRecordLogin : () => cy.get('button[type="submit"]')
                                  .should('contain.text', 'Log in'),


    fillUsername : (username) => cy.get('input[name="username"]')
                                   .type(username),

    fillPassword :(password) => cy.get('input[name="password"]')
                                  .type(password),

    clickLogin : () => cy.get('button[type="submit"]').click(),

    checkURL : (url) => cy.url().should('eq', url),

    // Wrap a line of text to the first position of the next line !!!
    checkErrorMessage : () => cy.contains('User does not exist, \
password is incorrect, or is deactivated').should('be.visible')
         
  }
  
  // Methods to interact with the login page elements

  visitLoginPageAndExpectLoginForm(){
    this.elements.visitPage(urlData.urlLoginPage)
    this.elements.expectLoginForm(testData.timeOutLoginForm)
  }

  checkLoginFormProperties(){
    this.elements.isVisibleUsername()
    this.elements.isInvisiblePassword()
    this.elements.hasLoginRecordLogin()
  }

  allowTypingIntoLoginForm(){
    this.elements.fillUsername(testData.exampleLogin)
    this.elements.fillPassword(testData.examplePassword) 
  }

  validateLoginWithCorrectCredentials(){

    // Mistake handling when automatically testing(only) 
    // before checking 'https://developer.striim.com/#landing'!!!
    this.elements.mistakeHandlingWhenValidateLoginWithCorrectCredentials()
        
    this.elements.fillUsername(testData.correctUsername)
    this.elements.fillPassword(testData.correctPassword)
    this.elements.clickLogin() 
    this.elements.checkURL(urlData.urlLandingPage)
  }

  showErrorWithInvalidCredentials(){
    this.elements.fillUsername(testData.invalidUsername)
    this.elements.fillPassword(testData.invalidPassword)
    this.elements.clickLogin()
    this.elements.checkErrorMessage()
  }

}

export default new POM()
 

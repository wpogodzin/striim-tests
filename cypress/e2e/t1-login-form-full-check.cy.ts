// t1-login-form-full-check.cy - test initially

import LoginPage from '../pages/login-page'
import ApplicationListPage from '../pages/application-list-page'

const myLoginPage = new LoginPage()
const myApplicationListPage = new ApplicationListPage()

describe('Login form full check', () => {
  
  beforeEach(() => {

    // Visit the login page and expect login form for about 20 sec
    myLoginPage.visitLoginPage()
    myLoginPage.expectLoginForm()

  }) 

    it('fields and button of the form should have properties', () => {

      myLoginPage.isVisibleUsername()
      myLoginPage.isInvisiblePassword()
      myLoginPage.hasLoginRecordLogin()

    }) 

    it('should validate login with correct credentials and\
        redirected to landing page', () => {

      // Mistake handling when automatically testing(only) 
      // before checking 'https://developer.striim.com/#landing'!!!
      myLoginPage.mistakeHandlingWhenValidateLoginWithCorrectCredentials()
       
      myLoginPage.setCorrectLoginAndPassword()
      myLoginPage.clickLogin()
      // Check that site was redirected to landing page if no apps yet
	    myApplicationListPage.isLoadingPageUrl();
    }) 

    it('should show error message if invalid credentials\
        and stay still on login page', () => {

      // Invalid login and password
      myLoginPage.fillUsername('aaa')     // invalid name
      myLoginPage.fillPassword('bbb')     // invalid password
      myLoginPage.clickLogin()
      myLoginPage.checkErrorMessage()
      // Validate that still on login page
      myLoginPage.stillLoginPage() 

    })

})
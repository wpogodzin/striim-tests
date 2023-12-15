// t1-login-form-full-check.cy - test initially

import LoginPage from '../pages/login-page'
import LandingPage from '../pages/landing-page'

describe('Login form full check', () => {

  let myLoginPage // Declare myLoginPage outside beforeEach 
  let myLandingPage // Declare myLandingPage outside beforeEach 
    
  beforeEach(() => {
    
    myLoginPage = new LoginPage()
    myLandingPage = new LandingPage()
    

    // Visit the login page and expect login form for about 20 sec
    myLoginPage.visitLoginPage()
    myLoginPage.expectLoginForm() 

  }) 

    it('1)-fields and button of the form should have properties', () => {

      myLoginPage.isVisibleUsername()
      myLoginPage.isInvisiblePassword()
      myLoginPage.hasLoginRecordLogin()

    }) 

    it('2)-should validate login with correct credentials and\
        redirected to landing page', () => {

      // Mistake handling when automatically testing(only) 
      // before checking 'https://developer.striim.com/#landing'!!!
      myLoginPage.mistakeHandlingWhenValidateLoginWithCorrectCredentials()
       
      myLoginPage.setCorrectLoginAndPassword()
      myLoginPage.clickLogin()
      // Check that site was redirected to landing page if no apps yet
	    myLandingPage.isLandingPageUrl();
    }) 

    it('3)-should show error message if invalid credentials\
        and stay still on login page', () => {

      // Invalid login and password
      myLoginPage.fillUsername('aaa')     // invalid name
      myLoginPage.fillPassword('bbb')     // invalid password
      myLoginPage.clickLogin()
      myLoginPage.checkErrorMessageAboutIncorrectCredentials()
      // Validate that still on login page
      myLoginPage.stillLoginPage() 

    })

    it('4)-should show error message if username is empty ', () => {

      // 1 variant: password is not typed
      myLoginPage.fillUsername('aaa')        // only name is typed
      myLoginPage.clickLogin()
      myLoginPage.checkErrorMessageAboutNotFillingOutAllFields()
      // Validate that still on login page
      myLoginPage.stillLoginPage() 

    })
    
    it('5)-should show error message if password is empty ', () => {

      // 2 variant: name is not typed
      myLoginPage.fillPassword('bbb')        // only password is typed
      myLoginPage.clickLogin()
      myLoginPage.checkErrorMessageAboutNotFillingOutAllFields()
      // Validate that still on login page
      myLoginPage.stillLoginPage() 
    })

    it('6)-should show error message if username and password are empty ', () => {

      // 3 variant: both username & password are not typed 
      myLoginPage.clickLogin()
      myLoginPage.checkErrorMessageAboutNotFillingOutAllFields()
      // Validate that still on login page
      myLoginPage.stillLoginPage()
      myLoginPage.expectLoginForm() 
    })

})
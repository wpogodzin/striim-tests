// t2-right-login-logout.cy.ts - test initially

import LoginPage from '../pages/login-page'
import LandingPage from '../pages/landing-page'

describe('Right login and logout', () => {

  let myLoginPage // Declare myLoginPage outside beforeEach 
  let myLandingPage // Declare myLandingPage outside beforeEach 
    
  beforeEach(() => {
    
    myLoginPage = new LoginPage()
    myLandingPage = new LandingPage
    ()
  
    // Visit the login page and expect login form for about 20 sec
    myLoginPage.visitLoginPage()
    myLoginPage.expectLoginForm() 

  }) 

    it('first part: test 2) from t1 + logout activity(new)', () => {

      // Mistake handling when automatically testing(only) 
      // before checking 'https://developer.striim.com/#landing'!!!
      myLoginPage.mistakeHandlingWhenValidateLoginWithCorrectCredentials()

      // Right login 
      myLoginPage.setCorrectLoginAndPassword()
      myLoginPage.clickLogin()

      // Check that site was redirected to landing page if no apps yet
	    myLandingPage.isLandingPageUrl();

      //Logout activity
      myLoginPage.findLogoutButtonAndClick()
      myLoginPage.stillLoginPageHash()
      myLoginPage.expectLoginForm()  
    }) 

})
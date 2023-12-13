// Under reconstruction)))
import POM from '../pages/loginpage'

describe('Right login and logout of site', () => {
  
  it('should visit login page and expect login form', () => {
    // Visit the login page and expect Login Form for about 15 sec
    POM.visitLoginPageAndExpectLoginForm() 
  }) 

  it('should validate login with correct credentials', () => {
    // Correct login and password
    POM.validateLoginWithCorrectCredentials() 
  }) 

  it('should find logout button, click it and check for final page loaded', () => {
    // Invalid login and password
    POM.findLogoutButtonAndClick()
  }) 
})
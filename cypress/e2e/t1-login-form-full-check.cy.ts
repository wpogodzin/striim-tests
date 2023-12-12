import POM from '../pages/POM'

describe('Login form full check', () => {
  
  beforeEach(() => {
    // Visit the login page and expect Login Form for about 15 sec
    POM.visitLoginPageAndExpectLoginForm() 
  }) 

    it('should display login form and check properties', () => {
      // Ensure that the login and password fields are present
      POM.checkLoginFormProperties()
    }) 

    it('should allow typing into login form', () => {
      // Check if you can type into the username/password fields
      POM.allowTypingIntoLoginForm()
    }) 

    it('should validate login with correct credentials', () => {
      // Correct login and password
      POM.validateLoginWithCorrectCredentials() 
    }) 

    it('should show error with invalid credentials', () => {
      // Invalid login and password
      POM.showErrorWithInvalidCredentials()
    }) 
})
import LoginPage from '../pages/old-loginpage'
const myLoginPage = new LoginPage()

describe('Login form full check', () => {
  
  beforeEach(() => {
    // Visit the login page and expect Login Form for about 15 sec
    myLoginPage.visitLoginPageAndExpectLoginForm() 
  }) 

    it('should display login form and check properties', () => {
      // Ensure that the login and password fields are present
      myLoginPage.checkLoginFormProperties()
    }) 

    it('should allow typing into login form', () => {
      // Check if you can type into the username/password fields
      myLoginPage.allowTypingIntoLoginForm()
    }) 

    it('should validate login with correct credentials', () => {
      // Correct login and password
      myLoginPage.validateLoginWithCorrectCredentials() 
    }) 

    it('should show error with invalid credentials', () => {
      // Invalid login and password
      myLoginPage.showErrorWithInvalidCredentials()
    }) 
})
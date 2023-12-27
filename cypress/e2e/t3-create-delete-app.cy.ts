// t3-create-delete-app.cy.ts - test initially

import LoginPage from '../pages/login-page'
import LandingPage from '../pages/landing-page'
import CreateAppPage from '../pages/create-app-page'
import FlowPage from '../pages/flow-page'
import ApplicationsPage from '../pages/applications-page'

describe('Create new app and delete', () => {

  // Declare variables outside beforeEach 
  let myLoginPage 
  let myLandingPage 
  let myCreateAppPage
  let myFlowPage
  let myApplicationsPage
    
  beforeEach(() => {
    
    myLoginPage = new LoginPage()
    myLandingPage = new LandingPage()
    myCreateAppPage = new CreateAppPage()
    myFlowPage = new FlowPage()
    myApplicationsPage = new ApplicationsPage()


    //// Login Page
    // Visit the login page and expect login form for about 20 sec
    myLoginPage.visitLoginPage()
    myLoginPage.expectLoginForm() 

  }) 

    it('Scheme: correct login - create new app - delete app - logout', () => {

      // Mistake handling when automatically testing(only) 
      // before checking 'https://developer.striim.com/#landing'!!!
      myLoginPage.mistakeHandlingWhenValidateLoginWithCorrectCredentials()

      // Right login 
      myLoginPage.setCorrectLoginAndPassword()
      myLoginPage.clickLogin()


      //// Landing Page
      // Check that site was redirected to landing page if no apps yet
	    myLandingPage.isLandingPageUrl()
    
      // Welcome greeting for user
      myLandingPage.isGreetingWelcomeUserVisible()   
      
      // Click  button to create new app 
      myLandingPage.clickButtonCreateAnApp()


      //// CreateAppPage
      // Check URL for creating new app
      myCreateAppPage.isCreateAppPageUrl()

      // Find element for creating from scratch and click
      myCreateAppPage.findCreatingFromScratchAndClick()

      //Check URL for page where name for new app is typed
      myCreateAppPage.isSlashNameAppPageUrl()
      
      // Convince if Namespace has Username 
      myCreateAppPage.hasNamespaceFieldCorrectUsername()

      //Type name for new app
      myCreateAppPage.typeNewAppName() 
      
      //Click button for submit new app
      myCreateAppPage.submitNewApp()


      //// FlowPage
      
      //Check URL for work with new app :Url is OK, but picture is different
      myFlowPage.isFlowPageUrl()
    
      // Check for the success message after creating the application
      myFlowPage.isMessageAboutCreatedAppVisible()  

      // Instead 'myFlowPage.mouseOverAppsDropdown()' and 
      // 'myFlowPage.findAndClickViewAllApps()' we use 'myFlowPage.myMainMenu.viewAllApps()'
      myFlowPage.myNavigationBarMenu.mouseoverAppsAndViewAllApps()


      //// ApplicationsPage

      // Check if the URL is correct after clicking "View All Apps"
      myApplicationsPage.isApplicationsPageUrl()

      // Click on the right button to see App info in the form of a grid 
      myApplicationsPage.clickGridViewButton() 

      // Click on the dropdown menu button to open the menu
      myApplicationsPage.clickRightElementOfNewAppForDropdownList()

      // Locate and click the "Drop" option in the dropdown menu
      myApplicationsPage.chooseDropFromDropdownListAndClick()
      
      // Click the confirmation button in the "Drop App" modal
      myApplicationsPage.clickConfirmationButtonToDrop()

      // Check for the success message after dropping the application
      myApplicationsPage.isMessageAboutDroppedAppVisible()

      // Check for the presence of the "Add Your First App" heading after successful dropping
      myApplicationsPage.isThereInvitationToAddFirstApp()
    })

})







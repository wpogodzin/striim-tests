// t6-manage-striim-vaults.cy.ts - test initially

import LoginPage from '../pages/login-page'
import LandingPage from '../pages/landing-page'
import VaultsPage from '../pages/vaults-page'

describe('Create new app and delete', () => {

  // Declare variables outside beforeEach 
  let myLoginPage 
  let myLandingPage
  let myVaultsPage
    
  beforeEach(() => {
    
    myLoginPage = new LoginPage()
    myLandingPage = new LandingPage()
    myVaultsPage = new VaultsPage()


    //// Login Page
    // Visit the login page and expect login form for about 20 sec
    myLoginPage.visitLoginPage()
    myLoginPage.expectLoginForm() 

  }) 

    it('Scheme: Login - Managing Vaults - Create Vaultname - Create Vaultvalue - Delete Vaultname', () => {

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
      
      // Search for Vaults in Manage Striim(Navigation Bar Menu) and click
      myLandingPage.myNavigationBarMenu.mouseoverManageStriimAndClickVaults() 


      //// Vaults Page
      // Check that site was redirected to vaults page 
	    myVaultsPage.isVaultsPageUrl()

      // Welcome greeting if no vaults
      myVaultsPage.isGreetingAddYourFirstVaultVisible() 

      // Click button 'Add vault'
      myVaultsPage.clickButtonAddVault()

      // Creating Vault name in 'Add Vault' table 
      myVaultsPage.enterVaultNameForStriimVaultType()

      // Desk 'Vaults' must appear
      myVaultsPage.isDeskVaultsVisible()

      // Click 'Add vault value' button (right side) to start creating Vault value
      myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue()

      // Creating 'Vault value' means filling out all fields in Vaults table
      myVaultsPage.CreatingVaultValue()

      // Delete Vault(name)
      myVaultsPage.deleteVault()

      // Welcome greeting if no vaults
      myVaultsPage.isGreetingAddYourFirstVaultVisible()

    })
    
})







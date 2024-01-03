// t6-manage-striim-vaults.cy.ts - test initially

import LoginPage from '../pages/login-page'
import LandingPage from '../pages/landing-page'
import VaultsPage from '../pages/vaults-page'

import { testData, urlData } from '../config/config-t7'

describe('t6-manage-striim-vaults', () => {

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

    it('CRUD', () => {

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
      myLandingPage.myNavigationBarMenu.clickMenuItem("Manage Striim", "Vaults") 


      //// Vaults Page
      // Check that site was redirected to vaults page 
	    myVaultsPage.isVaultsPageUrl()
      // Welcome greeting if no vaults
      myVaultsPage.isGreetingAddYourFirstVaultVisible()

      //// Creating first Vault name(without Vault value)
      // Click button 'Add vault'(name)
      myVaultsPage.clickButtonAddVaultIfNoVaults() 
      // Creating Vault name in 'Add Vault' table 
      myVaultsPage.enterVaultNameForStriimVaultType(testData.aName0)
      // Clicking 'Confirm' button to Create Vault name
      myVaultsPage.enterCorrectUsernameAndConfirmVaultnameCreating()
      // Desk 'Vaults' must appear
      myVaultsPage.isDeskVaultsVisible()

      //// Creating second Vault name
      // Click button 'Add vault'(name) to create next vault
      myVaultsPage.clickButtonAddVaultToCreateNextVault()
      // Creating Vault name in 'Add Vault' table 
      myVaultsPage.enterVaultNameForStriimVaultType(testData.bName0)
      // Clicking 'Confirm' button to Create Vault name
      myVaultsPage.enterCorrectUsernameAndConfirmVaultnameCreating()
     
      //// Creating first Vault value of second Vault name
      // Click 'Add vault value' button (right side) to start creating Vault value
      myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue(testData.bName0)
      // Creating 'Vault value' means filling out all fields in Vaults table
      myVaultsPage.creatingVaultValue(testData.bName0,testData.bKey0,testData.bValue00)

      //// Manipulation with first Vault value of second Vault name
      // Reading 'Vault value' with bName0 and bKey0
      myVaultsPage.readingVaultValue(testData.bName0,testData.bKey0)
      // Editing 'Vault value' with bName0 and bKey0
      myVaultsPage.editingVaultValue(testData.bName0,testData.bKey0,testData.bValue00new)
      // Deleting 'Vault value' with bName0 and bKey0
      myVaultsPage.deletingVaultValue(testData.bName0,testData.bKey0)

     
      // Delete Vault(name) with aName0
      myVaultsPage.deleteVault(testData.aName0)

       // Delete Vault(name) with bName0
       myVaultsPage.deleteVault(testData.bName0)

      // Welcome greeting if no vaults
      myVaultsPage.isGreetingAddYourFirstVaultVisible()

    })
    
})







// t7-old-crud-vault-values.cy - test initially

import { testData, urlData } from '../config/config-t7-old'
import LandingPage from '../pages/landing-page'
import VaultsPage from '../pages/vaults-page-old'
import LoginPage from '../pages/login-page'



describe('t7-CRUD', () => {

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

      //// Creating  Vault name A(without Vault value)
      // Click button 'Add vault'(name)
      myVaultsPage.clickButtonAddVaultIfNoVaults() 
      // Creating Vault name in 'Add Vault' table 
      myVaultsPage.enterVaultNameForStriimVaultType(testData.aName0)
      // Clicking 'Confirm' button to Create Vault name
      myVaultsPage.enterCorrectUsernameAndConfirmVaultnameCreating()
      // Desk 'Vaults' must appear
      myVaultsPage.isDeskVaultsVisible()

      //// Creating  Vault name B
      // Click button 'Add vault'(name) to create next vault
      myVaultsPage.clickButtonAddVaultToCreateNextVault()
      // Creating Vault name in 'Add Vault' table 
      myVaultsPage.enterVaultNameForStriimVaultType(testData.bName0)
      // Clicking 'Confirm' button to Create Vault name
      myVaultsPage.enterCorrectUsernameAndConfirmVaultnameCreating()
     
      //// Creating 0 Vault value of  Vault name B
      // Click 'Add vault value' button (right side) to start creating Vault value
      myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue(testData.bName0)
      // Creating 'Vault value' means filling out all fields in Vaults table
      myVaultsPage.creatingVaultValue(testData.bName0,testData.bKey0,testData.bValue00)

      //// Creating first Vault value of  Vault name B
      // Click 'Add vault value' button (right side) to start creating Vault value
      myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue(testData.bName0)
      // Creating 'Vault value' means filling out all fields in Vaults table
      myVaultsPage.creatingVaultValue(testData.bName0,testData.bKey1,testData.bValue01)

      //// Manipulation with 1 Vault value of  Vault name B
      // Reading 'Vault value' with bName0 and bKey0
      myVaultsPage.readingVaultValue(testData.correctUsername,testData.bName0,testData.bKey1)
      // Editing 'Vault value' with bName0 and bKey1
      myVaultsPage.editingVaultValue(testData.correctUsername,testData.bName0,testData.bKey1,testData.bValue01new)

      /*
      //// Manipulation with 0 Vault value of  Vault name B
      // Reading 'Vault value' with bName0 and bKey0
      myVaultsPage.readingVaultValue(testData.bName0,testData.bKey0)
      // Editing 'Vault value' with bName0 and bKey0
      myVaultsPage.editingVaultValue(testData.bName0,testData.bKey0,testData.bValue00new)
      */
      // Deleting 'Vault value' with bName0 and bKey0
      myVaultsPage.deletingVaultValue(testData.correctUsername,testData.bName0,testData.bKey0)
      

      

     
      // Delete Vault(name) with aName0
      myVaultsPage.deleteVault(testData.aName0)

       // Delete Vault(name) with bName0
       myVaultsPage.deleteVault(testData.bName0)

      // Welcome greeting if no vaults
      myVaultsPage.isGreetingAddYourFirstVaultVisible()
    
    })
    
})






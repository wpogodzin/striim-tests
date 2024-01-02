// t6-manage-striim-vaults.cy.ts - test initially

import LoginPage from '../pages/login-page'
import LandingPage from '../pages/landing-page'
import VaultsPage from '../pages/vaults-page'

import { testData, urlData } from '../config/config'

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

    it('Scheme: login - managing vaults - create vaultname \
    - add(+read,+delete) vaultvalue - delete vaultname', () => {

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

      // Click button 'Add vault'(name)
      myVaultsPage.clickButtonAddVaultIfNoVaults()
 
      // Creating Vault name in 'Add Vault' table 
      myVaultsPage.enterVaultNameForStriimVaultType(testData.vaultName1)

      // Clicking 'Confirm' button to Create Vault name
      myVaultsPage.enterCorrectUsernameAndConfirmVaultnameCreating()

      // Desk 'Vaults' must appear
      myVaultsPage.isDeskVaultsVisible()
 
      ////CRUD
      // Click 'Add vault value' button (right side) to start creating Vault value
      myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue()
      // Creating 'Vault value' means filling out all fields in Vaults table
      myVaultsPage.creatingVaultValue(testData.vaultName1,testData.vaultKey1,testData.vaultValue1)

      // Reading 'Vault value' by Vaultname1 and Vaultkey1
      myVaultsPage.readingVaultValue(testData.vaultName1,testData.vaultKey1)

      // Editing(updating) 'Vault value' by Vaultname1 and Vaultkey1
      myVaultsPage.editingVaultValue(testData.vaultName1,testData.vaultKey1,testData.vaultValue1New)

      // Deleting 'Vault value' by Vaultname1 and Vaultkey1
      myVaultsPage.deletingVaultValue(testData.vaultName1,testData.vaultKey1)

      // Delete Vault(name)
      myVaultsPage.deleteVault(testData.vaultName1)

      // Welcome greeting if no vaults
      myVaultsPage.isGreetingAddYourFirstVaultVisible()

    })
    
})







// t6-manage-striim-vaults.cy.ts - test initially

import LoginPage from '../pages/login-page'
import LandingPage from '../pages/landing-page'
import VaultsPage from '../pages/vaults-page'

import { testData as tD, urlData as uD} from '../config/config-t7'

describe('t7:2 namespaces, 4 vault values,CRUD', () => {

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

  }) 

    it('CRUD', () => {

    
      // Search for Vaults in Manage Striim(Navigation Bar Menu) and click
      myLandingPage.myNavigationBarMenu.clickMenuItem("Manage Striim", "Vaults") 


      //// Vaults Page
      // Check that site was redirected to vaults page 
	    myVaultsPage.isVaultsPageUrl()
      // Welcome greeting if no vaults
      myVaultsPage.isGreetingAddYourFirstVaultVisible()
     
      // 1. B_name : cr(2 values)
      myVaultsPage.clickButtonAddVaultIfNoVaults()  
      myVaultsPage.enterVaultNameForStriimVaultType(tD.bName) 
      myVaultsPage.enterCorrectUsernameAndConfirmVaultnameCreating(tD.bName)

      // Desk 'Vaults' must appear
      myVaultsPage.isDeskVaultsVisible()

      //// Creating  Vault name C( with 3 vault values)
      // 2. C_name : cr(2 values)
      myVaultsPage.clickButtonAddVaultToCreateNextVault() 
      myVaultsPage.enterVaultNameForStriimVaultType(tD.cName)
      myVaultsPage.enterCorrectUsernameAndConfirmVaultnameCreating(tD.cName)
     
      //// 3.   B_value1 : cr    Creating 1-st Vault value of Vault name B
      // #3 Click 'Add vault value' button (right side) to start creating Vault value
      myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue(tD.bName)
      // #3 Creating 'Vault value' means filling out all fields in Vaults table
      myVaultsPage.creatingVaultValue(tD.bName,tD.bKey1,tD.bValue1)

      //// 4.   B_value2 : cr   Creating 2-nd Vault value of  Vault name B
      // #4 Click 'Add vault value' button (right side) to start creating Vault value
      myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue(tD.bName)
      // #4 Creating 'Vault value' means filling out all fields in Vaults table
      myVaultsPage.creatingVaultValue(tD.bName,tD.bKey2,tD.bValue2) 
      
      //// 5.   C_value1 : cr   Creating 1-st Vault value of  Vault name C
      // #5 Click 'Add vault value' button (right side) to start creating Vault value
      myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue(tD.cName)
      // #5 Creating 'Vault value' means filling out all fields in Vaults table
      myVaultsPage.creatingVaultValue(tD.cName,tD.cKey1,tD.cValue1)

       //// 6.  C_value2 : cr   Creating 2-nd Vault value of  Vault name C
      // #6 Click 'Add vault value' button (right side) to start creating Vault value
      myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue(tD.cName)
      // #6 Creating 'Vault value' means filling out all fields in Vaults table
      myVaultsPage.creatingVaultValue(tD.cName,tD.cKey2,tD.cValue2)

      // 7.   B_value1 : ed B_value1new
      myVaultsPage.editingVaultValue(tD.correctUsername,tD.bName,tD.bKey1,tD.bValue1new)

      // 8.  C_value1 : r
      myVaultsPage.readingVaultValue(tD.correctUsername,tD.cName,tD.cKey1)

      // 9.  B_value1new : r  
      myVaultsPage.readingVaultValue(tD.correctUsername,tD.bName,tD.bKey1)

      // 10.  B_value2 : r
      myVaultsPage.readingVaultValue(tD.correctUsername,tD.bName,tD.bKey2)
      
      // 11.B_name : del 
      myVaultsPage.deleteVault(tD.bName)

      // 12.  C_value2new : r 
      myVaultsPage.readingVaultValue(tD.correctUsername,tD.cName,tD.cKey2)

      // 13.  C_value1 : r  
      myVaultsPage.readingVaultValue(tD.correctUsername,tD.cName,tD.cKey1)

      // 14.  C_value2new : del
      myVaultsPage.deletingVaultValue(tD.correctUsername,tD.cName,tD.cKey2)

      // 15.C_name : del
       myVaultsPage.deleteVault(tD.cName)

      // Welcome greeting if no vaults
      myVaultsPage.isGreetingAddYourFirstVaultVisible()
    
    })
    
})







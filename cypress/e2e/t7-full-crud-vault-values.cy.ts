// t7-full-crud-vault-values.cy - test initially

import LoginPage from '../pages/login-page'
import LandingPage from '../pages/landing-page'
import VaultsPage from '../pages/vaults-page'

import { testData as tD, urlData as uD} from '../config/config-t7'

describe('t7:3 namespaces, 5 vault values,CRUD', () => {

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
      //1E
      //// Creating  Vault name A(empty - without Vault value)
      // 1. A_name : cr(no values)
      //myVaultsPage.clickButtonAddVaultIfNoVaults()                            
      //myVaultsPage.enterVaultNameForStriimVaultType(tD.aName)
      //myVaultsPage.enterCorrectUsernameAndConfirmVaultnameCreating(tD.aName)
      
      // Desk 'Vaults' must appear
      //myVaultsPage.isDeskVaultsVisible()
      //
      //// Creating  Vault name B( with 2 vault values)
      // 2. B_name : cr(2 values)
      
      //myVaultsPage.clickButtonAddVaultToCreateNextVault() 
      //1E
      myVaultsPage.clickButtonAddVaultIfNoVaults()  
      myVaultsPage.enterVaultNameForStriimVaultType(tD.bName) 
      myVaultsPage.enterCorrectUsernameAndConfirmVaultnameCreating(tD.bName)

      // Desk 'Vaults' must appear
      myVaultsPage.isDeskVaultsVisible()

      //// Creating  Vault name C( with 3 vault values)
      // 4. C_name : cr(3 values)
      myVaultsPage.clickButtonAddVaultToCreateNextVault() 
      myVaultsPage.enterVaultNameForStriimVaultType(tD.cName)
      myVaultsPage.enterCorrectUsernameAndConfirmVaultnameCreating(tD.cName)
     
      //// 3.   B_value1 : cr    Creating 1-st Vault value of Vault name B
      // #3 Click 'Add vault value' button (right side) to start creating Vault value
      myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue(tD.bName)
      // #3 Creating 'Vault value' means filling out all fields in Vaults table
      myVaultsPage.creatingVaultValue(tD.bName,tD.bKey1,tD.bValue1)

      //// 5.   B_value2 : cr   Creating 2-nd Vault value of  Vault name B
      // #5 Click 'Add vault value' button (right side) to start creating Vault value
      myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue(tD.bName)
      // #5 Creating 'Vault value' means filling out all fields in Vaults table
      myVaultsPage.creatingVaultValue(tD.bName,tD.bKey2,tD.bValue2) 
      
      //// 6.   C_value1 : cr   Creating 1-st Vault value of  Vault name C
      // #6 Click 'Add vault value' button (right side) to start creating Vault value
      myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue(tD.cName)
      // #6 Creating 'Vault value' means filling out all fields in Vaults table
      myVaultsPage.creatingVaultValue(tD.cName,tD.cKey1,tD.cValue1)

       //// 7.  C_value2 : cr   Creating 2-nd Vault value of  Vault name C
      // #7 Click 'Add vault value' button (right side) to start creating Vault value
      myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue(tD.cName)
      // #7 Creating 'Vault value' means filling out all fields in Vaults table
      myVaultsPage.creatingVaultValue(tD.cName,tD.cKey2,tD.cValue2)

      // 8.   B_value1 : ed B_value1new
      myVaultsPage.editingVaultValue(tD.correctUsername,tD.bName,tD.bKey1,tD.bValue1new)

       //// 9.  C_value3 : cr   Creating 3-d Vault value of Vault name C
      // #9 Click 'Add vault value' button (right side) to start creating Vault value
      //myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue(tD.cName)
      // #9 Creating 'Vault value' means filling out all fields in Vaults table
      //myVaultsPage.creatingVaultValue(tD.cName,tD.cKey3,tD.cValue3)
      //2E
      // 10.A_name : del
      //myVaultsPage.deleteVault(tD.aName)
      //2E
      // 11.  C_value1 : r
      myVaultsPage.readingVaultValue(tD.correctUsername,tD.cName,tD.cKey1)

      // 12.  B_value1new : r  
      myVaultsPage.readingVaultValue(tD.correctUsername,tD.bName,tD.bKey1)

      // 13.  C_value3 : del
      //myVaultsPage.deletingVaultValue(tD.correctUsername,tD.cName,tD.cKey3)
      
      // 14.  B_value1new : del 
      //myVaultsPage.deletingVaultValue(tD.correctUsername,tD.bName,tD.bKey1)

      // 15.  C_value2 : ed C_value2new
      //myVaultsPage.editingVaultValue(tD.correctUsername,tD.cName,tD.cKey2,tD.cValue2new)

      // 16.  B_value2 : r
      myVaultsPage.readingVaultValue(tD.correctUsername,tD.bName,tD.bKey2)
      
      // 17.B_name : del 
      myVaultsPage.deleteVault(tD.bName)

      // 18.  C_value2new : r 
      myVaultsPage.readingVaultValue(tD.correctUsername,tD.cName,tD.cKey2)

      // 19.  C_value1 : r  
      myVaultsPage.readingVaultValue(tD.correctUsername,tD.cName,tD.cKey1)

      // 20.  C_value2new : del
      myVaultsPage.deletingVaultValue(tD.correctUsername,tD.cName,tD.cKey2)

      // 21.C_name : del
       myVaultsPage.deleteVault(tD.cName)

      // Welcome greeting if no vaults
      myVaultsPage.isGreetingAddYourFirstVaultVisible()
    
    })
    
})







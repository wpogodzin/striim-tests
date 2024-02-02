// t7-crud-vault-values.cy - test initially

import LoginPage from '../pages/login-page'
import LandingPage from '../pages/landing-page'
import VaultsPage from '../pages/vaults-page'
import ConsolePage from '../pages/console-page'

import { testData as tD, urlData as uD} from '../config/config-t7'

describe('CRUD Vault values using Table and Console - middle test', () => {

  // Declare variables outside beforeEach 
  let myLoginPage 
  let myLandingPage
  let myVaultsPage
  let myConsolePage
    
  beforeEach(() => {

    // Create new instances:
    myLoginPage = new LoginPage()
    myLandingPage = new LandingPage()
    myVaultsPage = new VaultsPage()
    myConsolePage = new ConsolePage()


    //// Login Page(common part for every test)
    // Visit the login page and expect login form 
    // for about 20 sec - now less 22.01.24
    myLoginPage.visitLoginPage()
    myLoginPage.expectLoginForm() 

    // Right login 
    myLoginPage.setCorrectLoginAndPassword()
    myLoginPage.clickLogin()

    // Mistake handling when automatically testing(only) 
    // before checking 'https://developer.striim.com/#landing'!!!
    myLoginPage.mistakeHandlingWhenValidateLoginWithCorrectCredentials()

    //// Landing Page
    // Check that site was redirected to landing page if no apps yet
    myLandingPage.isLandingPageUrl()
 
    // Welcome greeting for user(end of common part for every test)
    myLandingPage.isGreetingWelcomeUserVisible()

  }) 

    it('CRUD Vault values using Table and Console - middle test', () => {
      // t9:Scenario: first variant(middle):
      // 1. B_name : cr(1 value)
      // 2. C_name : cr(1 value)
      // 2a.  C_value1 : cr                   using Console  
      // 3.   B_value1 : cr
      // 3a.  C_value1 : ed —> C_value1new              
      // 4.   B_value1 : r                    using Console
      //     Comparing read and input values
      // 4a.  C_value1new : r                 using Console
      //     Comparing read and edited values
      // 4b.  C_value1new : del               using Console
      // 5. C_name : del                  
      // 6.   B_value1 : del
      // 7. B_name : del                      

      // Search for Vaults in Manage Striim(Navigation Bar Menu) and click
      myLandingPage.myNavigationBarMenu.clickMenuItem("Manage Striim", "Vaults") 


      //// Vaults Page
      // Check that site was redirected to vaults page 
	    myVaultsPage.isVaultsPageUrl()
      // Welcome greeting if no vaults
      myVaultsPage.isGreetingAddYourFirstVaultVisible()

      // 1.B_name : cr(1 value)
      myVaultsPage.clickButtonAddVaultIfNoVaults()  
      myVaultsPage.enterVaultNameForStriimVaultType(tD.bName) // StriimVaultType by default
      myVaultsPage.enterCorrectUsernameAndConfirmVaultnameCreating(tD.bName)  

      // Desk 'Vaults' must appear
      myVaultsPage.isDeskVaultsVisible()

      // 2.C_name : cr(1 value) 
      myVaultsPage.clickButtonAddVaultToCreateNextVault() 
      myVaultsPage.enterVaultNameForStriimVaultType(tD.cName)
      myVaultsPage.enterCorrectUsernameAndConfirmVaultnameCreating(tD.cName)  
      
      // Redirecting to page Console
      myVaultsPage.myNavigationBarMenu.clickBarItem("Console")


      //// Console Page
      // Check that site was redirected to Console page 
	    myConsolePage.isConsolePageUrl()

      // 2a.  C_value1 : cr  Creating 1-st Vault value of Vault name C through Console
      myConsolePage.enterCommandWriteValueUsingNameAndKey(tD.cName, tD.cKey1, tD.cValue1)
      myConsolePage.doesCommandWriteSucceed(tD.cName, tD.cKey1, tD.cValue1)

      // Search for Vaults in Manage Striim(Navigation Bar Menu) and click
      myConsolePage.myNavigationBarMenu.clickMenuItem("Manage Striim", "Vaults")


      //// Vaults Page
      // 3.   B_value1 : cr    Creating 1-st Vault value of Vault name B
      // #3 Click 'Add vault value' button (right side) to start creating Vault value in name B
      myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue(tD.bName)
      // #3 Creating 'Vault value' means filling out all fields in Vaults table
      myVaultsPage.creatingVaultValue(tD.bName,tD.bKey1,tD.bValue1)

      // 3a.   C_value1 : ed ---> C_value1new
      myVaultsPage.editingVaultValue(tD.correctUsername,tD.cName,tD.cKey1,tD.cValue1new)

      // Redirecting to page Console
      myVaultsPage.myNavigationBarMenu.clickBarItem("Console")


      //// Console Page
      // Check that site was redirected to Console page 
	    myConsolePage.isConsolePageUrl()

      // 4.  B_value1 : r    using Console 
      myConsolePage.enterCommandReadUsingNameAndKey(tD.bName, tD.bKey1)
      myConsolePage.doesCommandReadSucceed(tD.bName, tD.bKey1)
      myConsolePage.readVaultValueFromConsoleDeskAndCompare(tD.bName, tD.bKey1, tD.bValue1)    

      // 4a.  C_value1new : r   using Console
      myConsolePage.enterCommandReadUsingNameAndKey(tD.cName, tD.cKey1)
      myConsolePage.doesCommandReadSucceed(tD.cName, tD.cKey1)
      myConsolePage.readVaultValueFromConsoleDeskAndCompare(tD.cName, tD.cKey1, tD.cValue1new) 

      // 4b.  C_value1new : del using Console
      myConsolePage.enterCommandDeleteValueUsingNameAndKey(tD.cName,tD.cKey1)
      myConsolePage.doesCommandDeleteSucceed(tD.cName, tD.cKey1)

      // Search for Vaults in Manage Striim(Navigation Bar Menu) and click
      myConsolePage.myNavigationBarMenu.clickMenuItem("Manage Striim", "Vaults")

      
      //// Vaults Page
      // Check that site was redirected to vaults page 
	    myVaultsPage.isVaultsPageUrl()
      
      // 5.C_name : del 
      myVaultsPage.deleteVault(tD.cName)    

      // 6.  B_value1 : del
      myVaultsPage.deletingVaultValue(tD.correctUsername,tD.bName,tD.bKey1)

      // 7.B_name : del
      myVaultsPage.deleteVault(tD.bName)

      // Welcome greeting if no vaults
      myVaultsPage.isGreetingAddYourFirstVaultVisible()
    
    })
    
})







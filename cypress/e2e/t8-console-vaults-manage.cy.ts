// t7-crud-vault-values.cy - test initially

import LoginPage from '../pages/login-page'
import LandingPage from '../pages/landing-page'
import VaultsPage from '../pages/vaults-page'
import ConsolePage from '../pages/console-page'

import { testData as tD, urlData as uD} from '../config/config-t7'

describe('t8 - creating Vault value in table Vaults and reading this Vault value using Console', () => {

  // Declare variables outside beforeEach 
  let myLoginPage 
  let myLandingPage
  let myVaultsPage
  let myConsolePage
    
  beforeEach(() => {
    
    myLoginPage = new LoginPage()
    myLandingPage = new LandingPage()
    myVaultsPage = new VaultsPage()
    myConsolePage = new ConsolePage()


    //// Login Page
    // Visit the login page and expect login form for about 20 sec
    myLoginPage.visitLoginPage()
    myLoginPage.expectLoginForm() 

    

    // Right login 
    myLoginPage.setCorrectLoginAndPassword()
    myLoginPage.clickLogin()

    //// Landing Page
    // Check that site was redirected to landing page if no apps yet
    myLandingPage.isLandingPageUrl()

    //
    // Mistake handling when automatically testing(only) 
    // before checking 'https://developer.striim.com/#landing'!!!
    myLoginPage.mistakeHandlingWhenValidateLoginWithCorrectCredentials()
    
    // Welcome greeting for user
    myLandingPage.isGreetingWelcomeUserVisible() 

  }) 

    it('6 steps of work with Vaults + 1 step using Console', () => {

    
      // Search for Vaults in Manage Striim(Navigation Bar Menu) and click
      myLandingPage.myNavigationBarMenu.clickMenuItem("Manage Striim", "Vaults") 


      //// Vaults Page
      // Check that site was redirected to vaults page 
	    myVaultsPage.isVaultsPageUrl()
      // Welcome greeting if no vaults
      myVaultsPage.isGreetingAddYourFirstVaultVisible()

      // 1.B_name : cr(1 value)
      myVaultsPage.clickButtonAddVaultIfNoVaults()  
      myVaultsPage.enterVaultNameForStriimVaultType(tD.bName) 
      myVaultsPage.enterCorrectUsernameAndConfirmVaultnameCreating(tD.bName)

      // Desk 'Vaults' must appear
      myVaultsPage.isDeskVaultsVisible()

      // 2.C_name : cr(no values)
      myVaultsPage.clickButtonAddVaultToCreateNextVault() 
      myVaultsPage.enterVaultNameForStriimVaultType(tD.cName)
      myVaultsPage.enterCorrectUsernameAndConfirmVaultnameCreating(tD.cName)
     
      //// 3.   B_value1 : cr    Creating 1-st Vault value of Vault name B
      // #3 Click 'Add vault value' button (right side) to start creating Vault value
      myVaultsPage.clickAddVaultValueButtonToStartCreatingVaultValue(tD.bName)
      // #3 Creating 'Vault value' means filling out all fields in Vaults table
      myVaultsPage.creatingVaultValue(tD.bName,tD.bKey1,tD.bValue1)

      // Redirecting to page Console
      myVaultsPage.myNavigationBarMenu.clickBarItem("Console")

      //// Console Page
      // Check that site was redirected to Console page 
	    myConsolePage.isConsolePageUrl()

      // 4.  B_value1 : r  
      myConsolePage.typeReadValueUsingNameAndKey(tD.bName, tD.bKey1)

      myConsolePage.readVaultValueFromConsoleDesk(tD.bValue1) 

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







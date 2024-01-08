// LandingPage(Page Object Module) for testing developer.striim.com

import { testData as tD, urlData as uD} from '../config/config'
import NavigationBarMenu from '../pages/components/navigation-bar-menu'

class LandingPage {

  // Declare myNavigationBarMenu as a property of the class
  //adding ': NavigationBarMenu' is better in the very beginning
  myNavigationBarMenu: NavigationBarMenu 

  // Constructor to make instance myMainMenu when LandingPage is created
  constructor() {
    this.myNavigationBarMenu = new NavigationBarMenu()
  }  

  ///////    Methods ///////

  isLandingPageUrl() {
    cy.url().should('eq', uD.urlLandingPage )
  }

  isGreetingWelcomeUserVisible(){
    cy.get('div[data-test-id="header--homepage-recent-apps-empty"] h1').eq(0)
      .should('have.text',`Hi ${tD.correctUsername}, Welcome to Striim !`)
  }

  //Click  button to create new app if it exists
  clickButtonCreateAnApp(){
    cy.get('button[data-test-id="create-an-app--button"]')
    .contains('Create an App')
    .should('be.visible').click()
  }

}

export default LandingPage;

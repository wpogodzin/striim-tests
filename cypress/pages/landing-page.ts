// LandingPage(Page Object Module) for testing developer.striim.com

import { testData, urlData } from '../config/config';

class LandingPage {

  ///////    Methods ///////

  isLandingPageUrl() {
    cy.url().should('eq', urlData.urlLandingPage )
  }

  isGreetingWelcomeUserVisible(){
    cy.get('div[data-test-id="header--homepage-recent-apps-empty"] h1').eq(0)
      .should('have.text',`Hi ${testData.correctUsername}, Welcome to Striim !`)
  }

  //Click  button to create new app if it exists
  clickButtonCreateAnApp(){
    cy.get('button[data-test-id="create-an-app--button"]')
    .contains('Create an App')
    .should('be.visible').click()
  }

}

export default LandingPage;

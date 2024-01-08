// CreateAppPage(Page Object Module) for testing developer.striim.com

import { testData as tD, urlData as uD} from '../config/config'

class CreateAppPage {

  ///////    Methods ///////

  // Check URL for creating new app
  isCreateAppPageUrl() {    
    cy.url().should('eq',uD.urlCreateAppPage)
  }

  // Find element for creating from scratch and click
  findCreatingFromScratchAndClick() {  
    cy.get('div#createapp--Start_from_scratch')
      .should('be.visible')
      .should('have.text','Start from scratch ')
      .click()
  }

  // Check URL for page with giving name to new app
  isSlashNameAppPageUrl() {
    cy.url().should('eq',uD.urlSlashNameAppPage)
  }

  // Convince if Namespace has Username  
  hasNamespaceFieldCorrectUsername() {
    cy.get('[ data-test-id="autocomplete-select"]')
      .should('be.visible')
      .should('have.text',tD.correctUsername)
  }

  //Type name for new app
  typeNewAppName()  { 
    cy.get('input[name="name"]')
      .should('be.visible')
      .type(tD.newAppName)
  }

  //Click button for submit new app
  submitNewApp(){
    cy.get('button[data-test-id="submit-app-button"]')
      .contains('Save')
      .should('be.visible')
      .click()
  }

}

export default CreateAppPage;
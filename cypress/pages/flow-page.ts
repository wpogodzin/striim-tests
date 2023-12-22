// FlowPage(Page Object Module) for testing developer.striim.com

import { testData, urlData } from '../config/config';
import MainMenu from '../pages/components/main-menu'

class FlowPage {

  // Declare myMainMenu as a property of the class
  myMainMenu;

  // Constructor to make instance myMainMenu when FlowPage is created
  constructor() {
    this.myMainMenu = new MainMenu()
  }  

  ///////    Methods ///////

  //Check URL for work with new app :Url is OK, but picture is different
  isFlowPageUrl() {
  cy.url().should('eq',urlData.urlFlowPage)
  }

  // Check for the success message after creating the application
  isMessageAboutCreatedAppVisible() {
    cy.get('[data-test-id="toast-container"]') 
      .should('be.visible') // Check that the container is visible
      .within(() => {
        // Check for the presence of the first message
        cy.get('h4[data-test-id="toast-title"]').should('be.visible')
          .contains('Application created successfully.')
        // Check for the presence of the second message
        cy.get(' h6[data-test-id="toast-description"]').should('be.visible')
          .contains('Application qqqq created successfully.')
      }) 
  }
  
}

export default FlowPage;
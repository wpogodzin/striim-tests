// FlowPage(Page Object Module) for testing developer.striim.com

import { testData, urlData } from '../config/config';

class FlowPage {

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

  // Trigger mouseover on the "Apps" dropdown to reveal the menu
  mouseOverAppsDropdown(){
    cy.get('[data-testid="striim-dropdown-children"] li:contains("Apps")')
      .should('exist')
      .trigger('mouseover')
  }

  // Use cy.contains to find and click "View All Apps"
  findAndClickViewAllApps(){
    cy.contains('View All Apps').should('exist').click()
  }
  
}

export default FlowPage;
// ApplicationsPage(Page Object Module) for testing developer.striim.com

import { testData as tD, urlData as uD} from '../config/config'

class ApplicationsPage {

  ///////    Methods ///////
 
    // Check if the URL is correct after clicking "View All Apps"
    isApplicationsPageUrl(){
    cy.url().should('eq', 'https://developer.striim.com/#applications')
    }
    
    // Click GridView button to see new app as grid
    clickGridViewButton(){
    cy.get('[data-test-id="grid-view-button"]').should('be.visible').click()
    }
    
    // Click on the dropdown menu button to open the menu
    clickRightElementOfNewAppForDropdownList(){
    cy.get(`[data-test-id="apptile--${tD.correctUsername}.${tD.newAppName}"]`)
      .find(`[data-test-id="${tD.correctUsername}-${tD.newAppName}-open-menu"]`)
      .find('[data-testid="striim-dropdown-children"] button')
      .should('be.visible')
      .click(); 
    }
    // Locate and click the "Drop" option in the dropdown menu

    chooseDropFromDropdownListAndClick(){
    cy.get('[data-testid="striim-dropdown-tooltip-content"]')
      // .scrollIntoView() // (Optional) Scroll into view if needed
      .find(`ul[data-test-id="${tD.correctUsername}-${tD.newAppName}-menu"] li`)
      .eq(5)
      .contains('Drop')
      .should('exist') // is not visible
      // Force the click due to potential visibility issues !!!
      .click({ force: true }); 
    }

    // Click the confirmation button in the "Drop App" modal
    clickConfirmationButtonToDrop(){
      cy.get('button[data-test-id="drop-app-modal-confirm-btn"]')
        .should('have.text','Drop').click();
    }

    // Is there a message about successfully dropped app?
    isMessageAboutDroppedAppVisible() {
      cy.get ('h4')
        .contains('Application dropped successfully.')
        .should('be.visible')
    }
    
    // Check for the presence of the "Add Your First App" headline
    // after successful dropping
    isThereInvitationToAddFirstApp(){
    cy.get('h2').contains('Add Your First App')
      .should('be.visible')
    }

}

export default ApplicationsPage;
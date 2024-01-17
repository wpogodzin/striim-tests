// Console Page(Page Object Module) - methods for testing developer.striim.com

import { testData as tD, urlData as uD} from '../config/config-t7'
import NavigationBarMenu from '../pages/components/navigation-bar-menu'

class ConsolePage {

  // Declare myNavigationBarMenu as a property of the class
  // adding ': NavigationBarMenu' is better in the very beginning
  myNavigationBarMenu: NavigationBarMenu 

  // Constructor to make instance myMainMenu when LandingPage is created
  constructor() {

    this.myNavigationBarMenu = new NavigationBarMenu()

  }  

  ///////    Methods ///////

  isConsolePageUrl() {

    cy.url().should('eq', uD.urlConsolePage )

  }

  typeReadValueUsingNameAndKey(vaultname, vaultkey) {

    cy.get('div[data-test-id="command-executor-enabled"] textarea')
      .type(`READ FROM ${vaultname} WHERE vaultKey = "${vaultkey}";`)
    cy.get('button[data-testid="execute-command"]').should('have.text','Execute').click()

  }

  //// should extract and assert the meaning of "Value" from the HTML code
  readVaultValueFromConsoleDesk(vaultvalue) {
  
    // Locate the line containing the keyword 'Value'
    cy.get('span')
      .contains('Value:')
      .should('exist')
      .then(($line) => {
        // Extract and assert the meaning of 'Value'
        const lineText = $line.text();
        const valueMeaning = lineText.split('Value: ')[1].trim()

        // Assertion based on the extracted valueMeaning
        cy.wrap(valueMeaning).should('eq', vaultvalue)
      });  

  }

}

export default ConsolePage;

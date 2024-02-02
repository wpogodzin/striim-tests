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

  ////// Methods //////

  isConsolePageUrl() {

    cy.url().should('eq', uD.urlConsolePage)

  }
  //// Should read Vault value 
  //// using Vault name and Vault key(SQL - READ ) 
  enterCommandReadUsingNameAndKey(vaultname, vaultkey) {

    cy.get('div[data-test-id="command-executor-enabled"] textarea')
      .type(`READ FROM ${vaultname} WHERE vaultKey = "${vaultkey}";`)
    cy.get('button[data-testid="execute-command"]').should('have.text','Execute').click()

  }

     //// Should retrieve and assert the meaning of "Value"  
     readVaultValueFromConsoleDeskAndCompare(vaultname, vaultkey, vaultvalue) {

       // Selects the container that holds all the Console lines
       // P.S.: At first I used simply 'cy.get('div')' and it worked and 
       // selected 96 'div' so then I used 'div.CodeMirror-code' although
       // using class is not welcome when choosing elements
       cy.get('div.CodeMirror-code')
          // Chooses 'pre' having relevant text
          .contains('pre',`-- Processing - READ FROM ${vaultname} WHERE vaultKey = "${vaultkey}"`)
          // Gets all subsequent 'pre' elements 
          .nextAll('pre')
          // Finds element 'pre' with text 'Value:'
          // This assumes that the 'Value:' line always follows
          // the 'Processing' line for each vault command.
          .contains('Value:')
          // Calls yielded 'pre' element as '$yieldedPre'
          .then($yieldedPre => {
            // Extracts text from variable '$yieldedPre'
            const valueText = $yieldedPre.text();
            // Extracts value using index and erazes whitespaces('trim()') 
            const value = valueText.split(': ')[1].trim();
            // Compares final value with assigned before
            cy.wrap(value).should('eq', vaultvalue);
          });

      }
  
  //// Should create(or edit) Vault value 
  //// using Vault name and Vault key(SQL - WRITE) 
  enterCommandWriteValueUsingNameAndKey(vaultname, vaultkey, vaultvalue){

    cy.get('div[data-test-id="command-executor-enabled"] textarea')
      .type(`WRITE INTO ${vaultname} ( vaultKey: "${vaultkey}", vaultValue: "${vaultvalue}");`)
    cy.get('button[data-testid="execute-command"]').should('have.text','Execute').click()

  }

  ////  Does the keyword 'SUCCESS' is in Console?
  doesCommandWriteSucceed(vaultname, vaultkey, vaultvalue) {
    // Selects the container that holds all the console lines
    cy.get('div.CodeMirror-code')
      // Chooses 'pre' having relevant text
      .contains('pre',`-- Processing - WRITE INTO ${vaultname} ( vaultKey: "${vaultkey}", vaultValue: "${vaultvalue}"`)
      // Gets all subsequent 'pre' elements 
      .nextAll('pre')
      // Finds element 'pre' with text '-- -> SUCCESS'
      // This assumes that the '-- -> SUCCESS' line always follows
      // the 'Processing' line for each vault command.
      .contains('-- -> SUCCESS')
      .should('be.visible') 
  
  }    

  //// Should delete Vault value 
  //// using Vault name and Vault key(SQL - DELETE) 
  entercommandDeleteValueUsingNameAndKey(vaultname, vaultkey){

    // Gets
    cy.get('div[data-test-id="command-executor-enabled"] textarea')
      // Types
      .type(`DELETE FROM ${vaultname} WHERE vaultKey = "${vaultkey}";`)
    // Clicks button
    cy.get('button[data-testid="execute-command"]').should('have.text','Execute').click()

  }

  ////  Does the keyword 'SUCCESS' is in Console?
  doesCommandDeleteSucceed(vaultname, vaultkey) {

    // Selects the container that holds all the console lines
    cy.get('div.CodeMirror-code')
      // Chooses 'pre' having relevant text
      .contains('pre',`-- Processing - DELETE FROM ${vaultname} WHERE vaultKey = "${vaultkey}"`)
      // Gets all subsequent 'pre' elements 
      .nextAll('pre')
      // Finds element 'pre' with text '-- -> SUCCESS'
      // This assumes that the '-- -> SUCCESS' line always follows
      // the 'Processing' line for each vault command.
      .contains('-- -> SUCCESS')
      .should('be.visible')  
  }    

}

export default ConsolePage;

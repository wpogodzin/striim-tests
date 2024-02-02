// Console Page(Page Object Module) - methods for testing developer.striim.com

import { testData as tD, urlData as uD} from '../config/config-t7'
import NavigationBarMenu from '../pages/components/navigation-bar-menu'

class ConsolePage {

  // Declare myNavigationBarMenu as a property of the class
  // adding ': NavigationBarMenu' is better in the very beginning
  myNavigationBarMenu: NavigationBarMenu 

  // Constructor to make instance myNavigationBarMenu when ConsolePage is created
  constructor() {

    this.myNavigationBarMenu = new NavigationBarMenu()

  }

  //// Private method of enter sql command (WRITE,READ,DELETE)
  private enterCommand(command: string,vaultname: string, vaultkey: string, vaultvalue ='') {

    cy.get('div[data-test-id="command-executor-enabled"] textarea')
      .type(command) // vaultname, vaultkey and vaultvalue are in command as parameters
    cy.get('button[data-testid="execute-command"]').should('have.text','Execute').click()

  }

  //// Private method of finding 'keyexpression' as indicator of sql command fulfillment
  private doesCommandSucceed(command: string,vaultname: string, vaultkey: string, vaultvalue = '', keyexpression = '-- -> SUCCESS') {

    // Method selects the container that holds all the Console lines
    // P.S.: At first I just used  'cy.get('div')' and it worked but 
    // it selected 96 'div's so to avoit this I used 'div.CodeMirror-code' though
    // using the class is not recommended when selecting elements
    // Command 'return' is neccessary for using result of private method 'doesCommandSucceed'
    // in method 'readVaultValueFromConsoleDeskAndCompare'(there was problem with using '.then')  
    return(
      cy.get('div.CodeMirror-code') //choosenelement - result of command chain
      // Chooses 'pre' having relevant text       
      .contains('pre',`-- Processing - ${command}`)
      // Gets all subsequent 'pre' elements 
      .nextAll('pre')
      // Finds element 'pre' with text ('-- -> SUCCESS' or 'Value:'
      // This assumes that the '-- -> SUCCESS'/'Value:' line always follows
      // the '-- Processing' line for each vault command.
      .contains(keyexpression)
      .should('be.visible')
    )  
  
  }    
  
  ////// Public methods //////

  isConsolePageUrl() {

    cy.url().should('eq', uD.urlConsolePage)

  }
  //// Should enter sql READ command 
  enterCommandReadUsingNameAndKey(vaultname: string, vaultkey: string) {

    let commandread = `READ FROM ${vaultname} WHERE vaultKey = "${vaultkey}";`
    this.enterCommand(commandread,vaultname, vaultkey);

  }

  ////   Is thete keyword 'SUCCESS' after command READ in Console?
  doesCommandReadSucceed(vaultname: string, vaultkey: string) {
     
    let commandread = `READ FROM ${vaultname} WHERE vaultKey = "${vaultkey}";`
    // sql command is used in message without ';'
    commandread = commandread.slice(0, -1)
    this.doesCommandSucceed(commandread, vaultname, vaultkey);
      
  }    

  //// Should retrieve and assert the meaning of "Value"(comparing with initial data)  
  readVaultValueFromConsoleDeskAndCompare(vaultname: string, vaultkey: string, vaultvalue: string) {

  let keyexpression: string
  let commandread = `READ FROM ${vaultname} WHERE vaultKey = "${vaultkey}";`
  commandread = commandread.slice(0, -1)

  this.doesCommandSucceed(commandread, vaultname, vaultkey, vaultvalue, keyexpression = 'Value:')  
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

  //// Should enter sql WRITE command
  enterCommandWriteValueUsingNameAndKey(vaultname: string, vaultkey: string, vaultvalue: string){

    let commandwrite = `WRITE INTO ${vaultname} ( vaultKey: "${vaultkey}", vaultValue: "${vaultvalue}");`
    this.enterCommand(commandwrite, vaultname, vaultkey, vaultvalue);

  }

  ////   Is thete keyword 'SUCCESS' after command WRITE in Console?
  doesCommandWriteSucceed(vaultname: string, vaultkey: string, vaultvalue: string) {

    let commandwrite = `WRITE INTO ${vaultname} ( vaultKey: "${vaultkey}", vaultValue: "${vaultvalue}");`
    commandwrite = commandwrite.slice(0, -1)
    this.doesCommandSucceed(commandwrite, vaultname, vaultkey, vaultvalue);
  
  }    

  //// Should enter sql DELETE command
  enterCommandDeleteValueUsingNameAndKey(vaultname: string, vaultkey: string){

    let commanddelete = `DELETE FROM ${vaultname} WHERE vaultKey = "${vaultkey}";`
    this.enterCommand(commanddelete, vaultname, vaultkey)

  }

  ////  Is thete keyword 'SUCCESS' after command DELETE in Console?
  doesCommandDeleteSucceed(vaultname: string, vaultkey: string) {
     
    let commanddelete = `DELETE FROM ${vaultname} WHERE vaultKey = "${vaultkey}";`
    commanddelete = commanddelete.slice(0, -1)
    this.doesCommandSucceed(commanddelete, vaultname, vaultkey);
      
  }    

}

export default ConsolePage;

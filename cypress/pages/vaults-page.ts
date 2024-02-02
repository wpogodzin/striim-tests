// VaultsPage(Page Object Module) for testing developer.striim.com
// 2 BAD

import { testData as tD, urlData as uD } from '../config/config-t7'
import NavigationBarMenu from '../pages/components/navigation-bar-menu'

class VaultsPage {
  // Declare myNavigationBarMenu as a property of the class
  //adding ': NavigationBarMenu' is better in the very beginning
  myNavigationBarMenu: NavigationBarMenu 

  // Constructor to make instance myMainMenu when LandingPage is created
  constructor() {
    this.myNavigationBarMenu = new NavigationBarMenu()
  }  

  //// Vaults Page Methods
      
  //// Check that site was redirected to vaults page 
  isVaultsPageUrl() {

    cy.url().should('eq', uD.urlVaultsPage )

  }

  //// Check of welcome greeting
  isGreetingAddYourFirstVaultVisible(){

    cy.get('div[data-test-id="vaults-empty"] h1')
      .should('have.text','Add your first vault')

  }

  //// Click  button to add vault if no vaults yet
  clickButtonAddVaultIfNoVaults() {

    cy.get('button[data-testid="striim-button"]')
      .contains('Add Vault')
      .should('be.visible').click()

  }
  
  //// Filling out the table 'Add Vault'
  enterVaultNameForStriimVaultType(vaultname){

    // Check if 'Add Vault' desk is visible
    cy.get('div[data-testid="striim-dialog-paper"]')
      .contains('h1','Add Vault').should('be.visible')
    // 'Vault Type' is visible
    cy.get('div[data-testid="striim-dialog-content"]')
      .contains('p','Vault Type').should('be.visible')
    // Check if STRIIMVAULT type is chosen by DEFAULT      
    cy.get('div[data-testid="striim-dialog-content"]')
      .find('fieldset')
      // consruction '.should(($label)'  allows to validate many events
      .should(($label) => {
        // Check the input element within the label
        expect($label.find('input[name="vault-types"]'))
          // By default STRIIMVAULT ?
          .to.have.attr('value', 'STRIIMDEFAULTVAULT')
      });
      
    // Type Vault name
    cy.get('form').find('input[name="name"]').type(vaultname)

  }

  //// Finishing Vault name creating
  enterCorrectUsernameAndConfirmVaultnameCreating(vaultname){

    // Set correct Username
    // 1.click button to get line with Username
    cy.get('form').find('button[type="button"]').click()
    // 2.click line with Username
      .then(() =>(cy.get('div[id^="react-select-"][id$="-option-0"]')
                  .contains(tD.correctUsername)
                  .should('be.visible')
                  .click()))
    // Click Confirm button 
    cy.get('button[type="button"][data-test-id="vaults-add-vault-confirm-button"]').click()
    // Greeting
    cy.contains('Vault saved successfully').should('be.visible')

    cy.wait(tD.timeOutVault) //BAD !!!!!!
    
  }

  //// Is there name 'Vaults' at the top of the table ?
  isDeskVaultsVisible(){

    cy.get('h2').contains('Vaults').should('be.visible')  

  }

  //// Next Vault name(not first !!!)
  clickButtonAddVaultToCreateNextVault(){
    cy.get('button[data-testid="striim-button"]')
      .contains('Add vault')
      .should('be.visible')
      .click()

  }
  
  //// Click Button to start filling out the table 'Vaults' 
  clickAddVaultValueButtonToStartCreatingVaultValue(vaultname){

    cy.get(`div[data-test-id="collapsible-container-header"]:contains(${vaultname})\
      button[type="button"][data-test-id="add-vault-link"]:contains("Add vault value")`)
      .should('be.visible')
      .wait(3000)
      .click() 
      
  }

  //// Filling out the table 'Vaults'  
  creatingVaultValue(vaultname,vaultkey,vaultvalue){
   
    // Typing Vault key
    cy.get('input[id="data-test-id-vault-key"][type="text"]')
      .should('be.visible')
      .type(vaultkey)

    // Choosing Vault value type
    // 1.click button to get line with String type
    cy.get('div[data-test-id="autocomplete-select"][id="data-test-id-vault-value-type"]')
      .find('button[type="button"]')
      .eq(1)
      .click()
        // 2.click line with Username
        .then(() => (
          cy.get('div[id^="react-select-"][id$="-option-0"]')
          .contains('STRING')
          .should('be.visible')
          .click())
        )
          .then(() =>
            // Typing Vault value      
            cy.get('input[id="data-test-id-vault-value"][type="password"]')
              //.should('be.visible')
              //.should('not.have.attr', 'disabled')
              .type(vaultvalue)
        )     
    // Vault Usage
    cy.get(`div[data-test-id="collapsible-container-header"]:contains(${vaultname})`)
      .parent() 
      .find('tbody td')
      .eq(3)
      .should('have.text',`[[${tD.correctUsername}.${vaultname}.${vaultkey}]]`)

    // Saving information
    cy.get('button[data-test-id="vault-value-save-button"]')
      .contains('Save')
      .click()

    // Message about successful  Vault data record
    cy.contains('Vault value successfully saved').should('be.visible')

    // Find button Edit
    cy.get('table tbody tr')                       // Find the row with the specified Vault Usage key 
      .contains('td:nth-child(4)', `[[${tD.correctUsername}.${vaultname}.${vaultkey}]]`)  // in the fourth column
      .parent()                                    // Navigate to the parent row
      .find('button[data-test-id="edit-vault-value-button"]') //Searching for button 'Edit'
      .contains('Edit')
      .should('be.visible',{timeout:tD.timeOutVault})

  }
  
  //// Reading 'Vault value'
  readingVaultValue(namespace,vaultname,vaultkey){

    const vaultUsageKey = `[[${namespace}.${vaultname}.${vaultkey}]]`

    cy.get('table tbody tr')                       // Find the row with the specified Vault Usage key 
      .contains('td:nth-child(4)', vaultUsageKey)  // in the fourth column
      .parent()                                    // Navigate to the parent row
      .find('input[type="password"]')
      .invoke('val')                               // Get the value of the password 
      .then((vaultValue) => {                      
        cy.log('Value: ', vaultValue)    // Callback function 'cy.log' with par.'vaultValue'
      })

  }  

  //// Editing 'Vault value' 
  editingVaultValue(namespace,vaultname,vaultkey,newvaultvalue){
    
    const vaultUsageKey = `[[${namespace}.${vaultname}.${vaultkey}]]`

    // Find button Edit
    cy.get('table tbody tr')                       // Find the row with the specified Vault Usage key 
      .contains('td:nth-child(4)', vaultUsageKey)  // in the fourth column
      .parent()                                    // Navigate to the parent row
      .find('button[data-test-id="edit-vault-value-button"]') //Searching for button 'Edit'
      .contains('Edit')
      .click()

    // Typing New vault value
    cy.get('table tbody tr') 
      .contains('td:nth-child(4)', vaultUsageKey)
      .parent()
      .find('input[id="data-test-id-vault-value"][type="password"]') //Searching for input field
      .clear()
      .type(newvaultvalue)
    
    // Saving information
    cy.get('table tbody tr') 
      .contains('td:nth-child(4)', vaultUsageKey)
      .parent()
      .find('button[data-test-id="vault-value-save-button"]') //Searching for 'Save' button
      .contains('Save')
      .click()
    
      // Message about successful  Vault data record
      cy.contains('Vault value successfully saved')    

  }
  
  //// Deleting 'Vault value' 
  deletingVaultValue(namespace,vaultname,vaultkey){

    const vaultUsageKey = `[[${namespace}.${vaultname}.${vaultkey}]]`

    cy.get('table tbody tr') 
      .contains('td:nth-child(4)', vaultUsageKey)
      .parent()
      //Searching for 'Delete' button
      .find('span[data-test-id="vaults-delete-vault-value-button"] button') 
      .contains('Delete')
      .click()

  }

  //// Deleting Vault(name)
  deleteVault(vaultname){

    // Find button (right side) for this Vault name to get features and click
    cy.get(`button[type="button"][data-test-id="${vaultname}-menu"]`).click()
    // Choose feature 'Delete' and click
    .then(() =>(cy.contains('Delete').should('be.visible').click()))
    // Cofirm deleting
    .then(() =>(cy.get('button[type="button"][data-test-id="vaults-delete-vault-button-confirm"]').click()))
    // Validate appearence of success deleting message
    .then(() => cy.contains(`Vault ${vaultname} deleted successfully`)) 

  } 

}

export default VaultsPage

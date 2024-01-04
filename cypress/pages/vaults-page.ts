// VaultsPage(Page Object Module) for testing developer.striim.com
// 3 BAD

import { testData, urlData } from '../config/config-t7'

class VaultsPage {

  //// Vaults Page Methods
      
  //// Check that site was redirected to vaults page 
  isVaultsPageUrl() {

    cy.url().should('eq', urlData.urlVaultsPage )

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


  enterCorrectUsernameAndConfirmVaultnameCreating(){

    // Set correct Username
    // 1.click button to get line with Username
    cy.get('form').find('button[type="button"]').click()
    // 2.click line with Username
    //!!!!!!!!!! - problem
    .then(() =>(cy.get('div[class=" css-d7l1ni-option"]')///////// BAD1!!!!!!!!  //1.[id="react-select-2-option-0"] 2.<div class=" css-d7l1ni-option" aria-disabled="false" id="react-select-2-option-0" tabindex="-1">Vitaliy123</div>
                  .contains(testData.correctUsername)
                  .should('be.visible')
                  .click()))
    // Click Confirm button 
    cy.get('button[type="button"][data-test-id="vaults-add-vault-confirm-button"]').click()
    // Text 'Success' must appear - Vault name is created
    cy.contains('Vault saved successfully') //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!- make better
    //cy.log([['Vitaliy123.Vaultname123.Vaultkey123']])

  }

  //// Is there name 'Vaults' over the table 
  isDeskVaultsVisible(){

    cy.get('h2').contains('Vaults').should('be.visible')  

  }
  // Next Vault name(not first !!!)
  clickButtonAddVaultToCreateNextVault(){
    cy.get('button[data-testid="striim-button"]')
      .contains('Add vault')
      .should('be.visible').click()

  }
  
  //// Click Button to start illing out the table 'Vaults' 
  clickAddVaultValueButtonToStartCreatingVaultValue(vaultname){

    cy.wait(3000)  //i don't like this
    /*cy.get('div[data-test-id="collapsible-container-header"] span[data-test-id="vault-value-collapsible-label"]:contains("B_name0")')
      .parent('div')
      .find('button[data-test-id="add-vault-link"]')//:contains("Add vault value")
      .click();

    //cy.get(`div[data-test-id="collapsible-container-header"] span[data-test-id="vault-value-collapsible-label"]:contains("${vaultname}")`)
    //  .find('button[type="button"][data-test-id="add-vault-link"]:contains("Add vault value")').click()*/
    cy.get('button[type="button"][data-test-id="add-vault-link"]:contains("Add vault value")').eq(1).click()  ///////// Bad2 !!!!!!!
  }

  //// Filling out the table 'Vaults'  
  creatingVaultValue(vaultname,vaultkey,vaultvalue){
   
    // Typing Vault key
    cy.get('input[id="data-test-id-vault-key"][type="text"]')
      .type(vaultkey)
    // Choosing Vault value type
    // 1.click button to get line with String type
    cy.get('div[data-test-id="autocomplete-select"][id="data-test-id-vault-value-type"]')
      .find('button[type="button"]')
      .eq(1)
      .click()
        // 2.click line with Username
        .then(() => (
          cy.get('div[class=" css-d7l1ni-option"]')//[id="react-select-4-option-0"]   /////////// Bad3 !!!!!!!
          .contains('STRING')
          .should('be.visible')
          .click())
        )
    // Typing Vault value      
    cy.get('input[id="data-test-id-vault-value"][type="password"]')
      .type(vaultvalue)
    // Vault Usage
    cy.get('tbody')
      .find('td')
      .eq(3)
      .should('have.text',`[[${testData.correctUsername}.${vaultname}.${vaultkey}]]`)      
    // Saving information
    cy.get('button[data-test-id="vault-value-save-button"]')
      .contains('Save')
      .click()
    // Message about successful  Vault data record
    cy.contains('Vault value successfully saved') 

  }
  
  // Reading 'Vault value'
  readingVaultValue(namespace,vaultname,vaultkey){

    const vaultUsageKey = `[[${namespace}.${vaultname}.${vaultkey}]]`

    cy.get('table tbody tr')                       // Find the row with the specified Vault Usage key 
      .contains('td:nth-child(4)', vaultUsageKey)  // in the fourth column
      .parent()                                    // Navigate to the parent row
      .find('input[id="data-test-id-vault-value"][type="password"]') 
      // It's better than .find('td:nth-child(3) input[type="password"]')
      .invoke('val')                               // Get the value of the password 
      .then((vaultValue) => {                      
        cy.log('Retrieved  Value:', vaultValue)    // Callback function 'cy.log' with par.'vaultValue'
      })

  }  

  // Editing 'Vault value' 
  editingVaultValue(namespace,vaultname,vaultkey,newvaultvalue){
    
    // Find button Edit
    //New
    const vaultUsageKey = `[[${namespace}.${vaultname}.${vaultkey}]]`

    cy.get('table tbody tr')                       // Find the row with the specified Vault Usage key 
      .contains('td:nth-child(4)', vaultUsageKey)  // in the fourth column
      .parent()                                    // Navigate to the parent row
      .find('button[data-test-id="edit-vault-value-button"]') //Searching for button 'Edit'
      .contains('Edit')
      .click()
    //End
    //Old  
    //cy.get('button[data-test-id="edit-vault-value-button"]')
    //  .contains('Edit')
    //  .click()

    //New
    // Typing New vault value
    cy.get('table tbody tr') 
      .contains('td:nth-child(4)', vaultUsageKey)
      .parent()
      .find('input[id="data-test-id-vault-value"][type="password"]') //Searching for input field
      .clear()
      .type(newvaultvalue)
    //End
    //Old  
    //cy.get('input[id="data-test-id-vault-value"][type="password"]')
    //  .clear()
    //  .type(newvaultvalue)

    //New
    // Saving information
    cy.get('table tbody tr') 
      .contains('td:nth-child(4)', vaultUsageKey)
      .parent()
      .find('button[data-test-id="vault-value-save-button"]') //Searching for 'Save' button
      .contains('Save')
      .click()
    //End
    //Old
    //cy.get('button[data-test-id="vault-value-save-button"]')
    //  .contains('Save')
    //  .click()

    // Message about successful  Vault data record
    cy.contains('Vault value successfully saved')    

  }
  //New
  // Deleting 'Vault value' 
  deletingVaultValue(namespace,vaultname,vaultkey){
    const vaultUsageKey = `[[${namespace}.${vaultname}.${vaultkey}]]`
    cy.get('table tbody tr') 
      .contains('td:nth-child(4)', vaultUsageKey)
      .parent()
      //Searching for 'Delete' button
      .find('span[data-test-id="vaults-delete-vault-value-button"] button') 
      .contains('Delete')
      .click()
  //End
  //Old
  //  cy.get('span[data-test-id="vaults-delete-vault-value-button"] button')
  //    .contains('Delete')
  //    .click();

  }

  //// Delete Vault(name)
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

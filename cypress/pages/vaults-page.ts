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

  // Reading 'Vault value' by Vaultname1 and Vaultkey1
  readingVaultValue(vaultname,vaultkey){

    // Use cy.get to select the input element by its ID
    cy.get('#data-test-id-vault-value').invoke('val').then((inputValue) => {
    // Log the value to the Cypress command log
    cy.log(`Value of the input field: ${inputValue}`)

      })
  }
  

  // Editing 'Vault value' by Vaultname1 and Vaultkey1
  editingVaultValue(vaultname,vaultkey,newvaultvalue){

    // Find button Edit
    cy.get('button[data-test-id="edit-vault-value-button"]')
      .contains('Edit')
      .click()

    // Typing New vault value      
    cy.get('input[id="data-test-id-vault-value"][type="password"]')
      .clear()
      .type(newvaultvalue)

    // Saving information
    cy.get('button[data-test-id="vault-value-save-button"]')
      .contains('Save')
      .click()

    // Message about successful  Vault data record
    cy.contains('Vault value successfully saved')    

  }

  // Deleting 'Vault value' by Vaultname1 and Vaultkey1
  deletingVaultValue(vaultname,vaultkey){

    cy.get('span[data-test-id="vaults-delete-vault-value-button"] button')
      .contains('Delete')
      .click();

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

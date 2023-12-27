// VaultsPage(Page Object Module) for testing developer.striim.com

import { testData, urlData } from '../config/config'

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
  clickButtonAddVault() {

    cy.get('button[data-testid="striim-button"]')
      .contains('Add Vault')
      .should('be.visible').click()

  }

  //// Filling out the table 'Add Vault'
  enterVaultNameForStriimVaultType(){

    // Check if 'Add Vault' desk is visible
    cy.get('div[data-testid="striim-dialog-paper"]')
      .contains('h1','Add Vault').should('be.visible')
    // 'Vault Type' is visible
    cy.get('div[data-testid="striim-dialog-content"]')
      .contains('p','Vault Type').should('be.visible')
    // Check if STRIIMVAULT type is chosen by DEFAULT      
    cy.get('div[data-testid="striim-dialog-content"]')
      .find('fieldset label')
      .eq(0)
      // consruction '.should(($label)'  allows to validate many events
      .should(($label) => {
        // Check the input element within the label
        expect($label.find('input[name="vault-types"]'))
          // By default STRIIMVAULT ?
          .to.have.attr('value', 'STRIIMDEFAULTVAULT')
      });
    // Type Vault name
    cy.get('form').find('input[name="name"]').type(testData.vaultName)
    // Set correct Username
    // 1.click button to get line with Username
    cy.get('form').find('button[type="button"]').click()
    // 2.click line with Username
    .then(() =>(cy.get('div[id="react-select-2-option-0"]').contains(testData.correctUsername).should('be.visible').click()))
    // Click Confirm button 
    cy.get('button[type="button"][data-test-id="vaults-add-vault-confirm-button"]').click()
    // Text 'Success' must appear - Vault name is created
    cy.contains('Success') //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!- make better
    //cy.log([['Vitaliy123.Vaultname123.Vaultkey123']])

  }

  //// Is there name 'Vaults' over the table 
  isDeskVaultsVisible(){

    cy.get('h2').contains('Vaults').should('be.visible')  // !!!!!!!!!!!!!!!!

  }
  
  //// Click Button to start illing out the table 'Vaults' 
  clickAddVaultValueButtonToStartCreatingVaultValue(){

    cy.wait(3000)  //i don't like this
    cy.get('button[type="button"][data-test-id="add-vault-link"]').click()
  }

  //// Filling out the table 'Vaults'  
  CreatingVaultValue(){

    // Typing Vault key
    cy.get('div[data-test-id="vault"] td')
      .eq(0)
      .find('input[type="text"]')
      .type(testData.vaultKey)
    // Choosing Vault value type
    // 1.click button to get line with String type
    cy.get('div[data-test-id="vault"] td')
      .eq(1)
      .find('button[type="button"]')
      .eq(1).
      click()
        // 2.click line with Username
        .then(() => (
          cy.get('div[id="react-select-4-option-0"]')
          .contains('STRING')
          .should('be.visible')
          .click())
        )
    // Typing Vault value      
    cy.get('td')
      .eq(2)
      .find('input[id="data-test-id-vault-value"][type="password"]')
      .type(testData.vaultValue)
    // Saving information
    cy.get('td')
      .eq(4)
      .find('button[data-test-id="vault-value-save-button"]')
      .find('span')
      .eq(0)
      .contains('Save')
      .click()
    // Message about successful record about Vault data
    cy.contains('Success') //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!- make better

  }

  //// Delete Vault(name)
  deleteVault(){

  // Find button (right side) for this Vault name to get features and click
  cy.get('button[type="button"][data-test-id="Vaultname123-menu"]').click()
  // Choose feature 'Delete' and click
  .then(() =>(cy.contains('Delete').should('be.visible').click()))
  // Cofirm deleting
  .then(() =>(cy.get('button[type="button"][data-test-id="vaults-delete-vault-button-confirm"]').click()))
  // Validate appearence of success deleting message
  .then(() => cy.contains(`Vault ${testData.vaultName} deleted successfully`)) // !!!!!!!!!!!!!!!!!!

  } 

}

export default VaultsPage

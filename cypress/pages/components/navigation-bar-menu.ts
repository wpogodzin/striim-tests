class NavigationBarMenu {
  
   category: string
   submenu: string

  clickMenuItem(category,submenu){

    // Trigger mouseover on the "Apps" dropdown to reveal the menu
    cy.get(`[data-testid="striim-dropdown-children"] li:contains("${category}")`)
    .should('exist')
    .trigger('mouseover')

    // Use cy.contains to find and click "View All Apps"
    cy.contains(`${submenu}`).should('exist').click()

  }

  clickBarItem(category){
    
    // Trigger mouseover on the "Apps" dropdown to reveal the menu
    cy.get(`div a[id="nav--button-console"]:contains("${category}")`)
    .should('exist')
    .click()
  
  }

}

export default NavigationBarMenu
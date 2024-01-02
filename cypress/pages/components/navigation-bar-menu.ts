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
  /*
  mouseoverAppsAndViewAllApps() {

    // Trigger mouseover on the "Apps" dropdown to reveal the menu
    cy.get('[data-testid="striim-dropdown-children"] li:contains("Apps")')
      .should('exist')
      .trigger('mouseover')

    // Use cy.contains to find and click "View All Apps"
    cy.contains('View All Apps').should('exist').click()
  }    

  mouseoverManageStriimAndClickVaults() {

    // Trigger mouseover on the "Apps" dropdown to reveal the menu
    cy.get('[data-testid="striim-dropdown-children"] li:contains("Manage Striim")')
      .should('exist')
      .trigger('mouseover')

    // Use cy.contains to find and click "View All Apps"
    cy.contains('Vaults').should('exist').click()
  }    
*/  
}

export default NavigationBarMenu
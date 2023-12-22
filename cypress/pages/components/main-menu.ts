class MainMenu {

  viewAllApps() {

    // Trigger mouseover on the "Apps" dropdown to reveal the menu
    cy.get('[data-testid="striim-dropdown-children"] li:contains("Apps")')
      .should('exist')
      .trigger('mouseover')

    // Use cy.contains to find and click "View All Apps"
    cy.contains('View All Apps').should('exist').click()
  }    
  
}

export default MainMenu
// ApplicationListPage(Page Object Module) for testing developer.striim.com

import { testData, urlData } from '../config/config';

class ApplicationListPage {

  ///////    Methods ///////

  isLoadingPageUrl() {
    cy.url().should('eq', urlData.urlLandingPage );
  }

}

export default ApplicationListPage;

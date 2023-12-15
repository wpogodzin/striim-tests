// LandingPage(Page Object Module) for testing developer.striim.com

import { testData, urlData } from '../config/config';

class LandingPage {

  ///////    Methods ///////

  isLandingPageUrl() {
    cy.url().should('eq', urlData.urlLandingPage );
  }

}

export default LandingPage;

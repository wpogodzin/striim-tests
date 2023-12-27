# striim-tests
commits:
1."tests(folder: e2e) for developer.striim.com based on POM.js(folder: pages) and config.js(folder: config)"
2.'i was trying to delete unexpectedly appeared files '.DS_Store'(there were 5 files!!!) in cypress directory and make commit without them
3. 13.12.23 - ready commit with notices made by Grzegorz(but i forgot to delete old files and describe changes in README)
4. 13.12.23 - changes comparing to 2(3) commits:
  - I deleted old files (1 copy-folder and two copy-files)
  - POM.js is converted to login-page.js and
    application-list-page.js,where elements of class are converted to methods and  old methods which were based on these elements has been deleted
  - t1-login-form-full-check.cy.ts uses methods of those above mentioned 2 page modules and became more informative.
  - config.js - some data has been deleted
 
5. 14.12.23 - loginPage.js:  method      checkErrorMessageAboutNotFillingOutAllFields() is added  
            - t1-login-form-full-check.cy.ts - 3 tests using  checkErrorMessageAboutNotFillingOutAllFields() are added

6. 15.12.23 - application-list-page.js is renamed to landing-page.js
            - landing-page.js is renamed to landing-page.ts
            - landing-page.ts class ApplicationList is renamed to LandingPage
            - login-page.js is renamed to login-page.ts
            - login-page.ts : methods findLogoutButtonAndClick() and
              stillLoginPageHash() are added
            - new test t2-right-login-logout.cy.ts is added
            - t1-login-form-full-check.cy.ts  - changes connected with renaming
              AppliacationListPage to LandingPage
7. 19.12.23 - t3-create-delete-app.cy is created
            - flow-page.ts,create-app-pages.ts,applications-page.ts are added
            - replacing 'Vitaliy123' on `${testData.correctUsername}` everywhere
              (for other  variables is the same)

8. 22.12.23 - creating special main-menu.ts with Class Main Menu(and methods) _             which can be used by other pages(flow-page ...) 
9. 27.12.23 - new: t6-manage-striim-vaults, vaults page
            -rename in pages/components:     main-menu to   navigation-bar-menu           

            
                        
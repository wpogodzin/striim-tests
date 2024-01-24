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
10. 2.01.24 - What is done?:
            -avoiding using indices,          standartization of rules for names  and methods
            - splitting Add Vault Value on 2 methods
            - navigation Bar Menu - method clickMenuItem instead of previous two(Grzegorz variant is better)   
            - where it needs I add parameters to call f.ex. function  Add...(Vaultname)
            - new functions are created to read,edit and delete Vault value where important:
            1.parameters and 2. right getting of elements for reading,updating and deleting
            - creating 2 files: new test t7 with big scenario and config-t7 for a big test 
To do now: test t7            
To do later: 1.AssertUrl 
             2.Cypress.Commands.add('login', () => {
  myLoginPage.mistakeHandlingWhenValidateLoginWithCorrectCredentials();
  myLoginPage.setCorrectLoginAndPassword();
  myLoginPage.clickLogin();
  myLandingPage.isLandingPageUrl();
  myLandingPage.isGreetingWelcomeUserVisible();
}); 
      3.Navigation Menu Bar(Grzegorz variant) 
      4.Splitting Create vault value  on small methods         
    3.01.24 - t7 - scheme: - creating Vault name a
                           - creating Vault name b
                           - in b creating vault value 
                           - other actions with vault value(RUD) with wrong getting of elements
                           - deleting Vault names a,b

    4.01.24 - t7 - scheme: - right getting of elements using vault usage
            - vaults: - right getting of elements using vault usage as key

    7.01.24 - t7(according to scenario);
            - vault: all Bads - eliminated - left only 1 wait
          Scenario(t7): 
      
      1. B_name : cr(2 values)     
      2. C_name : cr(3 values)
      3.   B_value1 : cr 
      4.   B_value2 : cr
      5.   C_value1 : cr
      6.   C_value2 : cr
      7.   B_value1 : ed B_value1new
      8.   C_value1 : r
      9.  B_value1new : r
      10.  B_value2 : r
      11.B_name : del          
      12.  C_value2new : r
      13.  C_value1 : r  
      14.  C_value2new : del
      15.C_name : del

      17.01.24 t8,console-page.ts are added
      
      Scenario(t8): zero variant: aim to 'taste' console
     
      1. B_name : cr(1 value)
      2. C_name : cr(no values)
      3.   B_value1 : cr              
      4.   B_value1 : r in Console
      5. C_name : del
      6.   B_value1 : del
      7. B_name : del

24.01.24 Changes in scenario,t8,t9,console-page.ts,vaults-page.ts
Scenario(t9):  first variant(middle):
       1. B_name : cr(1 value)
       2. C_name : cr(1 value)
       2a.  C_value1 : cr                   using Console  
       3.   B_value1 : cr
       3a.  C_value1 : ed —> C_value1new              
       4.   B_value1 : r                    using Console
       4a.  C_value1new : r                 using Console
       4b.  C_value1new : del               using Console
       5. C_name : del                  
       6.   B_value1 : del
       7. B_name : del                       
      (I added actions with literals(2a,3a...) comparing with zero scenario)
t8(0 scenario): changing name of Console methods(cosmetic changes)       
t9(1 scenario): adding methods according to new scenario 
console-page.ts: new or corrected methods:
  - readVaultValueFromConsoleDeskAndCompare: more accurate reading of vaultValue
  - enterCommandWriteValueUsingNameAndKey: new
  - doesCommandWriteSucceed: new     
  - entercommandDeleteValueUsingNameAndKey: new
  - doesCommandDeleteSucceed: new
  vaults-page.ts: 
  - clickAddVaultValueButtonToStartCreatingVaultValue add '.wait(3000)', because    test didn't load element in time ,so next command 'click' didn't succeed

    My task : 1.readVaultValueFromConsoleDeskAndCompare, doesCommandWriteSucceed, doesCommandDeleteSucceed has common thing so we can using private method to simplify
    2. enterCommandWriteValueUsingNameAndKey, entercommandDeleteValueUsingNameAndKey - the same
    3.to make big scenario with 3 Vaultname

            
            
                        
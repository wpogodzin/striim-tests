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
 
  
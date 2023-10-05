## BIMM Automation Coding Challenge

This automation test suite is a JavaScript project that uses the Cypress framework to test the DemoQA website. 
The tests cover the following features:
* Alerts
* Browser windows
* Checkboxes
* Form submissions
* Radio buttons

The entire list of test cases can be found [here](https://github.com/monikaibana/bimm-automation/blob/dev/cypress/documentation/test-cases.md).

The project structure is organizated by three main directories.
* _e2e_ contains all the spec files, which are separated by feature. The spec files are where the test scripts are located.
* _fixtures_ contains test input data or static data to use for assertion.
* _support_ contains the `e2e.js` file, which imports custom commands from the `commands.js` file. It also has the `practice_form.js` file, which has helper functions for the form submission tests. 

Any cypress configurations are found in the `cypress.config.js` file

### To execute the test cases:

First clone the repo:

##### `git clone https://github.com/monikaibana/bimm-automation.git`

Next, cd into the root folder

##### `cd bimm-automation`

Next, install all dependencies

##### `npm i`

Then, either open Cypress test runner

##### `npm run cypress:open`

Or, execute headless Cypress tests

##### `npm run cypress:run`

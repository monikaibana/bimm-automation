const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://demoqa.com/',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: false, // prevent navigating to blank page after each test
  },
  experimentalModifyObstructiveThirdPartyCode: true, // quiet CORS error
  chromeWebSecurity: false, // quiet CORS error
});

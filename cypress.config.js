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
  experimentalModifyObstructiveThirdPartyCode: true, // to quiet the CORS error
  chromeWebSecurity: false, // to quiet the CORS error
});

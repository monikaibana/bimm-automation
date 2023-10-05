const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://demoqa.com/',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: false,
  },
  experimentalModifyObstructiveThirdPartyCode: true,
  chromeWebSecurity: false,
});

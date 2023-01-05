const { defineConfig } = require("cypress");
const dotenvPlugin = require('cypress-dotenv');
const path = require('path');


module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  defaultCommandTimeout: 15000,
  requestTimeout: 15000,
  e2e: {
    baseUrl: 'https://qatest.site',
    setupNodeEvents(on, config) {
      config = dotenvPlugin(config, { path: path.join(__dirname, '.env') }, true);
      return config;
    },
  },
  video: false,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'reports/test-results-[hash].xml',
  },
});

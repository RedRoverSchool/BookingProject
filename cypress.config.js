const { defineConfig } = require("cypress");
const { rmdir } = require('fs')

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  defaultCommandTimeout: 15000,
  requestTimeout: 15000,
  trashAssetsBeforeRuns: true,
  e2e: {
    baseUrl: 'https://qatest.site',
    setupNodeEvents(on, config) {
      // implement node event listeners here
        on('task', {
          deleteFolder() {
            console.log('deleting folder downloads')
            return new Promise((resolve) => {
              rmdir('cypress/downloads', { recursive: true },  (err) => {
                if (err) {
                  console.error(err)
                }
                resolve(null)
              })
            })
          },
        })
    },
  },
  video: false,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'reports/test-results-[hash].xml',
  },
});


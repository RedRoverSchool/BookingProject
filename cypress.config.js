const { defineConfig } = require("cypress");
const { rmdir } = require('fs')
const { verifyDownloadTasks } = require('cy-verify-downloads');

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  defaultCommandTimeout: 15000,
  requestTimeout: 15000,
  e2e: {
    experimentalSessionAndOrigin: true,
    testIsolation: "off",
    baseUrl: 'https://qatest.site',
    setupNodeEvents(on, config) {
      // implement node event listeners here
        on('task', {
          deleteFolder() {
            console.log('deleting folder downloads')
            return new Promise((resolve) => {
              rmdir('cypress/downloads', {maxRetries: 10,  recursive: true , force: true },  (err) => {
                if (err) {
                  console.error(err)
                }
                resolve(null)
              })
            })
          },
        }),
        on('task', verifyDownloadTasks)
    },
  },
  video: false,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'reports/test-results-[hash].xml',
  },
});


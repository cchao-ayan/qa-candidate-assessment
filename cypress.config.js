const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/e2e/ui-tests/reports/mochawesome", // Directory for Mochawesome reports
      screenshotsFolder: "cypress/e2e/ui-tests/reports/screenshots", // Directory for screenshots
      videosFolder: "cypress/e2e/ui-tests/reports/videos", // Directory for videos
      overwrite: false,
      html: true,
      json: true
    },
    baseUrl: "https://www.saucedemo.com"
  },
});

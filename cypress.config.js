const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  watchForFileChanges: false,
  retries: {
    openMode: 2,
    runMode: 2
  },
  env: {
    "username": "admin",
  },
  e2e: {
    baseUrl: "https://www.crazytesting.com",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

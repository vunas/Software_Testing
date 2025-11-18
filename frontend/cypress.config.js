const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.spec.js",
    setupNodeEvents(on, config) {},
  },
});

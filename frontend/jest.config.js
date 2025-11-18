module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  setupFiles: ["<rootDir>/jest.env.js"],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

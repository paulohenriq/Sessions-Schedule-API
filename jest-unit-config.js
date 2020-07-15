const config = require('./jest.config');

config.testMatch = ['<rootDir>/versions/v1/**/*.spec.js'];
module.exports = config;

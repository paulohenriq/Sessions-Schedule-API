const config = require('./jest.config');

config.testMatch = ['<rootDir>/versions/v1/**/*.test.js'];
module.exports = config;

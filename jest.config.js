module.exports = {
  displayName: 'v1',
  // Indicates whether each individual test should be reported during the run
  verbose: false,
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '<rootDir>/versions/v1/**/**.js',
    '!<rootDir>/versions/v1/test/**',
  ],
  // The directory where Jest should output its coverage files
  coverageDirectory: '<rootDir>/versions/v1/test/coverage',
  // The test environment that will be used for testing
  testEnvironment: 'node',
  // The glob patterns Jest uses to detect test files
  testMatch: ['<rootDir>/versions/v1/**/*.spec.js'],

  testTimeout: 60000, // Increased minimum timeout
};

module.exports = {
  collectCoverageFrom: ['./client/src/**/*.{js,jsx,mjs}'],
  coverageDirectory: './client/coverage',
  coveragePathIgnorePatterns: [
    './node_modules/',
    './server/',
  ],
  setupTestFrameworkScriptFile: './client/src/setupTests.js',
  testMatch: [
    './client/src/**/tests/**/*.{js,jsx,mjs}',
    './client/src/**/?(*.)(spec|test).{js,jsx,mjs}',
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  testPathIgnorePatterns: [
    './node_modules/',
    './client/src/tests/__mocks__/',
    './client/src/tests/setup/',
  ],
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
};

module.exports = {
  collectCoverageFrom: ['<rootDir>/client/src/**/*.{js,jsx}'],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/server/',
    '<rootDir>/client/src/index.jsx',
    '<rootDir>/client/src/rootReducer.js',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/client/setupTests.js',
  testMatch: [
    '<rootDir>/client/src/**/tests/**/*.(spec|test).{js,jsx}',
    '<rootDir>/client/src/**/?(*.)(spec|test).{js,jsx}',
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/client/src/tests/__mocks__/',
    '<rootDir>/client/src/tests/setup/',
  ],
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
};

module.exports = {
  collectCoverageFrom: [
    '<rootDir>/client/src/**/*.{js,jsx}',
    '!<rootDir>/client/src/**/index.js',
    '!<rootDir>/client/src/config/*.js',
    '!<rootDir>/client/tests/**/*.(spec|test).{js,jsx}'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/server/',
    '<rootDir>/client/src/index.jsx',
    '<rootDir>/client/src/store/configureStore.js',
    '<rootDir>/client/e2e-tests/'
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/tests/__mocks__/fileMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/client/tests/setupTests.js'],
  testMatch: [
    '<rootDir>/client/tests/**/*.(spec|test).{js,jsx}',
    '<rootDir>/client/src/**/?(*.)(spec|test).{js,jsx}'
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
};

module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx}',
    '!<rootDir>/src/**/index.js',
    '!<rootDir>/src/config/*.js',
    '!<rootDir>/tests/**/*.(spec|test).{js,jsx}'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/../server/',
    '<rootDir>/src/index.jsx',
    '<rootDir>/src/store/configureStore.js',
    '<rootDir>/e2e-tests/'
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/tests/__mocks__/fileMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  testMatch: [
    '<rootDir>/tests/**/*.(spec|test).{js,jsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx}'
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  testPathIgnorePatterns: [
    '<rootDir>/../../node_modules/'
  ],
  transform: {
    '^.+\\.(js|jsx|mjs)$': ['babel-jest', { configFile: '<rootDir>/../../babel.config.json' }]
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
};

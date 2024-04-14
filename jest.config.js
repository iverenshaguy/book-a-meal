module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx}',
    '!<rootDir>/src/**/index.jsx',
    '!<rootDir>/src/config/*.js',
    '!<rootDir>/src/config/tests/**/*.(spec|test).{js,jsx}',
  ],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/scripts/',
    '<rootDir>/src/index.jsx',
    '<rootDir>/src/store/configureStore.js',
    '<rootDir>/e2e-tests/',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/src/config/tests/__mocks__/fileMock.js',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/src/config/tests/setupTests.js'],
  testMatch: ['<rootDir>/src/**/?(*.)(spec|test).{js,jsx}'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/../../node_modules/'],
  transform: {
    '^.+\\.(js|jsx|mjs)$': ['babel-jest', { configFile: '<rootDir>/../../babel.config.json' }],
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs)$'],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
};

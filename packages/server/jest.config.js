module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'ts'
  ],
  testRegex: '.(spec|e2e-spec).ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  coverageDirectory: '<rootDir>/v2/coverage',
  testEnvironment: 'node',
  collectCoverageFrom: [
    '<rootDir>/v2/src/**/*.ts',
    '!<rootDir>/v2/src/main.ts',
    '!<rootDir>/v2/src/common/config/**',
    '!<rootDir>/v2/src/test-helpers.ts',
    '!<rootDir>/v2/src/**/*.(spec|test).ts',
    '!<rootDir>/v2/tests/**/*.e2e-spec.ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/v2/tests/setupTests.ts'],
  coverageReporters: [
    ['lcov', { projectRoot: '/' }],
    'json',
    'text'
  ]
};

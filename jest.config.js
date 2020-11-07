/* eslint-disable max-len */
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
    '^[./a-zA-Z0-9$_-]+\\.png$': '<rootDir>/RelativeImageStub.js',
    'module_name_(.*)': '<rootDir>/substituted_module_$1.js',
    'assets/(.*)': [
      '<rootDir>/images/$1',
      '<rootDir>/photos/$1',
      '<rootDir>/recipes/$1',
    ],
  },
  setupFilesAfterEnv: ['jest-enzyme'],
  testEnvironment: 'enzyme',
  testEnvironmentOptions: { enzymeAdapter: 'react16' },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  verbose: true,
};

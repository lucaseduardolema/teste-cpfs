/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['dist'],
  collectCoverageFrom: ['./src/**'],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
};

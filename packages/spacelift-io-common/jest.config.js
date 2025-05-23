module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  transform: {
    '^.+\\.(ts|tsx)$/': [
      'ts-jest',
      {
        tsconfig: '../tsconfig.json',
      },
    ],
  },
  collectCoverageFrom: ['**/*.ts', '!index.ts', '!**/*.test.ts', '!**/*.spec.ts'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};

module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  transform: {
    '^.+\\.(ts|mjs)$': [
      'jest-preset-angular',
      { tsconfig: '<rootDir>/tsconfig.spec.json' }
    ]
  },
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(html)$': '<rootDir>/__mocks__/fileMock.js',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1'
  },
  testEnvironmentOptions: { url: 'http://localhost/' }
};

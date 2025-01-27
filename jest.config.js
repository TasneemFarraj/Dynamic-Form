export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Alias for absolute imports
    '\\.(css|scss)$': 'identity-obj-proxy', // Use identity-obj-proxy for CSS/SCSS
  },
};
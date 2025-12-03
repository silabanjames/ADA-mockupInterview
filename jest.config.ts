import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],  // Tentukan lokasi file test
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
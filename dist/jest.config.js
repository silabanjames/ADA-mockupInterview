"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/test/**/*.test.ts'], // Tentukan lokasi file test
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
exports.default = config;

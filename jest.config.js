const tsPreset = require('ts-jest/jest-preset')
const mongoMockPreset = require('@shelf/jest-mongodb/jest-preset')

module.exports = Object.assign(tsPreset, mongoMockPreset, {
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/**/*ts', '!<rootDir>/src/main/**', '!<rootDir>/src/**/*-protocols.ts'],
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
})

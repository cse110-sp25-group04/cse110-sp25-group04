export default {
    testEnvironment: 'node',
    collectCoverage: true,
    coverageReporters: ['text', 'lcov', 'html'],
    testMatch: ['<rootDir>/tests/**/*.test.js'],
    verbose: true,
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
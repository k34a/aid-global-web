/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

const config: Config = {
	// Automatically clear mock calls, instances, contexts and results before every test
	clearMocks: true,

	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,

	// The directory where Jest should output its coverage files
	coverageDirectory: "coverage",

	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: "v8",

	collectCoverageFrom: ["./src/**/*.{js,jsx,ts,tsx}", "!src/app/**/layout.*"],

	coverageThreshold: {
		global: {
			lines: 60,
		},
		"./src/**/*.{jsx,tsx}": {
			lines: 50,
		},
		"./src/**/*.{js,ts}": {
			lines: 90,
		},
	},

	// The test environment that will be used for testing
	testEnvironment: "jsdom",

	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},

	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);

import type { InitialOptionsTsJest } from 'ts-jest';
const config: InitialOptionsTsJest = {
	preset: 'ts-jest',
	verbose: true,
	testMatch: ['**/__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}'],
	moduleNameMapper: {
		'^lodash-es$': 'lodash'
	},
	collectCoverage: true
};
export default config;

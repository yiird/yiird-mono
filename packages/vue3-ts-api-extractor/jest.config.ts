import type { InitialOptionsTsJest } from 'ts-jest';
const config: InitialOptionsTsJest = {
	preset: 'ts-jest',
	globals: {
		'ts-jest': {
			tsconfig: './tsconfig.json'
		}
	},
	testMatch: ['**/__tests__/**/*.test.ts'],
	moduleNameMapper: {
		'^lodash-es$': 'lodash'
	},
	collectCoverage: true,
	collectCoverageFrom: ['**/__tests__/**/!(*.d).{ts}']
};

export default config;

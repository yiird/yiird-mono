import { InitialOptionsTsJest, pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json';
// const config: InitialOptionsTsJest = {
// 	preset: 'ts-jest',
// 	verbose: true,
// 	testEnvironment: 'node',
// 	testMatch: ['**/__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}'],
// 	moduleNameMapper: {
// 		'./(.*)': '<rootDir>/src/$1',
// 		'^lodash-es$': 'lodash'
// 	},
// 	collectCoverage: true,
// 	globals: {
// 		'ts-jest': {
// 			tsconfig: 'tsconfig.json'
// 		}
// 	}
// };
const config: InitialOptionsTsJest = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/?(*.)+(test).ts'],
	moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' }),
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
			useESM: true
		}
	}
};
export default config;

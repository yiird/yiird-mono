import { InitialOptionsTsJest } from 'ts-jest';
import { jsWithTs as tsjPreset } from 'ts-jest/presets';

const config: InitialOptionsTsJest = {
	testEnvironment: 'node',
	testMatch: ['**/?(*.)+(test).ts'],
	transform: {
		...tsjPreset.transform
	},
	transformIgnorePatterns: ['node_modules/(?!(markdown-table|lodash-es|string-width|ansi-regex|strip-ansi))'],
	//moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' }),
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
			useESM: true
		}
	}
};
export default config;

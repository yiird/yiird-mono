import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import externals from 'rollup-plugin-node-externals';
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default defineConfig([
	{
		input: './src/index.ts',
		output: [
			{ file: pkg.main, format: 'cjs', exports: 'named' },
			{ file: pkg.module, format: 'esm' }
		],
		plugins: [
			del({ targets: 'dist/*' }),
			externals({
				exclude: ['lodash-es', 'markdown-table', 'string-width']
			}),
			nodeResolve({ extensions }),
			commonjs(),
			babel({
				babelHelpers: 'runtime',
				exclude: '**/node_modules/**',
				extensions,
				presets: ['@babel/preset-env', '@babel/preset-typescript'],
				plugins: ['@babel/plugin-transform-runtime']
			})
		]
	},
	{
		// 生成 .d.ts 类型声明文件
		input: './src/index.ts',
		output: {
			file: pkg.types,
			format: 'es'
		},
		plugins: [dts()]
	}
]);

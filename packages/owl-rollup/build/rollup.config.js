import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { join, resolve } from 'path';
import { defineConfig } from 'rollup';
import del from 'rollup-plugin-delete';
import vue from 'rollup-plugin-vue';
import Components from 'unplugin-vue-components/rollup';

const extensions = ['.js', '.vue', '.jsx', '.ts', '.tsx'];
const plugins = [
	//external(),
	vue(),
	nodeResolve({ extensions }),
	commonjs(),
	babel({
		babelHelpers: 'runtime',
		exclude: '**/node_modules/**',
		extensions,
		babelrc: false,
		presets: [
			[
				'@babel/preset-env',
				{
					useBuiltIns: 'usage',
					corejs: '3.22'
				}
			],
			'@babel/preset-typescript'
		],
		plugins: ['@babel/plugin-transform-runtime' /* , '@babel/plugin-external-helpers' */, '@vue/babel-plugin-jsx']
	})
];

function createConfig(outdir) {
	const packagesDir = resolve('./components/');
	// const componentDirs = readdirSync(packagesDir, {
	// 	withFileTypes: true
	// });
	const configs = [];

	configs.push(
		defineConfig({
			input: join(packagesDir, '/index.ts'),
			external: ['vue', /^core-js/],
			output: [
				{ file: join(outdir, 'index.esm.js'), format: 'esm' },
				{ file: join(outdir, 'index.cjs.js'), format: 'cjs' }
			],
			plugins: [
				del({ targets: join(outdir, '/*') }),
				...plugins,
				Components({
					dirs: ['components'],
					dts: true
				})
			]
		})
	);

	// configs.push(
	// 	defineConfig({
	// 		input: join(packagesDir, '/index.ts'),
	// 		external: ['vue'],
	// 		output: {
	// 			file: join(outdir, 'index.browser.js'),
	// 			format: 'iife',
	// 			name: 'Owl',
	// 			globals: {
	// 				vue: 'Vue'
	// 			}
	// 		},
	// 		plugins
	// 	})
	// );
	// configs.push(
	// 	defineConfig({
	// 		input: 'dist/index.esm.js',
	// 		output: {
	// 			file: join(outdir, 'index.d.ts'),
	// 			format: 'es'
	// 		},
	// 		plugins: [dts()]
	// 	})
	// );

	// componentDirs.forEach((dir) => {
	// 	if (dir.isDirectory()) {
	// 		const inpath = join(packagesDir, dir.name, 'index.ts');
	// 		const outpath = join(outdir, dir.name, `index.js`);

	// 		const config = defineConfig({
	// 			input: inpath,
	// 			output: [{ file: outpath, format: 'esm' }],
	// 			plugins: [del({ targets: join(outdir, `${dir.name}/*`) }), ...plugins]
	// 		});
	// 		configs.push(config);
	// 	}
	// });

	return configs;
}

export default createConfig('dist');

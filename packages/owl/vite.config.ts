/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
	clearScreen: false,
	plugins: [
		vue(),
		jsx(),
		// Components({
		// 	dts: './client.d.ts'
		// }),
		dts({
			entryRoot: './src',
			outputDir: 'types',
			staticImport: true,
			cleanVueFileName: true,
			exclude: ['**/env.d.ts', '**/client.d.ts']
		})
	],
	build: {
		watch: {
			exclude: ['./types', '**/*.scss']
		},
		lib: {
			entry: './src/main.ts',
			name: 'Owl',
			fileName: (format) => `owl.${format}.js`
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue'
				}
			}
		}
	},
	test: {
		environment: 'happy-dom'
	}
});

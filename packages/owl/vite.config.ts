/// <reference types="vitest" />
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
	clearScreen: false,
	plugins: [
		vue(),
		jsx(),
		dts({
			entryRoot: './src',
			outputDir: 'types',
			staticImport: true,
			cleanVueFileName: true,
			exclude: ['**/env.d.ts', '**/client.d.ts', 'docs/**']
		}),
		vueI18n({
			include: resolve(__dirname, '../../src/locales/**')
		})
	],
	esbuild: {
		treeShaking: true
	},
	resolve: {
		alias: {
			'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
		}
	},
	build: {
		minify: 'terser',
		// watch: {
		// 	exclude: ['./types']
		// },
		lib: {
			entry: './src/main.ts',
			name: 'Owl',
			fileName: (format) => `owl.${format}.js`
		},
		rollupOptions: {
			external: ['vue', '@yiird/owl'],
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

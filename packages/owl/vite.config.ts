import { fileURLToPath, URL } from 'node:url';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
	clearScreen: false,
	plugins: [
		vue(),
		vueJsx(),
		dts({
			entryRoot: './src',
			outputDir: 'types',
			staticImport: true,
			cleanVueFileName: true,
			exclude: ['**/env.d.ts', '**/client.d.ts', 'docs/**']
		}),
		vueI18n({
			include: resolve(__dirname, './src/locales/messages/**')
		})
	],
	esbuild: {
		treeShaking: true
	},
	resolve: {
		alias: {
			'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
			'@': fileURLToPath(new URL('./src', import.meta.url))
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
	}
});

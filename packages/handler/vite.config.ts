import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const libEntry = resolve(__dirname, 'src/main.ts');
// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: libEntry,
			name: 'YEHandlers',
			formats: ['cjs', 'es'],
			fileName: 'yiird-handler'
		}
	},
	plugins: [
		dts({
			rollupTypes: true
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
});

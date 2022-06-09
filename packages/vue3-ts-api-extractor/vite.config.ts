import path from 'path';
import { defineConfig } from 'vite';
import { vitePluginCommonjs } from 'vite-plugin-commonjs';
import dts from 'vite-plugin-dts';
function resolve(filePath: string) {
	return path.join(__dirname, filePath);
}

export default defineConfig({
	mode: 'production',
	clearScreen: false,
	build: {
		target: 'es2015',
		emptyOutDir: true,
		outDir: './dist',
		lib: {
			entry: resolve('./src/index.ts'),
			name: 'Vue3TsApiExtractor',
			formats: ['es', 'cjs'],
			fileName: (format) => `index.${format}.js`
		},
		rollupOptions: {
			external: ['fs', 'glob', 'lodash-es', 'typescript', '@phenomnomnominal/tsquery', '@vue/compiler-core', '@vue/compiler-sfc']
		}
	},
	plugins: [vitePluginCommonjs(), dts()]
});

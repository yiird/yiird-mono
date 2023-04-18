import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
const libEntry = resolve(__dirname, 'src/index.ts');

// https://vitejs.dev/config/
export default defineConfig({
    clearScreen: false,
    build: {
        lib: {
            entry: libEntry,
            name: 'YEHandlers',
            formats: ['cjs', 'es'],
            fileName: 'index'
        },
        rollupOptions: {
            external: ['@yiird/vue3-ts-api-extractor', 'node:path', 'vite', 'vitepress']
        }
    },
    plugins: [
        dts({
            rollupTypes: true,
            exclude: ['node_module/**', '**/*.vue']
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});

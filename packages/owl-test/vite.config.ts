import vue from '@vitejs/plugin-vue';
import { YEComponentResolver } from '@yiird/handler';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [
                YEComponentResolver({
                    debug: true
                })
            ]
        })
    ]
});

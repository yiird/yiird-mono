import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { YEComponentResolver } from '@yiird/handler';
import { capitalize, kebabCase } from 'lodash';
import { resolve } from 'node:path';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { pkgExports } from './scripts/pkg-exports-reset';
import type { EntryInfo } from './scripts/type';

let buildInfo: EntryInfo = {
    entry: resolve(__dirname, 'packages/index.ts'),
    outDir: 'dist',
    fileName: 'yiird-elements',
    name: 'YE'
};

if (process.env.LIB_DIR && process.env.LIB_NAME) {
    const libDir = process.env.LIB_DIR;
    const libName = process.env.LIB_NAME;
    buildInfo = {
        paramLibDir: libDir,
        paramLibName: libName,
        entry: resolve(__dirname, libDir, 'index.ts'),
        outDir: resolve(__dirname, 'dist', 'standalone', libName),
        fileName: 'index',
        name: capitalize(libName)
    };

    pkgExports(buildInfo, 'reset' == process.env.PKG_RESET);
}

function buildConfig(info: EntryInfo) {
    return defineConfig({
        build: {
            outDir: info.outDir,
            lib: {
                ...info,
                formats: ['es', 'umd']
            },
            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                external: ['vue'],
                output: {
                    // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    globals: {
                        vue: 'Vue'
                    }
                }
            }
        },
        plugins: [
            vue(),
            vueJsx(),
            dts({
                clearPureImport: false,
                cleanVueFileName: true,
                skipDiagnostics: true,
                rollupTypes: true
            }),
            Components({
                globs: ['packages/*.{vue}'],
                resolvers: [
                    YEComponentResolver({
                        prefix: 'y',
                        debug: true,
                        exportName: 'default',
                        from: ({ partialName }) => {
                            return resolve(__dirname, `packages/${kebabCase(partialName)}/template.vue`);
                        }
                    })
                ]
            })
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        }
    });
}

export default buildConfig(buildInfo);

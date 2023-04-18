import { componentsResolver, extractCommentsPlugin, sinnpetToCustomblockPlugin } from '@yiird/vite-plugin-vue-yiird-helper';
import { isArray, kebabCase } from 'lodash';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, type MarkdownOptions } from 'vitepress';

const markdownOptions: MarkdownOptions = {
    lineNumbers: true
};

export default defineConfig({
    title: 'Test Docs',
    description: '测试文档网页',
    markdown: markdownOptions,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: '组件', link: '/components/' },
            { text: 'Examples', link: '/markdown-examples' }
        ],
        siteTitle: 'Doc',
        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' }
                ]
            }
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
    },
    vite: {
        clearScreen: false,
        esbuild: {
            treeShaking: true
        },

        plugins: [
            Components({
                globs: ['../../packages/*.{vue}'],
                resolvers: [
                    componentsResolver({
                        prefix: 'y',
                        debug: true,
                        exportName: 'default',
                        from: ({ partialName }) => {
                            return resolve(__dirname, `../../packages/${kebabCase(partialName)}/template.vue`);
                        }
                    })
                ]
            }),
            extractCommentsPlugin({
                root: resolve(__dirname, '../../'),
                scanDirs: ['./packages'],
                outputDir: './docs/components',
                filename({ outfilename, outDir, info }) {
                    if (!isArray(info)) {
                        return resolve(outDir, kebabCase(info.comment.name) + '.md');
                    }
                    return outfilename;
                }
            }),
            sinnpetToCustomblockPlugin({
                include: /example-components.*(.vue)$/,
                injectComponentPropertiesName: 'PRE_BLOCK'
            })
        ]
    }
});
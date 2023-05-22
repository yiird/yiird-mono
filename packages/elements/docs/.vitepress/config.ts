import { componentsResolver, extractCommentsPlugin, sinnpetToCustomblockPlugin } from '@yiird/vite-plugin-vue-yiird-helper';
import { isArray, kebabCase } from 'lodash';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { defineConfig, type MarkdownOptions } from 'vitepress';

const markdownOptions: MarkdownOptions = {
    lineNumbers: true
};

console.log(process.env.NODE_ENV);

const yeComponentsResolver = () => {
    if (process.env.NODE_ENV === 'production') {
        return componentsResolver({
            prefix: 'y'
        });
    } else {
        return componentsResolver({
            prefix: 'y',
            from: ({ partialName }) => {
                // console.log(process.env.NODE_ENV)
                return resolve(__dirname, `../../packages/index.ts`);
            }
        });
    }
};

export default defineConfig({
    title: 'Test Docs',
    description: '测试文档网页',
    markdown: markdownOptions,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            { text: '组件', link: '/components/', activeMatch: '/components/' },
            { text: 'Examples', link: '/examples/', activeMatch: '/examples/' }
        ],
        siteTitle: 'Doc',
        sidebar: {
            '/components/': generateComponentSiderBar(),
            '/examples/': generateExampleSiderBar()
        },

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
                resolvers: [yeComponentsResolver()]
            }),
            extractCommentsPlugin({
                root: resolve(__dirname, '../../'),
                scanDirs: ['./packages'],
                outputDir: './docs/components',
                clean: {
                    target: [/components.*(.md)$/],
                    ignore: [/components.*(index.md)$/]
                },
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

function components(baseUrl: string) {
    const arr: any[] = [
        {
            text: '基础组件',
            items: [
                { text: '主题', link: `${baseUrl}/theme` },
                { text: '图标', link: `${baseUrl}/icon` },
                { text: '按钮', link: `${baseUrl}/btn` }
            ]
        },
        {
            text: '数据',
            items: [
                { text: '树', link: `${baseUrl}/tree` },
            ]
        }
    ];

    if (baseUrl === '/examples') {
        arr.push({
            text: '布局',
            items: [
                {
                    text: '栅格',
                    link: `${baseUrl}/grid`
                },
                {
                    text: '框架',
                    link: `${baseUrl}/framework`
                },
                {
                    text: '选项卡',
                    link: `${baseUrl}/tabs`
                },
                {
                    text: '面板',
                    link: `${baseUrl}/panel`
                }
            ]
        });
    } else {
        arr.push({
            text: '布局',
            items: [
                {
                    text: '栅格',
                    items: [
                        { text: '行', link: `${baseUrl}/row` },
                        { text: '列', link: `${baseUrl}/col` }
                    ]
                },
                {
                    text: '框架',
                    items: [
                        { text: '框架', link: `${baseUrl}/framework` },
                        { text: '头部', link: `${baseUrl}/header` },
                        { text: '底部', link: `${baseUrl}/footer` },
                        { text: '侧部', link: `${baseUrl}/sider` },
                        { text: '中部', link: `${baseUrl}/main` }
                    ]
                },
                {
                    text: '选项卡',
                    link: `${baseUrl}/tabs`
                },
                {
                    text: '面板',
                    link: `${baseUrl}/panel`
                }
            ]
        });
    }

    return arr;
}

function generateExampleSiderBar() {
    return components('/examples');
}

function generateComponentSiderBar() {
    return components('/components');
}

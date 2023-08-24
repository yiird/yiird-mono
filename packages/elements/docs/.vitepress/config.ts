import vueJsx from '@vitejs/plugin-vue-jsx';
import { componentsResolver, directivesResolver, extractCommentsPlugin, sinnpetToCustomblockPlugin } from '@yiird/vite-plugin-vue-yiird-helper';
import { isArray, kebabCase } from 'lodash';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { viteMockServe } from 'vite-plugin-mock';
import { defineConfig, type MarkdownOptions } from 'vitepress';

const markdownOptions: MarkdownOptions = {
    lineNumbers: true
};

export default ({ mode }: any) => {
    return defineConfig({
        title: 'Test Docs',
        description: '测试文档网页',
        markdown: markdownOptions,
        themeConfig: {
            // https://vitepress.dev/reference/default-theme-config
            nav: [
                { text: '首页', link: '/' },
                { text: '组件', link: '/components/', activeMatch: '/components/' },
                { text: '样例', link: '/examples/', activeMatch: '/examples/' },
                { text: '模版', link: '/templates/', activeMatch: '/templates/' }
            ],
            outline: {
                level: 'deep',
                label: '本页导航'
            },
            siteTitle: 'Doc',
            sidebar: {
                '/components/': generateComponentSiderBar(),
                '/examples/': generateExampleSiderBar()
            },

            socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
        },
        vite: {
            optimizeDeps: {
                include: ['smooth-scrollbar']
            },
            clearScreen: false,
            build: {
                cssMinify: true
            },
            esbuild: {
                treeShaking: true
            },
            css: {
                postcss: {
                    plugins: [require('autoprefixer')({ clear: true })]
                }
            },
            plugins: [
                vueJsx(),
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
                }),
                viteMockServe({
                    mockPath: resolve('./docs/mock'), // 设置模拟.ts 文件的存储文件夹
                    logger: true,
                    enable: true,
                    watchFiles: true
                }),
                mode === 'development'
                    ? Components({
                          globs: ['../../packages/*.{vue}'],
                          resolvers: [
                              componentsResolver({
                                  prefix: 'y',
                                  from: resolve(__dirname, `../../packages/index.ts`)
                              }),
                              directivesResolver({
                                  from: resolve(__dirname, `../../packages/index.ts`)
                              })
                          ]
                      })
                    : null
            ]
        }
    });
};

function generateExampleSiderBar() {
    const baseUrl = '/examples';

    return [
        {
            text: '基础组件',
            items: [
                { text: '图标', link: `${baseUrl}/icon` },
                { text: '按钮', link: `${baseUrl}/button` },
                { text: '虚拟滚动', link: `${baseUrl}/vscroll` },
                { text: '排版', link: `${baseUrl}/typography` },
                { text: '分组', link: `${baseUrl}/group` }
            ]
        },
        {
            text: '数据展示',
            items: [
                { text: '头像', link: `${baseUrl}/avatar` },
                { text: '树', link: `${baseUrl}/tree` },
                { text: '气泡弹框', link: `${baseUrl}/popover` },
                { text: '列表', link: `${baseUrl}/list` },
                { text: '下拉选择', link: `${baseUrl}/drop` }
            ]
        },
        {
            text: '数据录入',
            items: [
                { text: '输入框', link: `${baseUrl}/input` },
                { text: '复选框', link: `${baseUrl}/checkbox` },
                { text: '选择', link: `${baseUrl}/select` },
                { text: '文本域', link: `${baseUrl}/textarea` }
            ]
        },
        {
            text: '导航',
            items: [
                {
                    text: '菜单',
                    link: `${baseUrl}/menu`
                }
            ]
        },
        {
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
                },
                {
                    text: '间距',
                    link: `${baseUrl}/space`
                },
                {
                    text: '分割线',
                    link: `${baseUrl}/divider`
                }
            ]
        }
    ];
}

function generateComponentSiderBar() {
    const baseUrl = '/components';
    return [
        {
            text: '基础组件',
            items: [
                { text: '图标', link: `${baseUrl}/icon` },
                { text: '按钮', link: `${baseUrl}/button` },
                { text: '虚拟滚动', link: `${baseUrl}/vscroll` },
                { text: '排版', link: `${baseUrl}/typography` },
                { text: '分组', link: `${baseUrl}/group` }
            ]
        },
        {
            text: '数据展示',
            items: [
                { text: '头像', link: `${baseUrl}/avatar` },
                { text: '树', link: `${baseUrl}/tree` },
                { text: '气泡弹框', link: `${baseUrl}/popover` },
                { text: '列表', link: `${baseUrl}/list` },
                { text: '下拉选择', link: `${baseUrl}/drop` }
            ]
        },
        {
            text: '数据录入',
            items: [
                { text: '输入框', link: `${baseUrl}/input` },
                { text: '复选框', link: `${baseUrl}/checkbox` },
                { text: '选择', link: `${baseUrl}/select` },
                { text: '文本域', link: `${baseUrl}/textarea` }
            ]
        },
        {
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
                },
                {
                    text: '间距',
                    link: `${baseUrl}/space`
                },
                {
                    text: '分割线',
                    link: `${baseUrl}/divider`
                }
            ]
        }
    ];
}

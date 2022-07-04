import { extractor } from '@yiird/vue3-ts-api-extractor';
import path from 'path';
import { defineConfig } from 'vitepress';

const options = {
	scanner: {
		root: path.resolve(__dirname, '../../src/'),
		scanDirs: ['components'],
		extensions: ['.ts', '.vue'],
		externals: ['vue'],
		watch: true
	},
	output: {
		single: false,
		dir: path.resolve(__dirname, '../../docs/components'),
		filename(filename) {
			return filename;
		},
		type: 'markdown'
	}
};

export default defineConfig({
	title: 'Owl.js',
	description: 'Owl.js 文档',
	head: [['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' }]],
	lang: 'zh-CN',
	markdown: {
		theme: 'vitesse-light'
	},
	themeConfig: {
		logo: '/images/logomin.png',
		//outlineTitle: '本页内容',
		socialLinks: [{ icon: 'github', link: 'https://github.com/yiird/yiird-mono/tree/main/packages/owl' }],
		editLink: {
			pattern: 'https://github.com/yiird/yiird-mono/tree/main/packages/owl/docs/:path',
			text: 'Edit this page on GitHub'
		},
		nav: [
			{
				text: '组件',
				items: [
					{
						text: '基础',
						link: '/components/o-button'
					},
					{
						text: '布局',
						link: '/components/o-layout'
					}
				]
			},
			{ text: '样例', link: '/examples/button' }
		],
		sidebar: {
			'/components/': [
				{
					text: '基础',
					items: [
						{ text: 'button', link: '/components/o-button' },
						{ text: 'icon', link: '/components/o-icon' }
					]
				},
				{
					text: '布局',
					items: [
						{ text: 'layout', link: '/components/o-layout' },
						{ text: 'header', link: '/components/o-header' },
						{ text: 'footer', link: '/components/o-footer' },
						{ text: 'main', link: '/components/o-main' },
						{ text: 'sider', link: '/components/o-sider' }
					]
				},
				{
					text: '表单',
					items: []
				}
			],
			'/examples/': [
				{
					text: '基础',
					items: [
						{ text: 'button', link: '/examples/button' },
						{ text: 'icon', link: '/examples/icon' }
					]
				},
				{
					text: '布局',
					items: [{ text: 'layout', link: '/examples/layout' }]
				}
			]
		}
	},
	vite: {
		clearScreen: false,
		esbuild: {
			treeShaking: true
		},
		ssr: {
			noExternal: ['lodash-es']
		},
		plugins: [
			{
				name: 'extract-comments-plugin',
				apply: 'serve',
				buildStart() {
					const extractorobj = extractor(options);
					extractorobj.extractor();
					extractorobj.on('filechange', (path) => {
						extractorobj.extractor(path);
					});
				}
			}
		]
	}
});

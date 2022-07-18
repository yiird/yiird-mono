import vueI18n from '@intlify/vite-plugin-vue-i18n';
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
					},
					{
						text: '表单',
						link: '/components/o-input'
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
						{ text: 'icon', link: '/components/o-icon' },
						{ text: 'popper 冒泡⽓框', link: '/components/o-popper' }
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
					items: [
						{ text: 'input', link: '/components/o-input' },
						{ text: 'calendar', link: '/components/o-calendar' }
					]
				}
			],
			'/examples/': [
				{
					text: '基础',
					items: [
						{ text: 'button', link: '/examples/button' },
						{ text: 'icon', link: '/examples/icon' },
						{ text: 'popper 冒泡⽓框', link: '/examples/popper' }
					]
				},
				{
					text: '布局',
					items: [{ text: 'layout', link: '/examples/layout' }]
				},
				{
					text: '表单',
					items: [
						{ text: 'input', link: '/examples/input' },
						{ text: 'calendar', link: '/examples/calendar' }
					]
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
		resolve: {
			alias: {
				'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
			}
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
			},
			vueI18n({
				include: path.resolve(__dirname, '../../src/locales/**')
			})
		]
	}
});

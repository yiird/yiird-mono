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
	markdown: {
		theme: 'vitesse-light'
	},
	themeConfig: {
		logo: '/images/logomin.jpg',
		nav: [{ text: '组件', link: '/components/' }],
		socialLinks: [{ icon: 'github', link: 'https://github.com/yiird/yiird-mono/tree/main/packages/owl' }],
		// editLink: {
		// 	pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
		// 	text: 'Edit this page on GitHub'
		// },
		sidebar: {
			'/components/': [
				{
					text: '基础',
					items: [{ text: 'button', link: '/components/o-button' }]
				},
				{
					text: '布局',
					items: []
				},
				{
					text: '表单',
					items: []
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

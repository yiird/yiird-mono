import { defineConfig } from 'vitepress';

export default defineConfig({
	title: 'Owl 文档',
	description: 'Owl 文档',
	themeConfig: {
		logo: '/images/logo.jpg',
		nav: [{ text: '组件', link: '/components/' }],
		socialLinks: [{ icon: 'github', link: 'https://github.com/yiird/yiird-mono/tree/main/packages/owl' }],
		sidebar: {
			'/components/': [
				{
					text: '基础',
					items: [{ text: 'button', link: '/components/button' }]
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
	}
});

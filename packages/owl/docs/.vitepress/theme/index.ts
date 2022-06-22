import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import VPHomeHero from './layout/VPHomeHeroBefore.vue';
import './style.scss';

export default {
	...DefaultTheme,
	Layout() {
		return h(DefaultTheme.Layout, null, {
			'home-hero-before': () => h(VPHomeHero)
		});
	},
	enhanceApp() {
		// register global components
	}
};

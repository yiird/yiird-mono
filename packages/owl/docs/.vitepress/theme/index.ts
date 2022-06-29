import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'animate.css';
import { forEach } from 'lodash-es';
import { EnhanceAppContext } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { defineAsyncComponent } from 'vue';
import { createUI, ThemeNormal } from '../../../src/main';
import ChooseComponent from './code/ChooseComponent.vue';
import Example from './code/Example.vue';
import Layout from './layout/Layout.vue';
import './style.scss';
export default {
	...DefaultTheme,
	Layout,
	enhanceApp(ctx: EnhanceAppContext) {
		const examples = import.meta.glob('../example-components/*.vue');
		const app = ctx.app;
		app.component('Example', Example);
		app.component('ChooseComponent', ChooseComponent);
		app.component('FontAwesomeIcon', FontAwesomeIcon);
		forEach(examples, (component, filename) => {
			const name = filename.toString().substring(filename.lastIndexOf('/') + 1, filename.lastIndexOf('.'));
			app.component(name, defineAsyncComponent(component));
		});
		app.use(createUI(ThemeNormal));
	}
};

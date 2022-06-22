import camelCase from 'lodash-es/camelCase';
import forEach from 'lodash-es/forEach';
import upperFirst from 'lodash-es/upperFirst';
import { App, Plugin } from 'vue';
import * as components from './components';
import { Theme, ThemeKey } from './theme/theme';
import { ThemeNormal } from './theme/theme-normal';

const createUI = (theme?: Theme): Plugin => {
	theme = theme || ThemeNormal;
	return {
		install(app: App) {
			forEach(components, (component, _name) => {
				const name = upperFirst(camelCase(theme?.prefix + ' ' + component.name || _name));
				app.component(name, component);
			});
			app.provide(ThemeKey, theme);
		}
	};
};

export * from './components/';
export * from './components/types';
export * from './theme';
export { ThemeNormal } from './theme/theme-normal';
export { createUI };

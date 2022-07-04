import { forEach } from 'lodash-es';
import { App, Plugin } from 'vue';
import * as components from './components/addones';
import { addIcons, IconDefinitionOrPack } from './components/icon';
import { GlobalThemeKey, GlobalVariables, Theme } from './theme/theme';
import { ThemeNormal } from './theme/theme-normal';

export type OwlOptions = {
	icons?: Array<IconDefinitionOrPack>;
};

const createUI = (theme: Theme<GlobalVariables>): Plugin => {
	theme = theme || ThemeNormal;
	return {
		install(app: App, options?: OwlOptions) {
			forEach(components, (component) => {
				app.component(component.name, component);
			});

			if (options?.icons) {
				addIcons(...options.icons);
			}

			app.provide(GlobalThemeKey, theme);
			theme.mount();
		}
	};
};

export * from './components';
export * from './theme';
export { createUI };

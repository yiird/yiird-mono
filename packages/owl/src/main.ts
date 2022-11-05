import { forEach } from 'lodash-es';
import { App, Plugin } from 'vue';
import * as components from './components/addones';
import { addIcons, IconDefinitionOrPack } from './components/icon';
import { GlobalThemeKey, GlobalVariables, Theme } from './theme/theme';
import { ThemeNormal } from './theme/theme-normal';

import { configure, LogLevel } from './common/logger';
import { tooltip } from './directives';
import setupI18n from './locales';
import './theme/styles/main.scss';

export type OwlOptions = {
	icons?: Array<IconDefinitionOrPack>;
	debug?: boolean;
	debugLevel?: LogLevel;
};

const createUI = (theme: Theme<GlobalVariables>): Plugin => {
	theme = theme || ThemeNormal;
	return {
		install(app: App, options?: OwlOptions) {
			app.use(setupI18n());
			forEach(components, (component) => {
				app.component(component.name, component);
			});
			app.directive('tooltip', tooltip);

			if (options?.icons) {
				addIcons(...options.icons);
			}

			configure({
				debug: options?.debug,
				level: options?.debugLevel
			});
			app.provide(GlobalThemeKey, theme);
			theme.mount();

			// nextTick(() => {
			// 	const modelsWrap = document.createElement('div');
			// 	modelsWrap.id = 'models';
			// 	document.body.appendChild(modelsWrap);
			// });
		}
	};
};

export * from './components';
export * from './theme';
export { createUI };

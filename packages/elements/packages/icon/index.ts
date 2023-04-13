import { capitalize, type App, type Plugin } from 'vue';
import type { YEOptions } from '../types/global';
import Icon from './template.vue';
export * from './logic';
export { Icon };
export type { YEOptions };
export default {
	install(app: App, optinos: YEOptions) {
		app.component(capitalize(`${optinos.prefix}Icon`), Icon);
	}
} as Plugin;

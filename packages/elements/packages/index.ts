import type { App, Plugin } from 'vue';
import ButtonPlugin from './button';
import { DEFAULT_PREFIX } from './constants';
import IconPlugin from './icon';
import type { YEOptions } from './types/global';

const YE: Plugin = {
	install(app: App, optinos: YEOptions) {
		if (!optinos.prefix) {
			optinos.prefix = DEFAULT_PREFIX;
		}
		app.use(IconPlugin, optinos);
		app.use(ButtonPlugin, optinos);
	}
};
export { Button } from './button';
export { Icon } from './icon';
export type { YEOptions };
export { YE };
export default YE;

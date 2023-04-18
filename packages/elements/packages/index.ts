import type { App, Plugin } from 'vue';
import * as components from './components';
import { DEFAULT_PREFIX } from './constants';
import type { ElementOptions } from './types/global';

const YE: Plugin = {
    install(app: App, optinos?: ElementOptions) {
        if (!optinos) {
            optinos = {
                prefix: DEFAULT_PREFIX
            };
        }

        Object.values(components)
            .filter((com) => !!com.install)
            .forEach((plugin) => {
                app.use(plugin as Plugin, optinos);
            });
    }
};
export * from './components';
export type { ElementOptions };
export { YE };

export default YE;

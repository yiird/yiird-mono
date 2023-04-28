import { reactive, type App, type Plugin as _Plugin } from 'vue';
import * as components from './components';
import { DEFAULT_ELEMENT_OPTIONS, OPTIONS_KEY } from './config';
import type { ElementOptions } from './types/global';

const YE: _Plugin = {
    install(app: App, optinos?: ElementOptions) {
        if (!optinos) {
            optinos = DEFAULT_ELEMENT_OPTIONS;
        } else {
            optinos = Object.assign(DEFAULT_ELEMENT_OPTIONS, optinos);
        }
        app.provide<ElementOptions>(OPTIONS_KEY, reactive(optinos));

        Object.values(components)
            .filter((com) => !!(com as any)._register)
            .forEach((plugin: any) => {
                plugin._register(app, optinos);
            });
    }
};
export * from './components';
export type { ElementOptions };
export { YE };

export default YE;

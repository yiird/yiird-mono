import { nextTick, reactive, type App, type Plugin } from 'vue';
import { checkReady, rootStyleVariables, updateRootStyle } from './common/dom-utils';
import * as components from './components';
import { DEFAULT_ELEMENT_OPTIONS, OPTIONS_KEY } from './config';
import type { ElementOptions } from './types/global';

const YE: Plugin = {
    install(app: App, options?: ElementOptions) {
        if (!options) {
            options = DEFAULT_ELEMENT_OPTIONS;
        } else {
            options = Object.assign(DEFAULT_ELEMENT_OPTIONS, options);
        }

        app.provide<ElementOptions>(OPTIONS_KEY, reactive(options));

        Object.values(components)
            .filter((com) => !!(com as any)._register)
            .forEach((plugin: any) => {
                plugin._register(app, options);
            });

        nextTick(() => {
            checkReady(app, () => {
                const theme = options?.themeConfig;
                if (theme) {
                    updateRootStyle('ye-root-variables', rootStyleVariables(theme));
                    updateRootStyle(
                        'root-styles',
                        `
html,body{
    font-size: var(--ye-font-size);
    font-family: var(--ye-font-family);
}
*, ::before, ::after {
    box-sizing: border-box;
    margin:0;
    padding:0;
}
                        `
                    );
                }
            });
        });
    }
};
export { Util } from './common';
export * from './components';
export type * from './types/global';
export type { ElementOptions };
export { YE };

import { forEach } from 'lodash-es';
import { inject, reactive, watchEffect, type App, type Plugin } from 'vue';
import { readyCallback } from './common/init';
import * as components from './components';
import { DEFAULT_ELEMENT_OPTIONS, IS_DARK, OPTIONS_KEY, USER_THEME_VARS, generThemeConfig } from './config';
import * as directives from './directives';
import type { PlatformOptions } from './types/options';

const YE: Plugin = {
    install(app: App, options?: PlatformOptions) {
        if (!options) {
            options = DEFAULT_ELEMENT_OPTIONS;
        } else {
            options = Object.assign(DEFAULT_ELEMENT_OPTIONS, options);
        }

        const _options = reactive(options);
        app.provide<PlatformOptions>(OPTIONS_KEY, _options);

        app.runWithContext(() => {
            const ops = inject(OPTIONS_KEY);
            watchEffect(() => {
                if (ops) {
                    const themeConfig = generThemeConfig(IS_DARK.value, USER_THEME_VARS.value);
                    ops.themeConfig = themeConfig;
                }
            });
        });

        let count = 0;

        app.mixin({
            beforeMount() {
                count++;
            },
            mounted() {
                count--;
                if (count === 0) {
                    const ops = inject(OPTIONS_KEY);
                    app.runWithContext(() => {
                        readyCallback(ops);
                    });
                }
            }
        });

        forEach(directives, (directive, name) => {
            app.directive(name, directive);
        });

        forEach(components, (component: any) => {
            if (component.install) {
                component.install(app, options);
            }
        });
    }
};
export * from './common';
export * from './components';
export * from './directives';
export type * from './types';
export { YE };
export type { PlatformOptions as ElementOptions };

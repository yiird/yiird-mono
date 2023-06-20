import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../config';
import type { ComponentType, ElementOptions, Plugin } from '../../types/global';
import type { TypographyExposeType } from './logic';
import Typography from './template.vue';

const TypographyPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Typography.name}`), Typography);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Typography, TypographyPlugin };
export type { ElementOptions };
export type TypographyType = ComponentType<typeof Typography, TypographyExposeType>;

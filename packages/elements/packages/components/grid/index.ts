import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../config';
import type { ComponentType, ElementOptions, Plugin } from '../../types/global';
import type { GridExposeType } from './logic';
import Grid from './template.vue';

const GridPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Grid.name}`), Grid);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Grid, GridPlugin };
export type { ElementOptions };
export type GridType = ComponentType<typeof Grid, GridExposeType>;

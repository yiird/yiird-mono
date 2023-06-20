import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../../config';
import type { ComponentType, ElementOptions, Plugin } from '../../../types/global';
import type { RowExposeType } from './logic';
import Row from './template.vue';

const RowPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Row.name}`), Row);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Row, RowPlugin };
export type { ElementOptions };
export type RowType = ComponentType<typeof Row, RowExposeType>;

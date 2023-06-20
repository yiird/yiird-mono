import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../../config';
import type { ComponentType, ElementOptions, Plugin } from '../../../types/global';
import type { ListMetaExposeType } from './logic';
import ListMeta from './template.vue';

const ListMetaPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${ListMeta.name}`), ListMeta);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { ListMeta, ListMetaPlugin };
export type { ElementOptions };
export type ListMetaType = ComponentType<typeof ListMeta, ListMetaExposeType>;

import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../config';
import type { ComponentType, ElementOptions, Plugin } from '../../types/global';
import type { TabsExposeType } from './logic';
import Tabs from './template.vue';

const TabsPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Tabs.name}`), Tabs);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Tabs, TabsPlugin };
export type { ElementOptions };
export type TabsType = ComponentType<typeof Tabs, TabsExposeType>;

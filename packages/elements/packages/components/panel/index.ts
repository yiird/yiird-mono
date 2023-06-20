import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../config';
import type { ComponentType, ElementOptions, Plugin } from '../../types/global';
import type { PanelExposeType } from './logic';
import Panel from './template.vue';

const PanelPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Panel.name}`), Panel);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Panel, PanelPlugin };
export type { ElementOptions };
export type PanelType = ComponentType<typeof Panel, PanelExposeType>;

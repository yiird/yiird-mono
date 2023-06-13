import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../config';
import type { ElementOptions, Plugin } from '../../types/global';
import Divider from './template.vue';

const DividerPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Divider.name}`), Divider);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Divider, DividerPlugin };
export type { ElementOptions };
export type DividerType = InstanceType<typeof Divider>;

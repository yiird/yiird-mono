import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../../config';
import type { ElementOptions, Plugin } from '../../../types/global';
import Sider from './template.vue';

const SiderPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Sider.name}`), Sider);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Sider, SiderPlugin };
export type { ElementOptions };
export type SiderType = InstanceType<typeof Sider>;

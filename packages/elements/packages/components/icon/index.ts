import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../config';
import type { ElementOptions, Plugin } from '../../types/global';
import Icon from './template.vue';

const IconPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Icon.name}`), Icon);
    },
    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { addIcons } from './logic';
export type { ElementOptions };
export { Icon, IconPlugin };
export type IconType = InstanceType<typeof Icon>;

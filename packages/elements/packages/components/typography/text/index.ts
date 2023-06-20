import { capitalize, type App } from 'vue';
import { DEFAULT_ELEMENT_OPTIONS } from '../../../config';
import type { ElementOptions, Plugin } from '../../../types/global';
import Text from './template.vue';

const TextPlugin: Plugin = {
    _register(app: App, optinos?: ElementOptions) {
        const { prefix = DEFAULT_ELEMENT_OPTIONS } = optinos || {};
        app.component(capitalize(`${prefix}${Text.name}`), Text);
    },

    install(app: App, optinos: ElementOptions) {
        this._register(app, optinos);
    }
};

export type * from './logic';
export { Text, TextPlugin };
export type { ElementOptions };
export type TextType = InstanceType<typeof Text>;
